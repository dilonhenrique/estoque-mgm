const { nextui } = require("@nextui-org/react");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { ...colors.emerald, DEFAULT: colors.emerald[500] },
            secondary: { ...colors.blue, DEFAULT: colors.blue[500] },
            focus: colors.emerald[500],
          },
        },
        dark: {
          colors: {
            primary: { ...colors.emerald, DEFAULT: colors.emerald[500] },
            secondary: { ...colors.blue, DEFAULT: colors.blue[500] },
            focus: colors.emerald[500],
          },
        },
      },
    }),
  ],
};
