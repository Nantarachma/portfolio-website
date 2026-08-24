'use client';

import { useState, useTransition } from 'react';
import type { AdminActionState } from '../actions';

export default function AdminActionButton({
	action,
	children,
	confirmMessage,
	className = 'admin-button admin-button-primary',
}: {
	action: () => Promise<AdminActionState>;
	children: React.ReactNode;
	confirmMessage?: string;
	className?: string;
}) {
	const [pending, startTransition] = useTransition();
	const [message, setMessage] = useState('');

	return (
		<div>
			<button
				type='button'
				disabled={pending}
				className={className}
				onClick={() => {
					if (confirmMessage && !window.confirm(confirmMessage)) return;
					startTransition(async () => {
						const result = await action();
						setMessage(result.message);
					});
				}}>
				{pending ? 'Memproses...' : children}
			</button>
			{message ? <p role='status' className='mt-2 max-w-sm text-xs text-slate-600'>{message}</p> : null}
		</div>
	);
}

