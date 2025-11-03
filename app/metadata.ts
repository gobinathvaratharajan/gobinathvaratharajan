import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadataKeywords = [
  'Blog',
  'React',
  'Next.js Blog',
  'React Blog',
  'Web Development',
  'Tutorials',
  'MDX Blog',
  'Modern Blog Template'
];

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: metadataKeywords,
  authors: [
    {
      name: 'Gobinath Varatharajan',
      url: 'https://magicui.design'
    }
  ],
  creator: 'Gobinath Varatharajan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@gobinathvaratharajan'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};
