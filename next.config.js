/** @type {import('next').NextConfig} */

// PWA config and import in Next.js
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
