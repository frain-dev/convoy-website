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

type PostProps = {
	title: string;
	description: string;
	primary_tag: string;
	feature_image: string;
	readTime: any;
	published_at: any;
	primary_author: {
		name: string;
		twitter: string;
	};
	slug: string;
	content: any;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const article: PostProps = await getPost(params.slug);
	return {
		title: article.title,
		metadataBase: new URL(`https://getconvoy.io/blog/${article.slug}`),
		alternates: {
			canonical: '/',
			types: {
				'application/rss+xml': 'https://getconvoy.io/blog/rss'
			}
		},
		openGraph: {
			title: article.title,
			siteName: 'Convoy',
			type: 'article',
			description: article.description,
			url: `https://getconvoy.io/blog/${article.slug}`,
			images: ['https://getconvoy.io/feature-images/' + article.feature_image],
			tags: article.primary_tag,
			publishedTime: article.published_at,
			authors: ['http://twitter.com/' + article.primary_author.twitter]
		},
		twitter: {
			title: article.title,
			card: 'summary_large_image',
			images: { url: 'https://getconvoy.io/feature-images/' + article.feature_image, alt: article.feature_image },
			description: article.description,
			creator: `@${article.primary_author.name}`
		}
	};
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
