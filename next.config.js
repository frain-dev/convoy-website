/** @type {import('next').NextConfig} */
const path = require('path');
const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
	async rewrites() {
		return [
		  {
			source: '/docs/:path*',
			destination: 'https://docs.getconvoy.io/:path*',
		  }
		];
	  },
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/docs/manual/:slug*',
	// 			destination: 'https://docs.getconvoy.io/product-manual/:slug*',
	// 			permanent: true
	// 		},
	// 		{
	// 			source: '/docs/releases/:slug*',
	// 			destination: 'https://docs.getconvoy.io/release-notes/:slug*',
	// 			permanent: true
	// 		},
	// 		{
	// 			source: '/docs/:slug*',
	// 			destination: 'https://docs.getconvoy.io/:slug*',
	// 			permanent: true
	// 		}
	// 	];
	// },
	output: 'standalone',
	pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
};

module.exports = withMarkdoc()(nextConfig);
