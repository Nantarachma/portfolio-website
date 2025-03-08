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

		// Simulate form submission
		try {
			// In a real application, this is where you would send the form data to the backend
			await new Promise((resolve) => setTimeout(resolve, 1500));

			setSubmitResult({
				success: true,
				message: 'Your message has been successfully sent! I will contact you as soon as possible.',
			});

			// Reset form after success
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: '',
			});
		} catch {
			setSubmitResult({
				success: false,
				message: 'Sorry, there was an error sending your message. Please try again later.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-2'>Contact Me</h1>
			<p className='text-xl text-gray-600 mb-10'>
				Interested in working together? Send a message and I&apos;ll respond soon.
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
								Name
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
								Subject
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
								Message
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
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				</div>

				{/* Contact Info */}
				<div>
					<div className='bg-gray-50 p-8 rounded-lg'>
						<h2 className='text-2xl font-bold mb-6'>Contact Information</h2>

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
										href='mailto:ibnurachmananta@gmail.com'
										className='text-blue-600 hover:underline'>
										ibnurachmananta@gmail.com
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
									<h3 className='font-semibold'>Phone</h3>
									<a
										href='https://wa.me/6289540159698'
										className='text-blue-600 hover:underline'
										target='_blank'
										rel='noopener noreferrer'>
										+62 895 4015 96986
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
									<h3 className='font-semibold'>Location</h3>
									<p>Surabaya, Indonesia</p>
								</div>
							</div>
						</div>

						<div className='mt-10'>
							<h3 className='font-semibold mb-4'>Social Media</h3>
							<div className='flex space-x-4'>
								<a
									href='https://www.instagram.com/nantarach_/'
									className='text-gray-600 hover:text-blue-600'>
									<span className='sr-only'>Instagram</span>
									<svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
									</svg>
								</a>
								<a
									href='https://www.linkedin.com/in/nantarachma/'
									className='text-gray-600 hover:text-blue-600'>
									<span className='sr-only'>LinkedIn</span>
									<svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
										<path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
									</svg>
								</a>
								<a
									href='https://github.com/Nantarachma/'
									className='text-gray-600 hover:text-blue-600'>
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
