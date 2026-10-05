import { type PortfolioContent } from './schema';
import { seedPortfolio } from './seed';

/**
 * Content is hardcoded in `src/data/*` and exposed as the validated seed
 * snapshot. The accessor stays async so call sites remain unchanged.
 */
export async function getPortfolioContent(): Promise<PortfolioContent> {
	return seedPortfolio;
}
