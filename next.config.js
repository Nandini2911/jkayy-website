/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.18"],
  images: {
    qualities: [75, 76, 82, 90],
  },
};

module.exports = nextConfig;