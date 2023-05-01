export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container px-5 mx-auto my-40">
      <article className="prose md:prose-lg lg:prose-xl dark:prose-invert prose-neutral prose-headings:font-heading mx-none prose-code:rounded-none prose-pre:text-base prose-pre:rounded-none">
        {children}
      </article>
    </main>
  );
}
