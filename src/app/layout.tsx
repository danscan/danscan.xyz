import './globals.css';
import Link from 'next/link';
// eslint-disable-next-line camelcase
import { Press_Start_2P, Source_Sans_Pro } from 'next/font/google';
import { Logo } from '@/components/Logo';
import { Mikey } from '@/components/Mikey';

const pressStart2P = Press_Start_2P({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: '400',
});
const sourceSansPro = Source_Sans_Pro({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata = {
  title: 'danscan.xyz',
  authors: [{ name: 'danscan', url: 'danscan.xyz' }],
  description: '[d̴̑͜ḁ̷̉̀ṋ̸̱̉s̴̫̞͑c̵̩̳̆͘à̶̗͝n̵̝̓]',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${sourceSansPro.variable} font-body dark:bg-black bg-white text-black dark:text-white`}
      >
        {/* Nav */}
        <div className="container px-5 mx-auto">
          {/* Menu */}
          <nav className="flex items-center text-sm font-semibold gap-x-2 sm:gap-x-3 md:text-lg md:gap-x-5">
            {/* Logo */}
            <Link href="/" title="danscan">
              <Logo />
            </Link>
            <Link href="/posts/about">about</Link>
            <Link href="https://twitter.com/danscan">twitter</Link>
            <Link href="https://meet.dscanlon.com">meet</Link>
            <Link href="mailto:dan@danscan.com">email</Link>

            <div className="flex-1" />

            <Link className="-rotate-12" href="https://genesis.xyz">
              <Mikey />
            </Link>
          </nav>
        </div>

        {children}

        <footer className="container p-5 mx-auto">
          &copy; Dan Scanlon {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
