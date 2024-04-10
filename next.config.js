/** @type {import('next').NextConfig} */
const path = require('path');
const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/docs',
				destination: 'https://docs.getconvoy.io',
				permanent: true
			}
		];
	},
	experimental: {
		appDir: true
	},
	output: 'standalone',
	pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
};

module.exports = withMarkdoc()(nextConfig);
