import defaultConfig from '@carbazza/ui/tailwind.config'
import { merge } from '@carbazza/utilaries'
import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue,mdx,md}'],
  darkMode: 'class',
  theme: {
    screens: {
      xxs: '320px',
      xs: '375px',
      xsm: '425px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-jost)', ...defaultTheme.fontFamily.sans],
        serif: ["'Lobster'", ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-zen-dots)', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        primary: {
          100: '#ffe4d8',
          200: '#ffd3be',
          300: '#ffc1a5',
          400: '#ffb08b',
          500: '#ff8d58',
          600: '#ff7c3f',
          700: '#ff6a25',
          800: '#ff590c',
          900: '#f14c00'
        },
        brown: {
          900: '#382519',
          800: '#462e20',
          700: '#63412c',
          600: '#7f5439',
          500: '#8d5d3f',
          400: '#9b6646',
          300: '#b37a56',
          200: '#c09072',
          100: '#c69b81',
          50: '#d9bcab',
          20: '#F3E8E2'
        }
      },
      fontSize: {
        xs: ['0.65rem', '0.75rem'],
        xsm: ['0.75rem', '1rem']
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        blink: {
          '0%, 100%': { opacity: '0' },
          '25%': { opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        blink: 'blink 1s infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    // direct child selector variant
    plugin(function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('not-first', '& > *:not(:first-child)')
      addVariant('not-last', '& > *:not(:last-child)')
    }),
    // neon shadows
    plugin(({ addUtilities, theme }) => {
      const neonUtilities: { [key: string]: { boxShadow: string } } = {}
      const colors = theme('colors')

      // loop through colors
      for (const color in colors) {
        // check if color is an object
        if (typeof colors[color] === 'object') {
          // get the color shades
          const first = colors[color][100]
          const last = colors[color][900]

          // loop through shades
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${first}, 0 0 10px ${last}`
          }
        }
      }

      // add utilities
      addUtilities(neonUtilities)
    })
  ]
}
const mergedConfig = merge(defaultConfig, config)

export default mergedConfig
