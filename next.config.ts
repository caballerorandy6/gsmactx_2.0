/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo/**", // Más específico: solo fotos
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/profile/picture/**",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
        pathname: "/maps/api/place/photo/**",
      },
      // ... otros dominios seguros
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Aumenta el límite a 4MB (puedes poner el valor que necesites)
    },
  },
};

module.exports = nextConfig;
