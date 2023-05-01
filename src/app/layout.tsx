import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
