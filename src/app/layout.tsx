import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Portfolio Nantarachmasaya',
	description: 'Portfolio website showcasing my projects and skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='id'>
			<body className={inter.className}>
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main className='flex-grow'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
