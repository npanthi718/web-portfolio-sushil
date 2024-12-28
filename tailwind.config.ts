import type { Config } from "tailwindcss";

// Separate color configuration for better maintainability
const colors = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
};

// Separate animation configuration
const animations = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    slideUp: {
      "0%": { transform: "translateY(100%)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    float: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
    glow: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: "0.5" },
    },
    scale: {
      "0%": { transform: "scale(0.95)" },
      "100%": { transform: "scale(1)" },
    },
    shimmer: {
      "100%": { transform: "translateX(100%)" },
    },
    bounce: {
      "0%, 100%": { transform: "translateY(-5%)" },
      "50%": { transform: "translateY(0)" },
    },
    pulse: {
      "0%, 100%": { opacity: "1" },
      "50%": { opacity: ".5" },
    },
    wave: {
      "0%": { transform: "rotate(0.0deg)" },
      "10%": { transform: "rotate(14deg)" },
      "20%": { transform: "rotate(-8deg)" },
      "30%": { transform: "rotate(14deg)" },
      "40%": { transform: "rotate(-4deg)" },
      "50%": { transform: "rotate(10.0deg)" },
      "60%": { transform: "rotate(0.0deg)" },
      "100%": { transform: "rotate(0.0deg)" },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    slideUp: "slideUp 0.5s ease-out",
    fadeIn: "fadeIn 0.5s ease-out",
    float: "float 3s ease-in-out infinite",
    glow: "glow 2s ease-in-out infinite",
    scale: "scale 0.3s ease-out",
    shimmer: "shimmer 2s linear infinite",
    bounce: "bounce 2s infinite",
    pulse: "pulse 3s infinite",
    wave: "wave 2.5s ease-in-out infinite",
  },
};

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors,
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      ...animations,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;