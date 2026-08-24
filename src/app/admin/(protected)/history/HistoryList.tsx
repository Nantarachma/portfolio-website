'use client';

import { useState, useTransition } from 'react';
import { restoreRevisionAction } from '../../actions';

export default function HistoryList({ revisions }: { revisions: { id: string; version: number; created_at: string }[] }) {
	const [pending, startTransition] = useTransition();
	const [message, setMessage] = useState('');

	return (
		<div className='admin-panel mt-8'>
			{revisions.length ? (
				<ul className='divide-y divide-slate-200'>
					{revisions.map((revision) => (
						<li key={revision.id} className='flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between'>
							<div><p className='font-bold'>Versi {revision.version}</p><p className='mt-1 text-sm text-slate-600'>{new Date(revision.created_at).toLocaleString('id-ID')}</p></div>
							<button type='button' disabled={pending} className='admin-button admin-button-secondary' onClick={() => {
								if (!window.confirm(`Salin versi ${revision.version} ke draft?`)) return;
								startTransition(async () => setMessage((await restoreRevisionAction(revision.id)).message));
							}}>Restore ke draft</button>
						</li>
					))}
				</ul>
			) : <p className='text-sm text-slate-600'>Belum ada revisi. Revisi pertama dibuat saat publikasi kedua.</p>}
			{message ? <p role='status' className='mt-5 rounded bg-blue-50 p-3 text-sm text-blue-900'>{message}</p> : null}
		</div>
	);
}

