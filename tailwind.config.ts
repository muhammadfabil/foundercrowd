import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['var(--font-figtree)'],
        roboto: ['var(--font-roboto)'],
        'wix-madefor': ['var(--font-wix-madefor)'],
      },
      colors: {
        emerald: {
          400: '#34d399',
          // tambahkan shade lain kalau perlu
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}

export default config
