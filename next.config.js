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
      process.env.BASE_URL,
      "placeimg.com",
      "www.google.com",
      "storage.googleapis.com",
      "ik.imagekit.io",
      "images.pexels.com",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
