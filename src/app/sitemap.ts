import { getAllRoutes, getPosts } from '@/lib/getPosts';
import { getAllChangelogSlugs } from '@/lib/changelog';

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

	const indexRoute = {
		url: `${URL}/`,
		lastModified: new Date(),
		changeFrequency: 'always',
		priority: 1
	};

	const mainRoutes = await getMainRoutes();
	const blogRoutes = await getBlogRoutes();
	const changelogRoutes = getChangelogRoutes();

	return [indexRoute, ...mainRoutes, ...blogRoutes, ...changelogRoutes];
}
