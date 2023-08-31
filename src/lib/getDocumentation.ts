import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type DocProps = {
	title: string;
	description: string;
	content: any;
	slug: string;
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

const fetchAllDocumentation = async () => {
	const docs = await getFiles('src/app/(docs)/docs/documentation');

	return Promise.all(
		docs.map(async (file: string) => {
			const subFolders = file.split('/').slice(4, -1);
			const slugArray = [...subFolders, path.basename(file, path.extname(file))];
			const slug = slugArray.join('/');
			const docContent = await fs.readFileSync(file, 'utf-8');
			const { data, content } = matter(docContent);
			return { ...data, slug, content } as DocProps;
		})
	);
};

const getDocumentation = async paramSlug => {
	const filePath = `src/app/(docs)/docs/documentation/${paramSlug}.md`
	const docContent = await fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(docContent);
	return { ...data, slug: paramSlug, content } as DocProps;
};

export default getDocumentation;
