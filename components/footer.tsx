'use client';
import { motion } from 'motion/react';
import { Github, Linkedin, Rss } from 'lucide-react';

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ rotate: -5, scale: 1.1 }}
      className="text-gray-700 dark:text-gray-300 transition-colors"
      style={{ ['--tw-text-opacity' as string]: 1 }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
      onMouseLeave={e => (e.currentTarget.style.color = '')}
    >
      {icon}
      {label && <span className="ml-1 text-sm">{label}</span>}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-gray-200 dark:border-gray-700 pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-4 pb-4 grid gap-20 lg:grid-cols-2">
        <div className="space-y-5">
          <motion.a
            href="/"
            className="flex items-center text-[1.5rem] font-medium leading-none"
            whileHover={{ rotate: -1.5, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="font-bold leading-[0.9] inline-block" style={{ color: 'var(--color-accent)' }}>
              Gobinath
            </span>
            <span className="relative inline-flex items-center w-4 ml-1 mr-1">
              <svg
                width="1rem"
                height="1rem"
                viewBox="0 0 9 10"
                fill="none"
                className="stroke-current inline-block"
                style={{ bottom: '-1.5rem', position: 'absolute' }}
              >
                <path
                  d="M1 9C2.23995 7.12464 3.87268 5.18927 4.17593 2.59926C4.22017 2.22137 4.11111 0.731563 4.11111 1.04233C4.11111 1.49132 4.41831 2.03152 4.55761 2.40705C4.98522 3.55977 5.31447 4.69324 5.92593 5.70352C6.43274 6.54092 7.08081 7.96204 8 7.96204"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="
        absolute
        text-purple-600
        font-semibold
        -rotate-6
      "
                style={{
                  top: '-2rem',
                  left: '-0.6rem',
                  letterSpacing: '-0.02em'
                }}
              >
                VB
              </span>
            </span>
            <span className="font-extrabold leading-[0.9] inline-block">Portfolio</span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-gray-600 dark:text-gray-400"
          >
            👀 Be intentional with your attention.
          </motion.p>
        </div>
        <div>
          <h2 className="font-semibold mb-3">General</h2>
          <ul
            className="
                [column-count:1]
                sm:[column-count:2]
                lg:[column-count:4]
                [column-gap:1.5rem]
                space-y-2
              "
          >
            {[
              { label: 'About Me', href: '/about-me' },
              { label: 'Contact', href: '/contact' }
            ].map(item => (
              <li key={item.label} className="break-inside-avoid">
                <a href={item.href} className="hover:text-purple-600 dark:hover:text-purple-400 inline-block">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-end gap-8">
        <div className="flex flex-wrap items-center gap-6">
          <SocialLink href="#" icon={<Rss className="w-5 h-5" />} />

          <SocialLink href="https://github.com/gobinathvaratharajan" icon={<Github className="w-5 h-5" />} />

          <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
        </div>
      </div>
    </footer>
  );
}
