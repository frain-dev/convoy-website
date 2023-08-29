import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import getReadTime from './read-time';

const fetchPostsAndPostContent = async () => {
	const posts = await fs.readdir('src/app/blog/articles');

	return Promise.all(
		posts
			.filter(file => path.extname(file) === '.md')
			.map(async file => {
				const filePath = `src/app/blog/articles/${file}`;
				const postContent = await fs.readFile(filePath, 'utf8');
				const slug = path.basename(filePath, path.extname(filePath));
				const { data, content } = matter(postContent);
				const readTime = getReadTime(content);

				return { ...data, readTime, slug, content };
			})
	);
};

const getPosts = async () => {
	const posts = await fetchPostsAndPostContent();
	posts.sort((a, b) => {
		return Number(new Date(b.published_at)) - Number(new Date(a.published_at));
	});
	return posts;
};

const getPost = async paramsSlug => {
	const posts = await getPosts();
	const filteredPost = posts.find(post => post.slug === paramsSlug);
	const { title, primary_tag, readTime, published_at, primary_author, slug, content } = filteredPost;

	return { title, primary_tag, readTime, published_at, primary_author, slug, content };
};

export { getPost, getPosts };
