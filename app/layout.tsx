import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Script from 'next/script';
import { PwaManager } from '@/components/PwaManager';
import { siteConfig } from '@/lib/site-config';
import { MotionProvider } from '@/components/MotionProvider';
import { Footer } from '@/components/Footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@calcora',
  },
  other: {
    'google-adsense-account': 'ca-pub-5165373830014732',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <Script
          key="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5165373830014732"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${jakarta.variable} ${outfit.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 flex flex-col min-h-screen`}>
        <div className="flex-1 flex flex-col">
          <MotionProvider>
            {children}
          </MotionProvider>
        </div>
        <PwaManager />
        <Footer />
      </body>
    </html>
  );
}
