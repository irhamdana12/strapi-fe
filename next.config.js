/** @type {import('next').NextConfig} */
const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const parsed = new URL(url);
const hostname = parsed.hostname;
const port = parsed.port || undefined;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname,
        port,
      },
      {
        protocol: "https",
        hostname,
        port,
      },
    ],
  },
};

module.exports = nextConfig;
