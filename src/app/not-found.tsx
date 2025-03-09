import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[80vh] px-4 relative overflow-hidden'>
			{/* Animated background blobs */}
			<div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse'></div>
			<div
				className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse'
				style={{ animationDelay: '1s' }}></div>

			<div className='relative z-10 text-center'>
				{/* Animated 404 text */}
				<h1 className='text-9xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-xy'>
					404
				</h1>

				{/* Inline Space-themed SVG */}
				<div className='w-40 h-40 mx-auto relative mb-6'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 200 200'
						className='w-full h-full animate-float'>
						{/* Planet */}
						<circle cx='100' cy='100' r='40' fill='url(#planetGradient)' />

						{/* Planet rings */}
						<ellipse
							cx='100'
							cy='100'
							rx='70'
							ry='20'
							fill='none'
							stroke='url(#ringGradient)'
							strokeWidth='4'
							transform='rotate(-20, 100, 100)'
						/>

						{/* Small stars */}
						<circle cx='40' cy='40' r='2' fill='#fff' className='animate-twinkle' />
						<circle cx='160' cy='30' r='3' fill='#fff' className='animate-twinkle' />
						<circle cx='180' cy='100' r='2' fill='#fff' className='animate-twinkle' />
						<circle cx='50' cy='160' r='2' fill='#fff' className='animate-twinkle' />
						<circle cx='130' cy='170' r='3' fill='#fff' className='animate-twinkle' />

						{/* Shooting star */}
						<path d='M30,50 L45,35' stroke='#fff' strokeWidth='2' strokeLinecap='round'>
							<animate attributeName='opacity' values='0;1;0' dur='3s' repeatCount='indefinite' />
						</path>

						{/* Gradients */}
						<defs>
							<linearGradient id='planetGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
								<stop offset='0%' stopColor='#4c6ef5' />
								<stop offset='100%' stopColor='#9333ea' />
							</linearGradient>
							<linearGradient id='ringGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
								<stop offset='0%' stopColor='#a78bfa' />
								<stop offset='100%' stopColor='#60a5fa' />
							</linearGradient>
						</defs>
					</svg>
				</div>

				<h2 className='text-2xl font-semibold mb-4'>Halaman Tidak Ditemukan</h2>
				<p className='text-gray-600 text-center mb-8 max-w-md mx-auto'>
					Sepertinya Anda tersesat di luar angkasa. Halaman yang Anda cari tidak ada di orbit
					website ini.
				</p>

				{/* Styled button with hover effect */}
				<Link
					href='/'
					className='group relative px-6 py-3 font-medium text-white rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-block'>
					{/* Animated gradient background */}
					<div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-purple-700 animate-gradient-xy'></div>

					{/* Button shine effect */}
					<div className='absolute -inset-full top-0 block w-1/2 h-full z-5 transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine'></div>

					{/* Text and icon */}
					<span className='relative flex items-center'>
						<span>Kembali ke Beranda</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-4 w-0 transition-all duration-300 group-hover:w-4 ml-0 group-hover:ml-2 opacity-0 group-hover:opacity-100'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</span>
				</Link>
			</div>
		</div>
	);
}
