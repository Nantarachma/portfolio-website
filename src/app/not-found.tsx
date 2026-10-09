import Link from 'next/link';

export default function NotFound() {
	return (
		<section className='site-container page-section flex min-h-[80vh] max-w-2xl flex-col justify-center'>
			<p className='eyebrow'>404</p>
			<h1 className='page-title safe-wrap mt-4 text-balance text-ink'>
				This page could not be found.
			</h1>
			<p className='lead-text mt-5 text-dim'>
				The link may be out of date, or the page may have moved. Return to the portfolio home to continue.
			</p>
			<div className='mt-8'>
				<Link
					href='/'
					className='touch-target inline-flex items-center bg-ink px-5 py-3 text-sm font-bold text-void transition-colors duration-150 hover:bg-blueprint'>
					Return home
				</Link>
			</div>
		</section>
	);
}
