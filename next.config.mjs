/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dominos.co.in" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
};

export default nextConfig;
