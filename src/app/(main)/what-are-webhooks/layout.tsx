import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'What are Webhooks? | Complete Guide by Convoy',
	description: 'Learn how webhooks enable real-time data exchange between applications. A comprehensive guide to webhook implementation and best practices.',
	openGraph: {
		title: 'What are Webhooks? Complete Implementation Guide',
		description: 'Learn how webhooks enable real-time data exchange between applications. A comprehensive guide to webhook implementation and best practices.',
		type: 'article'
	},
	alternates: {
		canonical: '/what-are-webhooks'
	},
	keywords: 'what are webhooks, webhook guide, webhook implementation, webhook basics'
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Article',
	name: 'What are Webhooks? | Complete Guide by Convoy',
	description: 'Whether you’re an engineer or product manager, this guide walks you through everything you need to become a webhook pro. Let’s begin!',
	publisher: {
		'@type': 'Organization',
		name: 'Convoy',
		url: 'https://www.getconvoy.io'
	},
	author: {
		'@type': 'Organization',
		name: 'Convoy Team'
	},
	isAccessibleForFree: true,
	mainEntityOfPage: {
		'@type': 'WebPage',
		'@id': 'https://www.getconvoy.io/what-are-webhooks'
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
