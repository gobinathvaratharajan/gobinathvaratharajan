import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { describe, it, expect, vi } from 'vitest';

// Mock the components that use browser APIs or complex logic
vi.mock('@/components/ui/canva/flicker-grid', () => ({
  FlickeringGrid: () => <div data-testid="flickering-grid" />
}));

vi.mock('@/app/hooks/useBlogPosts', () => ({
  useBlogPosts: () => ({
    blogPosts: [],
    isLoading: false,
    error: null
  })
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => null
  }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/'
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('Articles')).toBeDefined();
  });
});
