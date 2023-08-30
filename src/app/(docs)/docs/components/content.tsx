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
		console.log('fsds ');
		if (tableOfContents.length === 0) return;
		let headings = getHeadings(tableOfContents);
		let top = window.scrollY;
		let current = headings[0].title;
		for (let heading of headings) {
			if (top >= heading.top) {
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
		const docTemplate = document.querySelector('#DocTemplate');

		const handleScroll = ({ target }) => {
			console.log(target.scrollTop);
		};

		docTemplate?.addEventListener('scroll', handleScroll, false);
		console.log(docTemplate);

		// onScroll();
		return () => {
			docTemplate?.removeEventListener('scroll', handleScroll);
		};
	}, [getHeadings, tableOfContents]);

	return (
		<div>
			<p className="text-gray-500 text-14">On this page</p>
			<ul className="mt-24px border-l border-primary-50">
				{tableOfContents.map((content: any, index: number) => (
					<li
						key={index}
						className={`mb-16px -ml-[1px] pl-24px ${isLinkActive(content.title) ? 'border-l border-success-400' : ''}`}
						onClick={() => setCurrentSection(content.title)}>
						<Link href={`#${content.title}`} className={`text-14  ${isLinkActive(content.title) ? 'text-success-400' : 'text-gray-500'}`}>
							{content.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
