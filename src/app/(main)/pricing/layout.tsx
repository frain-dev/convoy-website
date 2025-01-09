import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pricing | Convoy',
	description: 'Simple, transparent pricing for webhook management. From individual developers to enterprise teams, choose the right plan for your scale.',
	openGraph: {
		title: 'Convoy Pricing',
		description: 'Transparent pricing for webhook management at any scale.',
		type: 'website'
	}
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Convoy',
    description: 'Open-source webhooks gateway',
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
