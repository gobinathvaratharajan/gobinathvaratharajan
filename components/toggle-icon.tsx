'use client';

import { Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ThemeToggleIconProps {
  theme: 'light' | 'dark';
}

const iconStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
};

export function ThemeToggleIcon({ theme }: ThemeToggleIconProps) {
  return (
    <div style={{ position: 'relative', width: '1rem', height: '1rem' }}>
      <AnimatePresence initial={false} mode="sync">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 18,
              duration: 0.4
            }}
            style={iconStyle}
          >
            <Sun size="1rem" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 18,
              duration: 0.4
            }}
            style={iconStyle}
          >
            <Moon size="1rem" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
