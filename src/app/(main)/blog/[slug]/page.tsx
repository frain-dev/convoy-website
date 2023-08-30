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
	const article = await getPost(params.slug);
	return { title: article?.title };
}

export default async function BlogPost({ params }: PageProps) {
	const post = await getPost(params.slug);
	const ast = Markdoc.parse(post?.content);
	const blogContent = Markdoc.transform(ast, config);

	const latestArticles = await getPosts();
	const posts = latestArticles.filter(post => post.slug !== params.slug);

	return (
		<>
			<div>
				<BlogPage posts={posts.slice(0, 2)} blogData={post}>
					{Markdoc.renderers.react(blogContent, React, { components })}
				</BlogPage>
			</div>
		</>
	);
}
