'use client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function Contents({ tableOfContents }: any) {
	const [currentSection, setCurrentSection] = useState(tableOfContents[0]?.title);

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
		if (tableOfContents.length === 0) return;
		let headings = getHeadings(tableOfContents);
		let top = window.scrollY;
		let current = headings[0]?.title;
		for (let heading of headings) {
			if (top >= heading?.top) {
				current = heading.title;
			} else {
				break;
			}
		}
		setCurrentSection(current);
	}, []);

	const isLinkActive = (title: string) => {
		return currentSection === title;
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
			<p className="text-gray-500 text-14">On this page</p>
			<ul className="mt-24px border-l border-primary-50">
				{tableOfContents.map((content: any, index: number) => (
					<li key={index} className={`mb-16px -ml-[1px] transition-all pl-24px ${isLinkActive(content.title) ? 'border-l border-success-400' : ''}`}>
						<Link href={`#${content.title}`} className={`text-12 transition-all font-medium ${isLinkActive(content.title) ? 'text-success-400' : 'text-gray-500'}`}>
							{content.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
