import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Metadata } from 'next';
import { components, config } from '../config.markdoc';
import BlogPage from '../components/blogPage';
import { getPost, getPosts } from '@/lib/getPosts';
import './style.scss';

type PageProps = {
	params: {
		slug: string;
	};
};

type PostProps = {
	title: string;
	metaTitle: string;
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
	isError?: boolean;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const article: PostProps = await getPost(params.slug);

	if (article.isError) {
		return {
			title: article.title
		};
	} else
		return {
			title: article.metaTitle,
			metadataBase: new URL(`https://getconvoy.io/blog/${article.slug}`),
			alternates: {
				canonical: '/',
				types: {
					'application/rss+xml': 'https://getconvoy.io/blog/rss'
				}
			},
			openGraph: {
				title: article.metaTitle,
				siteName: 'Convoy',
				type: 'article',
				description: article.description,
				url: `https://getconvoy.io/blog/${article.slug}`,
				images: ['https://getconvoy.io/blog-socials/' + article.feature_image],
				tags: article.primary_tag,
				publishedTime: article.published_at,
				authors: ['http://twitter.com/' + article.primary_author.twitter]
			},
			twitter: {
				title: article.metaTitle,
				card: 'summary_large_image',
				images: { url: 'https://getconvoy.io/blog-socials/' + article.feature_image, alt: article.feature_image },
				description: article.description,
				creator: `@${article.primary_author.name}`
			}
		};
}

export async function generateStaticParams() {
	const blogs = await getPosts();
	return blogs.map(blog => {
		return { slug: blog.slug };
	});
}

export default async function BlogPost({ params }: PageProps) {
	const post = await getPost(params.slug);
	const ast = Markdoc.parse(post?.content);
	const blogContent = Markdoc.transform(ast, config);

	const latestArticles = await getPosts();
	const posts = latestArticles.filter(post => post.slug !== params.slug && !post.isError);

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
