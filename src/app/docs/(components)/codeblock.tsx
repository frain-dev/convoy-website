import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';

type CodeBlockProps = {
	children: any;
	language: any;
	title?: any;
};

export default function CodeBlock({ children, title, language }: CodeBlockProps) {
	const highlightedCode = Prism.highlight(children, Prism.languages[language], language);

	return (
		<div>
			{title && <div>{title}</div>}
			<pre className={`language-${language} line-numbers`}>
				<code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
			</pre>
		</div>
	);
}
