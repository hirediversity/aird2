/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AIRTABLE_API_URL: process.env.AIRTABLE_API_URL,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY
  }
}

module.exports = nextConfig
