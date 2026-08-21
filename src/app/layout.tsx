import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { profile } from '@/data/profile';

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-plus-jakarta',
	display: 'swap',
});

const siteTitle = `${profile.name} | ${profile.role}`;

export const metadata: Metadata = {
	title: {
		default: siteTitle,
		template: `%s | ${profile.name}`,
	},
	description: `Portfolio of ${profile.name}. ${profile.intro}`,
	keywords: [
		'Machine Learning',
		'Computer Vision',
		'Android Development',
		'Software Engineering',
		profile.name,
	],
	authors: [{ name: profile.name }],
	creator: profile.name,
	openGraph: {
		title: siteTitle,
		description: profile.intro,
		type: 'website',
		locale: 'en_US',
		siteName: profile.name,
	},
	twitter: {
		card: 'summary',
		title: siteTitle,
		description: profile.intro,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body
				className={`${plusJakarta.className} flex min-h-screen flex-col bg-slate-50 text-slate-950 antialiased`}>
				<a
					href='#main-content'
					className='sr-only fixed left-4 top-4 z-[60] rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
					Skip to content
				</a>
				<Navbar />
				<main id='main-content' className='flex-1'>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
