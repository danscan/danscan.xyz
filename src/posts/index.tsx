import { PostListing } from '../components/PostListing';

export function PostsIndex() {
  return (
    <>
      <PostListing
        date="2023.05.23"
        href="/posts/publishing-whats-working"
        title="Publishing: What's Working"
      />
      <PostListing
        date="2023.05.15"
        href="/posts/shame-doesnt-change-minds"
        title="Shame Doesn't Change Minds"
      />
      <PostListing
        date="2023.05.09"
        href="/posts/natural-pace"
        title="Natural Pace"
      />
      <PostListing
        date="2023.05.08"
        href="/posts/throw-away"
        title="Throw Away"
      />
      <PostListing
        date="2023.05.07"
        href="/posts/modern-javascript"
        title="Modern Javascript Guide"
      />
      <PostListing
        date="2023.05.06"
        href="/posts/use-unfamiliar-tools"
        title="Use Unfamiliar Tools"
      />
      <PostListing date="2023.05.05" href="/posts/shipped" title="Shipped" />
      <PostListing
        date="2023.05.04"
        href="/posts/not-today"
        title="Not Today"
      />
      <PostListing
        date="2023.05.02"
        href="/posts/swift-ui-data-fetching"
        title="Swift UI Data Fetching for React Native Developers"
      />
      <PostListing
        date="2023.05.01"
        href="/posts/willpowerless-publishing"
        title="Willpowerless Publishing"
      />
    </>
  );
}
