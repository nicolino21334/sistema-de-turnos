/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondo: "#0F172A", //fondo claro crema
        verde: {
          900: "#182c25", //verde muy oscuro (ideal para heders/footers)
          800: "#17392b", //verde oscuro
          700: "#13442f", //verde medio
          600: "#0d5332", //verde claro (botones claros)
        },
      },
    },
  },
  plugins: [],
};
