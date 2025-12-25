/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'legacy-blue': '#00d2ff',
        'legacy-bg': '#121212',
      },
      letterSpacing: {
        'extra-wide': '0.15em',
      },
      fontFamily: {
        'barlow': ['var(--font-barlow)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

