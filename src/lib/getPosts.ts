import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import getReadTime from './read-time';

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

const fetchContent = async (filePath: string) => {
	const postContent = await fs.readFile(filePath, 'utf8');
	const slug = path.basename(filePath, path.extname(filePath));
	const { data, content } = matter(postContent);
	const readTime = getReadTime(content);
	const isError = filePath.includes('404');
	return { ...data, readTime, slug, content, isError } as PostProps;
};

const fetchPostsAndPostContent = async () => {
	const posts = await fs.readdir('src/app/(main)/blog/articles');

	return Promise.all(
		posts
			.filter(file => path.extname(file) === '.md')
			.map(async file => {
				const filePath = `src/app/(main)/blog/articles/${file}`;
				const post: PostProps = await fetchContent(filePath);

				return post;
			})
	);
};

const getAllRoutes = async () => {
	const excluded = ['layout.tsx', 'page.tsx'];
	const mainDir = await fs.readdir('src/app/(main)');
	const mainRoutes = mainDir.filter(item => !excluded.includes(item)).map(route => `/${route}`);
	return mainRoutes;
};

const getPosts = async () => {
	const posts = await fetchPostsAndPostContent();
	posts.sort((a, b) => {
		return Number(new Date(b.published_at)) - Number(new Date(a.published_at));
	});
	return posts;
};

const getPost = async paramsSlug => {
	try {
		const filePath = `src/app/(main)/blog/articles/${paramsSlug}.md`;
		const post: PostProps = await fetchContent(filePath);
		switch (post.primary_tag) {
			case 'Customer Stories':
				post['metaTitle'] = `Customer Stories: ${post.title}`;
				break;
			case 'News':
				post['metaTitle'] = `Convoy Announcements: ${post.title}`;
				break;
			case 'Webhooks Library':
				post['metaTitle'] = `${post.title} | The Webhooks Library`;
				break;
			default:
				post['metaTitle'] = `${post.title} | The Webhooks Blog`;
				break;
		}
		return post;
	} catch {
		const filePath = `src/app/(main)/blog/articles/404.md`;
		const post: PostProps = await fetchContent(filePath);
		return {
		  ...post,
		  primary_author: {
			name: 'Convoy',
			twitter: 'getconvoy'
		  }
		};
	  }
};

export { getPost, getPosts, getAllRoutes };
