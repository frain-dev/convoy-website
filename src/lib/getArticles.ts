import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type ArticleProps = {
	title: string;
	description: string;
	content: any;
	slug: string;
	index: number;
	isError?: boolean;
};

const getFiles = async (dir, files: string[] = []) => {
	const fileList = fs.readdirSync(dir);
	for (const file of fileList) {
		const name = `${dir}/${file}`;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files);
		} else {
			files.push(name);
		}
	}
	return files;
};

const fetchDocSlugs = async () => {
	const docs = await getFiles('src/app/(api)/articles');

	return Promise.all(
		docs.map(async (file: string) => {
			const subFolders = file.split('/').slice(5, -1);
			const slugArray = [...subFolders, path.basename(file, path.extname(file))];
			return { slugArray };
		})
	);
};


const fetchDocContent = async (filePath: string) => {
	const docContent = await fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(docContent);
	const isError = filePath.includes('404');
	return { ...data, content, isError } as ArticleProps;
};

const getArticle = async paramSlug => {
	try {
		const filePath = `src/app/(api)/articles/${paramSlug}.md`;
		const docContent = await fetchDocContent(filePath);
		return { ...docContent, slug: paramSlug };
	} catch {
		const filePath = `src/app/(api)/articles/404.md`;
		const docContent = await fetchDocContent(filePath);
		return { ...docContent, slug: '404' };
	}
};

export { getArticle, fetchDocSlugs };