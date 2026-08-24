import AuthForm from '../AuthForm';
import { updatePasswordAction } from '../actions';

export default function UpdatePasswordPage() {
	return (
		<div className='site-container flex min-h-[65vh] items-center justify-center py-16'>
			<section className='w-full max-w-md border border-slate-300 bg-white p-7 sm:p-9'>
				<h1 className='text-3xl font-bold tracking-tight text-slate-950'>Password baru</h1>
				<p className='mt-3 text-sm leading-6 text-slate-600'>Masukkan password baru minimal 8 karakter.</p>
				<AuthForm action={updatePasswordAction} mode='update' />
			</section>
		</div>
	);
}

