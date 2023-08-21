import { glob } from 'glob';
import path from 'path';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import Contents from '../(components)/content';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import DocFooter from '../(components)/docfooter';

const DOCS_PATH = 'src/app/docs/(content)';
const DOCS_DIR = path.join(process.cwd(), DOCS_PATH);

type Params = {
	slug: string[];
};

type PageProps = {
	params: Params;
};

export const dynamicParams = false;

export async function generateStaticParams() {
	const docPaths = await glob('**/*.md', {
		cwd: DOCS_DIR
	});
	const docPathsArray = Array.from(docPaths);
	return docPathsArray.map((postPath: any) => {
		return {
			slug: [postPath.split('/').length > 1 ? postPath.split('/').reverse().pop() : '', path.basename(postPath, path.extname(postPath))]
		};
	});
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { title } = await getMarkdownContent(params.slug);
	return { title: title };
}

async function getMarkdownContent(slug: any) {
	const joinedSlug = slug.join('/');
	const filePath = path.join(DOCS_DIR, joinedSlug + '.md');
	const source = fs.readFileSync(filePath, 'utf-8');
	const matterResult = matter(source);
	const { title, type } = matterResult.data;
	const ast = Markdoc.parse(source);
	const content = Markdoc.transform(ast, config);
	return { content, title };
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
	const { content } = await getMarkdownContent(params.slug);
	const tableOfContents = extractHeadings(content);
  
  
	return (
		<>
			<div className="docs flex justify-center">
				<div className="max-w-[876px] w-full py-50px tab-min:px-24px px-100px">
					{Markdoc.renderers.react(content, React, { components })}
					<DocFooter></DocFooter>
				</div>
				
				<div className="hidden desktop-min:max-w-[247px] w-full desktop-min:py-50px sticky top-0 h-fit desktop-min:block">
					<Contents tableOfContents={tableOfContents} />
				</div>
			</div>
		</>
	);
}
