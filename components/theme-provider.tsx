'use client';

import { useEffect } from 'react';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/lib/const';

export function ThemeProvider({
  initialTheme,
  children
}: {
  initialTheme: 'light' | 'dark';
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Apply theme CSS variables on mount
    const root = document.documentElement;
    const colors = initialTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });
  }, [initialTheme]);

  return <>{children}</>;
}
