import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = {
    experimental: {
        dynamicIO: true,
    },
    transpilePackages: ["next-mdx-remote"],
    /* config options here */
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);

export default nextConfig;
