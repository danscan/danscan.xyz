import Link from 'next/link';
import { Logo } from './Logo';
import { Mikey } from './Mikey';

export function SiteNav() {
  return (
    <>
      {/* Menu */}
      <nav className="flex items-center text-sm font-heading gap-x-2 sm:gap-x-3 md:text-lg md:gap-x-5">
        {/* Logo */}
        <Link href="/" title="danscan">
          <Logo />
        </Link>
        <Link href="https://twitter.com/danscan">twitter</Link>
        <Link href="https://meet.dscanlon.com">meet</Link>
        <Link href="mailto:dan@dscanlon.com">email</Link>

        <div className="flex-1" />

        <Link className="-rotate-12" href="https://genesis.xyz">
          <Mikey />
        </Link>
      </nav>
    </>
  );
}
