import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { AuthorCard } from '@/components/author-card';
import { getAuthor, isValidAuthor } from '@/lib/authors';
import { HashScrollHandler } from '@/components/hash-scroll-handler';
import { TableOfContents } from '@/components/table-of-content';
import { FlickeringGrid } from '@/components/ui/canva/flicker-grid';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDX_COMPONENTS } from '@/components/mdx-component';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const blogPost = await loadBlogPost(slug);

  if (!blogPost) {
    notFound();
  }

  const { frontmatter, content } = blogPost;
  const date = new Date(frontmatter.date);
  const formattedDate = formatDate(date);

  return (
    <div className="min-h-screen bg-background  mx-auto max-w-(--content-width) px-6 py-8">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-[400px] mask-[linear-gradient(to_top,transparent_25%,black_95%)] pointer-events-none">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="space-y-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <>
              <Link href="/">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </>
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground">{formattedDate}</time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {frontmatter.title}
          </h1>

          {frontmatter.description && (
            <p className="text-muted-foreground max-w-4xl md:text-lg">{frontmatter.description}</p>
          )}
        </div>
      </div>
      <div className="flex relative max-w-7xl mx-auto px-4 md:px-0 z-10">
        <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {/* {frontmatter.thumbnail && (
            <div className="relative w-full h-[500px] overflow-hidden object-cover border border-transparent">
              <Image
                src={frontmatter.thumbnail}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )} */}
          <div className="p-6 lg:p-10">
            <article className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-lg">
              <MDXRemote source={content} components={MDX_COMPONENTS} />
            </article>
          </div>
        </main>

        <aside className="hidden lg:block w-[350px] shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {frontmatter.author && isValidAuthor(frontmatter.author) && (
              <AuthorCard author={getAuthor(frontmatter.author)} />
            )}
            <div className="border border-border rounded-lg p-6 bg-card shadow-sm">
              <TableOfContents />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
