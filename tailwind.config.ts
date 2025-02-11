import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0EA5E9",
        primaryLight: "#E0F2FE",
        primaryDark: "#0C4A6E",
      },
      screens: {
        sm: "580px",
        md: "600px",
        lg: "980px",
        xl: "1380px",
        xxl: "1600px",
      },
    },
  },
  plugins: [],
} satisfies Config;
