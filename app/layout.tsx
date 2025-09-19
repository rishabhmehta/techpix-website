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
  title: 'Techpix - Your Exponential Growth Partner',
  description:
    'Techpix builds high‑performance AI powered applications, websites, mobile apps, backend services, ERPs & real‑time dashboards with craftsmanship and speed with AI assisted development.',
  keywords: [
    'Techpix',
    'AI Development',
    'software development',
    'web apps',
    'mobile apps',
    'backend services',
    'ERP',
    'dashboards',
    'product engineering',
  ],
  metadataBase: new URL('https://techpix.in'),
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
