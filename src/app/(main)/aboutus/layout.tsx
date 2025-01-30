import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Convoy | Building the Future of Webhook Infrastructure',
	description: 'Meet the engineering team behind Convoy, building the most reliable webhook gateway to democratize webhook infrastructure for developers.',
	openGraph: {
		title: 'About the Team Building Convoy Webhook Gateway',
		description: 'Meet the engineering team behind Convoy, building the most reliable webhook gateway to democratize webhook infrastructure for developers.',
		type: 'website'
	},
	alternates: {
		canonical: '/aboutus'
	},
	keywords: 'webhook infrastructure, webhook gateway, webhook engineering, webhook reliability, webhook security, webhook scalability, about convoy'
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'About Convoy',
	description: 'Open-source webhooks gateway for reliable event delivery',
	url: 'https://www.getconvoy.io',
	sameAs: ['https://github.com/frain-dev/convoy', 'https://twitter.com/getconvoy', 'https://linkedin.com/company/convoy-webhooks/']
};
export default function AboutLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
