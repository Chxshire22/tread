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
    domains: ["st3.depositphotos.com", "st.depositphotos.com"],
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
