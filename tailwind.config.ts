import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: theme("fontSize.4xl"),
              fontWeight: theme("fontWeight.bold"),
              color: theme("colors.gray.100"),
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontSize: theme("fontSize.3xl"),
              fontWeight: theme("fontWeight.semibold"),
              color: theme("colors.gray.200"),
              marginBottom: theme("spacing.3"),
            },
            h3: {
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.semibold"),
              color: theme("colors.gray.300"),
              marginBottom: theme("spacing.2"),
            },
            p: {
              marginTop: theme("spacing.2"),
              marginBottom: theme("spacing.2"),
              lineHeight: theme("lineHeight.relaxed"),
            },
            code: {
              fontSize: theme("fontSize.sm"),
              color: theme("colors.purple.400"),
              backgroundColor: theme("colors.gray.900"),
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              padding: theme("spacing.4"),
              borderRadius: theme("borderRadius.lg"),
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.600"),
              paddingLeft: theme("spacing.4"),
              color: theme("colors.gray.300"),
              fontStyle: "italic",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // 添加 typography 插件
  ],
};

export default config;
