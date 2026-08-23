/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF7F0',
          50: '#FFFFFF',
          100: '#FDFCFA',
          200: '#FAF7F0',
          300: '#F3EEE2',
          400: '#EAE2CF',
        },
        ink: {
          DEFAULT: '#1C2224',
          light: '#3D4548',
          muted: '#6B7478',
        },
        aqua: {
          50: '#F2F8F9',
          100: '#E2F0F2',
          200: '#C9E4E8',
          300: '#A9D3D9',
          400: '#7FBCC5',
          500: '#57A0AB',
          600: '#3F818C',
          700: '#336670',
        },
        line: '#E4DFD3',

        // --- Public-frontend "research lab" dark theme ---
        // Additive only: nothing above this line is touched, so the Admin
        // Dashboard (which uses cream/ink/aqua/line) is visually unaffected.
        space: {
          950: '#050708',
          900: '#0A0D10',
          850: '#0E1216',
          800: '#131920',
          700: '#1C242C',
          600: '#2A353F',
        },
        mist: {
          100: '#F3F6F7',
          300: '#C7D0D3',
          500: '#8A969B',
        },
        signal: {
          300: '#8FD8EA',
          400: '#5EC3DE',
          500: '#38A9C7',
          600: '#2A87A0',
        },
        phase: {
          400: '#9C9FE8',
          500: '#7B7FD1',
        },
        linedark: 'rgba(243,246,247,0.09)',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(28,34,36,0.04), 0 8px 24px -8px rgba(28,34,36,0.08)',
        card: '0 1px 3px rgba(28,34,36,0.05), 0 12px 32px -12px rgba(28,34,36,0.10)',
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.85' },
        },
        driftY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        pulseSlow: 'pulseSlow 4s ease-in-out infinite',
        driftY: 'driftY 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
