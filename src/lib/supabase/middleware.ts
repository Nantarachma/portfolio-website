import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseEnvironment, hasSupabaseEnvironment } from './env';

const publicAdminPaths = [
	'/admin/login',
	'/admin/forgot-password',
	'/admin/update-password',
	'/auth/callback',
];

export async function updateSession(request: NextRequest) {
	if (!hasSupabaseEnvironment()) return NextResponse.next({ request });

	let response = NextResponse.next({ request });
	const { url, publishableKey } = getSupabaseEnvironment();
	const supabase = createServerClient(url, publishableKey, {
		cookies: {
			getAll: () => request.cookies.getAll(),
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
				response = NextResponse.next({ request });
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options),
				);
			},
		},
	});

	const { data } = await supabase.auth.getUser();
	const pathname = request.nextUrl.pathname;
	const isProtectedAdminPath = pathname.startsWith('/admin') && !publicAdminPaths.includes(pathname);

	if (isProtectedAdminPath && !data.user) {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = '/admin/login';
		loginUrl.searchParams.set('next', pathname);
		return NextResponse.redirect(loginUrl);
	}

	return response;
}

