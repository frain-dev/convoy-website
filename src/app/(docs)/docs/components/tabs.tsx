'use client';
import React, { useEffect } from 'react';

export const TabContext = React.createContext('');

export function Tabs({ labels, children }: any) {
	const [currentTab, setCurrentTab] = React.useState('');

	useEffect(() => {
		if (labels && labels.length) setCurrentTab(labels[0]);
	}, []);
	return (
		<TabContext.Provider value={currentTab}>
			{labels && labels.length && (
				<ul role="tablist" className="flex flex-row m-auto w-full mt-32px mb-24px border-b border-b-grey-10">
					{labels.map((label: string) => (
						<li key={label} className="mr-24px !list-none last-of-type:mr-0">
							<button role="tab" className={`pb-10px ${currentTab === label ? 'active' : ''}`} aria-selected={label === currentTab} onClick={() => setCurrentTab(label)}>
								<span className="text-14 text-left text-gray-800 tracking-[0.02em]">{label}</span>
							</button>
						</li>
					))}
				</ul>
			)}
			{children}
		</TabContext.Provider>
	);
}
