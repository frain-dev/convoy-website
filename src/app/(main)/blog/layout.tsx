import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Convoy Blog | Webhook Engineering & Best Practices',
	description: 'Expert insights on webhook infrastructure, engineering practices, and technical deep dives from the team building the future of webhooks.',
	openGraph: {
		title: 'Convoy Blog - Webhook Engineering Insights',
		description: 'Expert insights on webhook infrastructure, engineering practices, and technical deep dives from the team building the future of webhooks.',
		type: 'website',
		images: [
			{
				url: '/static/convoy-new.png',
				width: 1200,
				height: 630,
				alt: 'Convoy Engineering Blog'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Convoy Blog - Webhook Engineering Insights',
		description: 'Expert insights on webhook infrastructure, engineering practices, and technical deep dives from the team building the future of webhooks.'
	},
	alternates: {
		canonical: '/blog'
	},
	keywords: 'webhooks, event-driven architecture, webhook management, webhook infrastructure, developer blog, engineering blog'
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Blog',
	name: 'Convoy Blog - Webhook Engineering Insights',
	description: 'Expert insights on webhook infrastructure, engineering practices, and technical deep dives from the team building the future of webhooks.',
	publisher: {
		'@type': 'Organization',
		name: 'Convoy',
		logo: {
			'@type': 'ImageObject',
			url: 'https://www.getconvoy.io/svg/convoy-logo-full-new.svg'
		}
	},
	url: 'https://www.getconvoy.io/blog',
	inLanguage: 'en-US',
	copyrightYear: new Date().getFullYear()
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			{children}
		</div>
	);
}
