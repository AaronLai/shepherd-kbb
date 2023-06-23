/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}

module.exports = nextConfig


