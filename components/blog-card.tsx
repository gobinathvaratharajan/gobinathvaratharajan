'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

interface BlogCardProps {
  url: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
}

export function BlogCard({ url, title, description, date }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, duration: 0.6 }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        borderColor: 'hsl(var(--primary)/0.4)',
        transition: { type: 'spring', stiffness: 240, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col rounded-xl border border-border bg-card
                 transition-colors duration-200 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={url} className="flex flex-col h-full">
        {/* Optional glowing hover background */}
        <span className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card content */}
        <div className="relative p-6 flex flex-col gap-3 flex-1 z-10">
          {/* Title animation */}
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>

          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>

        {/* Read more section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.15 }}
          className="p-6 pt-0 text-sm font-medium text-primary flex items-center gap-1 relative z-10"
        >
          {/* Fancy underline */}
          <span className="relative">
            Read more
            <motion.span
              layout
              className="absolute bottom-0 left-0 h-0.5 bg-primary/70 w-0 group-hover:w-full transition-all duration-300"
            />
          </span>

          {/* Animated arrow */}
          <AnimatePresence mode="sync">
            {!isHovered ? (
              <motion.span
                key="single"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="inline-block ml-1"
              >
                →
              </motion.span>
            ) : (
              <motion.span
                key="multi"
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 4, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                className="inline-block ml-1"
              >
                &gt;&gt;&gt;
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.div>
  );
}
