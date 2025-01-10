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

// type PostProps = {
// 	title: string;
// 	metaTitle: string;
// 	description: string;
// 	primary_tag: string;
// 	feature_image: string;
// 	readTime: any;
// 	published_at: any;
// 	primary_author: {
// 		name: string;
// 		twitter: string;
// 	};
// 	slug: string;
// 	content: any;
// 	isError?: boolean;
// };

type PostProps = {
	title: string;
	metaTitle?: string;
	feature_image: string;
	post_image?: string;
	primary_author: {
		name: string;
		twitter: string;
	};
	primary_tag: string;
	tags?: string[];
	featured?: boolean;
	description: string;
	published_at: string;
	readTime: number;
	slug: string;
	content: string;
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
				canonical: `/blog/${article.slug}`,
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

	// Handle missing post data
	if (!post || !post.primary_author) {
		// Return error page or redirect
		return <div>Post not found</div>;
	}

	const ast = Markdoc.parse(post?.content);
	const blogContent = Markdoc.transform(ast, config);

	const latestArticles = await getPosts();
	const posts = latestArticles.filter(post => post.slug !== params.slug && !post.isError);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		image: `https://getconvoy.io/blog-socials/${post.feature_image}`,
		datePublished: post.published_at,
		dateModified: post.published_at, // Add modified date if available
		wordCount: post.readTime * 200, // Approximate based on read time
		timeRequired: `PT${post.readTime}M`,
		author: {
			'@type': 'Person',
			name: post.primary_author.name,
			sameAs: `http://twitter.com/${post.primary_author.twitter}`
		},
		publisher: {
			'@type': 'Organization',
			name: 'Convoy',
			logo: {
				'@type': 'ImageObject',
				url: 'https://getconvoy.io/logo.png'
			}
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://getconvoy.io/blog/${post.slug}`
		},
		keywords: [post.primary_tag, ...(post.tags || [])],
		articleSection: post.primary_tag,
		isAccessibleForFree: true,
		url: `https://getconvoy.io/blog/${post.slug}`
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<div>
				<BlogPage posts={posts.slice(0, 2)} blogData={post}>
					{Markdoc.renderers.react(blogContent, React, { components })}
				</BlogPage>
			</div>
		</>
	);
}
