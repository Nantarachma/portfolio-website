import 'server-only';

import { redirect } from 'next/navigation';
import { hasSupabaseEnvironment } from '@/lib/supabase/env';
import { createClient } from '@/lib/supabase/server';

export async function getAdmin() {
	if (!hasSupabaseEnvironment()) return null;

	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) return null;

	const { data: allowlistEntry } = await supabase
		.from('admin_users')
		.select('user_id')
		.eq('user_id', user.id)
		.maybeSingle();

	return allowlistEntry ? user : null;
}

export async function requireAdmin() {
	const user = await getAdmin();
	if (!user) redirect('/admin/login');
	return user;
}

