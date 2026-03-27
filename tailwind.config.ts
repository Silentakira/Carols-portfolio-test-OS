import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coquette: {
          pink: '#FFD6E0',
          pinkDark: '#FFB3C1',
          pinkLight: '#FFE8EE',
          white: '#FFF5F7',
          cream: '#FFF9FA',
          rose: '#E8B4B8',
          shadow: 'rgba(255, 179, 193, 0.3)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      boxShadow: {
        'coquette': '0 8px 32px var(--color-coquette-shadow)',
        'coquette-sm': '0 4px 16px var(--color-coquette-shadow)',
        'coquette-lg': '0 16px 48px var(--color-coquette-shadow)',
      },
    },
  },
  plugins: [],
};
export default config;
