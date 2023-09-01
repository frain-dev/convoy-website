import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type DocProps = {
	title: string;
	description: string;
	content: any;
	slug: string;
	isError?: boolean;
};

const getFiles = async (dir, files: string[] = []) => {
	// Get an array of all files and directories in the passed directory using fs.readdirSync
	const fileList = fs.readdirSync(dir);
	// Create the full path of the file/directory by concatenating the passed directory and file/directory name
	for (const file of fileList) {
		const name = `${dir}/${file}`;
		// Check if the current file/directory is a directory using fs.statSync
		if (fs.statSync(name).isDirectory()) {
			// If it is a directory, recursively call the getFiles function with the directory path and the files array
			getFiles(name, files);
		} else {
			// If it is a file, push the full path to the files array
			files.push(name);
		}
	}
	return files;
};

const fetchDocSlugs = async () => {
	const docs = await getFiles('src/app/(docs)/docs/documentation');

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
	return { ...data, content, isError } as DocProps;
};

const getDocumentation = async paramSlug => {
	try {
		const filePath = `src/app/(docs)/docs/documentation/${paramSlug}.md`;
		const docContent = await fetchDocContent(filePath);
		return { ...docContent, slug: paramSlug };
	} catch {
		const filePath = `src/app/(docs)/docs/documentation/404.md`;
		const docContent = await fetchDocContent(filePath);
		return { ...docContent, slug: '404' };
	}
};

export { getDocumentation, fetchDocSlugs };
