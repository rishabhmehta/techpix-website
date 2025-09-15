import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import FooterSection from '@/components/ui/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Techpix – Digital Product Engineering Studio',
  description:
    'Your Exponential Growth Partner. Techpix builds high‑performance websites, mobile apps, backend services, ERPs & real‑time dashboards with craftsmanship and speed.',
  keywords: [
    'Techpix',
    'software development',
    'web apps',
    'mobile apps',
    'backend services',
    'ERP',
    'dashboards',
    'product engineering',
  ],
  metadataBase: new URL('https://techpix.example.com'),
  openGraph: {
    title: 'Techpix – Digital Product Engineering Studio',
    description:
      'Your Exponential Growth Partner – Websites, Mobile Apps, Backends, ERPs & Dashboards engineered with quality and speed.',
    url: 'https://techpix.example.com',
    siteName: 'Techpix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Techpix – Digital Product Engineering Studio',
    description:
      'Your Exponential Growth Partner – Websites, Mobile Apps, Backends, ERPs & Dashboards engineered with quality and speed.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}
      >
        <ThemeProvider defaultTheme="system" enableSystem>
          <div className="bg-background text-foreground flex min-h-dvh flex-col">
            <SiteHeader />
            {children}
            <FooterSection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
