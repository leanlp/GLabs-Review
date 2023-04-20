const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      // add custom colors here
      colors: {
        participant: {
          light: "#5BA7E2",
          dark: "#4793CE",
          secondary: "#1F6BC6",
        },
        creator: {
          light: "#6456DC",
          dark: "#574BBC",
        },
      },
      // add gradient colors here
      backgroundImage: (theme) => ({
        "participate-gradient": `radial-gradient(50% 50% at 50% 50%, ${theme(
          "colors.participant.light"
        )} 24.48%, ${theme("colors.participant.dark")} 100%)`,
        "creator-gradient": `radial-gradient(50% 50% at 50% 50%, ${theme(
          "colors.creator.light"
        )} 0%, ${theme("colors.creator.dark")} 100%)`,
        "row-gradient": `radial-gradient(40.97% 69.41% at 50% 115.29%, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0) 100%)`,
        "nfts-gradient": `radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.33) 100%)`,
        "onHover-gradient": `radial-gradient(50% 2450% at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)`,
        card: `url("/images/card-background.png")`,
        "wallet-bg":
          "radial-gradient(50% 2450% at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%)",
      }),
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const rafflesComponents = {
        // add custom components here as classes
        ".page": {
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 6rem)",
          // alignItems: "center",
          // justifyContent: "center",
        },
        ".clip-none": {
          clipPath: "circle(0% at top right)",
        },
        ".clip-full": {
          clipPath: "circle(250% at top right)",
        },
      };
      addComponents(rafflesComponents);
    }),
    require("tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
