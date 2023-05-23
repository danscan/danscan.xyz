const ArticleClassName = [
  // Container: no x-margin
  'mx-none',

  // Prose: Style HTML that's been rendered to Markdown
  'prose',
  // Prose responsive sizing
  'prose-base lg:prose-md prose-headings:prose-2xl',
  // Prose responsive colors: black and white
  'prose-neutral dark:prose-invert prose-p:text-black dark:prose-p:text-white',

  // Prose fonts
  'prose-headings:font-heading',

  // Prose code
  'prose-pre:rounded-none prose-code:rounded-none prose-pre:text-base',
].join(' ');

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container my-40">
      <article className={ArticleClassName}>{children}</article>
    </main>
  );
}
