/** @type {import('next').NextConfig} */
const path = require('path');
const withMarkdoc = require('@markdoc/next.js');

const nextConfig = {
	output: 'export',
	pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx'],
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	images: { unoptimized: true }
};

module.exports = withMarkdoc()(nextConfig);
