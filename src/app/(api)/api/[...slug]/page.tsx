import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import { getArticle, fetchDocSlugs } from '@/lib/getArticles';
import Contents from '../components/content';
import Link from 'next/link';

type PageProps = {
	params: {
		slug: string[];
	};
};

export async function generateStaticParams() {
	const docSlugs = await fetchDocSlugs();
	return docSlugs.map(doc => {
		return { slug: doc.slugArray };
	});
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const joinedSlug = params.slug.join('/');
	const apiArticle = await getArticle(joinedSlug);
	return { title: apiArticle.title, description: apiArticle.description };
}

function extractHeadings(node: any, sections: any[] = []) {
	if (node) {
		if (node.name === 'Heading') {
			const title = node.children[0];

			if (typeof title === 'string') {
				sections.push({
					...node.attributes,
					title
				});
			}
		}

		if (node.children && node.name !== 'Tab') {
			for (const child of node.children) {
				extractHeadings(child, sections);
			}
		}
	}

	return sections;
}

export default async function Article({ params }: PageProps) {
	const joinedSlug = params.slug.join('/');
	const article = await getArticle(joinedSlug);
	const ast = Markdoc.parse(article.content);
	const docContent = Markdoc.transform(ast, config);
	const tableOfContents = extractHeadings(docContent);

	const active = { name: 'Pagination', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 2 };

	const topics = [
		{
			name: 'Authentication & Authorization',
			path: 'authorization-and-authentication',
			description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.',
			index: 1
		},
		{
			name: 'Pagination',
			path: 'pagination',
			description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.',
			index: 2
		},
		{ name: 'Idempotency', path: '', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 3 },
		{ name: 'Rate Limiting', path: '', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 4 },
		{ name: 'Webhooks', path: '', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 5 },
		{ name: 'OpenAPI', path: '', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 6 },
		{ name: 'Versioning', path: '', description: 'This book captures decades of experience standing up ARR reporting at the likes of Intercom and Atlassian.', index: 7 }
	];
	return (
		<>
			<div className="flex items-start flex-wrap nav-bar-break:flex-nowrap gap-66px pt-120px max-w-[1248px] m-auto" id="docPage">
				<div className="px-20px desktop-min:p-0 desktop-min:max-w-[340px] desktop:max-w-[280px] sticky desktop-min:top-120px desktop:top-128px">
					<div className="flex flex-col gap-12px w-full">
						{topics.map((article, i) => (
							<Link href={article.path} key={i}>
								<div
									className={`p-20px rounded-12px transition-all duration-300 border ${
										active.name === article.name
											? 'bg-[radial-gradient(225.48%_149.76%_at_7.42%_5.1%,rgba(255,255,255,0.10)_4.25%,rgba(255,255,255,0.24)_96.39%)] border-white-100'
											: 'bg-[linear-gradient(113deg,rgba(255,255,255,0.04)_17.7%,rgba(165,165,165,0.04)_55.32%,rgba(255,255,255,0.04)_90.17%)] border-transparent'
									}`}
									key={i}>
									<div className="flex items-center justify-between capitalize text-16 nav-bar-break:text-20 font-sometype">
										<div className="text-white-100">{article.name}</div>
										<div className="text-white-24">{article.index > 9 ? article.index : `0${article.index}`}</div>
									</div>
									{active.name === article.name && <p className="text-white-64 text-12 nav-bar-break:text-14 mt-10px">{article.description}</p>}
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="max-w-[600px]" id="docPage">
					<div className="flex items-end justify-between text-white-40 w-full desktop-min:text-[48px] desktop:text-32 mb-48px">
						<div className="uppercase">{article.title}</div>
						<div className="">{article.index > 9 ? article.index : `0${article.index}`}</div>
					</div>
					{Markdoc.renderers.react(docContent, React, { components })}
				</div>
				{!article.isError && (
					<div className="hidden w-full sticky nav-bar-break:block pt-50px px-20px desktop-min:p-0 nav-bar-break:max-w-[240px] desktop-min:top-120px desktop:top-128px">
						<Contents tableOfContents={tableOfContents} />
					</div>
				)}
			</div>
		</>
	);
}
