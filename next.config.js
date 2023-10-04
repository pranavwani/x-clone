/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yt3.googleusercontent.com', 'lh3.googleusercontent.com', 'x-clone.s3.ap-south-1.amazonaws.com']
  },
  env: {
    NEXT_PUBLIC_X_CLONE_API_ENDPOINT: process.env.NEXT_PUBLIC_X_CLONE_API_ENDPOINT
  }
}

module.exports = nextConfig
