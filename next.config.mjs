/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'zjspbteirzhczzyttnhy.supabase.co',
            }
        ]
    }
};

export default nextConfig;
