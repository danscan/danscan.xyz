import './globals.css';
// eslint-disable-next-line camelcase
import { SiteNav } from '@/components/SiteNav';
import { Analytics } from '@vercel/analytics/react';
import LocalFont from 'next/font/local';

const FontBody = LocalFont({
  src: '../fonts/ArgentPixelCF-Regular.woff2',
  variable: '--font-body',
});
const FontHeading = LocalFont({
  src: '../fonts/ArgentPixelCF-Italic.woff2',
  variable: '--font-heading',
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
    <html className="h-screen overflow-y-scroll" lang="en">
      <body
        className={`${FontHeading.variable} ${FontBody.variable} flex flex-col font-body dark:bg-black bg-white text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black min-h-full`}
      >
        {/* Main container */}
        <div className="flex flex-col justify-between flex-1 min-h-full">
          {/* Main Content */}
          <div className="h-full">{children}</div>
          {/* Footer */}
          <footer className="container">
            <SiteNav />
          </footer>
        </div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
