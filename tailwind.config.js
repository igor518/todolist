/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js,jsx,ts,tsx}",
    "./templates/**/*.{html,twig}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./views/**/*.twig",
  ],
  safelist: [
    'py-6',
    'py-12',
    'py-24',
    'py-[24px]'
  ],
  theme: {
    /* extend: {
      colors: {
        primary: "#1A237E", 
        secondary: "#03A9F4",
        dark: "#0F172A", 
        light: "#F8FAFC", 
        textMain: "#1E293B", 
        textGray: "#64748B",
      },
    },*/
  },
  plugins: [],
}
