'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState, useTransition } from 'react';
import {
	Controller,
	type Control,
	type FieldPath,
	FormProvider,
	type UseFormRegister,
	useFieldArray,
	useForm,
	useFormContext,
} from 'react-hook-form';
import { saveDraftAction } from '../../actions';
import {
	portfolioContentSchema,
	projectCategoryKeys,
	projectVisualKinds,
	type PortfolioContent,
	type PortfolioProject,
} from '@/lib/portfolio/schema';

const inputClass = 'admin-input mt-1.5';
const textAreaClass = 'admin-input mt-1.5 min-h-24 resize-y';

function LinesField({
	control,
	name,
	label,
	placeholder,
}: {
	control: Control<PortfolioContent>;
	name: FieldPath<PortfolioContent>;
	label: string;
	placeholder?: string;
}) {
	return (
		<label className='block text-sm font-semibold text-slate-800'>
			{label}
			<Controller
				control={control}
				name={name}
				render={({ field, fieldState }) => (
					<>
						<textarea
							value={Array.isArray(field.value) ? field.value.join('\n') : ''}
							onChange={(event) => field.onChange(event.target.value.split('\n').map((item) => item.trim()).filter(Boolean))}
							placeholder={placeholder ?? 'Satu item per baris'}
							aria-invalid={Boolean(fieldState.error)}
							className={textAreaClass}
						/>
						{fieldState.error ? <span className='mt-1 block text-xs font-semibold text-red-700'>{fieldState.error.message}</span> : null}
					</>
				)}
			/>
		</label>
	);
}

function MoveControls({
	index,
	length,
	onMove,
	onDelete,
}: {
	index: number;
	length: number;
	onMove: (from: number, to: number) => void;
	onDelete: () => void;
}) {
	return (
		<div className='flex flex-wrap gap-2'>
			<button type='button' className='admin-mini-button' disabled={index === 0} onClick={() => onMove(index, index - 1)} aria-label='Pindahkan ke atas'>↑</button>
			<button type='button' className='admin-mini-button' disabled={index === length - 1} onClick={() => onMove(index, index + 1)} aria-label='Pindahkan ke bawah'>↓</button>
			<button type='button' className='admin-mini-button text-red-700' onClick={onDelete}>Hapus</button>
		</div>
	);
}

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
	return (
		<section id={id} className='admin-panel scroll-mt-28'>
			<div className='border-b border-slate-200 pb-5'>
				<h2 className='text-2xl font-bold tracking-tight text-slate-950'>{title}</h2>
				<p className='mt-2 text-sm leading-6 text-slate-600'>{description}</p>
			</div>
			<div className='mt-6'>{children}</div>
		</section>
	);
}

function TextInput({ label, name, register, required = true, type = 'text' }: { label: string; name: FieldPath<PortfolioContent>; register: UseFormRegister<PortfolioContent>; required?: boolean; type?: string }) {
	const { getFieldState, formState } = useFormContext<PortfolioContent>();
	const error = getFieldState(name, formState).error;
	return (
		<label className='block text-sm font-semibold text-slate-800'>
			{label}
			<input {...register(name)} type={type} required={required} aria-invalid={Boolean(error)} className={inputClass} />
			{error ? <span className='mt-1 block text-xs font-semibold text-red-700'>{error.message}</span> : null}
		</label>
	);
}

function newProject(nextId: number): PortfolioProject {
	return {
		contentId: crypto.randomUUID(),
		id: nextId,
		slug: `project-baru-${nextId}`,
		title: 'Project baru',
		summary: 'Tambahkan ringkasan project.',
		categories: ['web'],
		tech: [],
		featured: false,
		caseStudy: { contribution: [], methodology: [], workflow: [], evidence: [] },
		visual: { kind: 'pipeline', label: 'Technical project workflow', steps: [] },
	};
}

const navigation = [
	['profile', 'Profil'],
	['highlights', 'Highlights'],
	['projects', 'Projects'],
	['experience', 'Experience'],
	['skills', 'Skills'],
	['certifications', 'Sertifikasi'],
] as const;

export default function ContentEditor({ initialContent, publishedSlugs }: { initialContent: PortfolioContent; publishedSlugs: Record<string, string> }) {
	const [saveState, setSaveState] = useState('');
	const [saving, startSaving] = useTransition();
	const [slugUnlocks, setSlugUnlocks] = useState<Record<string, boolean>>({});
	const methods = useForm<PortfolioContent>({
		resolver: zodResolver(portfolioContentSchema),
		defaultValues: initialContent,
		mode: 'onBlur',
	});
	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty },
	} = methods;

	const highlights = useFieldArray({ control, name: 'credibilityHighlights', keyName: '_formKey' });
	const categories = useFieldArray({ control, name: 'projectCategories', keyName: '_formKey' });
	const projects = useFieldArray({ control, name: 'projects', keyName: '_formKey' });
	const experience = useFieldArray({ control, name: 'experience', keyName: '_formKey' });
	const leadership = useFieldArray({ control, name: 'leadership', keyName: '_formKey' });
	const organizations = useFieldArray({ control, name: 'additionalOrganizationalExperience', keyName: '_formKey' });
	const skills = useFieldArray({ control, name: 'techGroups', keyName: '_formKey' });
	const certifications = useFieldArray({ control, name: 'certifications', keyName: '_formKey' });
	const watchedProjects = watch('projects');
	const watchedCategoryKeys = watch('projectCategories').map(({ key }) => key);
	const nextCategoryKey = projectCategoryKeys.find((key) => !watchedCategoryKeys.includes(key));
	const nextProjectId = useMemo(() => Math.max(0, ...watchedProjects.map(({ id }) => id)) + 1, [watchedProjects]);

	useEffect(() => {
		const warn = (event: BeforeUnloadEvent) => {
			if (isDirty) event.preventDefault();
		};
		window.addEventListener('beforeunload', warn);
		return () => window.removeEventListener('beforeunload', warn);
	}, [isDirty]);

	const removeWithConfirmation = (label: string, remove: () => void) => {
		if (window.confirm(`Hapus ${label}? Tindakan ini akan tersimpan setelah Save Draft.`)) remove();
	};

	const submit = handleSubmit((content) => {
		startSaving(async () => {
			const result = await saveDraftAction(content);
			setSaveState(result.message);
			if (result.ok) reset(content);
		});
	}, () => setSaveState('Draft belum valid. Periksa field bertanda error atau field wajib yang kosong.'));

	return (
		<FormProvider {...methods}>
		<form onSubmit={submit} className='mt-8'>
			<div className='admin-editor-toolbar sticky z-30 -mx-4 border-y border-slate-300 bg-slate-100/95 px-4 py-3 backdrop-blur'>
				<div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
					<nav className='flex gap-1 overflow-x-auto' aria-label='Bagian editor'>
						{navigation.map(([href, label]) => <a key={href} href={`#${href}`} className='shrink-0 rounded px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white'>{label}</a>)}
					</nav>
					<div className='flex items-center gap-3'>
						<span className={`text-xs font-bold ${isDirty ? 'text-amber-700' : 'text-emerald-700'}`}>{isDirty ? 'Perubahan belum disimpan' : 'Draft tersimpan'}</span>
						<button type='submit' disabled={saving} className='admin-button admin-button-primary'>{saving ? 'Menyimpan...' : 'Save Draft'}</button>
					</div>
				</div>
				{saveState ? <p role='status' className='mt-2 text-xs text-slate-700'>{saveState}</p> : null}
				{Object.keys(errors).length ? <p className='mt-2 text-xs font-semibold text-red-700'>Ada data yang belum valid pada {Object.keys(errors).length} bagian.</p> : null}
			</div>

			<div className='mt-6 space-y-6'>
				<Section id='profile' title='Profil & pendidikan' description='Identitas utama, kontak, dua resume, portrait, dan pendidikan.'>
					<div className='grid gap-4 md:grid-cols-2'>
						<TextInput label='Nama lengkap' name='profile.name' register={register} />
						<TextInput label='Nama pendek' name='profile.shortName' register={register} />
						<TextInput label='Role' name='profile.role' register={register} />
						<TextInput label='Eyebrow' name='profile.eyebrow' register={register} />
						<TextInput label='Email' name='profile.email' register={register} type='email' />
						<TextInput label='Telepon' name='profile.phone' register={register} />
						<TextInput label='Lokasi' name='profile.location' register={register} />
						<TextInput label='Portrait URL/path' name='profile.portrait.src' register={register} />
						<TextInput label='Alt portrait' name='profile.portrait.alt' register={register} />
						<TextInput label='GitHub URL' name='profile.links.github.href' register={register} />
						<TextInput label='LinkedIn URL' name='profile.links.linkedin.href' register={register} />
						<TextInput label='Email link' name='profile.links.email.href' register={register} />
						<TextInput label='WhatsApp URL' name='profile.links.whatsapp.href' register={register} />
						<TextInput label='Resume Inggris' name='profile.links.resumeEnglish.href' register={register} />
						<TextInput label='Resume Indonesia' name='profile.links.resumeIndonesian.href' register={register} />
					</div>
					<label className='mt-4 block text-sm font-semibold'>Intro<textarea {...register('profile.intro')} required className={textAreaClass} /></label>
					<label className='mt-4 block text-sm font-semibold'>Bio<textarea {...register('profile.bio')} required className={textAreaClass} /></label>
					<h3 className='mt-8 border-t border-slate-200 pt-6 text-lg font-bold'>Pendidikan</h3>
					<div className='mt-4 grid gap-4 md:grid-cols-2'>
						<TextInput label='Institusi' name='education.institution' register={register} />
						<TextInput label='Gelar' name='education.degree' register={register} />
						<TextInput label='Periode' name='education.period' register={register} />
						<TextInput label='GPA' name='education.gpa' register={register} />
					</div>
					<label className='mt-4 block text-sm font-semibold'>Thesis<textarea {...register('education.thesis')} required className={textAreaClass} /></label>
				</Section>

				<Section id='highlights' title='Credibility highlights & kategori' description='Item ringkas di homepage dan kategori yang tersedia untuk project.'>
					<div className='space-y-3'>
						{highlights.fields.map((field, index) => (
							<div key={field._formKey} className='grid gap-3 border border-slate-200 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end'>
								<TextInput label='Value' name={`credibilityHighlights.${index}.value`} register={register} />
								<TextInput label='Label' name={`credibilityHighlights.${index}.label`} register={register} />
								<MoveControls index={index} length={highlights.fields.length} onMove={highlights.swap} onDelete={() => removeWithConfirmation('highlight', () => highlights.remove(index))} />
							</div>
						))}
					</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => highlights.append({ contentId: crypto.randomUUID(), value: 'New value', label: 'New highlight' })}>Tambah highlight</button>

					<h3 className='mt-8 border-t border-slate-200 pt-6 text-lg font-bold'>Kategori project</h3>
					<div className='mt-4 space-y-3'>
						{categories.fields.map((field, index) => (
							<div key={field._formKey} className='grid gap-3 border border-slate-200 p-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-end'>
								<label className='text-sm font-semibold'>Key<select {...register(`projectCategories.${index}.key`)} className={inputClass}>{projectCategoryKeys.map((key) => <option key={key}>{key}</option>)}</select></label>
								<TextInput label='Label' name={`projectCategories.${index}.label`} register={register} />
								<label className='flex items-center gap-2 pb-2 text-sm font-semibold'><input type='checkbox' {...register(`projectCategories.${index}.filterVisible`)} /> Filter</label>
								<MoveControls index={index} length={categories.fields.length} onMove={categories.swap} onDelete={() => removeWithConfirmation('kategori', () => categories.remove(index))} />
							</div>
						))}
					</div>
					<button
						type='button'
						disabled={!nextCategoryKey}
						className='admin-button admin-button-secondary mt-4'
						onClick={() => nextCategoryKey && categories.append({ contentId: crypto.randomUUID(), key: nextCategoryKey, label: nextCategoryKey.replaceAll('-', ' '), filterVisible: true })}>
						{nextCategoryKey ? 'Tambah kategori' : 'Semua kategori tersedia sudah dipakai'}
					</button>
				</Section>

				<Section id='projects' title='Projects' description='Project, case study, workflow, evidence, visual teknis, featured, slug, dan urutan.'>
					<div className='space-y-5'>
						{projects.fields.map((field, index) => {
							const publishedSlug = publishedSlugs[field.contentId];
							const slugUnlocked = !publishedSlug || slugUnlocks[field.contentId];
							return (
								<details key={field._formKey} className='border border-slate-300 bg-slate-50 p-4' open={index === 0}>
									<summary className='cursor-pointer font-bold text-slate-950'>{String(index + 1).padStart(2, '0')} — {watch(`projects.${index}.title`)}</summary>
									<div className='mt-5 grid gap-4 md:grid-cols-2'>
										<TextInput label='Judul' name={`projects.${index}.title`} register={register} />
										<TextInput label='Judul pendek' name={`projects.${index}.shortTitle`} register={register} required={false} />
										<TextInput label='Subtitle' name={`projects.${index}.subtitle`} register={register} required={false} />
										<label className='text-sm font-semibold'>Slug<input {...register(`projects.${index}.slug`)} readOnly={!slugUnlocked} className={`${inputClass} read-only:bg-slate-200`} /></label>
										{publishedSlug ? <label className='flex items-center gap-2 text-xs font-semibold text-amber-800 md:col-span-2'><input type='checkbox' checked={Boolean(slugUnlocks[field.contentId])} onChange={(event) => setSlugUnlocks((current) => ({ ...current, [field.contentId]: event.target.checked }))} /> Aksi khusus: izinkan perubahan slug dan buat redirect dari URL lama</label> : null}
										<TextInput label='Role' name={`projects.${index}.role`} register={register} required={false} />
										<TextInput label='Periode' name={`projects.${index}.period`} register={register} required={false} />
										<TextInput label='Context' name={`projects.${index}.context`} register={register} required={false} />
										<TextInput label='Image URL/path' name={`projects.${index}.image`} register={register} required={false} />
										<TextInput label='GitHub URL' name={`projects.${index}.githubUrl`} register={register} required={false} />
										<TextInput label='Demo URL' name={`projects.${index}.demoUrl`} register={register} required={false} />
										<TextInput label='External URL' name={`projects.${index}.externalUrl`} register={register} required={false} />
									</div>
									<label className='mt-4 block text-sm font-semibold'>Summary<textarea {...register(`projects.${index}.summary`)} required className={textAreaClass} /></label>
									<div className='mt-4'><p className='text-sm font-semibold'>Kategori</p><div className='mt-2 flex flex-wrap gap-3'>{projectCategoryKeys.map((category) => <label key={category} className='flex items-center gap-2 text-sm'><input type='checkbox' value={category} {...register(`projects.${index}.categories`)} />{category}</label>)}</div></div>
									<div className='mt-4 grid gap-4 md:grid-cols-2'>
										<LinesField control={control} name={`projects.${index}.tech`} label='Tech (satu per baris)' />
										<LinesField control={control} name={`projects.${index}.caseStudy.contribution`} label='Contribution' />
										<LinesField control={control} name={`projects.${index}.caseStudy.methodology`} label='Methodology' />
										<LinesField control={control} name={`projects.${index}.caseStudy.workflow`} label='Workflow' />
									</div>
									<div className='mt-4 grid gap-4 md:grid-cols-2'>
										<label className='text-sm font-semibold'>Overview<textarea {...register(`projects.${index}.caseStudy.overview`)} className={textAreaClass} /></label>
										<label className='text-sm font-semibold'>Objective<textarea {...register(`projects.${index}.caseStudy.objective`)} className={textAreaClass} /></label>
										<label className='text-sm font-semibold'>Visual kind<select {...register(`projects.${index}.visual.kind`)} className={inputClass}>{projectVisualKinds.map((kind) => <option key={kind}>{kind}</option>)}</select></label>
										<TextInput label='Visual label' name={`projects.${index}.visual.label`} register={register} required={false} />
										<LinesField control={control} name={`projects.${index}.visual.steps`} label='Visual steps' />
										<label className='flex items-center gap-2 text-sm font-semibold'><input type='checkbox' {...register(`projects.${index}.featured`)} /> Featured project</label>
									</div>
									<label className='mt-4 block text-sm font-semibold'>Evidence (label | URL | kind)
										<Controller control={control} name={`projects.${index}.caseStudy.evidence`} render={({ field: evidenceField }) => {
											const evidence = Array.isArray(evidenceField.value) ? evidenceField.value : [];
											return <textarea className={textAreaClass} value={evidence.map((item) => `${item.label} | ${item.href ?? ''} | ${item.kind ?? ''}`).join('\n')} onChange={(event) => evidenceField.onChange(event.target.value.split('\n').filter(Boolean).map((line, evidenceIndex) => { const [label, href, kind] = line.split('|').map((part) => part.trim()); return { contentId: evidence[evidenceIndex]?.contentId ?? crypto.randomUUID(), label, href: href || undefined, kind: kind || undefined }; }))} />;
										}} />
									</label>
									<div className='mt-5'><MoveControls index={index} length={projects.fields.length} onMove={projects.swap} onDelete={() => removeWithConfirmation('project', () => projects.remove(index))} /></div>
								</details>
							);
						})}
					</div>
					<button type='button' className='admin-button admin-button-secondary mt-5' onClick={() => projects.append(newProject(nextProjectId))}>Tambah project</button>
				</Section>

				<Section id='experience' title='Experience & organisasi' description='Pengalaman teknis, kepemimpinan, dan pengalaman organisasi tambahan.'>
					<h3 className='text-lg font-bold'>Technical experience</h3>
					<div className='mt-4 space-y-4'>{experience.fields.map((field, index) => <div key={field._formKey} className='border border-slate-200 p-4'><div className='grid gap-4 md:grid-cols-2'><TextInput label='Organisasi' name={`experience.${index}.organization`} register={register} /><TextInput label='Role' name={`experience.${index}.role`} register={register} /><TextInput label='Periode' name={`experience.${index}.period`} register={register} /><TextInput label='Lokasi' name={`experience.${index}.location`} register={register} required={false} /><TextInput label='Context' name={`experience.${index}.context`} register={register} required={false} /><LinesField control={control} name={`experience.${index}.contributions`} label='Contributions' /></div><div className='mt-4'><MoveControls index={index} length={experience.fields.length} onMove={experience.swap} onDelete={() => removeWithConfirmation('experience', () => experience.remove(index))} /></div></div>)}</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => experience.append({ contentId: crypto.randomUUID(), organization: 'Organisasi', role: 'Role', period: 'Periode', contributions: [] })}>Tambah technical experience</button>

					<h3 className='mt-8 border-t border-slate-200 pt-6 text-lg font-bold'>Leadership</h3>
					<div className='mt-4 space-y-4'>{leadership.fields.map((field, index) => <div key={field._formKey} className='border border-slate-200 p-4'><div className='grid gap-4 md:grid-cols-2'><TextInput label='Organisasi' name={`leadership.${index}.organization`} register={register} /><TextInput label='Role' name={`leadership.${index}.role`} register={register} /><TextInput label='Periode' name={`leadership.${index}.period`} register={register} /><LinesField control={control} name={`leadership.${index}.focus`} label='Focus' /></div><div className='mt-4'><MoveControls index={index} length={leadership.fields.length} onMove={leadership.swap} onDelete={() => removeWithConfirmation('leadership', () => leadership.remove(index))} /></div></div>)}</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => leadership.append({ contentId: crypto.randomUUID(), organization: 'Organisasi', role: 'Role', period: 'Periode', focus: [] })}>Tambah leadership</button>

					<h3 className='mt-8 border-t border-slate-200 pt-6 text-lg font-bold'>Organizational experience</h3>
					<div className='mt-4 space-y-4'>{organizations.fields.map((field, index) => <div key={field._formKey} className='border border-slate-200 p-4'><div className='grid gap-4 md:grid-cols-2'><TextInput label='Title' name={`additionalOrganizationalExperience.${index}.title`} register={register} /><TextInput label='Organisasi' name={`additionalOrganizationalExperience.${index}.organization`} register={register} /><TextInput label='Periode' name={`additionalOrganizationalExperience.${index}.period`} register={register} /><LinesField control={control} name={`additionalOrganizationalExperience.${index}.responsibilities`} label='Responsibilities' /></div><div className='mt-4'><MoveControls index={index} length={organizations.fields.length} onMove={organizations.swap} onDelete={() => removeWithConfirmation('organizational experience', () => organizations.remove(index))} /></div></div>)}</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => organizations.append({ contentId: crypto.randomUUID(), title: 'Title', organization: 'Organisasi', period: 'Periode', responsibilities: [] })}>Tambah organizational experience</button>
				</Section>

				<Section id='skills' title='Skill groups' description='Kelompok skill termasuk bahasa; urutan mengikuti daftar ini.'>
					<div className='space-y-4'>{skills.fields.map((field, index) => <div key={field._formKey} className='grid gap-4 border border-slate-200 p-4 md:grid-cols-[1fr_2fr_auto] md:items-end'><TextInput label='Nama grup' name={`techGroups.${index}.name`} register={register} /><LinesField control={control} name={`techGroups.${index}.items`} label='Items' /><MoveControls index={index} length={skills.fields.length} onMove={skills.swap} onDelete={() => removeWithConfirmation('skill group', () => skills.remove(index))} /></div>)}</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => skills.append({ contentId: crypto.randomUUID(), name: 'Skill group', items: [] })}>Tambah skill group</button>
				</Section>

				<Section id='certifications' title='Certifications' description='Tanggal bersifat opsional; URL credential dapat dikosongkan.'>
					<div className='space-y-4'>{certifications.fields.map((field, index) => <div key={field._formKey} className='border border-slate-200 p-4'><div className='grid gap-4 md:grid-cols-2'><TextInput label='Judul' name={`certifications.${index}.title`} register={register} /><TextInput label='Issuer' name={`certifications.${index}.issuer`} register={register} /><TextInput label='Tanggal' name={`certifications.${index}.issueDate`} register={register} required={false} /><TextInput label='URL' name={`certifications.${index}.url`} register={register} required={false} /><label className='flex items-center gap-2 text-sm font-semibold'><input type='checkbox' {...register(`certifications.${index}.featured`)} /> Featured</label></div><div className='mt-4'><MoveControls index={index} length={certifications.fields.length} onMove={certifications.swap} onDelete={() => removeWithConfirmation('sertifikasi', () => certifications.remove(index))} /></div></div>)}</div>
					<button type='button' className='admin-button admin-button-secondary mt-4' onClick={() => certifications.append({ contentId: crypto.randomUUID(), title: 'Sertifikasi baru', issuer: 'Issuer', featured: false })}>Tambah sertifikasi</button>
				</Section>
			</div>
		</form>
		</FormProvider>
	);
}
