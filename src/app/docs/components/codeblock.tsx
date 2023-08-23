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

// export default function CodeBlock({ children, title, language }: CodeBlockProps) {
// 	const highlightedCode = Prism.highlight(children, Prism.languages[language], language);

// 	return (
// 		<div>
// 			{title && <div>{title}</div>}
// 			<pre className={`language-${language} line-numbers`}>
// 				<code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
// 			</pre>
// 		</div>
// 	);
// }

export default function CodeBlock({ children, language }: CodeBlockProps) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	return (
		<pre className={`language-${language} line-numbers`}>
			<code className={`language-${language} line-numbers`}>{children}</code>
		</pre>
	);
}
