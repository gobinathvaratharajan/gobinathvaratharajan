import Link from 'next/link';
import clsx from 'clsx';
import { BLOG_TITLE } from '@/lib/const';
import { VisuallyHidden } from './visuallyhidden';

export function Logo({
  mobileAlignment = 'left',
  disableHover = false,
  className
}: {
  mobileAlignment?: 'left' | 'center';
  disableHover?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      data-mobile-alignment={mobileAlignment}
      className={clsx(
        'block font-semibold tracking-[-0.5px] no-underline',
        'text-[1.25rem] sm:text-[1.5rem]',
        'transition-all duration-300 ease-out will-change-transform',
        {
          'hover:font-extrabold hover:-translate-x-px': !disableHover,
          "[data-mobile-alignment='center']:hover:translate-x-0": !disableHover
        },
        className
      )}
    >
      {BLOG_TITLE}
      <VisuallyHidden>Go to homepage</VisuallyHidden>
    </Link>
  );
}
