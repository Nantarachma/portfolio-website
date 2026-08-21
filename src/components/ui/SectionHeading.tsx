type HeadingLevel = 'h1' | 'h2' | 'h3';

export interface SectionHeadingProps {
	title: string;
	description?: string;
	eyebrow?: string;
	id?: string;
	as?: HeadingLevel;
	align?: 'left' | 'center';
	className?: string;
}

export default function SectionHeading({
	title,
	description,
	eyebrow,
	id,
	as: Heading = 'h2',
	align = 'left',
	className = '',
}: SectionHeadingProps) {
	const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

	return (
		<div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
			{eyebrow ? (
				<p className='mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-blue-700'>
					{eyebrow}
				</p>
			) : null}
			<Heading id={id} className='text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl'>
				{title}
			</Heading>
			{description ? (
				<p className='mt-4 text-base leading-7 text-slate-600 sm:text-lg'>{description}</p>
			) : null}
		</div>
	);
}
