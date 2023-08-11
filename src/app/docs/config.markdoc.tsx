import { Config } from '@markdoc/markdoc';
import Heading from './(components)/heading';
import DocLink from './(components)/link';
import BlockQuote from './(components)/blockquote';
import DocImage from './(components)/image';
import CodeBlock from './(components)/codeblock';

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
		blockquote: {
			render: 'BlockQuote'
		},
		link: {
			render: 'DocLink',
			attributes: {
				href: {
					type: String
				}
			}
		},
		image: {
			render: 'DocImage',
			attributes: {
				src: { type: String },
				alt: { type: String }
			}
		},
		list: {
			render: 'List'
		},
		item: {
			render: 'Item'
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
		fence: {
			render: 'CodeBlock',
			attributes: {
				language: {
					type: String
				}
			}
		},
		code: {
			render: 'Code',
			attributes: {
				content: {
					type: String
				}
			}
		}
	},
	tags: {}
};

const components = {
	Heading,
	Paragraph: ({ children }: any) => {
		return <div className="text-14 text-gray-600 leading-7 mb-20px">{children}</div>;
	},
	Strong: ({ children }: any) => {
		return <strong className="font-semibold">{children}</strong>;
	},
	List: ({ children }: any) => {
		return <ul className="mb-20px list-disc">{children}</ul>;
	},
	Item: ({ children }: any) => {
		return <li className="text-14 text-gray-600 mb-8px">{children}</li>;
	},
	Table: ({ children }: any) => {
		return <table className="my-20px">{children}</table>;
	},
	Th: ({ children }: any) => {
		return <th className="pr-50px py-10px border-t border-primary-50 text-14 text-gray-600 whitespace-nowrap text-left font-semibold">{children}</th>;
	},
	Td: ({ children }: any) => {
		return <td className="pr-50px py-10px border-t border-primary-50 text-14 text-gray-600 text-left font-normal">{children}</td>;
	},
	DocLink,
	BlockQuote,
	DocImage,
	CodeBlock,
	Code: ({ content }: any) => {
		return <code className="text-12 text-gray-800 bg-grey-20 font-menlo rounded-4px py-2px px-8px">{content}</code>;
	}
};

export { config, components };
