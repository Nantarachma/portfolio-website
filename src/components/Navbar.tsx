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
					? 'fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/30 shadow-lg z-50'
					: 'bg-white/95 shadow-sm'
			} transition-all duration-500`}>
			<div className='absolute inset-0 bg-gradient-to-r from-blue-50/40 to-indigo-50/40 opacity-50'></div>

			{/* Top border accent */}
			<div
				className={`h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 ${
					isScrolled ? 'opacity-100' : 'opacity-0'
				} transition-opacity duration-500`}></div>

			<nav className='container mx-auto px-4 py-4 flex justify-between items-center relative'>
				{/* Logo / Brand with animated gradient */}
				<div className='flex items-center relative group'>
					<div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-0 blur group-hover:opacity-30 transition duration-300'></div>
					<Link href='/' className='relative px-2 py-1 rounded-md'>
						<span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
							Rachmananta
						</span>
						<span className='text-xl font-medium text-gray-700 hidden sm:inline'> Portfolio</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className='hidden md:flex items-center space-x-1'>
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`relative px-4 py-2 rounded-lg group transition-all duration-300 ${
									isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'
								}`}>
								{/* Active background indicator */}
								{isActive && <span className='absolute inset-0 bg-blue-50 rounded-lg'></span>}

								{/* Text content */}
								<span className='relative'>{item.name}</span>

								{/* Animated underline */}
								<span
									className={`absolute bottom-1 left-1/2 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-1/2 transition-all duration-300 rounded-full ${
										isActive ? 'w-12' : 'w-0 group-hover:w-12'
									}`}></span>
							</Link>
						);
					})}
				</div>

				{/* Mobile Menu Button - Enhanced */}
				<button
					type='button'
					className='md:hidden relative w-10 h-10 flex items-center justify-center text-gray-600 z-20'
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Toggle menu'>
					<div className='absolute w-5 h-5'>
						<span
							className={`absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
								mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
							}`}></span>

						<span
							className={`absolute h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
								mobileMenuOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'
							}`}></span>

						<span
							className={`absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
								mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
							}`}></span>
					</div>
				</button>
			</nav>

			{/* Mobile Navigation - Animated slide down */}
			<div
				className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/30 shadow-lg transform origin-top transition-all duration-300 ${
					mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
				}`}>
				<div className='container mx-auto px-4 py-2 space-y-1'>
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
									isActive
										? 'bg-blue-50 text-blue-600 font-medium'
										: 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
								}`}
								onClick={() => setMobileMenuOpen(false)}>
								{/* Icon placeholder - you can add actual icons here */}
								<span
									className={`mr-3 w-5 h-5 rounded-full flex items-center justify-center ${
										isActive ? 'bg-blue-100' : 'bg-gray-100'
									}`}>
									<span
										className={`block w-1.5 h-1.5 rounded-full ${
											isActive ? 'bg-blue-500' : 'bg-gray-400'
										}`}></span>
								</span>
								{item.name}
							</Link>
						);
					})}

					{/* Mobile CTA button */}
					<div className='pt-2 pb-3'>
						<Link
							href='/contact'
							className='block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-sm hover:shadow-md transition-all duration-300'
							onClick={() => setMobileMenuOpen(false)}>
							Get In Touch
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
