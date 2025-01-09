import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About | Convoy',
	description: "Learn about Convoy's mission to simplify webhook management for developers. A reliable, open-source solution for managing webhook events at any scale.",
	openGraph: {
		title: 'About Convoy',
		description: 'Building reliable webhook infrastructure for developers.',
		type: 'website'
	}
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Convoy',
	description: 'Open-source webhooks gateway for reliable event delivery',
	url: 'https://getconvoy.io',
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
