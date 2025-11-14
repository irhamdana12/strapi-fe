/** @type {import('next').NextConfig} */
const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const parsed = new URL(url);
const hostname = parsed.hostname;
const port = parsed.port || undefined;
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**"
      },
      //       {
      //   protocol: "https",
      //   hostname: "your-strapi-domain.com", // Ganti dengan domain production
      //   pathname: "/uploads/"
      // },
    ],
  },
};

module.exports = nextConfig;
