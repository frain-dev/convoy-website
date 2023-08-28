import { glob } from 'glob';
import path from 'path';
import fs from 'fs';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import BlogPage from '../components/blogPage';
import getReadTime from '../../../lib/read-time';

const POSTS_DIR = path.join(process.cwd(), 'src/app/blog/articles');

type Params = {
	slug: string;
};

type PageProps = {
	params: Params;
};

export async function generateStaticParams() {
	const postPaths = await glob('**/*.md', {
		cwd: POSTS_DIR
	});
	const postPathsArray = Array.from(postPaths);
	return postPathsArray.map((postPath: any) => {
		return { slug: path.basename(postPath, path.extname(postPath)) };
	});
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { blogData } = await getMarkdownContent(params.slug);
	return { title: blogData.title };
}

async function getMarkdownContent(slug: string | undefined) {
	const postPaths = await glob('**/*.md', {
		cwd: POSTS_DIR
	});
	const postPathsArray = Array.from(postPaths);
	const filePath = path.join(POSTS_DIR, slug + '.md');
	const source = fs.readFileSync(filePath, 'utf-8');
	const matterResult = matter(source);
	const { data, content } = matterResult;
	const readTime = getReadTime(content);
	const ast = Markdoc.parse(source);
	const blogContent = Markdoc.transform(ast, config);
	const blogData = { ...data, readTime, slug };
	console.log('blogs ', postPathsArray);
	return { blogContent, blogData };
}

export default async function BlogPost({ params }: PageProps) {
	const { blogContent, blogData } = await getMarkdownContent(params.slug);

	return (
		<>
			<BlogPage blogData={blogData}>{Markdoc.renderers.react(blogContent, React, { components })}</BlogPage>
		</>
	);
}
