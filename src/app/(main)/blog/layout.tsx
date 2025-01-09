import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Webhook Engineering Blog | Convoy',
	description:
		'Learn about webhook best practices, event-driven architectures, and developer tutorials. Stay updated with the latest in webhook infrastructure and Convoy features.',
	openGraph: {
		title: 'Webhook Engineering Blog - Convoy',
		description: 'Deep dives into webhook infrastructure, engineering insights, and best practices for event-driven architectures.',
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
		title: 'Webhook Engineering Blog - Convoy',
		description: 'Deep dives into webhook infrastructure, engineering insights, and best practices.'
	},
	keywords: 'webhooks, event-driven architecture, webhook management, webhook infrastructure, developer blog, engineering blog'
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Blog',
	name: 'Convoy Blog',
	description: 'Engineering insights about webhook infrastructure and event-driven architectures',
	publisher: {
		'@type': 'Organization',
		name: 'Convoy',
		logo: {
			'@type': 'ImageObject',
			url: '/static/convoy-new.png'
		}
	},
	url: 'https://getconvoy.io/blog',
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
