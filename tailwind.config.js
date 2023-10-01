/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        "with-nav": "calc(100vh - 64px)",
      },
    },
  },
  plugins: [],
};
