import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Convoy Pricing | Cloud & Self-Hosted Webhook Gateway Solutions',
	description: 'Find the right webhook plan for your scale. Choose between cloud-hosted solutions starting at $99/month or enterprise self-hosted options.',
	openGraph: {
		title: 'Convoy Webhook Gateway Pricing Plans',
		description: 'Find the right webhook plan for your scale. Choose between cloud-hosted solutions starting at $99/month or enterprise self-hosted options.',
		type: 'website'
	},
	alternates: {
		canonical: '/pricing'
	},
	keywords: 'webhook gateway pricing, webhook gateway plans, webhook gateway costs, webhook gateway pricing comparison'

};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Product',
	name: 'Convoy',
	description: 'Find the right webhook plan for your scale. Choose between cloud-hosted solutions starting at $99/month or enterprise self-hosted options.',
	offers: {
		'@type': 'AggregateOffer',
		priceCurrency: 'USD',
		offers: [
			{
				'@type': 'Offer',
				name: 'Community',
				price: '0',
				priceCurrency: 'USD',
				description:
					'Perfect for developers exploring self-hosted solutions, the Community plan provides everything you need to reliably manage webhooks in your own environment. Start simple with no cost and scale as your needs grow.'
			},
			{
				'@type': 'Offer',
				name: 'Premium',
				price: 'Custom',
				priceCurrency: 'USD',
				description:
					'Built for organizations with advanced requirements, the Premium plan offers unlimited flexibility and full control. Customize your webhook gateway with premium features and priority support to meet enterprise demands'
			},
			{
				'@type': 'Offer',
				name: 'Pro',
				price: '99',
				priceCurrency: 'USD',
				description:
					'Designed for small teams and startups, the Pro plan offers essential webhook delivery features. Get started quickly with a simple, predictable pricing model.'
			},
			{
				'@type': 'Offer',
				name: 'Enterprise',
				price: 'Custom',
				priceCurrency: 'USD',
				description: 'Tailored for scale-ups and large organizations, the Enterprise plan provides custom solutions for complex webhook needs'
			}
		]
	}
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
