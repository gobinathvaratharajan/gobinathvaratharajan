'use client';

import { BlogCard } from '@/components/blog-card';
import { TagFilter } from '@/components/tag-filter';
import { FlickeringGrid } from '@/components/ui/canva/flicker-grid';
import { useBlogPosts } from '@/app/hooks/useBlogPosts';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [search] = useState('');
  const { blogPosts, isLoading, error } = useBlogPosts();

  // Derive selectedTag from URL
  const selectedTag = searchParams.get('tag') || 'All';

  const filteredBlogs = blogPosts.filter(post => {
    const matchesSearch =
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.description?.toLowerCase().includes(search.toLowerCase());

    const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Extract unique tags and counts from actual blog posts
  const allTagsSet = new Set<string>(['All']);
  const tagCountsMap: Record<string, number> = {};

  blogPosts.forEach(post => {
    post.tags?.forEach((tag: string) => {
      allTagsSet.add(tag);
      tagCountsMap[tag] = (tagCountsMap[tag] || 0) + 1;
    });
  });

  const allTags = Array.from(allTagsSet);
  const tagCounts = tagCountsMap;

  return (
    <div className="relative top-16 z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:p-6 md:p-2 overflow-visible">
      {/* Tag Filter - Shows first on mobile, right on desktop */}
      <aside className="w-full md:w-64 overflow-visible md:order-2">
        <div className="md:sticky md:top-24 overflow-visible">
          <div className="pb-3.5">
            <h3 className="lg:text-xl md:text-lg mb-4 font-semibold uppercase">Browse By Category</h3>
            <TagFilter tags={allTags} selectedTag={selectedTag} tagCounts={tagCounts} />
          </div>
          <div className="pt-3.5 hidden md:block">
            <h3 className="lg:text-xl md:text-lg mb-4 font-semibold uppercase">Popular Category</h3>
            Coming Soon...
          </div>
        </div>
      </aside>

      {/* Blog List - Shows second on mobile, left on desktop */}
      <div className="flex-1 md:order-1">
        <h3
          className="lg:pl-6 md:pl-1 lg:text-xl md:text-lg mb-4 font-semibold uppercase"
          style={{ color: 'var(--color-accent)' }}
        >
          Articles
        </h3>
        {error ? (
          <div className="text-red-500">Error loading posts: {error.message}</div>
        ) : isLoading ? (
          <div>Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
            {filteredBlogs.map(blog => (
              <BlogCard
                key={blog.slug}
                url={`/blog/${blog.slug}`}
                title={blog.title}
                description={blog.description || ''}
                date={formatDate(new Date(blog.date))}
                thumbnail={blog.thumbnail || ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: 'var(--color-page-background)',
        color: 'var(--color-text)'
      }}
    >
      <div className="absolute top-0 left-0 z-0 w-full h-[300px] mask-[linear-gradient(to_top,transparent_25%,black_95%)] pointer-events-none">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.4}
          flickerChance={0.1}
        />
      </div>
      <main className="mx-auto w-full max-w-(--content-width) px-6 py-8">
        <Suspense
          fallback={
            <div className="relative top-16 z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-6 py-6">
              <div>Loading...</div>
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </main>
    </div>
  );
}
