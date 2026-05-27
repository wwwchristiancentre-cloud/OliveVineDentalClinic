/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: '#2D3B2D',
          light: '#4A5D4A',
          dark: '#1A221A',
          deep: '#233323',
        },
        gold: {
          DEFAULT: '#C9A962',
          warm: '#D4AF37',
        },
        clinical: {
          white: '#FAFAFA',
          slate: '#F5F5F5',
        },
        charcoal: '#1A1A1A',
        cream: '#FAF8F5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}
