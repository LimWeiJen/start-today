/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_SECRET: process.env.API_SECRET,
  }
}
