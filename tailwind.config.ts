import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        fontFamily: {
            script: ["Courier", "Courier New", "monospace"],
            quote: [
                "Cambria",
                "Cochin",
                "Georgia",
                "Times",
                "Times New Roman",
                "serif",
            ],
            montserrat: ["Montserrat", "sans-serif"],
            inter: ["Inter", "sans-serif"],
            mono: [
                "SFMono-Regular",
                "Fira Code",
                "monospace",
                "Menlo",
                "Liberation Mono",
                "Consolas",
                "ui-monospace",
            ],
        },
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            height: {
                half: "50%",
                title: "60px",
                main: "calc(100dvh - 60px)",
            },
            maxHeight: {
                half: "50%",
                main: "calc(100dvh - 60px)",
            },
            minHeight: {
                half: "50%",
                main: "calc(100dvh - 60px)",
            },
            width: {
                half: "50%",
                menu: "20vw",
                main: "calc(100vw - 20vw)",
                note: "40vw",
            },
            maxWidth: {
                half: "50%",
                menu: "20vw",
                screen: "100vw",
                main: "calc(100vw - 20vw)",
                note: "40vw",
            },
            minWidth: {
                half: "50%",
                menu: "20vw",
                screen: "100vw",
                main: "calc(100vw - 20vw)",
                note: "40vw",
            },
            colors: {
                border: "hsl(var(--border))",
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
                danger: {
                    DEFAULT: "hsl(var(--danger))",
                    foreground: "hsl(var(--danger-foreground))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
            },
            borderRadius: {
                full: "9999px",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
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
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
export default config;
