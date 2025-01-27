import { getAllRoutes, getPosts } from '@/lib/getPosts';

export default async function sitemap() {
	const URL = 'https://getconvoy.io';

	const getBlogRoutes = async () => {
		const blogs = await getPosts();
		const slugs = blogs.filter(blog => blog.slug).map(item => `/blog/${item.slug}`);
		const blogRoutes = slugs.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1
		}));
		return blogRoutes;
	};

	const getDocsRoutes = async () => {
		const response = await fetch('https://docs.getconvoy.io/sitemap.xml');
		const text = await response.text();
		const docUrls =
			text
				.match(/<loc>(.*?)<\/loc>/g)
				?.map(loc => loc.replace(/<\/?loc>/g, ''))
				?.map(url => url.replace('https://docs.getconvoy.io', '/docs'))
				?.map(route => ({
					url: `${URL}${route}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.9
				})) || [];
		return docUrls;
	};

	const getMainRoutes = async () => {
		const mRoutes = await getAllRoutes();
		const mainRoutes = mRoutes.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8
		}));
		return mainRoutes;
	};

	const indexRoute = {
		url: `${URL}/`,
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 1
	};
	const mainRoutes = await getMainRoutes();
	const blogRoutes = await getBlogRoutes();
	const docsRoute = await getDocsRoutes();

	return [indexRoute, ...mainRoutes, ...blogRoutes, ...docsRoute];
}
