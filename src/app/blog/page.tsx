import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Blog from './components/blog';

export const getPosts = async () => {
	const posts = await fs.readdir('src/app/blog/articles');

	return Promise.all(
		posts
			.filter(file => path.extname(file) === '.md')
			.map(async file => {
				const filePath = `src/app/blog/articles/${file}`;
				const postContent = await fs.readFile(filePath, 'utf8');
				const { data } = matter(postContent);

				if (data.published === false) {
					return null;
				}

				return { ...data };
			})
	);
};

export default async function BlogsPage() {
	const articles = await getPosts();
	articles.sort((a, b) => {
		return Number(new Date(b.published_at)) - Number(new Date(a.published_at));
	});
	return <Blog articles={articles} />;
}
