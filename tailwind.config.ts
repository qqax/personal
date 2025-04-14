import type {Config} from "tailwindcss";

import generated from "@tailwindcss/typography";

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
            textColor: {
                beige: "#5a4d3d",
            },
            screens: {
                'nb': '360px',
            },
        },
    },
    plugins: [
        generated,
    ],
};
export default config;
