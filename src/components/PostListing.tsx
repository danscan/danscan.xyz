import Link from 'next/link';

type PostListingProps = {
  date: string;
  href: string;
  title: string;
};

export function PostListing({ date, href, title }: PostListingProps) {
  return (
    <div className="py-3 space-y-1">
      <Link href={href} title={title}>
        <div className="text-sm italic leading-none">{date}</div>
        <div className="font-md">{title}</div>
      </Link>
    </div>
  );
}
