/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      'sans-serif': ['Zilla_Slab', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      error: 'rgb(var(--color-error) / <alpha-value>)',
      font: 'rgb(var(--color-font) / <alpha-value>)',
      black: 'rgb(var(--color-black) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      background: 'rgb(var(--color-background) / <alpha-value>)',
      foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
     
    }
  },
  plugins: []
};
