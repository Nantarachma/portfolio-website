import AboutTabs from '@/components/home/AboutTabs';
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

export default async function HomePage() {
	const content = await getPortfolioContent();
	const featuredProjects = getFeaturedProjects(content);
	const researchProjects = getResearchProjects(content);
	const categoryLabels = getCategoryLabels(content);

	// No duplication: featured projects fill Work; the three research projects
	// live only in the Research section below (nids moved there entirely).
	const workProjects = featuredProjects;

	return (
		<>
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
				intro={content.profile.intro}
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
