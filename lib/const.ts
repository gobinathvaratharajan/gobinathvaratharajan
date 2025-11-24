export const BLOG_TITLE = 'Gobinath VB';
export const BLOG_DESCRIPTION = 'A  blog about Tech and Programming.';
export const COLOR_THEME_COOKIE_NAME = 'color-theme';

/* -------------------------------------------
   🎨 Josh W. Comeau-inspired Professional Theme
   - Light: Warm white, soft grays, elegant black text
   - Dark: Deep slate, subtle glow, vivid accent
------------------------------------------- */

export const LIGHT_COLORS: Record<string, string> = {
  '--color-text': 'hsl(230deg 25% 20%)', // Deep grayish-blue text
  '--color-primary-100': 'hsl(210deg 50% 96%)',
  '--color-primary-300': 'hsl(220deg 65% 85%)',
  '--color-primary-500': 'hsl(222deg 90% 60%)', // Blue accent (links, buttons)
  '--color-primary-700': 'hsl(223deg 60% 40%)',
  '--color-primary-900': 'hsl(225deg 50% 25%)',
  '--color-primary-contrast': 'white',
  '--color-secondary-500': 'hsl(340deg 80% 55%)', // Subtle pinkish accent (optional)
  '--color-decorative-100': 'hsl(45deg 100% 97%)',
  '--color-decorative-200': 'hsl(45deg 100% 94%)',
  '--color-decorative-300': 'hsl(45deg 100% 90%)',
  '--color-decorative-500': 'hsl(45deg 100% 85%)',
  '--color-decorative-700': 'hsl(45deg 100% 75%)',
  '--color-gray-0': 'hsl(0deg 0% 100%)',
  '--color-gray-100': 'hsl(0deg 0% 96%)',
  '--color-gray-200': 'hsl(0deg 0% 90%)',
  '--color-gray-300': 'hsl(0deg 0% 80%)',
  '--color-gray-500': 'hsl(0deg 0% 60%)',
  '--color-gray-700': 'hsl(0deg 0% 40%)',
  '--color-gray-900': 'hsl(0deg 0% 10%)',
  '--color-gray-1000': 'black',
  '--color-accent': 'hsl(273deg 100% 50%)'
};

export const DARK_COLORS: Record<string, string> = {
  '--color-text': 'hsl(210deg 20% 95%)', // Soft white
  '--color-primary-100': 'hsl(220deg 30% 20%)',
  '--color-primary-300': 'hsl(222deg 60% 40%)',
  '--color-primary-500': 'hsl(225deg 80% 65%)', // Bright blue highlight
  '--color-primary-700': 'hsl(226deg 60% 55%)',
  '--color-primary-900': 'hsl(230deg 45% 35%)',
  '--color-primary-contrast': 'black',
  '--color-secondary-500': 'hsl(340deg 80% 70%)', // Warm pinkish accent
  '--color-decorative-100': 'hsl(230deg 20% 6%)', // Deep background
  '--color-decorative-200': 'hsl(230deg 20% 10%)',
  '--color-decorative-300': 'hsl(230deg 20% 14%)',
  '--color-decorative-500': 'hsl(230deg 25% 18%)',
  '--color-decorative-700': 'hsl(230deg 25% 25%)',
  '--color-gray-0': 'black',
  '--color-gray-100': 'hsl(230deg 20% 8%)',
  '--color-gray-200': 'hsl(230deg 20% 12%)',
  '--color-gray-300': 'hsl(230deg 20% 20%)',
  '--color-gray-500': 'hsl(230deg 10% 45%)',
  '--color-gray-700': 'hsl(230deg 10% 65%)',
  '--color-gray-900': 'hsl(230deg 15% 85%)',
  '--color-gray-1000': 'white',
  '--color-accent': 'hsl(46deg 89% 55%)'
};

/* -------------------------------------------
   ✨ Semantic Colors
------------------------------------------- */

LIGHT_COLORS['--color-primary'] = LIGHT_COLORS['--color-primary-500'];
LIGHT_COLORS['--color-secondary'] = LIGHT_COLORS['--color-secondary-500'];
LIGHT_COLORS['--color-inline-code-bg'] = 'hsl(45deg 40% 90%)';
LIGHT_COLORS['--color-selection-text'] = 'black';
LIGHT_COLORS['--color-selection-background'] = 'hsl(50deg 100% 80%)';
LIGHT_COLORS['--color-backdrop'] = 'hsl(0deg 0% 100%)';
LIGHT_COLORS['--color-backdrop-highlight'] = 'hsl(0deg 0% 98%)';
LIGHT_COLORS['--color-page-background'] = 'hsl(0deg 0% 100%)';
LIGHT_COLORS['--color-page-border'] = 'hsl(0deg 0% 90%)';
LIGHT_COLORS['--color-card-background'] = 'hsl(0deg 0% 98%)';
LIGHT_COLORS['--color-card-border'] = 'hsl(0deg 0% 90%)';

DARK_COLORS['--color-primary'] = DARK_COLORS['--color-primary-500'];
DARK_COLORS['--color-secondary'] = DARK_COLORS['--color-secondary-500'];
DARK_COLORS['--color-inline-code-bg'] = 'hsl(230deg 20% 18%)';
DARK_COLORS['--color-selection-text'] = 'white';
DARK_COLORS['--color-selection-background'] = 'hsl(225deg 70% 45%)';
DARK_COLORS['--color-backdrop'] = 'hsl(230deg 20% 8%)';
DARK_COLORS['--color-backdrop-highlight'] = 'hsl(230deg 20% 12%)';
DARK_COLORS['--color-page-background'] = 'hsl(230deg 20% 6%)';
DARK_COLORS['--color-page-border'] = 'hsl(230deg 15% 20%)';
DARK_COLORS['--color-card-background'] = 'hsl(230deg 20% 10%)';
DARK_COLORS['--color-card-border'] = 'hsl(230deg 15% 20%)';

/* -------------------------------------------
   ☁️ Shadows
------------------------------------------- */

export const LIGHT_SHADOWS = {
  '--shadow-page': `
    0 2px 6px hsl(0deg 0% 0% / 0.1),
    0 4px 12px hsl(0deg 0% 0% / 0.05)
  `,
  '--shadow-card': `
    0 1px 3px hsl(0deg 0% 0% / 0.08),
    0 2px 6px hsl(0deg 0% 0% / 0.05)
  `
};

export const DARK_SHADOWS = {
  '--shadow-page': `
    0 1px 2px hsl(230deg 40% 10% / 0.5),
    0 2px 4px hsl(230deg 40% 10% / 0.3)
  `,
  '--shadow-card': `
    0 1px 2px hsl(230deg 40% 10% / 0.4),
    0 2px 8px hsl(230deg 40% 10% / 0.25)
  `
};

/* -------------------------------------------
   🧩 Final Tokens
------------------------------------------- */

export const LIGHT_TOKENS = {
  ...LIGHT_COLORS,
  ...LIGHT_SHADOWS
};

export const DARK_TOKENS = {
  ...DARK_COLORS,
  ...DARK_SHADOWS
};
