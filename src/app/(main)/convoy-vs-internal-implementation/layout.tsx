import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Convoy vs Building Internal Webhook Infrastructure | Comparison Guide',
	description: "Compare using Convoy's webhook gateway vs building internally. Understand the trade-offs in reliability, maintenance, and development costs.",
	openGraph: {
		title: 'Convoy vs Building Your Own Webhook Infrastructure',
		description: "Compare using Convoy's webhook gateway vs building internally. Understand the trade-offs in reliability, maintenance, and development costs.",
		type: 'article',
		images: [
			{
				url: '/static/Convoy-vs-internal-implemetation-OG.png',
				width: 1200,
				height: 630,
				alt: 'Convoy vs Internal Implementation Comparison'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Convoy vs Building Your Own Webhook Infrastructure',
		description: "Compare using Convoy's webhook gateway vs building internally. Understand the trade-offs in reliability, maintenance, and development costs.",
		images: ['/static/Convoy-vs-internal-implemetation-OG.png']
	},
	alternates: {
		canonical: '/convoy-vs-internal-implementation'
	},
	keywords: 'webhook implementation comparison, build vs buy webhooks, webhook infrastructure comparison, webhook gateway benefits'
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Article',
	headline: 'Convoy vs Internal Implementation',
	description: 'Discover why choosing Convoy over building an internal webhook service saves time, reduces complexity, and ensures reliability at scale.',
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
