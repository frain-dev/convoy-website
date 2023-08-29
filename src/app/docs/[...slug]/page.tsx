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
			<div className="flex justify-center">
				<div className="max-w-[876px] w-full py-50px tab-min:px-24px px-100px">
					{Markdoc.renderers.react(docContent, React, { components })}
					<DocFooter></DocFooter>
				</div>

				<div className="hidden desktop-min:max-w-[247px] w-full desktop-min:py-50px sticky top-0 h-fit desktop-min:block">
					<Contents tableOfContents={tableOfContents} />
				</div>
			</div>
		</>
	);
}
