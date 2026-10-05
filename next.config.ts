import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	redirects: async () => [
		{ source: '/about', destination: '/#about', permanent: true },
		{ source: '/contact', destination: '/#contact', permanent: true },
		{ source: '/research', destination: '/#research', permanent: true },
	],
};

export default nextConfig;
