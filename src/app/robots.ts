import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cloud', '/community', '/enterprise'],
    },
    sitemap: 'https://getconvoy.io/sitemap.xml',
  }
}