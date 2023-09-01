import Blog from './components/blog';
import { getPosts } from '@/lib/getPosts';

export default async function BlogsPage() {
	const articles = await getPosts();
	const filteredArticles = articles.filter(article => !article.isError);

	return <Blog articles={filteredArticles} />;
}
