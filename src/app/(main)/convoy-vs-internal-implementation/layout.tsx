import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Convoy vs Internal Implementation',
	description: 'Compare Convoy with building your own webhook system. Make the right choice for your needs.',
	openGraph: {
		title: 'Convoy vs Internal Webhook Implementation',
		description: 'Choose the right webhook solution for your needs.',
		type: 'article'
	}
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Article',
	headline: 'Convoy vs Internal Webhook Implementation',
	description: 'Comparing Convoy with in-house webhook solutions',
	publisher: {
		'@type': 'Organization',
		name: 'Convoy'
	},
	comparison: {
		'@type': 'ComparisonTable',
		about: [
			{
				'@type': 'SoftwareApplication',
				name: 'Convoy',
				applicationCategory: 'Webhook Gateway'
			},
			{
				'@type': 'SoftwareApplication',
				name: 'Internal Implementation',
				applicationCategory: 'Custom Solution'
			}
		]
	}
};

export default function ComparisonLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
