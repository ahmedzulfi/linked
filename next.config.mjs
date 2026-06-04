/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    cpus: 2, // Limit CPU worker processes to reduce memory usage on multi-core systems
  },
};

export default nextConfig;
