'use client';

import { useState } from 'react';

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<{ success?: boolean; message?: string } | null>(
		null,
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulasikan pengiriman form
		try {
			// Dalam aplikasi sebenarnya, ini adalah tempat untuk mengirim data form ke backend
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSubmitResult({
				success: true,
				message: 'Pesan Anda telah berhasil dikirim! Saya akan menghubungi Anda sesegera mungkin.',
			});

			// Reset form setelah berhasil
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: '',
			});
		} catch {
			setSubmitResult({
				success: false,
				message: 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-2'>Hubungi Saya</h1>
			<p className='text-xl text-gray-600 mb-10'>
				Tertarik untuk bekerja sama? Kirim pesan dan saya akan membalas segera.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
				{/* Contact Form */}
				<div>
					{submitResult && (
						<div
							className={`p-4 mb-6 rounded-md ${
								submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
							}`}>
							{submitResult.message}
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='name' className='block mb-2 font-medium'>
								Nama
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label htmlFor='email' className='block mb-2 font-medium'>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label htmlFor='subject' className='block mb-2 font-medium'>
								Subjek
							</label>
							<input
								type='text'
								id='subject'
								name='subject'
								value={formData.subject}
								onChange={handleChange}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label htmlFor='message' className='block mb-2 font-medium'>
								Pesan
							</label>
							<textarea
								id='message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								required
								rows={6}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</div>

						<button
							type='submit'
							disabled={isSubmitting}
							className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed'>
							{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
						</button>
					</form>
				</div>

				{/* Contact Info */}
				<div>
					<div className='bg-gray-50 p-8 rounded-lg'>
						<h2 className='text-2xl font-bold mb-6'>Informasi Kontak</h2>

						<div className='space-y-6'>
							<div className='flex items-start'>
								<div className='mr-4 text-blue-600'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='font-semibold'>Email</h3>
									<a
										href='mailto:info@nantarachmasaya.com'
										className='text-blue-600 hover:underline'>
										info@nantarachmasaya.com
									</a>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='mr-4 text-blue-600'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='font-semibold'>Telepon</h3>
									<p>+62 812 3456 7890</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='mr-4 text-blue-600'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</div>
								<div>
									<h3 className='font-semibold'>Lokasi</h3>
									<p>Jakarta, Indonesia</p>
								</div>
							</div>
						</div>

						<div className='mt-10'>
							<h3 className='font-semibold mb-4'>Sosial Media</h3>
							<div className='flex space-x-4'>
								<a href='#' className='text-gray-600 hover:text-blue-600'>
									<span className='sr-only'>Twitter</span>
									<svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
									</svg>
								</a>
								<a href='#' className='text-gray-600 hover:text-blue-600'>
									<span className='sr-only'>LinkedIn</span>
									<svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
									</svg>
								</a>
								<a href='#' className='text-gray-600 hover:text-blue-600'>
									<span className='sr-only'>GitHub</span>
									<svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
										<path
											fillRule='evenodd'
											d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
											clipRule='evenodd'
										/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
