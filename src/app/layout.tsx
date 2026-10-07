import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Bangers } from 'next/font/google';
import './globals.css';
import './webverse.css';
import './sc-load.css';
import Navbar from '@/components/Navbar';
import ScrollEffects from '@/components/effects/ScrollEffects';
import ScrollCraftMount from '@/components/effects/ScrollCraftMount';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';
import { getPortfolioContent } from '@/lib/portfolio/repository';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-plus-jakarta',
	display: 'swap',
});

/* Comic display face — Spider-Verse title lettering (all headings). */
const bangers = Bangers({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-bangers',
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
	const { profile } = await getPortfolioContent();

	return (
		<html lang='en' suppressHydrationWarning className={`${plusJakarta.variable} ${bangers.variable}`}>
			<body
				className={`${plusJakarta.className} flex min-h-screen flex-col bg-slate-50 text-slate-950 antialiased`}>
				<script src='/scrollcraft.js' defer />
				{/* Anti-empty-page: if the runtime hasn't booted within 2.5s
				    (blocked/slow network), reveal everything statically. */}
				<script
					dangerouslySetInnerHTML={{
						__html:
							'window.__scT=Date.now();window.__scW=setInterval(function(){if(window.ScrollCraft){clearInterval(window.__scW);}else if(Date.now()-window.__scT>2500){clearInterval(window.__scW);document.documentElement.classList.add("sc-timeout");}},400);',
					}}
				/>
				<noscript>
					<style>{`[data-sc-in],[data-sc-stagger]>*,[data-sc-cue]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
				</noscript>
				<span data-sc-progress aria-hidden='true' />
				<a
					href='#main-content'
					className='sr-only fixed left-4 top-4 z-[60] rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2'>
					Skip to content
				</a>
				<Navbar profile={profile} />
				<main id='main-content' className='flex-1'>
					{children}
				</main>
				<Footer profile={profile} />
				<ScrollEffects />
				<ScrollCraftMount />
				<SmoothScroll />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
