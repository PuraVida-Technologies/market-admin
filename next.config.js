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
