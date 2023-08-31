'use client';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Router from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import Image from 'next/image';
import '@docsearch/css';

const docSearchConfig = {
	appId: process.env.NEXT_PUBLIC_SEARCH_APP_ID || '',
	apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
	indexName: 'docsearch'
};

function Hit({ hit, children }: any) {
	return <Link href={hit.url}>{children}</Link>;
}

export default function SearchInput() {
	let [isOpen, setIsOpen] = useState(false);
	let [modifierKey, setModifierKey] = useState('');

	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, [setIsOpen]);

	const onClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

	useEffect(() => {
		setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ');
	}, []);

	return (
		<>
			<button type="button" className="group border border-grey-20 bg-white-100 py-6px px-8px rounded-4px w-full flex items-center" onClick={onOpen}>
				<Image src="/svg/search.svg" alt="Search icon" width={12} height={12} priority />
				{modifierKey && (
					<kbd className="ml-auto hidden font-light text-12 text-gray-400 md:block">
						<kbd className="font-sans">{modifierKey}</kbd>
						<kbd className="font-sans">K</kbd>
					</kbd>
				)}
			</button>
			{isOpen &&
				createPortal(
					<DocSearchModal
						{...docSearchConfig}
						initialScrollY={window.scrollY}
						onClose={onClose}
						hitComponent={Hit}
						navigator={{
							navigate({ itemUrl }) {
								Router.push(itemUrl);
							}
						}}
					/>,
					document.body
				)}
		</>
	);
}
