/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "placeimg.com",
      "www.google.com",
      "storage.googleapis.com",
      "ik.imagekit.io",
      "images.pexels.com",
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  serverRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

module.exports = nextConfig;
