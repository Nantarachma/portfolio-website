'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import type { PortfolioContent } from '@/lib/portfolio/schema';

type AboutContent = Pick<
	PortfolioContent,
	'experience' | 'education' | 'leadership' | 'additionalOrganizationalExperience' | 'certifications'
>;

const tabs = [
	{ key: 'experience', label: 'Experience' },
	{ key: 'education', label: 'Education' },
	{ key: 'leadership', label: 'Leadership' },
	{ key: 'certifications', label: 'Certifications' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function AboutTabs({ content }: { content: AboutContent }) {
	const [active, setActive] = useState<TabKey>('experience');
	const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
		experience: null,
		education: null,
		leadership: null,
		certifications: null,
	});

	const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const next = (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
		setActive(tabs[next].key);
		tabRefs.current[tabs[next].key]?.focus();
	};

	return (
		<section
			id='about'
			data-nav-section='about'
			className='page-block block-overlap border-b border-slate-200 bg-white'
			aria-labelledby='background-heading'>
			<div className='site-container page-section'>
				<div className='grid gap-6 border-b border-slate-200 pb-8 md:grid-cols-12 md:items-end'>
					<div className='md:col-span-7'>
						<h2 id='background-heading' className='section-title text-balance font-bold text-slate-950'>
							Background.
						</h2>
					</div>
					<p className='leading-7 text-slate-600 md:col-span-4 md:col-start-9 md:border-l md:border-slate-200 md:pl-6'>
						Professional and cohort experience, education record, leadership work, and verified credentials.
					</p>
				</div>

				<div className='mt-8'>
					<div role='tablist' aria-label='Background sections' className='flex flex-wrap gap-x-2 gap-y-1 border-b border-slate-200'>
						{tabs.map((tab, index) => (
							<button
								key={tab.key}
								ref={(node) => {
									tabRefs.current[tab.key] = node;
								}}
								type='button'
								role='tab'
								id={`tab-${tab.key}`}
								aria-controls={`panel-${tab.key}`}
								aria-selected={active === tab.key}
								tabIndex={active === tab.key ? 0 : -1}
								onClick={() => setActive(tab.key)}
								onKeyDown={(event) => onKeyDown(event, index)}
								className={`-mb-px inline-flex min-h-11 items-center border-b-2 px-3 text-sm font-bold transition-colors duration-200 ${
									active === tab.key
										? 'border-blue-700 text-slate-950'
										: 'border-transparent text-slate-500 hover:text-slate-950'
								}`}>
								{tab.label}
							</button>
						))}
					</div>

					{active === 'experience' ? (
						<div role='tabpanel' id='panel-experience' aria-labelledby='tab-experience' tabIndex={0} className='pt-7'>
							<div className='grid gap-5 lg:grid-cols-2'>
								{content.experience.map((item) => (
									<article key={item.contentId} className='surface card-pad rounded-xl'>
										<p className='text-sm font-semibold text-blue-700'>{item.period}</p>
										<h3 className='mt-2 text-xl font-bold tracking-tight text-slate-950'>{item.role}</h3>
										<p className='mt-1 font-medium text-slate-700'>{item.organization}</p>
										{item.location ? <p className='mt-1 text-sm text-slate-500'>{item.location}</p> : null}
										{item.context ? <p className='mt-4 leading-7 text-slate-600'>{item.context}</p> : null}
										<ul className='mt-4 space-y-2.5 border-t border-slate-200 pt-4 text-sm leading-6 text-slate-600'>
											{item.contributions.map((contribution) => (
												<li key={contribution} className='flex gap-3'>
													<span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-700' aria-hidden='true' />
													<span>{contribution}</span>
												</li>
											))}
										</ul>
									</article>
								))}
							</div>
						</div>
					) : null}

					{active === 'education' ? (
						<div role='tabpanel' id='panel-education' aria-labelledby='tab-education' tabIndex={0} className='pt-7'>
							<article className='surface card-pad max-w-3xl rounded-xl'>
								<p className='text-sm font-semibold text-blue-700'>{content.education.period}</p>
								<h3 className='mt-2 text-xl font-bold tracking-tight text-slate-950'>
									{content.education.degree}
								</h3>
								<p className='mt-1 font-medium text-slate-700'>{content.education.institution}</p>
								<dl className='mt-5 grid gap-4 border-t border-slate-200 pt-4 text-sm sm:grid-cols-2'>
									<div>
										<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
											GPA
										</dt>
										<dd className='mt-1 font-semibold text-slate-900'>{content.education.gpa}</dd>
									</div>
									<div>
										<dt className='font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
											Thesis
										</dt>
										<dd className='mt-1 leading-6 text-slate-700'>{content.education.thesis}</dd>
									</div>
								</dl>
							</article>
						</div>
					) : null}

					{active === 'leadership' ? (
						<div role='tabpanel' id='panel-leadership' aria-labelledby='tab-leadership' tabIndex={0} className='pt-7'>
							<div className='grid gap-5 lg:grid-cols-2'>
								{content.leadership.map((item) => (
									<article key={item.contentId} className='surface card-pad rounded-xl'>
										<p className='text-sm font-semibold text-blue-700'>{item.period}</p>
										<h3 className='mt-2 text-xl font-bold tracking-tight text-slate-950'>{item.role}</h3>
										<p className='mt-1 font-medium text-slate-700'>{item.organization}</p>
										<ul className='mt-4 flex flex-wrap gap-2'>
											{item.focus.map((focus) => (
												<li
													key={focus}
													className='border border-slate-200 bg-[#fbfbf7] px-2.5 py-1 text-[11px] font-semibold text-slate-700'>
													{focus}
												</li>
											))}
										</ul>
									</article>
								))}
							</div>
							{content.additionalOrganizationalExperience.length > 0 ? (
								<div className='mt-8 border-t border-slate-200 pt-7'>
									<h3 className='text-lg font-bold text-slate-950'>Additional organizational experience</h3>
									<div className='mt-4 grid gap-5 lg:grid-cols-2'>
										{content.additionalOrganizationalExperience.map((item) => (
											<article key={item.contentId} className='card-pad border border-slate-200 bg-[#fbfbf7]'>
												<p className='text-sm font-semibold text-blue-700'>{item.period}</p>
												<h4 className='mt-2 font-bold text-slate-950'>{item.title}</h4>
												<p className='mt-1 text-sm text-slate-600'>{item.organization}</p>
												<ul className='mt-3 space-y-2 text-sm leading-6 text-slate-600'>
													{item.responsibilities.map((responsibility) => (
														<li key={responsibility} className='flex gap-3'>
															<span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-700' aria-hidden='true' />
															<span>{responsibility}</span>
														</li>
													))}
												</ul>
											</article>
										))}
									</div>
								</div>
							) : null}
						</div>
					) : null}

					{active === 'certifications' ? (
						<div role='tabpanel' id='panel-certifications' aria-labelledby='tab-certifications' tabIndex={0} className='pt-7'>
							<ul className='grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2'>
								{content.certifications.map((certification) => (
									<li key={certification.contentId} className='bg-white'>
										{certification.url ? (
											<a
												href={certification.url}
												target='_blank'
												rel='noreferrer'
												className='flex min-h-11 flex-col justify-center gap-0.5 px-4 py-3 transition-colors duration-200 hover:bg-blue-50'>
												<span className='text-sm font-semibold leading-5 text-slate-950'>
													{certification.title}
												</span>
												<span className='text-xs text-slate-500'>
													{certification.issuer}
													{certification.issueDate ? ` · ${certification.issueDate}` : ''}
												</span>
											</a>
										) : (
											<div className='flex min-h-11 flex-col justify-center gap-0.5 px-4 py-3'>
												<span className='text-sm font-semibold leading-5 text-slate-950'>
													{certification.title}
												</span>
												<span className='text-xs text-slate-500'>
													{certification.issuer}
													{certification.issueDate ? ` · ${certification.issueDate}` : ''}
												</span>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
