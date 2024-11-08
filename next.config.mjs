/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["salmon-sophisticated-alligator-592.mypinata.cloud"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
