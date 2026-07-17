import type { NextConfig } from "next";

// When building on GitHub Actions for GitHub Pages, the site is served from
// https://<user>.github.io/Miracle_Clickz/ instead of the domain root, so we
// need a basePath/assetPrefix. Locally (npm run dev / a plain build) this
// stays empty so nothing changes for local development.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "Miracle_Clickz";
const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: "export", // static HTML export, required for GitHub Pages
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true, // next/image optimization API isn't available on static hosts
  },
};

export default nextConfig;
