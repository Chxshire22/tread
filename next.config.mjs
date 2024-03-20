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
    domains: [
      "firebasestorage.googleapis.com",
      "st3.depositphotos.com",
      "st.depositphotos.com",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;
