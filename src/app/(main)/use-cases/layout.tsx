import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Webhook Use Cases by Industry | Convoy',
	description:
		'Discover how teams in fintech, healthcare, SaaS, e-commerce, logistics, AI/ML, developer tools, and IoT use Convoy to deliver reliable webhooks at scale.',
	openGraph: {
		title: 'Webhook Use Cases by Industry | Convoy',
		description: 'Discover how teams across industries use Convoy to deliver reliable webhooks at scale.',
		type: 'website',
		images: [
			{
				url: '/static/convoy-og.png',
				width: 1200,
				height: 630,
				alt: 'Convoy Webhook Use Cases'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Webhook Use Cases by Industry | Convoy',
		description: 'Discover how teams across industries use Convoy to deliver reliable webhooks at scale.',
		images: ['/static/convoy-og.png']
	},
	alternates: {
		canonical: '/use-cases'
	},
	keywords:
		'webhook use cases, webhook gateway industries, fintech webhooks, healthcare webhooks, SaaS webhooks, e-commerce webhooks, logistics webhooks, AI webhooks, IoT webhooks'
};

export default function UseCasesLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
