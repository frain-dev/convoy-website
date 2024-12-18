import { Config } from '@markdoc/markdoc';
import Link from 'next/link';
import Heading from './components/heading';
import CodeBlock from './components/codeblock';
import EmbeddedTweet from './components/tweet';
import InstagramEmbed from './components/instagramEmbed';
import BlockQuote from './components/blockquote';

const config: Config = {
	nodes: {
		heading: {
			render: 'Heading',
			attributes: {
				level: { type: Number }
			}
		},
		paragraph: {
			render: 'Paragraph'
		},
		strong: {
			render: 'Strong'
		},
		list: {
			render: 'List',
			attributes: {
				ordered: { type: Boolean }
			}
		},
		item: {
			render: 'Item'
		},
		link: {
			render: 'Link',
			attributes: {
				href: {
					type: String
				}
			}
		},
		image: {
			render: 'Image',
			attributes: {
				src: { type: String },
				alt: { type: String }
			}
		},
		table: {
			render: 'Table'
		},
		th: {
			render: 'Th'
		},
		td: {
			render: 'Td'
		},
		code: {
			render: 'Code',
			attributes: {
				content: {
					type: String
				}
			}
		},
		fence: {
			render: 'CodeBlock',
			attributes: {
				language: {
					type: String
				},
				file: {
					type: String
				}
			}
		},
		blockquote: {
			render: 'BlockQuote'
		}
	},
	tags: {
		tweet: {
			render: 'EmbeddedTweet',
			attributes: {
				url: {
					type: String
				}
			}
		},
		instagramPost: {
			render: 'InstagramEmbed',
			attributes: {
				url: {
					type: String
				}
			}
		}
	}
};

const components = {
	Heading,
	Paragraph: ({ children }: any) => {
		return <p className="text-14 leading-7 text-gray-500 mb-20px">{children}</p>;
	},
	Strong: ({ children }: any) => {
		return <strong className="font-semibold">{children}</strong>;
	},
	List: ({ children, ordered }: any) => {
		return ordered 
			? <ol className="list-decimal mb-20px ml-16px">{children}</ol>
			: <ul className="list-disc mb-20px ml-16px">{children}</ul>;
	},
	Item: ({ children }: any) => {
		return <li className="text-14 text-gray-600 mb-8px">{children}</li>;
	},
	Link: ({ children, href }: any) => {
		return (
			<Link href={href} className="text-success-400 underline" replace={false}>
				{children}
			</Link>
		);
	},
	Image: ({ src, alt }: any) => {
		return (
			<div className="my-30px m-auto border border-primary-50 rounded-10px">
				<img src={src} alt={alt} className="rounded-10px" />
			</div>
		);
	},
	Table: ({ children }: any) => {
		return <table className="mt-20px mb-32px">{children}</table>;
	},
	Th: ({ children }: any) => {
		return <th className="pr-20px pl-0 py-10px border-t border-primary-50 text-14 text-gray-600 whitespace-nowrap text-left font-medium">{children}</th>;
	},
	Td: ({ children }: any) => {
		return <td className="pr-20px pl-0 py-10px border-t border-primary-50 text-14 text-gray-600 text-left font-normal">{children}</td>;
	},
	Code: ({ content }: any) => {
		return <code className="text-12 text-gray-800 bg-grey-20 font-menlo rounded-4px py-2px px-8px my-0 mx-[1px]">{content}</code>;
	},
	CodeBlock,
	EmbeddedTweet,
	InstagramEmbed,
	BlockQuote
};

export { config, components };
