import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-plus-jakarta',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Rachmananta Portfolio',
	description: 'Personal portfolio website of Rachmananta Ibnu Fajar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={plusJakarta.className}>
				<Navbar />
				<PageTransition>{children}</PageTransition>
				<Footer />
			</body>
		</html>
	);
}
