import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useCases, getUseCaseBySlug } from '../data';
import UseCaseContent from '../components/UseCaseContent';

export async function generateStaticParams() {
	return useCases.map(uc => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const useCase = getUseCaseBySlug(params.slug);
	if (!useCase) return {};

	return {
		title: useCase.metaTitle,
		description: useCase.metaDescription,
		keywords: useCase.keywords,
		openGraph: {
			title: useCase.metaTitle,
			description: useCase.metaDescription,
			type: 'website',
			images: [
				{
					url: '/static/convoy-og.png',
					width: 1200,
					height: 630,
					alt: useCase.metaTitle
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: useCase.metaTitle,
			description: useCase.metaDescription,
			images: ['/static/convoy-og.png']
		},
		alternates: {
			canonical: `/use-cases/${useCase.slug}`
		}
	};
}

function buildJsonLd(slug: string) {
	const useCase = getUseCaseBySlug(slug);
	if (!useCase) return null;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				name: useCase.metaTitle,
				description: useCase.metaDescription,
				url: `https://www.getconvoy.io/use-cases/${useCase.slug}`,
				publisher: {
					'@type': 'Organization',
					name: 'Convoy',
					url: 'https://www.getconvoy.io'
				}
			},
			{
				'@type': 'FAQPage',
				mainEntity: useCase.faq.map(item => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer
					}
				}))
			}
		]
	};
}

export default function UseCasePage({ params }: { params: { slug: string } }) {
	const useCase = getUseCaseBySlug(params.slug);
	if (!useCase) notFound();

	const jsonLd = buildJsonLd(params.slug);

	return (
		<>
			{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
			<UseCaseContent useCase={useCase} />
		</>
	);
}
