'use client';

import { BlogCard } from '@/components/blog-card';
import { TagFilter } from '@/components/tag-filter';
import { FlickeringGrid } from '@/components/ui/canva/flicker-grid';
import { useBlogPosts } from '@/app/hooks/useBlogPosts';
import { Suspense, useState } from 'react';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [search] = useState('');
  const { blogPosts, isLoading, error } = useBlogPosts();

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

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: 'var(--color-page-background)',
        color: 'var(--color-text)'
      }}
    >
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
      <main className="mx-auto w-full max-w-(--content-width) px-6 py-8">
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-6 py-6">
          {/* Left — Blog List */}
          <div className="flex-1">
            {error ? (
              <div className="text-red-500">Error loading posts: {error.message}</div>
            ) : isLoading ? (
              <div>Loading articles...</div>
            ) : (
              <Suspense fallback={<div>Loading articles...</div>}>
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
              </Suspense>
            )}
          </div>

          {/* Right — Tag Filter */}
          <aside className="w-full md:w-64">
            <div className="sticky top-24">
              <h3 className="text-xl mb-4 font-semibold" style={{ color: 'var(--color-accent)' }}>
                Browse By Category
              </h3>
              <TagFilter tags={allTags} selectedTag={selectedTag} tagCounts={tagCounts} onTagClick={handleTagClick} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
