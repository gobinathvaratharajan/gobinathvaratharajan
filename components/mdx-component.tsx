import React from 'react';
import { Code } from 'bright';
import theme from '@/lib/theme';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AuthorKey, getAuthor } from '@/lib/authors';
import { AuthorCard } from './author-card';

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

interface AuthorProps {
  id: AuthorKey;
}

function Author({ id }: AuthorProps) {
  const author = getAuthor(id);
  return <AuthorCard author={author} className="my-8" />;
}

// Utility to create slug from heading text
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Extract text from React children (handles nested elements)
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props.children) {
      return extractText(props.children);
    }
  }
  return '';
}

// Custom heading components that add IDs
function createHeading(level: number) {
  const HeadingComponent = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
    const text = extractText(children);
    const id = createSlug(text);

    switch (level) {
      case 1:
        return (
          <h1 id={id} {...props}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 id={id} {...props}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 id={id} {...props}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 id={id} {...props}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 id={id} {...props}>
            {children}
          </h5>
        );
      case 6:
        return (
          <h6 id={id} {...props}>
            {children}
          </h6>
        );
      default:
        return (
          <h2 id={id} {...props}>
            {children}
          </h2>
        );
    }
  };

  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

// Generate all heading components
const headings = Object.fromEntries([1, 2, 3, 4, 5, 6].map(level => [`h${level}`, createHeading(level)]));

export const MDX_COMPONENTS = {
  pre: (props: CodeProps) => (
    <div suppressHydrationWarning>
      <Code {...props} theme={theme} />
    </div>
  ),
  ...headings,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Author,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 space-y-2 my-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 space-y-2 my-4" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 leading-relaxed" {...props} />
};
