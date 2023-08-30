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
	return {
		title: article?.title,
		metadataBase: new URL(`https://getconvoy.io/blog/${article?.slug}`),
		alternates: {
			canonical: '/',
			types: {
				'application/rss+xml': 'https://getconvoy.io/blog/rss'
			}
		},
		openGraph: {
			title: article?.title,
			site_name: 'Convoy',
			type: 'article',
			description: article?.description,
			url: `https://getconvoy.io/blog/${article?.slug}`,
			image: 'https://getconvoy.io/feature-images/' + article?.feature_image
		},
		twitter: {
			title: article?.title,
			card: 'summary_large_image',
			url: `https://getconvoy.io/blog/${article?.slug}`,
			text: {
				title: article?.title
			},
			image: 'https://getconvoy.io/feature-images/' + article?.feature_image,
			description: article?.description,
			label1: 'Written by',
			label2: 'Filed under',
			data1: article?.primary_author.name,
			data2: 'Convoy'
		},
		article: {
			tag: article?.primary_tag,
			published_time: article?.published_at,
			publisher: 'http://twitter.com/' + article?.primary_author.twitter
		},
		'apple-mobile-web-app-title': article?.title
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
