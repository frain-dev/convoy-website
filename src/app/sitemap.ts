import { MetadataRoute } from 'next';
import data from 'data/nav.json';
import { getAllRoutes, getPosts } from '@/lib/getPosts';

export default async function sitemap(): MetadataRoute.Sitemap {
	const URL = 'https://getconvoy.io';

	const getDocRoutes = () => {
		const docRoutes: string[] = [];
		data.forEach(item => {
			if (item.link) docRoutes.push(item.link);
			if (item.children) {
				item.children.forEach(childRoute => {
					docRoutes.push(childRoute.link);
				});
			}
		});
		const fullDocRoutes = docRoutes.map(route => ({
			url: `${URL}${route}`,
			lastModified: new Date()
		}));
		return fullDocRoutes;
	};

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
	const docRoutes = getDocRoutes();
	const blogRoutes = await getBlogRoutes();

	return [indexRoute, ...mainRoutes, ...docRoutes, ...blogRoutes];
}
