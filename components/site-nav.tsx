'use client';

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Cookie from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS, COLOR_THEME_COOKIE_NAME } from '@/lib/const';
import { Logo } from './ui/logo';
import { VisuallyHidden } from './ui/visuallyhidden';
import { ThemeToggleIcon } from './toggle-icon';

export function SiteNav({
  initialTheme,
  className,
  ...delegated
}: {
  initialTheme: 'light' | 'dark';
  className?: string;
}) {
  const [theme, setTheme] = useState(initialTheme);

  // Initialize theme on mount - read from cookie if available
  useEffect(() => {
    const savedTheme = Cookie.get(COLOR_THEME_COOKIE_NAME) as 'light' | 'dark' | undefined;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    const colors = theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute('data-color-theme', theme);
    Object.entries(colors).forEach(([key, value]) => root.style.setProperty(key, value as string));
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    // persist preference
    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 1000 });
  };

  return (
    <div
      className={clsx('sticky top-0 z-50 w-full', className)}
      {...delegated}
      style={{
        backdropFilter: 'blur(10px)'
      }}
    >
      <header
        className={clsx(
          'mx-auto flex max-w-5xl items-center justify-between px-4 py-3',
          'h-(--header-height) max-w-(--content-width)',
          'px-(--viewport-padding) mx-auto',
          className
        )}
        {...delegated}
      >
        <Logo />
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleTheme}
            className="flex justify-center items-center cursor-pointer"
            aria-label="Toggle dark / light mode"
          >
            <ThemeToggleIcon theme={theme} />
            <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
          </button>
        </div>
      </header>
    </div>
  );
}
