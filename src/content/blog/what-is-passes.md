---
published: 2024-02-12
title: What Is Passes?
description: An introduction to the Passes protocol I authored.
image: /blog/what-is-passes.png
---


Passes is a client-side browser API I authored, allowing apps to make requests directly to users. It's designed to enable:
- The fastest authentication experience on the web.
- A portable user account that can be reused across apps, provided by the user's choice of app (their "Pass Provider").
- Emergent cross-app integrations among apps supporting common [request topics](#request-topics).
- The fastest and most ergonomic developer experience for authentication and cross-app requests.
- End-user choice and control at every step.

Passes works in any browser without requiring an extension.

## The Passes API

Passes has a straightforward interface at its core, sending a request and returning a promise for a result.

```typescript
// The Passes API has a single function – `request`,
// accessible at document.passes.request
interface Document {
  passes: {
    // Sends an encoded pass request and returns
    // a promise for an encoded result
    request(rawRequest: Uint8Array): Promise<Uint8Array>;
  };
};

const result = await document.passes?.request(/* ... */);
//    ↑                                       ↑
//    |                    [Encoded request]--|
//    |--[Encoded result]
```

In this API, requests and results are encoded as `Uint8Array`s for transport, chosen for its performance and versatility. This encoding allows the same values to be used across platforms without imposing a specific structure like JSON at the protocol level.

For making requests with Passes in your app, you'll use a higher-level API called [RequestTopic.sendRequest](#request-topics).

## How Passes Works In Any Browser

At its core, Passes is this simple API `document.passes.request`, provided by:

1. **The user's browser itself.** This is unlikely to happen soon.
2. **A browser extension installed by the user.** Though offering UX benefits, Passes functions fully without it.
3. **Or a script that has run on the requesting web page.** To enable immediate functionality in any web browser, [Passes.org](https://docs.passes.org) offers a polyfill script.

### What The Polyfill Script Does

The [Passes Polyfill](https://docs.passes.org/packages/polyfill/quickstart.html) defines the `document.passes.request` API function.

When invoked, the browser opens a new tab to `https://passes.org/request`, which redirects the user to their Pass Provider. Their Pass Provider then sends a "connect" message to the requesting page (via `window.opener.postMessage`) which tells it to send the request back via `postMessage`.

When the user accepts or rejects the request, the result is sent back to the requesting page, again via `window.opener.postMessage`.

The Pass Provider tab is closed automatically after the result is received by the requesting page.

All transmission of requests and results is client-side, and since Passes.org has redirected to the user's Pass Provider, it cannot see requests or results.

That's it. Feel free to check out the code for yourself: https://unpkg.com/@passes/polyfill@0.1.5/src/main.js

## Request Topics

The _type_ of a request is called a "Request Topic".

A request topic refers to a specification of a request's:
- Identifier: conventionally, this is a string using reverse DNS notation
- Request body type and codec 
- Result body type and codec
- Presentation: how to present the request to the user
- Handling behavior: what should happen when the user accepts the request

For example, I can define a request topic called `xyz.danscan.greet-user`, whose request body is a string name, and whose result body codec is a JSON object containing a `greeting` string.

We'll use the [`@passes/reqs`](https://www.npmjs.com/package/@passes/reqs) SDK, a convenient package for defining RequestTopics and making requests:

```typescript
import { RequestTopic } from '@passes/reqs';
import * as Codecs from '@passes/reqs/codecs';

const greetUser = new RequestTopic<
  // Request body type
  string,
  // Result body type
  { greeting: string }
>({
  // Identifier for the request topic
  id: 'xyz.danscan.greet-user',
  // Codec for the string request body
  requestBodyCodec: Codecs.String,
  // Codec for the JSON object result body
  resultBodyCodec: Codecs.Json,
})
```

`greetUser` specifies an identifier and a body type and codec for both the request and result.

Notably absent here are presentation and handling. Let's move on to that in the next section.

## Request Handling

When an app sends a request, it is received by the user's Pass Provider.

```
document.passes.request ---[request]--> Pass Provider
```

### Pass Providers

A Pass Provider presents requests to the user for review and handling.

Generally, Pass Providers support commonly-used request topics, such as requests related to signing in or making payments.

But Pass Providers cannot be expected to support _every_ request topic a user might encounter, especially when it comes to specialized use cases like access to specific data types, AI, and more.

Any app can request to become the user's Pass Provider:

```typescript
import { providePass } from '@passes/reqs/topics/pass-providers';

// When the user signs into mypass.com, it can send a providePass request
const providePassResult = await providePass({
  // The URI of the page that presents requests to the user for review and handling
  uri: 'https://mypass.com/request',
  // A string used to identify the user to their Pass Provider (e.g. a JWT)
  // This is not used in the Passes Polyfill implementation, but may be used by other implementations like browser extensions
  principal: 'random_3815710010219142556243038',
});
```

If the user accepts this request, future requests will be opened at `https://mypass.com/request`.


### Topic Providers

This is where Topic Providers come in.

A Topic Provider is any app that supports presentation and handling of a set of request topics.

When the user uses an app that provides topics, it can send an `org.passes.provide-topics` request, which tells the user's Pass Provider the set of topics it supports, and allows the user to delegate future requests of its supported topics to it.

Any app can become a Topic Provider:

```typescript
import { provideTopics } from '@passes/reqs/topics/topic-providers';

// When the user signs into myapp.com, it can send a provideTopics request
const provideTopicsResult = await provideTopics({
  // An array of the identifiers of topics it provides
  topics: ['com.myapp.topic1'],
  // The URI of the page that provides support for the topics
  uri: 'https://myapp.com/request',
});
```

In this case, if the user accepts this request, future requests to the topic `com.myapp.topic1` will be redirected to `https://myapp.com/request` by the user's Pass Provider.


### Requests with default providers

If your app depends on a new request topic specification that is not widely supported by Pass Providers, your app can wrap its request in a `org.passes.request-with-default-provider`, which allows you to specify a fallback provider to handle the request in case the user's Pass Provider doesn't support it, and they haven't used any app that provides it.

For example:

```typescript
import { sendRequestWithDefaultProvider } from '@passes/reqs/wrappers';
import myNicheRequestTopic from './lib';

const myNicheRequestTopicResult = await sendRequestWithDefaultProvider({
  // The topic of the wrapped request
  topic: myNicheRequestTopic,
  // The request body
  body: 'hello!',
  // The default provider URI
  defaultProvider: 'https://mynicheapp.com/request',
});
```

If the user's Pass Provider supports this niche request topic, it will just handle it. Or, if the user already has a topic provider for the niche request topic, their Pass Provider will delegate the request to the topic provider.

Otherwise, the request will be opened at `https://mynicheapp.com/request`.


### A note on topic providers

It's worth noting that topic providers (including default providers like in the previous example) can still send more common requests to the user's Pass Provider. This makes topic providers very powerful.

For example, a request topic that requires information about the user, or that needs to do produce a specific kind of cryptographic signature on the user's behalf, can implement the specialized logic required to handle the request, while accessing common user data or signing capabilities likely provided by the user's Pass Provider.

This means topic providers can compose the capabilities of other apps.


## On speed

Sending requests and results on the client side allows Passes to offer disturbingly fast UX flows, whether for signing in, permissions requests, payments, or anything else.

Coupled with applications deployed at the edge, Passes is an opportunity to raise the bar for speed on many of the most common user actions on the web.


## On portable accounts

Part of the reason for the name "Passes" is that a Pass Provider provides a kind of internet-wide "Pass" for the user that can serve as their identity or profile on any site that supports it.

Users are free to use the Pass Provider of their choice, and apps that send requests with Passes are completely agnostic as to which provider the user uses. As long as it supports the requested topic, it will work.

These two facts combine into a very compelling property: Passes offers an almost web-native portable identity that's not tied to a specific corporate provider. This is a major advantage over server-side authentication schemes like OAuth.


## On emergent cross-app integrations

With Topic Providers, an app can request a topic while being agnostic as to _which_ app will fulfill the request.

When a user has multiple providers for the same topic, their Pass Provider can let them choose which to use for each request.

As a result, Passes makes it possible to integrate various apps without references to specific app URLs and without API tokens, enabling a "web of apps" that work together automatically to emerge.


## On developer experience

Passes simplifies many things. For Passes-based authentication, you don't need separate integrations for many providers. Just request the topic you want to use for authentication, and it will automatically work with all supporting providers. 

Many benefits come from the fact the request API is client-side. There are no HTTP APIs, API Keys, and no party can refuse you service except your user. Integration couldn't be simpler.

I suggest trying out the [Genesis AI](https://github.com/genesis-xyz/ai) package (which allows apps to request to access the OpenAI API on behalf of the user, built on Passes) to get a feel for the DX.


## On end-user choice and control

With Passes, every request is presented to the user for review. The user is free to reject any request they don't want to approve, they use their choice of Pass Provider, decide which apps they want to use as Topic Providers, and decide whether they want to use a browser extension or not.

Choices are only presented to the user when relevant to what they are actively trying to do, and they're never faced with upfront decisions they need to make out-of-context.

---

## More resources

Passes is available now, and you can begin building with it today.

For in-depth documentation on Passes, visit [docs.passes.org](https://docs.passes.org).

### Upcoming high-level SDK

Passes is a simple and powerful API, and it's not at all prescriptive of what you can and cannot build with it.

This is intentional, but it can make it hard to wrap your head around it and what you can do with it.

I'm currently working on building a suite of higher-level features powered by Passes for authentication, cross-app requests, payments, and more. 

Follow [@danscan](https://twitter.com/danscan) and [@genesisxyz](https://twitter.com/genesisxyz) on Twitter (and Github) to stay tuned. 
