import Link from 'next/link';

export default function NotFound() {
	return (
		<section className='site-container flex min-h-[65vh] max-w-2xl flex-col justify-center py-20'>
			<p className='eyebrow'>404</p>
			<h1 className='mt-4 text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl'>
				This page could not be found.
			</h1>
			<p className='mt-5 max-w-xl text-lg leading-8 text-slate-600'>
				The link may be out of date, or the page may have moved. Return to the portfolio home to continue.
			</p>
			<div className='mt-8'>
				<Link
					href='/'
					className='inline-flex items-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800'>
					Return home
				</Link>
			</div>
		</section>
	);
}
