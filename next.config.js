/** @type {import('next').NextConfig} */
const path = require('path');
const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
	async rewrites() {
		return [
			{
        source: '/docs/:match*',
        destination: 'https://convoy.mintlify.dev/:match*'
      }
		]
	},
	async redirects() {
		return [
		];
	},
	output: 'standalone',
	pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
};

module.exports = withMarkdoc()(nextConfig);
