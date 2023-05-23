/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: 20,
      },
      colors: colors.neutral,
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
