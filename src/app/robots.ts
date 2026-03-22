import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/cloud', '/community', '/enterprise', '/_next/static/', '/docs/_next/', '/api/', '/static/', '*/feed.rss', '*/rss']
		},
		sitemap: 'https://www.getconvoy.io/sitemap.xml'
	};
}
