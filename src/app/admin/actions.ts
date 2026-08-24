'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/admin';
import { parsePortfolioContent, portfolioContentSchema, type PortfolioContent } from '@/lib/portfolio/schema';
import { createClient } from '@/lib/supabase/server';

export interface AdminActionState {
	ok: boolean;
	message: string;
	fieldErrors?: Record<string, string[]>;
}

const credentialsSchema = z.object({
	email: z.string().trim().email('Alamat email tidak valid.'),
	password: z.string().min(8, 'Password minimal 8 karakter.'),
});

export async function loginAction(
	_previous: AdminActionState,
	formData: FormData,
): Promise<AdminActionState> {
	const parsed = credentialsSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!parsed.success) {
		return { ok: false, message: 'Periksa kembali email dan password.' };
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
	if (error || !data.user) return { ok: false, message: 'Email atau password tidak valid.' };

	const { data: admin } = await supabase
		.from('admin_users')
		.select('user_id')
		.eq('user_id', data.user.id)
		.maybeSingle();

	if (!admin) {
		await supabase.auth.signOut();
		return { ok: false, message: 'Akun ini tidak terdaftar sebagai admin portfolio.' };
	}

	redirect('/admin');
}

export async function logoutAction() {
	// Logout must remain usable even when the Supabase session has expired.
	// Otherwise stale auth or Draft Mode cookies can trap the browser on /admin/login.
	const preview = await draftMode();
	preview.disable();
	const supabase = await createClient();
	await supabase.auth.signOut({ scope: 'local' });
	redirect('/');
}

export async function requestPasswordResetAction(
	_previous: AdminActionState,
	formData: FormData,
): Promise<AdminActionState> {
	const parsed = z.string().email().safeParse(formData.get('email'));
	if (!parsed.success) return { ok: false, message: 'Alamat email tidak valid.' };

	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
	if (!siteUrl) return { ok: false, message: 'NEXT_PUBLIC_SITE_URL belum dikonfigurasi.' };

	const supabase = await createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
		redirectTo: `${siteUrl}/auth/callback?next=/admin/update-password`,
	});

	if (error) return { ok: false, message: error.message };
	return { ok: true, message: 'Tautan reset telah dikirim jika email tersebut terdaftar.' };
}

export async function updatePasswordAction(
	_previous: AdminActionState,
	formData: FormData,
): Promise<AdminActionState> {
	const parsed = z.string().min(8).safeParse(formData.get('password'));
	if (!parsed.success) return { ok: false, message: 'Password minimal 8 karakter.' };

	const supabase = await createClient();
	const { error } = await supabase.auth.updateUser({ password: parsed.data });
	if (error) return { ok: false, message: error.message };
	return { ok: true, message: 'Password berhasil diperbarui. Anda dapat kembali ke dashboard.' };
}

export async function saveDraftAction(input: PortfolioContent): Promise<AdminActionState> {
	const user = await requireAdmin();
	const validation = portfolioContentSchema.safeParse(input);
	if (!validation.success) {
		return {
			ok: false,
			message: 'Draft belum valid. Periksa field yang ditandai.',
			fieldErrors: validation.error.flatten().fieldErrors,
		};
	}
	const parsed = validation.data;
	const supabase = await createClient();

	const { data: publication } = await supabase
		.from('portfolio_publication')
		.select('content')
		.eq('id', 'main')
		.maybeSingle();

	if (publication?.content) {
		const published = parsePortfolioContent(publication.content);
		const redirects = new Map(parsed.projectRedirects.map((item) => [item.from, item]));
		for (const publishedProject of published.projects) {
			const nextProject = parsed.projects.find(({ contentId }) => contentId === publishedProject.contentId);
			if (nextProject && nextProject.slug !== publishedProject.slug && !redirects.has(publishedProject.slug)) {
				parsed.projectRedirects.push({
					contentId: crypto.randomUUID(),
					from: publishedProject.slug,
					to: nextProject.slug,
				});
			}
		}
	}

	const { error } = await supabase.from('portfolio_draft').upsert({
		id: 'main',
		content: parsed,
		updated_at: new Date().toISOString(),
		updated_by: user.id,
	});

	if (error) return { ok: false, message: `Draft gagal disimpan: ${error.message}` };
	revalidatePath('/admin');
	revalidatePath('/admin/content');
	return { ok: true, message: 'Draft berhasil disimpan.' };
}

export async function publishPortfolioAction(): Promise<AdminActionState> {
	await requireAdmin();
	const supabase = await createClient();
	const { data, error } = await supabase.rpc('publish_portfolio');

	if (error) return { ok: false, message: `Publikasi gagal: ${error.message}` };

	revalidateTag('portfolio-content');
	for (const path of ['/', '/about', '/contact', '/projects', '/research']) revalidatePath(path);
	revalidatePath('/projects/[slug]', 'page');
	revalidatePath('/admin');
	const version = Array.isArray(data) ? data[0]?.version : undefined;
	return { ok: true, message: `Portfolio berhasil dipublikasikan${version ? ` sebagai versi ${version}` : ''}.` };
}

export async function restoreRevisionAction(revisionId: string): Promise<AdminActionState> {
	await requireAdmin();
	const parsed = z.string().uuid().safeParse(revisionId);
	if (!parsed.success) return { ok: false, message: 'ID revisi tidak valid.' };

	const supabase = await createClient();
	const { error } = await supabase.rpc('restore_portfolio_revision', { revision_id: parsed.data });
	if (error) return { ok: false, message: `Rollback gagal: ${error.message}` };

	revalidatePath('/admin');
	revalidatePath('/admin/content');
	return { ok: true, message: 'Revisi disalin ke draft. Preview lalu publish untuk mengaktifkannya.' };
}
