import type { Metadata } from 'next';
import { Nav } from './components/Nav';
import './globals.css';
import { blackHanSans, inter } from './fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${blackHanSans.variable}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
