/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('./banner.jpg')",
      },

      colors: {
        rosadito: "#eeaeca",
        azulito: "#94bbe9",
        grisecito: "#afafaf",
      },
      screens: {
        sm: "359px",
        md: "562px",
        lg: "627px",
        xl: "1600px",
      },
      minWidth: {
        320: "320px",
      },
    },
  },
  plugins: [],
};
