'use client';
import DocFooter from './docfooter';
import Contents from './content';
import { components, config } from '../config.markdoc';
import Markdoc from '@markdoc/markdoc';
import React, { useEffect } from 'react';

export default function DocPage({ docContent, tableOfContents }: any) {
	const handleScroll = e => {
		console.log('dsfsd ');
	};

	const ast = Markdoc.parse(docContent);
	const content = Markdoc.transform(ast, config);

	
	return (
		<>
			<div className="flex justify-center gap-100px max-w-[1023px] mx-auto px-24px">
				<div className="max-w-[676px] w-full pt-50px h-full" onScroll={handleScroll}>
					{Markdoc.renderers.react(content, React, { components })}
					<DocFooter></DocFooter>
				</div>

				<div className="hidden max-w-[247px] w-full sticky top-0 h-fit doc-tab:block pt-50px">
					<Contents tableOfContents={tableOfContents} />
				</div>
			</div>
		</>
	);
}
