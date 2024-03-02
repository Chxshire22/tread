/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com/",
        port: "",
        pathname: "*",
      },
    ],
    domains: ["st3.depositphotos.com"],
  },
};

export default nextConfig;
