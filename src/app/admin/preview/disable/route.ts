import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/admin';

export async function GET() {
	await requireAdmin();
	const preview = await draftMode();
	preview.disable();
	redirect('/admin');
}

