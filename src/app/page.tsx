import fs from 'fs/promises';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Home() {
  const postContent = await fs.readFile(`src/posts/index.mdx`, 'utf-8');

  return (
    <main className="container px-5 mx-auto my-40 text-xl">
      {/* @ts-expect-error Async Server Component Workaround */}
      <MDXRemote source={postContent} />
    </main>
  );
}
