import AboutTabs from '@/components/home/AboutTabs';
import CareerTrail, { type TrailMilestone } from '@/components/home/CareerTrail';
import ContactBlock from '@/components/home/ContactBlock';
import HeroBlock from '@/components/home/HeroBlock';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import PracticeBlock from '@/components/home/PracticeBlock';
import ResearchBlock from '@/components/home/ResearchBlock';
import StatsStrip from '@/components/home/StatsStrip';
import ToolkitBlock from '@/components/home/ToolkitBlock';
import WorkSlider from '@/components/home/WorkSlider';
import { getCategoryLabels, getFeaturedProjects, getResearchProjects } from '@/lib/portfolio/selectors';
import { getPortfolioContent } from '@/lib/portfolio/repository';

const shortName = (value: string) => value.split(' ').slice(0, 2).join(' ');

export default async function HomePage() {
	const content = await getPortfolioContent();
	const featuredProjects = getFeaturedProjects(content);
	const researchProjects = getResearchProjects(content);
	const categoryLabels = getCategoryLabels(content);

	const workProjects = [
		...featuredProjects,
		...researchProjects.filter((project) => !featuredProjects.some((featured) => featured.slug === project.slug)),
	];

	// Signature trail: real career milestones spread along the page progress.
	const milestones: TrailMilestone[] = [
		{ label: content.education.institution, short: shortName(content.education.institution), at: 0.14 },
		...content.experience.map((item, index) => ({
			label: item.organization,
			short: shortName(item.organization),
			at: 0.38 + index * 0.22,
		})),
		{ label: 'Selected work', short: 'Selected work', at: 0.92 },
	];

	return (
		<>
			<CareerTrail milestones={milestones} />
			<HeroBlock profile={content.profile} />
			<StatsStrip highlights={content.credibilityHighlights} />
			<MarqueeStrip techGroups={content.techGroups} />
			<WorkSlider projects={workProjects} categoryLabels={categoryLabels} />
			<PracticeBlock />
			<ToolkitBlock techGroups={content.techGroups} />
			<ResearchBlock
				projects={researchProjects}
				thesis={researchProjects.find((project) => project.slug === 'nids-optimization')}
				categoryLabels={categoryLabels}
			/>
			<AboutTabs
				content={{
					experience: content.experience,
					education: content.education,
					leadership: content.leadership,
					additionalOrganizationalExperience: content.additionalOrganizationalExperience,
					certifications: content.certifications,
				}}
			/>
			<ContactBlock profile={content.profile} />
		</>
	);
}
