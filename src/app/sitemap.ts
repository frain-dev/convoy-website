import { getAllRoutes, getPosts } from '@/lib/getPosts';

export default async function sitemap(){
	const URL = 'https://getconvoy.io';

	const getBlogRoutes = async () => {
		const blogs = await getPosts();
		const slugs = blogs.filter(blog => blog.slug).map(item => `/blog/${item.slug}`);
		const blogRoutes = slugs.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date()
		}));
		return blogRoutes;
	};

	const getMainRoutes = async () => {
		const mRoutes = await getAllRoutes();
		const mainRoutes = mRoutes.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date()
		}));
		return mainRoutes;
	};

	const indexRoute = {
		url: `${URL}/`,
		lastModified: new Date()
	};
	const mainRoutes = await getMainRoutes();
	const blogRoutes = await getBlogRoutes();

	return [indexRoute, ...mainRoutes, ...blogRoutes];
}
