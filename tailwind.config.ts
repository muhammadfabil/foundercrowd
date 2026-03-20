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
          50:  '#eef1ff',
          100: '#dde3ff',
          200: '#b9c5ff',
          300: '#8fa1ff',
          400: '#7089ff',
          500: '#5271ff',
          600: '#3d5ae0',
          700: '#2d49c8',
          800: '#1e34a8',
          900: '#152680',
        },
        amber: {
          50:  '#eef1ff',
          100: '#dde3ff',
          200: '#b9c5ff',
          300: '#8fa1ff',
          400: '#7089ff',
          500: '#5271ff',
          600: '#3d5ae0',
          700: '#2d49c8',
          800: '#1e34a8',
          900: '#152680',
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
