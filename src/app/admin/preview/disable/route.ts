import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
	const preview = await draftMode();
	preview.disable();
	redirect('/admin');
}
