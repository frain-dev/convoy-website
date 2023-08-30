import Markdoc from '@markdoc/markdoc';
import React from 'react';
import Contents from '../components/content';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import DocFooter from '../components/docfooter';
import getDocumentation from '@/lib/getDocumentation';

type PageProps = {
	params: {
		slug: string[];
	};
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const joinedSlug = params.slug.join('/');
	const { title } = await getDocumentation(joinedSlug);
	return { title };
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

export default async function DocsTemplate({ params }: PageProps) {
	const joinedSlug = params.slug.join('/');
	const { content } = await getDocumentation(joinedSlug);
	const ast = Markdoc.parse(content);
	const docContent = Markdoc.transform(ast, config);
	const tableOfContents = extractHeadings(docContent);

	return (
		<>
			<div className="flex justify-center gap-100px max-w-[1023px] mx-auto pt-50px px-24px">
				<div className="max-w-[676px] w-full">
					{Markdoc.renderers.react(docContent, React, { components })}
					<DocFooter></DocFooter>
				</div>

				<div className="hidden max-w-[247px] w-full sticky top-0 h-fit doc-tab:block">
					<Contents tableOfContents={tableOfContents} />
				</div>
			</div>
		</>
	);
}
