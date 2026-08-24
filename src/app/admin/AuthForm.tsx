'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { AdminActionState } from './actions';

const initialState: AdminActionState = { ok: false, message: '' };

export default function AuthForm({
	action,
	mode,
}: {
	action: (state: AdminActionState, formData: FormData) => Promise<AdminActionState>;
	mode: 'login' | 'forgot' | 'update';
}) {
	const [state, formAction, pending] = useActionState(action, initialState);
	const isLogin = mode === 'login';

	return (
		<form action={formAction} className='mt-8 space-y-5'>
			{mode !== 'update' ? (
				<label className='block text-sm font-semibold text-slate-800'>
					Email
					<input name='email' type='email' required autoComplete='email' className='admin-input mt-2' />
				</label>
			) : null}
			{mode !== 'forgot' ? (
				<label className='block text-sm font-semibold text-slate-800'>
					Password
					<input
						name='password'
						type='password'
						required
						minLength={8}
						autoComplete={isLogin ? 'current-password' : 'new-password'}
						className='admin-input mt-2'
					/>
				</label>
			) : null}
			{state.message ? (
				<p role='status' className={`rounded-md px-3 py-2 text-sm ${state.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
					{state.message}
				</p>
			) : null}
			<button disabled={pending} className='admin-button admin-button-primary w-full' type='submit'>
				{pending ? 'Memproses...' : isLogin ? 'Masuk' : mode === 'forgot' ? 'Kirim tautan reset' : 'Simpan password baru'}
			</button>
			<div className='flex justify-between text-sm'>
				{isLogin ? <Link href='/admin/forgot-password' className='text-blue-700 hover:underline'>Lupa password?</Link> : null}
				{!isLogin ? <Link href='/admin/login' className='text-blue-700 hover:underline'>Kembali ke login</Link> : null}
			</div>
		</form>
	);
}

