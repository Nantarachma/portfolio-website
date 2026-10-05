import type { NextConfig } from 'next';

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
	? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
	: undefined;

const nextConfig: NextConfig = {
	redirects: async () => [
		{ source: '/about', destination: '/#about', permanent: true },
		{ source: '/contact', destination: '/#contact', permanent: true },
		{ source: '/research', destination: '/#research', permanent: true },
	],
	images: {
		remotePatterns: supabaseHostname
			? [{ protocol: 'https', hostname: supabaseHostname, pathname: '/storage/v1/object/public/**' }]
			: [],
	},
};

export default nextConfig;
