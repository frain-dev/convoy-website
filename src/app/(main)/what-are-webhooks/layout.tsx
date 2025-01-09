import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'What are Webhooks? | Convoy',
	description: 'Understanding webhooks and their role in modern applications. Learn about webhook implementation, best practices, and management strategies.',
	openGraph: {
		title: 'What are Webhooks? - Convoy',
		description: 'Complete guide to understanding and implementing webhooks.',
		type: 'article'
	},
	alternates: {
		canonical: '/what-are-webhooks'
	}
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Article',
	headline: 'What are Webhooks? Complete Guide',
	description: 'Understanding webhooks and their role in modern applications',
	publisher: {
		'@type': 'Organization',
		name: 'Convoy',
		url: 'https://getconvoy.io'
	},
	author: {
		'@type': 'Organization',
		name: 'Convoy Team'
	},
	isAccessibleForFree: true,
	mainEntityOfPage: {
		'@type': 'WebPage',
		'@id': 'https://getconvoy.io/what-are-webhooks'
	}
};

export default function WebhooksLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
