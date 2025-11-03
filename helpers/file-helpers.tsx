import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

export interface Frontmatter {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  thumbnail?: string;
  [key: string]: unknown;
}

export interface BlogPostMeta extends Frontmatter {
  slug: string;
}

export interface BlogPost {
  frontmatter: Frontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'blog', 'content');

/**
 * Reads all blog post files (.mdx) and returns sorted metadata
 */
export async function getBlogPostList(): Promise<BlogPostMeta[]> {
  const fileNames = await readDirectory(CONTENT_DIR);

  const blogPosts: BlogPostMeta[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.mdx')) continue;

    const rawContent = await readFile(path.join(CONTENT_DIR, fileName));
    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...(frontmatter as Frontmatter)
    });
  }

  return blogPosts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

/**
 * Loads a single blog post and returns its content and metadata
 */
export const loadBlogPost = React.cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const rawContent = await readFile(filePath);

    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter: frontmatter as Frontmatter, content };
  } catch (err) {
    return (console.error(err), null);
  }
});

/**
 * Loads a single blog post metadata only (without content)
 */
export const loadBlogPostMeta = React.cache(async (slug: string): Promise<BlogPostMeta | null> => {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const rawContent = await readFile(filePath);

    const { data: frontmatter } = matter(rawContent);
    return { slug, ...(frontmatter as Frontmatter) };
  } catch (err) {
    return (console.error(err), null);
  }
});

/**
 * Helper to read file content
 */
async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8');
}

/**
 * Helper to read directory
 */
async function readDirectory(dirPath: string): Promise<string[]> {
  return fs.readdir(dirPath);
}
