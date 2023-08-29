'use client';
import Image from 'next/image';
import SearchInput from '@/app/components/SearchInput';
import Link from 'next/link';
import data from '../../data/nav.json';
import Button from '@/app/components/Button';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	const [showMenu, setShowMenu] = useState(true);
	const [activeContent, setCurrentContent] = useState('');
	const [currentDoc, setCurrentDoc] = useState('');
	const pathname = usePathname();
	const isChildRouteActive = (parentRoute: any) => {
		const childrenRoutes = data.find(item => item.title === parentRoute)?.children;

		return childrenRoutes?.some(route => route.link === pathname);
	};

	const showChildren = (title: string) => {
		if (title === activeContent) setCurrentContent('title');
		else setCurrentContent(title);
	};

	return (
		<section>
			<div className="w-full desktop-min:flex">
				<div className="bg-light-blue">
					<div
						className={`desktop-min:max-w-[268px] desktop-min:min-w-[268px] desktop-min:w-full desktop-min:ml-[max(0px,calc((100vw-(268px+1200px))/2))] h-screen overflow-y-auto no-scrollbar transition-all duration-300 z-50 fixed desktop-min:static ${
							showMenu ? 'bg-light-blue w-268px' : 'w-0 overflow-x-hidden'
						}`}>
						<div className="px-24px py-50px">
							<div className="flex items-center mb-20px">
								<button
									className="px-0 py-0 border border-grey-10 bg-white-100 rounded-100px w-30px h-30px desktop-min:hidden flex items-center justify-center mr-10px"
									onClick={() => setShowMenu(!showMenu)}>
									<Image
										src="/doc-icons/collapse.svg"
										alt="collapse icon"
										width={12}
										height={12}
										className={`transition duration-150 ${showMenu ? 'rotate-180' : ''}`}
									/>
								</button>

								<Link href="/docs">
									<Image src="/svg/convoy.svg" alt="Convoy Logo" width={128} height={22} priority />
								</Link>
							</div>

							<SearchInput />

							<div className="flex items-center justify-between mt-22px">
								<Link href="https://github.com/frain-dev/convoy" className="bg-transparent flex items-center text-10 text-gray-600">
									<Image className="mr-8px" src="/svg/github.svg" alt="Github Logo" width={14} height={14} priority />
									Star on Github
								</Link>
								<Link
									href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ"
									className="bg-transparent flex items-center text-10 text-gray-600">
									<Image className="mr-8px" src="/svg/slack.svg" alt="Slack Logo" width={11} height={11} priority />
									Join our Community
								</Link>
							</div>

							<Link href="https://convoy.readme.io/" className="flex items-center text-gray-500 text-14 mt-40px w-full">
								<Image className="mr-8px" src="/svg/link.svg" alt="Link icon" width={18} height={18} priority />
								API Reference
								<Image className="ml-auto" src="/svg/arrow-top-right.svg" alt="Arrow top right icon" width={12} height={12} priority />
							</Link>

							<div className="h-[1px] w-full bg-primary-25 my-40px"></div>

							<ul>
								{data.map((item, i) => (
									<li className="mb-34px" key={i}>
										{item.children && (
											<button
												className={`flex items-center text-14 transition-all duration-300 ${
													isChildRouteActive(item.title) ? 'text-primary-400' : 'text-gray-500'
												} `}
												onClick={() => showChildren(item.title)}>
												<svg
													width="18"
													height="18"
													className={`mr-8px transition-all duration-300 ${
														isChildRouteActive(item.title)
															? item.icon === 'introduction'
																? 'fill-primary-400'
																: 'stroke-primary-400'
															: item.icon === 'introduction'
															? 'fill-gray-500'
															: 'stroke-gray-500'
													} `}>
													<use xlinkHref={`#${item.icon}-icon`}></use>
												</svg>
												{item.icon === 'introduction'}
												{item.title}
											</button>
										)}
										{!item.children && (
											<Link href={item.link} className={`flex items-center text-14 ${item.link === pathname ? 'text-primary-400' : 'text-gray-500'} `}>
												<svg
													width="18"
													height="18"
													className={`mr-8px ${
														item.link === pathname
															? item.icon === 'introduction'
																? 'fill-primary-400'
																: 'stroke-primary-400'
															: item.icon === 'introduction'
															? 'fill-gray-500'
															: 'stroke-gray-500'
													}`}>
													<use xlinkHref={`#${item.icon}-icon`}></use>
												</svg>
												{item.title}
											</Link>
										)}

										{item.children && activeContent == item.title && (
											<ul className={`mt-24px border-l-2 border-primary-50 transition-all duration-300`}>
												{item.children.map((subItem, index) => (
													<li className={`mb-24px -ml-2px ${currentDoc == subItem.title ? 'border-l-2 border-primary-400' : ''}`} key={index}>
														<Link href={subItem.link} onClick={() => setCurrentDoc(subItem.link)} className="text-14 text-gray-500 pl-24px">
															{subItem.title}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<div className="bg-white shadow-layout desktop-min:w-full relative">
					<div className="hidden md-max:flex items-center px-24px pt-50px pb-24px">
						<button
							className="px-0 py-0 border border-grey-10 bg-white-100 rounded-100px w-30px h-30px flex items-center justify-center"
							onClick={() => setShowMenu(!showMenu)}>
							<Image src="/doc-icons/collapse.svg" alt="collapse icon" width={12} height={12} priority />
						</button>
						<Image className="ml-10px" src="/svg/convoy.svg" alt="Convoy Logo" width={128} height={22} priority />
					</div>
					<div className="h-screen desktop-min:max-w-[1200px] desktop-min:w-full desktop-min:mr-[max(0px,calc((100vw-(268px+1200px))/2))] overflow-y-auto no-scrollbar">
						{children}
					</div>
				</div>
			</div>
		</section>
	);
}
