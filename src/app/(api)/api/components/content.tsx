'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function Contents({ tableOfContents }: any) {
	const contents = tableOfContents.map(({ title, level }, i) => ({ title, level, index: i }));
	const [currentSection, setCurrentSection] = useState(contents[0]);

	const getHeadings = useCallback((tableOfContents: any) => {
		return tableOfContents.map((content: any) => {
			let el = document.getElementById(content.title);
			if (!el) return;

			let style = window.getComputedStyle(el);
			let scrollMt = parseFloat(style.scrollMarginTop);

			let top = window.scrollY + el.getBoundingClientRect().top - scrollMt;
			return { ...content, top };
		});
	}, []);

	const onScroll = useCallback(() => {
		console.log('doc');

		if (tableOfContents.length === 0) return;
		let headings = getHeadings(contents);
		let top = window.scrollY;
		let current = headings[0];
		for (let heading of headings) {
			if (top >= heading?.top) {
				current = heading;
			} else {
				break;
			}
		}
		setCurrentSection(current);
	}, []);

	const isLinkActive = (content: any) => {
		return currentSection.title === content.title && currentSection.index === content.index;
	};

	useEffect(() => {
		const doc = document.querySelector('#docPage');

		doc?.addEventListener('scroll', onScroll);

		return () => {
			doc?.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<div>
			<ul className="">
				{contents.map((content: any, index: number) => (
					<li key={index} className={`mb-16px transition-all`}>
						<Link
							href={`#${content.title}`}
							className={`text-16 transition-all font-medium flex items-center gap-12px ${isLinkActive(content) ? 'text-white-100' : ' text-white-40'} `}>
							<svg width="24" height="24">
								<use xlinkHref="#dash-icon" className={`${isLinkActive(content) ? 'stroke-white-100' : 'stroke-white-40'}`}></use>
							</svg>
							<span>{content.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
