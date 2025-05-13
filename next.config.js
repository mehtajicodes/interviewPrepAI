/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Add any other domains you're using for images
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_CIVIC_CLIENT_ID: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID,
  },
}

module.exports = nextConfig 