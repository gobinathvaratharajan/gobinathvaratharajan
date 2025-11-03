import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

// Global CSS and site configuration
import { siteConfig } from '@/lib/site-config';
import { SiteNav } from '@/components/site-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { metadataKeywords } from './metadata';
import { COLOR_THEME_COOKIE_NAME } from '@/lib/const';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const viewport: Viewport = {
  themeColor: 'black'
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: metadataKeywords
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read theme from cookie (server-side)
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get(COLOR_THEME_COOKIE_NAME);
  const theme = (savedTheme?.value as 'light' | 'dark') || 'light';

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
      data-color-theme={theme}
    >
      <body>
        <ThemeProvider initialTheme={theme}>
          <SiteNav initialTheme={theme} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
