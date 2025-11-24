import Link from 'next/link';
import clsx from 'clsx';
import { BLOG_TITLE } from '@/lib/const';
import { VisuallyHidden } from './visuallyhidden';
import { motion } from 'motion/react';

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
    // <Link
    //   href="/"
    //   data-mobile-alignment={mobileAlignment}
    //   className={clsx(
    //     'block font-semibold tracking-[-0.5px] no-underline',
    //     'text-[1.25rem] sm:text-[1.5rem]',
    //     'transition-all duration-300 ease-out will-change-transform',
    //     {
    //       'hover:font-extrabold hover:-translate-x-px': !disableHover,
    //       "[data-mobile-alignment='center']:hover:translate-x-0": !disableHover
    //     },
    //     className
    //   )}
    // >
    //   {BLOG_TITLE}
    //   <VisuallyHidden>Go to homepage</VisuallyHidden>
    // </Link>
    <>
      <motion.a
        href="/"
        className="flex items-center text-[1rem] font-semibold leading-none w-0"
        whileHover={{ rotate: -1.5, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* LEFT — Gobinath */}
        <span className="font-bold leading-[0.9] inline-block" style={{ color: 'var(--color-accent)' }}>
          Gobinath
        </span>

        {/* CENTER — SVG + Overlapping VB */}
        <span className="relative inline-flex items-center w-4 ml-1 mr-1">
          {/* Scribble (your SVG) */}
          <svg
            width="0.5rem"
            height="0.5rem"
            viewBox="0 0 9 10"
            fill="none"
            className="stroke-current inline-block text-stone-400"
            style={{ bottom: '-1.5rem', position: 'absolute' }}
          >
            <path
              d="M1 9C2.23995 7.12464 3.87268 5.18927 4.17593 2.59926C4.22017 2.22137 4.11111 0.731563 4.11111 1.04233C4.11111 1.49132 4.41831 2.03152 4.55761 2.40705C4.98522 3.55977 5.31447 4.69324 5.92593 5.70352C6.43274 6.54092 7.08081 7.96204 8 7.96204"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* VB — positioned EXACTLY like your version, but clean */}
          <span
            className="
        absolute
        text-purple-600
        font-semibold
        -rotate-6
        text-stone-400
      "
            style={{
              top: '-1.25rem',
              left: '-0.6rem',
              letterSpacing: '-0.02em'
            }}
          >
            VB
          </span>
        </span>

        {/* RIGHT — Blog */}
        <span className="font-extrabold leading-[0.9] inline-block">Portfolio</span>
      </motion.a>
    </>
  );
}
