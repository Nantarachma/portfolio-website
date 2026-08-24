import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { draftMode } from 'next/headers';
import { getAdmin } from '@/lib/auth/admin';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { Analytics } from '@vercel/analytics/next';

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-plus-jakarta',
	display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
	const { profile } = await getPortfolioContent();
	const siteTitle = `${profile.name} | ${profile.role}`;

	return {
		title: { default: siteTitle, template: `%s | ${profile.name}` },
		description: `Portfolio of ${profile.name}. ${profile.intro}`,
		keywords: ['Machine Learning', 'Computer Vision', 'Android Development', 'Software Engineering', profile.name],
		authors: [{ name: profile.name }],
		creator: profile.name,
		openGraph: { title: siteTitle, description: profile.intro, type: 'website', locale: 'en_US', siteName: profile.name },
		twitter: { card: 'summary', title: siteTitle, description: profile.intro },
		robots: { index: true, follow: true },
	};
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const [{ profile }, preview] = await Promise.all([getPortfolioContent(), draftMode()]);
	const hasAuthorizedPreview = preview.isEnabled && Boolean(await getAdmin());

	return (
		<html lang='en'>
			<body
				className={`${plusJakarta.className} flex min-h-screen flex-col bg-slate-50 text-slate-950 antialiased`}>
				<a
					href='#main-content'
					className='sr-only fixed left-4 top-4 z-[60] rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
					Skip to content
				</a>
				{hasAuthorizedPreview ? (
					<div className='bg-amber-300 px-4 py-2 text-center text-sm font-bold text-slate-950'>
						Preview draft aktif. Perubahan ini belum dipublikasikan.{' '}
						<a href='/admin/preview/disable' className='underline underline-offset-2'>Keluar dari preview</a>
					</div>
				) : null}
				<Navbar profile={profile} />
				<main id='main-content' className='flex-1'>
					{children}
				</main>
				<Footer profile={profile} />
				<Analytics />
			</body>
		</html>
	);
}
