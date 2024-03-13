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
      // {
      //   protocol: "https",
      //   hostname: "firebasestorage.googleapis.com",
      //   port: "",
      //   pathname: "*",
      // },
    ],
    domains: [
      "firebasestorage.googleapis.com",
      "st3.depositphotos.com",
      "st.depositphotos.com",
      "upload.wikimedia.org",
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.node = {
  //       net: "empty",
  //     };
  //   }

  //   return config;
  // },
};

export default nextConfig;
