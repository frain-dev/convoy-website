import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Core Gateway | Convoy Webhook Management',
	description:
		"Explore Convoy's core webhook gateway features: reliable event delivery, retry mechanisms, payload search, and subscription filtering for efficient webhook management.",
	openGraph: {
		title: 'Convoy Core Gateway Features',
		description: 'Advanced webhook management features for reliable event delivery and filtering.',
		type: 'website'
	},
    alternates: {
        canonical: '/core-gateway',
      }
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	name: 'Convoy Core Gateway',
	description: 'Enterprise-grade webhook gateway features for reliable event delivery',
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
			urlTemplate: 'https://getconvoy.io/docs/getting-started',
			actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/AndroidPlatform', 'http://schema.org/IOSPlatform']
		},
		expectsAcceptanceOf: {
			'@type': 'Offer',
			'@id': 'https://getconvoy.io/pricing'
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
