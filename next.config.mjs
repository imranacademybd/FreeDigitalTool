/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    esmExternals: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Allows any hostname
        port: "", // No specific port
        pathname: "**", // Allows any path
        search: "", // No specific search parameters
      },
      {
        protocol: "https",
        hostname: "**", // Allows any hostname
        port: "", // No specific port
        pathname: "**", // Allows any path
        search: "", // No specific search parameters
      },
    ],
  },
  env: {
    IPINFO_TOKEN: process.env.IPINFO_TOKEN,
  },
};

export default nextConfig;
