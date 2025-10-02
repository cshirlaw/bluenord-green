/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Keep only this one:
      { source: '/investors/presentations', destination: '/investors/reports', permanent: true },
    ];
  },
};

module.exports = nextConfig;