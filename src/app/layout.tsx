import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ToastProvider } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: 'NOOKORA — Make Space Yours | Editorial Room Makeovers & Transparent Budgets',
  description:
    'Discover beautiful compact room transformations, understand their exact line-item budgets in INR, find renter-friendly drill-free products, and recreate the aesthetic in your own space.',
  keywords: [
    'room makeover',
    'budget bedroom transformation',
    'compact living',
    'Japandi rental bedroom',
    'PG room makeover India',
    'aesthetic room decor under 10000',
    'drill-free renter friendly home decor',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#111714] text-[#F2EFE7] selection:bg-[#D8C19A] selection:text-[#111714]">
        <ToastProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
