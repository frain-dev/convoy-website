import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Convoy Core Gateway | Advanced Webhook Management Platform',
	description: 'Enterprise webhook gateway with retries, circuit breaking, and static IPs. Designed for reliability, security, and unlimited scale.',
	openGraph: {
		title: 'Convoy Core Gateway - Advanced Webhook Management',
		description: 'Enterprise webhook gateway with retries, circuit breaking, and static IPs. Designed for reliability, security, and unlimited scale.',
		type: 'website'
	},
	alternates: {
		canonical: '/core-gateway'
	},
	keywords: 'webhook gateway, webhook management platform, enterprise webhooks, webhook infrastructure'

};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	name: 'Convoy Core Gateway',
	description: 'Enterprise webhook gateway with retries, circuit breaking, and static IPs. Designed for reliability, security, and unlimited scale.',
	mainEntity: {
		'@type': 'SoftwareApplication',
		name: 'Convoy Core Gateway',
		applicationCategory: 'DeveloperTool',
		applicationSubCategory: 'Webhook Gateway',
		operatingSystem: 'All',

		featureList: [
			'Advanced endpoint management',
			'Rock-solid Webhooks Logs & Filtering',
			'Secure Webhook Delivery',
			'Highly Reliable Architecture',
			'Observability',
			'Unparalleled Developer Experience'
		],
		review: {
			'@type': 'Review',
			reviewRating: {
				'@type': 'Rating',
				ratingValue: '5.0'
			},
			author: {
				'@type': 'Organization',
				name: 'Convoy'
			}
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '5.0',
			reviewCount: '100'
		}
	},
	potentialAction: {
		'@type': 'UseAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate: 'https://www.getconvoy.io/docs/getting-started',
			actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/AndroidPlatform', 'http://schema.org/IOSPlatform']
		},
		expectsAcceptanceOf: {
			'@type': 'Offer',
			'@id': 'https://www.getconvoy.io/pricing'
		}
	}
};

export default function CoreGatewayLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
