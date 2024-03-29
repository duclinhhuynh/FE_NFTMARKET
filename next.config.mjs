/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['gateway.pinata.cloud'], // Add your image domains here
    },
    webpack: (config) => {
        config.resolve.fallback = { tls: false };
    
        return config;
      },
};

export default nextConfig;
