import { PostsIndex } from '@/posts';

export default async function Home() {
  return (
    <main className="container my-40 space-y-10">
      {/* Logo */}
      <div className="space-y-1">
        <div className="text-3xl font-heading">danscan</div>
        <div className="text-sm italic">Computing Enthusiast</div>
      </div>

      {/* Brief About */}
      <div className="max-w-2xl space-y-2">
        <div className="text-xl font-heading">About</div>
        <div className="space-y-5 text-base">
          <p>
            I believe computing can serve humanity much better than it does
            today.
          </p>

          <p>
            The apps we use possess and control <i>our</i> data and use it
            against us. The vast majority of mature, well-maintained and usable
            software is arbitrarily locked down so you can't combine it with
            other software. Most people are computing-illiterate because they
            haven't had an opportunity to see inside the tools they use every
            day, so they've been discouraged from creating new things or hacking
            existing ones.
          </p>

          <p>
            At <a href="https://genesis.xyz">Genesis</a>, my work is focused on
            forcing the outcome where the software that we use affords us
            control over our data. And that's only the tip of the iceberg...
          </p>

          {/* Undermine the bad incentives, create new infrastructure, easier to host, decentralized */}
        </div>
      </div>

      {/* Writing */}
      <div className="flex flex-col md:flex-row">
        {/* Logs */}
        <div className="flex-1 space-y-1">
          <div className="text-xl font-heading">Logs</div>
          {/* List */}
          <div className="border-black divide-y divide-black border-y dark:border-white border-opacity-10 divide-opacity-10 dark:divide-opacity-30 dark:border-opacity-30 dark:divide-white">
            <PostsIndex />
          </div>
        </div>

        <div className="flex-1" />
      </div>
    </main>
  );
}
