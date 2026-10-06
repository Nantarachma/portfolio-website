import type { PortfolioContent } from '@/lib/portfolio/schema';

type TechGroup = PortfolioContent['techGroups'][number];

/**
 * Endless skill ticker. Duplicated groups keep the -50% loop seamless;
 * decorative for assistive tech (the toolkit block lists the same skills).
 */
export default function MarqueeStrip({ techGroups }: { techGroups: readonly TechGroup[] }) {
	const items = [...new Set(techGroups.flatMap((group) => group.items))];

	return (
		<div className='page-block block-overlap bg-[#14161a] py-1.5' aria-hidden='true'>
			<div className='skill-marquee'>
				<div className='skill-marquee__track'>
					{[0, 1].map((copy) => (
						<ul key={copy} className='skill-marquee__group'>
							{items.map((item) => (
								<li key={item} className='skill-marquee__item text-dim'>
									{item}
								</li>
							))}
						</ul>
					))}
				</div>
			</div>
		</div>
	);
}
