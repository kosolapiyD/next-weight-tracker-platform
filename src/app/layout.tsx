import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import './globals.scss';

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-bebas',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Weight War',
  description: 'Competitive weight tracker — check in, stay disciplined, win the week.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
