'use client';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { useEffect } from 'react';
import * as React from 'react';

type CodeBlockProps = {
	children: any;
	language: any;
	file?: any;
};

export default function CodeBlock({ children, file, language }: CodeBlockProps) {
	useEffect(() => {
		Prism.highlightAll();
	}, []);
	
	return (
		<div className="border border-primary-50 rounded-8px mb-32px bg-[#F9F9FB]">
			{file && <div className="py-8px px-12px rounded-tl-8px rounded-tr-8px text-12 text-gray-600 bg-[#F3F3F8]">{file}</div>}
			<pre className={`language-${language} line-numbers`}>
				<code className={`language-${language} line-numbers`}>{children}</code>
			</pre>
		</div>
	);
}
