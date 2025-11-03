import { Metadata } from 'next';
import { loadBlogPostMeta } from '@/helpers/file-helpers';
import { siteConfig } from '@/lib/site-config';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.'
      };
    }

    const page = await loadBlogPostMeta(slug);

    if (!page) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.'
      };
    }

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    return {
      title: page.title,
      description: page.description,
      keywords: [
        page.title,
        ...(page.tags || []),
        'Blog',
        'Article',
        'Web Development',
        'Programming',
        'Technology',
        'Software Engineering'
      ],
      authors: [
        {
          name: page.author || siteConfig.name,
          url: siteConfig.url
        }
      ],
      creator: page.author || siteConfig.name,
      publisher: siteConfig.name,
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
      },
      openGraph: {
        title: page.title,
        description: page.description,
        type: 'article',
        url: ogUrl,
        publishedTime: page.date,
        authors: [page.author || siteConfig.name],
        tags: page.tags,
        images: [
          {
            url: page.thumbnail || ogImage,
            width: 1200,
            height: 630,
            alt: page.title
          }
        ],
        siteName: siteConfig.name
      },
      twitter: {
        card: 'summary_large_image',
        title: page.title,
        description: page.description,
        images: [page.thumbnail || ogImage],
        creator: '@gobinathvaratharajan',
        site: '@gobinathvaratharajan'
      },
      alternates: {
        canonical: ogUrl
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
}
