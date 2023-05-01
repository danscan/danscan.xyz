import fs from 'fs/promises';
import type { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

export async function generateStaticParams() {
  const posts = await getMdxFilenames('src/posts');

  return posts.map((post) => ({
    post,
  }));
}

async function getMdxFilenames(directory: string): Promise<string[]> {
  try {
    const filenames = await fs.readdir(directory);
    const mdxFilenames = filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map((filename) => filename.slice(0, -4));
    return mdxFilenames;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: { post: string };
}) {
  const postContent = await fs.readFile(
    `src/posts/${params.post}.mdx`,
    'utf-8'
  );

  // @ts-expect-error Async Server Component Workaround
  return <MDXRemote options={SERIALIZE_OPTIONS} source={postContent} />;
}

const SERIALIZE_OPTIONS: SerializeOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: true,
          theme: 'dark-plus',
        },
      ],
    ],
  },
};
