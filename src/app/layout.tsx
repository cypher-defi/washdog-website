import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Washdog | El cuidado que tu amigo se merece',
  description:
    'Spa y peluquería canina en Ñuñoa. Baños suaves, cortes profesionales y trato amoroso para tu mascota.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans text-primary bg-background antialiased flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
