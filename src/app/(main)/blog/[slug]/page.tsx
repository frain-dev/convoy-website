import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import BlogPage from '../components/blogPage';
import { getPost, getPosts } from '@/lib/getPosts';

type PageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { title } = await getPost(params.slug);
	return { title };
}

export default async function BlogPost({ params }: PageProps) {
	const { title, primary_tag, readTime, published_at, primary_author, slug, content } = await getPost(params.slug);
	const blogData = { title, primary_tag, readTime, published_at, primary_author, slug };
	const ast = Markdoc.parse(content);
	const blogContent = Markdoc.transform(ast, config);

	const latestArticles = await getPosts();
	const posts = latestArticles.filter(post => post.slug !== params.slug);

	return (
		<>
			<BlogPage posts={posts.slice(0, 2)} blogData={blogData}>
				{Markdoc.renderers.react(blogContent, React, { components })}
			</BlogPage>
		</>
	);
}
