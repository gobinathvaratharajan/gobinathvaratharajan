import type { Metadata, Viewport } from 'next';

// Global CSS and site configuration
import { siteConfig } from '@/lib/site-config';
import { SiteNav } from '@/components/site-nav';
import { ThemeProvider } from '@/components/theme-provider';
import { metadataKeywords } from './metadata';
import { COLOR_THEME_COOKIE_NAME } from '@/lib/const';
import './globals.css';
import localFont from 'next/font/local';
import Footer from '@/components/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
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
  // Default to light theme for static generation
  // Theme will be applied client-side from cookie
  const theme = 'light';

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const cookie = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('${COLOR_THEME_COOKIE_NAME}='));
                  const theme = cookie ? cookie.split('=')[1] : 'light';
                  document.documentElement.setAttribute('data-color-theme', theme);
                } catch (e) {}
              })();
            `
          }}
        />
        <ThemeProvider initialTheme={theme}>
          <SiteNav initialTheme={theme} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
