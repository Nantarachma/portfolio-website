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

export default function AboutTabs({ content, intro }: { content: AboutContent; intro: string }) {
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
			data-sc-act='flow'
			className='page-block block-overlap border-b-[3px] border-b-ink bg-void'
			data-draw-b
			aria-labelledby='background-heading'>
			<div className='site-container page-section'>
				<div className='border-b border-rule pb-4' data-sc-cue='0.05 0.66 0.25 0.18'>
					<h2 id='background-heading' className='section-title text-balance text-ink'>
						Background.
					</h2>
					<p className='caption-box mt-3 max-w-[65ch] text-sm leading-6'>
						{intro} Professional and cohort experience, education record, leadership work, and verified
						credentials.
					</p>
				</div>

				<div className='mt-4'>
					<div role='tablist' aria-label='Background sections' className='flex flex-wrap gap-x-2 gap-y-1 border-b border-rule'>
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
								className={`-mb-px inline-flex min-h-11 items-center border-b-2 px-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${
									active === tab.key
										? 'border-blueprint text-ink'
										: 'border-transparent text-dim hover:text-ink'
								}`}>
								{tab.label}
							</button>
						))}
					</div>

					{active === 'experience' ? (
						<div role='tabpanel' id='panel-experience' aria-labelledby='tab-experience' tabIndex={0} className='pt-3'>
							<div className='grid gap-2 lg:grid-cols-2'>
								{content.experience.map((item) => (
									<article key={item.contentId} className='surface card-pad'>
										<p className='text-xs font-semibold uppercase tracking-[0.08em] text-flare'>{item.period}</p>
										<h3 className='mt-1 text-lg font-bold tracking-tight text-ink'>{item.role}</h3>
										<p className='mt-1 font-medium text-ink'>{item.organization}</p>
										{item.location ? <p className='mt-1 text-sm text-dim'>{item.location}</p> : null}
										{item.context ? <p className='mt-2.5 text-sm leading-5 text-dim'>{item.context}</p> : null}
										<ul className='mt-2.5 space-y-1 border-t border-rule pt-2.5 text-sm leading-5 text-dim'>
											{item.contributions.map((contribution) => (
												<li key={contribution} className='flex gap-3'>
													<span className='mt-2 h-1.5 w-1.5 shrink-0 bg-blueprint' aria-hidden='true' />
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
						<div role='tabpanel' id='panel-education' aria-labelledby='tab-education' tabIndex={0} className='pt-3'>
							<article className='surface card-pad'>
								<p className='text-xs font-semibold uppercase tracking-[0.08em] text-flare'>{content.education.period}</p>
								<h3 className='mt-1 text-lg font-bold tracking-tight text-ink'>
									{content.education.degree}
								</h3>
								<p className='mt-1 font-medium text-ink'>{content.education.institution}</p>
								<dl className='mt-4 grid gap-4 border-t border-rule pt-3 text-sm sm:grid-cols-2'>
									<div>
										<dt className='text-[10px] font-semibold uppercase tracking-[0.14em] text-dim'>
											GPA
										</dt>
										<dd className='mt-1 font-semibold text-ink'>{content.education.gpa}</dd>
									</div>
									<div>
										<dt className='text-[10px] font-semibold uppercase tracking-[0.14em] text-dim'>
											Thesis
										</dt>
										<dd className='mt-1 leading-6 text-dim'>{content.education.thesis}</dd>
									</div>
								</dl>
							</article>
						</div>
					) : null}

					{active === 'leadership' ? (
						<div role='tabpanel' id='panel-leadership' aria-labelledby='tab-leadership' tabIndex={0} className='pt-3'>
							<div className='grid gap-2 lg:grid-cols-2'>
								{content.leadership.map((item) => (
									<article key={item.contentId} className='surface card-pad'>
										<p className='text-xs font-semibold uppercase tracking-[0.08em] text-flare'>{item.period}</p>
										<h3 className='mt-1 text-lg font-bold tracking-tight text-ink'>{item.role}</h3>
										<p className='mt-1 font-medium text-ink'>{item.organization}</p>
										<ul className='mt-3 flex flex-wrap gap-1.5'>
											{item.focus.map((focus) => (
												<li
													key={focus}
													className='border border-rule bg-plate px-2.5 py-1 text-[11px] font-semibold text-dim'>
													{focus}
												</li>
											))}
										</ul>
									</article>
								))}
							</div>
							{content.additionalOrganizationalExperience.length > 0 ? (
								<div className='mt-5 border-t border-rule pt-4'>
									<h3 className='text-lg font-bold text-ink'>Additional organizational experience</h3>
									<div className='mt-3 grid gap-2 lg:grid-cols-2'>
										{content.additionalOrganizationalExperience.map((item) => (
											<article key={item.contentId} className='card-pad border border-rule bg-plate'>
												<p className='text-xs font-semibold uppercase tracking-[0.08em] text-flare'>{item.period}</p>
												<h4 className='mt-2 font-bold text-ink'>{item.title}</h4>
												<p className='mt-1 text-sm text-dim'>{item.organization}</p>
												<ul className='mt-3 space-y-2 text-sm leading-6 text-dim'>
													{item.responsibilities.map((responsibility) => (
														<li key={responsibility} className='flex gap-3'>
															<span className='mt-2 h-1.5 w-1.5 shrink-0 bg-blueprint' aria-hidden='true' />
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
						<div role='tabpanel' id='panel-certifications' aria-labelledby='tab-certifications' tabIndex={0} className='pt-3'>
							<ul className='grid gap-px border border-rule bg-rule md:grid-cols-2'>
								{content.certifications.map((certification) => (
									<li key={certification.contentId} className='bg-void'>
										{certification.url ? (
											<a
												href={certification.url}
												target='_blank'
												rel='noreferrer'
												className='flex min-h-11 flex-col justify-center gap-0.5 px-4 py-2.5 transition-colors duration-200 hover:bg-plate'>
												<span className='text-sm font-semibold leading-5 text-ink'>
													{certification.title}
												</span>
												<span className='text-xs text-dim'>
													{certification.issuer}
													{certification.issueDate ? ` · ${certification.issueDate}` : ''}
												</span>
											</a>
										) : (
											<div className='flex min-h-11 flex-col justify-center gap-0.5 px-4 py-2.5'>
												<span className='text-sm font-semibold leading-5 text-ink'>
													{certification.title}
												</span>
												<span className='text-xs text-dim'>
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
