import type { Config } from "tailwindcss";

import generated from "@tailwindcss/typography";

const beige = "#5a4d3d";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            backgroundColor: {
                beige,
            },
            borderColor: {
                beige
            },
            textColor: {
                beige,
            },
            screens: {
                'nb': '360px',
            },
            animation: {
                fade: 'fadeOut 0.25s ease-in-out',
            },
            keyframes: () => ({
                fadeOut: {
                    '0%': { opacity: "0" },
                    '100%': { opacity: "1" },
                },
            }),
        },
    },
    plugins: [
        generated,
    ],
};
export default config;
