import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh] px-4'>
			<h1 className='text-5xl font-bold mb-4'>404</h1>
			<h2 className='text-2xl font-semibold mb-6'>Halaman Tidak Ditemukan</h2>
			<p className='text-gray-600 text-center mb-8'>
				Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
			</p>
			<Link
				href='/'
				className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition'>
				Kembali ke Beranda
			</Link>
		</div>
	);
}
