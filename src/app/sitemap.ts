import { getAllRoutes, getPosts } from '@/lib/getPosts';
import { getAllChangelogSlugs } from '@/lib/changelog';
import { useCases } from './(main)/use-cases/data';

/** Mintlify <loc> values may be absolute (e.g. https://getconvoy.io/docs/...). Strip origin so we never concatenate base URL onto a full URL. */
function mintlifyLocToPath(loc: string): string | null {
	let s = loc.trim().replace(/&amp;/g, '&');
	if (!s.startsWith('http://') && !s.startsWith('https://')) {
		return s.startsWith('/') ? s : `/${s}`;
	}
	try {
		const u = new URL(s);
		const host = u.hostname.toLowerCase();
		const isOurSite =
			host === 'getconvoy.io' ||
			host.endsWith('.getconvoy.io') ||
			host === 'convoy.mintlify.app' ||
			host.endsWith('.mintlify.app');
		if (!isOurSite) {
			return null;
		}
		const path = u.pathname + u.search + u.hash;
		return path.length > 0 ? path : '/';
	} catch {
		return null;
	}
}

export default async function sitemap() {
	const URL = 'https://www.getconvoy.io';

	const excludedPaths = ['/cloud', '/community', '/enterprise', '/_next/static', '/api', '/static', 'feed.rss', 'rss'];

	const shouldExcludeRoute = (route: string) => {
		return excludedPaths.some(path => route.includes(path));
	};

	const getChangelogRoutes = () => {
		const slugs = getAllChangelogSlugs();
		const changelogRoutes = slugs.map(slug => ({
			url: `${URL}/changelog/${slug}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.7
		}));
		return changelogRoutes;
	};

	const getBlogRoutes = async () => {
		const blogs = await getPosts();
		const slugs = blogs
			.filter(blog => blog.slug)
			.map(item => `/blog/${item.slug}`)
			.filter(route => !shouldExcludeRoute(route));

		const blogRoutes = slugs.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.7
		}));
		return blogRoutes;
	};

	const getMainRoutes = async () => {
		const mRoutes = await getAllRoutes();
		const mainRoutes = mRoutes
			.filter(route => !shouldExcludeRoute(route))
			.map(route => ({
				url: `${URL}${route}`,
				lastModified: new Date(),
				changeFrequency: 'daily',
				priority: 0.7
			}));
		return mainRoutes;
	};

	const getDocsRoutes = async () => {
		const response = await fetch('https://convoy.mintlify.app/sitemap.xml');
		const text = await response.text();
		const docUrls =
			text
				.match(/<loc>(.*?)<\/loc>/g)
				?.map(loc => loc.replace(/<\/?loc>/g, ''))
				?.map(mintlifyLocToPath)
				?.filter((route): route is string => route !== null && !shouldExcludeRoute(route))
				?.map(route => ({
					url: `${URL}${route}`,
					lastModified: new Date(),
					changeFrequency: 'daily',
					priority: 0.7
				})) || [];
		return docUrls;
	};

	const indexRoute = {
		url: `${URL}/`,
		lastModified: new Date(),
		changeFrequency: 'always',
		priority: 1
	};

	const useCaseRoutes = useCases.map(uc => ({
		url: `${URL}/use-cases/${uc.slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.8
	}));

	const mainRoutes = await getMainRoutes();
	const blogRoutes = await getBlogRoutes();
	const docsRoute = await getDocsRoutes();
	const changelogRoutes = getChangelogRoutes();

	return [indexRoute, ...mainRoutes, ...useCaseRoutes, ...blogRoutes, ...changelogRoutes, ...docsRoute];
}
