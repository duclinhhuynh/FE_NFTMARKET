import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1item',
        md: '1.5rem',
        lg: '2rem'
      }
    }
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: "#4c5773",
          secondary: "#0072f5",
        }
      },
      dark: {
        colors: {
          primary: "#FFD34E",
          secondary: "#0072f5",
        }
      },
      // modern: {
      //   colors: {
      //     primary: "#4c5773",
      //     secondary: "#0072f5",
      //     background:"#F4E8D1"
      //   }
      // }
    },
    }
  )],
};
export default config;
