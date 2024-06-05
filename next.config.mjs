/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "img.clerk.com"
            },
            {
                protocol: 'https',
                hostname: "astute-quail-338.convex.cloud",
            }
        ]
    }
};


export default nextConfig;
