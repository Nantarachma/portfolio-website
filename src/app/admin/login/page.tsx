import { redirect } from 'next/navigation';
import AuthForm from '../AuthForm';
import { loginAction } from '../actions';
import { getAdmin } from '@/lib/auth/admin';
import { hasSupabaseEnvironment } from '@/lib/supabase/env';

export default async function LoginPage() {
	if (await getAdmin()) redirect('/admin');
	const configured = hasSupabaseEnvironment();

	return (
		<div className='site-container flex min-h-[70vh] items-center justify-center py-16'>
			<section className='w-full max-w-md border border-slate-300 bg-white p-7 shadow-sm sm:p-9'>
				<p className='font-mono text-xs font-bold uppercase tracking-widest text-blue-700'>Portfolio CMS</p>
				<h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-950'>Masuk admin</h1>
				<p className='mt-3 text-sm leading-6 text-slate-600'>Gunakan akun Supabase Auth yang sudah dimasukkan ke allowlist admin.</p>
				{configured ? <AuthForm action={loginAction} mode='login' /> : (
					<p className='mt-6 rounded-md bg-amber-50 p-4 text-sm leading-6 text-amber-900'>Supabase belum dikonfigurasi. Isi environment variable terlebih dahulu; website publik tetap memakai seed lokal.</p>
				)}
			</section>
		</div>
	);
}

