/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AIRTABLE_API_URL: 'https://api.airtable.com/v0/appjdAtO3BEIEM36b/%ED%86%B5%ED%95%A9/',
    AIRTABLE_API_KEY: "keyKAqTJ3bNMIGK2O"
  }
}

module.exports = nextConfig
