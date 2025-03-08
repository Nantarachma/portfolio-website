import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Rachmananta Portfolio',
	description: 'Personal portfolio website of Rachmananta Ibnu Fajar',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Navbar />
				<PageTransition>{children}</PageTransition>
				<Footer />
			</body>
		</html>
	);
}
