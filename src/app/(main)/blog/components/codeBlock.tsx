'use client';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-python';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { useEffect } from 'react';

type CodeBlockProps = {
	children: any;
	language: any;
	title?: any;
};

export default function CodeBlock({ children, language, title }: CodeBlockProps) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	return (
		<>
			{title && <div>{title}</div>}
			<pre className={`language-${language} line-numbers`}>
				<code className={`language-${language} line-numbers`}>{children}</code>
			</pre>
		</>
	);
}
