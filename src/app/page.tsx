import { PostsIndex } from '@/posts';
import Link from 'next/link';

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
            I write about creation, systems and incentives (or "why we can't
            have{' '}
            <Link className="underline" href="/posts/nice-things-we-cant-have">
              nice things
            </Link>
            "), and personal development through the lens of experiences I've
            had building software and companies over the past 16 years.
          </p>

          <p>
            I'm also the co-founder and CTO of{' '}
            <a className="underline" href="https://genesis.xyz">
              Genesis
            </a>
            , where my work is focused on forcing the outcome where the software
            we use gives us control over our data.
          </p>
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
