import Blog from './components/blog';
import { getPosts } from '@/lib/getPosts';

export default async function BlogsPage() {
	const articles = await getPosts();

	return <Blog articles={articles} />;
}
