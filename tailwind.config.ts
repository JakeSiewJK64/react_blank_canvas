/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        1: 1,
        2: 2,
      },
      colors: {
        destructive: "#ff0000",
        danger: "#ff0000",
        success: "#40c057",
        kt: {
          0: "#B0F2FB",
          1: "#9DEFFA",
          2: "#76E8F9",
          3: "#4FE2F7",
          4: "#28DBF5",
          5: "#0BCDE9",
          6: "#09ABC2",
          7: "#077C8C",
          8: "#044C57",
        },
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn .5s ease-out",
        fadeOut: "fadeOut 1s ease-out",
        slideIn: "slideIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
