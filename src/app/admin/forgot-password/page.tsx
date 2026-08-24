import AuthForm from '../AuthForm';
import { requestPasswordResetAction } from '../actions';

export default function ForgotPasswordPage() {
	return (
		<div className='site-container flex min-h-[65vh] items-center justify-center py-16'>
			<section className='w-full max-w-md border border-slate-300 bg-white p-7 sm:p-9'>
				<h1 className='text-3xl font-bold tracking-tight text-slate-950'>Reset password</h1>
				<p className='mt-3 text-sm leading-6 text-slate-600'>Supabase akan mengirim tautan pemulihan ke email admin.</p>
				<AuthForm action={requestPasswordResetAction} mode='forgot' />
			</section>
		</div>
	);
}

