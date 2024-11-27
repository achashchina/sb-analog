import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{html,ts,md,analog,ag}'],
  theme: {
    extend: {
      colors: {
        primary: {
          25: "hsl(264, 100%, 99%)",
          50: "hsl(264, 100%, 98%)",
          100: "hsl(267, 100%, 96%)",
          200: "hsl(268, 95%, 92%)",
          300: "hsl(265, 89%, 86%)",
          400: "hsl(262, 85%, 77%)",
          500: "hsl(260, 77%, 70%)",
          600: "hsl(259, 63%, 59%)",
          700: "hsl(258, 54%, 52%)",
          800: "hsl(256, 48%, 42%)",
          900: "hsl(254, 45%, 34%)",
        },
        gray: {
          25: "hsl(210, 20%, 99%)",
          50: "hsl(210, 24%, 98%)",
          100: "hsl(220, 22%, 96%)",
          200: "hsl(220, 17%, 93%)",
          300: "hsl(216, 16%, 84%)",
          400: "hsl(218, 15%, 65%)",
          500: "hsl(220, 13%, 46%)",
          600: "hsl(215, 18%, 34%)",
          700: "hsl(217, 23%, 27%)",
          800: "hsl(215, 32%, 17%)",
          900: "hsl(221, 43%, 11%)",
        },
        error: {
          25: "hsl(4, 88%, 99%)",
          50: "hsl(4, 88%, 97%)",
          100: "hsl(4, 95%, 94%)",
          200: "hsl(4, 98%, 89%)",
          300: "hsl(4, 96%, 80%)",
          400: "hsl(4, 93%, 69%)",
          500: "hsl(4, 86%, 58%)",
          600: "hsl(4, 74%, 49%)",
          700: "hsl(4, 76%, 40%)",
          800: "hsl(4, 72%, 33%)",
          900: "hsl(8, 65%, 29%)",
        },
        warning: {
          25: "hsl(44, 100%, 98%)",
          50: "hsl(44, 100%, 96%)",
          100: "hsl(44, 98%, 89%)",
          200: "hsl(44, 99%, 77%)",
          300: "hsl(42, 99%, 65%)",
          400: "hsl(39, 98%, 56%)",
          500: "hsl(34, 94%, 50%)",
          600: "hsl(28, 97%, 44%)",
          700: "hsl(22, 92%, 37%)",
          800: "hsl(19, 84%, 31%)",
          900: "hsl(18, 80%, 26%)",
        },
        success: {
          25: "hsl(144, 83%, 98%)",
          50: "hsl(144, 83%, 98%)",
          100: "hsl(141, 82%, 90%)",
          200: "hsl(144, 78%, 80%)",
          300: "hsl(148, 74%, 67%)",
          400: "hsl(150, 66%, 52%)",
          500: "hsl(152, 82%, 39%)",
          600: "hsl(153, 96%, 30%)",
          700: "hsl(155, 96%, 24%)",
          800: "hsl(155, 90%, 20%)",
          900: "hsl(156, 88%, 16%)",
        },
        tertiary: "hsla(220, 13%, 46%, 1)",
        body: "hsla(240, 67%, 5%, 1)",
        accent: "hsla(359, 94%, 65%, 1)",
        card: "#1E1E2D",
        'blue-gradient': '#45a0f5',
        'green-gradient': '#26e3c2'
      },
      fontSize: {
        "display-xxl": "4.5rem",
        "display-xl": "3.75rem",
        "display-lg": "3rem",
        "display-md": "2.25rem",
        "display-sm": "1.875rem",
        "display-xs": "1.5rem",
        xl: "1.25rem",
        lg: "1.125rem",
        md: "1rem",
        sm: "0.875rem",
        xs: "0.75rem",
        xss: "0.625rem",
      },
      lineHeight: {
        lh: "100%",
      },
      // container: {
      //   fluid: '100%',
      //   sm: '40rem',
      //   md: '48rem',
      //   lg: '64rem',
      //   xl: '80rem',
      // },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.50rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
        navbar: "77px",
        main: "calc(100% - 77px)",
        sidebar: "280px",
        projects: "calc(100% - 56px)",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        xxl: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
        xxxl: "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1280px",
        largeDesktop: "1920px",
      },
    
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
