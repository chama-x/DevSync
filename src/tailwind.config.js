/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        gray: {
          50: "hsl(var(--color-gray-50))",
          100: "hsl(var(--color-gray-100))",
          200: "hsl(var(--color-gray-200))",
          300: "hsl(var(--color-gray-300))",
          400: "hsl(var(--color-gray-400))",
          500: "hsl(var(--color-gray-500))",
          600: "hsl(var(--color-gray-600))",
          700: "hsl(var(--color-gray-700))",
          800: "hsl(var(--color-gray-800))",
          900: "hsl(var(--color-gray-900))",
        },
        blue: {
          50: "hsl(var(--color-blue-50))",
          100: "hsl(var(--color-blue-100))",
          500: "hsl(var(--color-blue-500))",
          600: "hsl(var(--color-blue-600))",
          700: "hsl(var(--color-blue-700))",
        },
        purple: {
          50: "hsl(var(--color-purple-50))",
          100: "hsl(var(--color-purple-100))",
          600: "hsl(var(--color-purple-600))",
          700: "hsl(var(--color-purple-700))",
        },
        indigo: {
          50: "hsl(var(--color-indigo-50))",
          100: "hsl(var(--color-indigo-100))",
        },
        emerald: {
          50: "hsl(var(--color-emerald-50))",
          100: "hsl(var(--color-emerald-100))",
          200: "hsl(var(--color-emerald-200))",
          500: "hsl(var(--color-emerald-500))",
          600: "hsl(var(--color-emerald-600))",
          700: "hsl(var(--color-emerald-700))",
        },
        amber: {
          200: "hsl(var(--color-amber-200))",
          400: "hsl(var(--color-amber-400))",
          700: "hsl(var(--color-amber-700))",
        },
        orange: {
          200: "hsl(var(--color-orange-200))",
          500: "hsl(var(--color-orange-500))",
          700: "hsl(var(--color-orange-700))",
        },
        red: {
          200: "hsl(var(--color-red-200))",
          500: "hsl(var(--color-red-500))",
          700: "hsl(var(--color-red-700))",
        },
        slate: {
          200: "hsl(var(--color-slate-200))",
          300: "hsl(var(--color-slate-300))",
          400: "hsl(var(--color-slate-400))",
          500: "hsl(var(--color-slate-500))",
          600: "hsl(var(--color-slate-600))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      scale: {
        96: "0.96",
        98: "0.98",
      },
      opacity: {
        15: "0.15",
      },
      blur: {
        "12px": "12px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
}
