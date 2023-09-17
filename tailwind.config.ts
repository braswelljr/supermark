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
        serif: ['var(--font-satoshi)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono]
      },
      colors: {
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
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
            boxShadow: `0 0 2px ${first}, 0 0 2px ${last}`
          }
        }
      }

      // add utilities
      addUtilities(neonUtilities)
    })
  ]
}

export default config
