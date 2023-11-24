/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    urlImports: [
      "https://jsonplaceholder.typicode.com",
      "http://worldtimeapi.org/api",
    ],
  },
};

module.exports = nextConfig;
