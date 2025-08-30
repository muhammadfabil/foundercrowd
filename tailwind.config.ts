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
          // other emerald shades as needed
        }
      }
    },
  },
  plugins: [],
}

export default config