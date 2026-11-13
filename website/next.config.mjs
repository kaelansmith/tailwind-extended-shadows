import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The package is its own git repo, so Next cannot find the pnpm workspace root.
  outputFileTracingRoot: fileURLToPath(
    new URL("../../../../", import.meta.url),
  ),
  // Portless serves the dev server at https://extended-shadows.localhost
  allowedDevOrigins: ["*.localhost", "*.ts.net", "*.*.ts.net"],
  // Docs pages read default theme values from the plugin at build time.
  serverExternalPackages: ["tailwind-extended-shadows", "tailwindcss"],
};

export default nextConfig;
