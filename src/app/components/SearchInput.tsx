import Image from 'next/image';
// import { DocSearch } from '@docsearch/react';

import '@docsearch/css';

export default function SearchInput() {
	return (
		<div>
			{/* <DocSearch appId="R2IYF7ETH7" apiKey="599cec31baffa4868cae4e79f180729b" indexName="docsearch" /> */}
			<div className="border border-grey-20 bg-white-100 py-6px px-8px rounded-4px w-full flex items-center">
				<Image src="/search.svg" alt="Search icon" width={12} height={12} priority />
				<input type="text" placeholder="Search doc" className="ml-10px w-full h-20px placeholder:text-grey-40 text-grey-100 text-12" />
			</div>
		</div>
	);
}
