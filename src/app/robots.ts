import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/cloud', '/community', '/enterprise', '/_next/static/', '/api/', '/static/', '*/feed.rss', '*/rss']
		},
		sitemap: 'https://getconvoy.io/sitemap.xml'
	};
}
