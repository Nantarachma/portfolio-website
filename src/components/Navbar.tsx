'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Contact', href: '/contact' },
	];

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`${
				isScrolled
					? 'fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-lg z-50'
					: 'bg-white shadow-sm'
			} transition-all duration-300`}>
			<nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
				{/* Logo / Brand */}
				<div className='flex items-center'>
					<Link href='/' className='text-xl font-bold text-blue-600'>
						Rachmananta Next Portfolio
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className='hidden md:flex space-x-8'>
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={`${
								pathname === item.href
									? 'text-blue-600 font-medium'
									: 'text-gray-600 hover:text-blue-600'
							} transition-colors`}>
							{item.name}
						</Link>
					))}
				</div>

				{/* Mobile Menu Button */}
				<button
					type='button'
					className='md:hidden text-gray-600'
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
					<span className='sr-only'>Open main menu</span>
					{mobileMenuOpen ? (
						<svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					) : (
						<svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					)}
				</button>
			</nav>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<div className='md:hidden bg-white border-t'>
					<div className='container mx-auto px-4 py-2 space-y-1'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`${
									pathname === item.href ? 'text-blue-600 font-medium' : 'text-gray-600'
								} block py-2`}
								onClick={() => setMobileMenuOpen(false)}>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
