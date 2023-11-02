'use client';
import '../globals.scss';
import Image from 'next/image';
import SearchInput from './docs/components/SearchInput';
import Link from 'next/link';
import data from '../data/nav.json';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

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
		<html lang="en" style={{ scrollBehavior: 'smooth' }}>
			<body suppressHydrationWarning={true}>
				<div className="w-full desktop:flex">
					<div className="bg-light-blue">
						<div
							className={`desktop:max-w-[268px] desktop:min-w-[268px] desktop:w-full desktop:ml-[max(0px,calc((100vw-(268px+1200px))/2))] h-screen overflow-y-auto no-scrollbar transition-all duration-300 z-50 fixed desktop:static ${
								showMenu ? 'bg-light-blue w-268px' : 'w-0 overflow-x-hidden'
							}`}>
							<div className="px-24px py-50px">
								<div className="flex items-center mb-20px">
									<button
										className="px-0 py-0 border border-grey-10 bg-white-100 rounded-100px w-24px h-24px desktop:hidden flex items-center justify-center mr-10px"
										onClick={() => setShowMenu(!showMenu)}>
										<Image
											src="/doc-icons/collapse.svg"
											alt="collapse icon"
											width={10}
											height={10}
											className={`transition duration-150 ${showMenu ? 'rotate-180' : ''}`}
										/>
									</button>

									<Link href="/docs">
										<Image src="/svg/convoy.svg" alt="Convoy Logo" width={128} height={22} priority className="w-128px" />
									</Link>
								</div>

								<SearchInput />

								<div className="flex items-center gap-16px mt-22px">
									<Link href="https://github.com/frain-dev/convoy" className="bg-transparent flex items-center text-12 text-gray-600">
										<Image className="mr-8px w-14px" src="/svg/github.svg" alt="Github Logo" width={14} height={14} priority />
										Github
									</Link>
									<Link
										href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ"
										className="bg-transparent flex items-center text-12 text-gray-600">
										<Image className="mr-8px w-10px" src="/svg/slack.svg" alt="Slack Logo" width={11} height={11} priority />
										Community
									</Link>
								</div>

								<div className="h-[1px] w-full bg-primary-25 mt-30px"></div>

								<Link href="https://convoy.readme.io/" className="flex items-center text-gray-500 text-12 my-16px w-full">
									API Reference
									<Image className="ml-10px w-12px" src="/svg/arrow-top-right.svg" alt="Arrow top right icon" width={12} height={12} />
								</Link>

								<div className="h-[1px] w-full bg-primary-25 mb-30px"></div>

								<ul>
									{data.map((item, i) => (
										<li className="mb-34px" key={i}>
											{item.children && (
												<Link
													href={item.children[0].link}
													className={`flex justify-items-center transition-all duration-300 text-12 ${
														isChildRouteActive(item.title) ? 'text-primary-400' : 'text-gray-500'
													} `}>
													<img
														src={`/doc-icons/${item.icon}${isChildRouteActive(item.title) ? '-active' : ''}.svg`}
														alt={`${item.icon}-icon`}
														className="mr-8px transition-all duration-300"
													/>
													
													{item.title}
												</Link>
											)}
											{!item.children && (
												<Link
													href={item.link}
													className={`flex justify-items-center transition-all duration-300 text-12 ${
														item.link === pathname ? 'text-primary-400' : 'text-gray-500'
													} `}>
													<img
														src={`/doc-icons/${item.icon}${isChildRouteActive(item.title) ? '-active' : ''}.svg`}
														alt={`${item.icon}-icon`}
														className="mr-8px transition-all duration-300"
													/>
													
													{item.title}
												</Link>
											)}

											{item.children && (
												<ul className={`mt-24px border-l-2 border-primary-50 transition-all duration-300`}>
													{item.children.map((subItem, index) => (
														<li
															className={`mb-24px -ml-2px transition-all duration-400 text-12 text-gray-400  ${
																pathname.includes(subItem.link)
																	? 'border-l-2 border-primary-400 text-primary-400 font-normal'
																	: 'text-gray-400 font-light'
															}`}
															key={index}>
															<Link href={subItem.link} onClick={() => setCurrentDoc(subItem.link)} className="pl-24px">
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

					<div className="bg-white shadow-layout w-full relative">
						<div
							className="h-screen desktop-min:max-w-[1200px] desktop-min:w-full desktop-min:mr-[max(0px,calc((100vw-(268px+1200px))/2))] overflow-y-auto no-scrollbar"
							id="docPage">
							<div className="flex desktop:hidden items-center p-16px shadow-sm">
								<button
									className="px-0 py-0 border border-grey-10 bg-white-100 rounded-100px w-30px h-30px flex items-center justify-center"
									onClick={() => setShowMenu(!showMenu)}>
									<Image src="/doc-icons/collapse.svg" alt="collapse icon" width={12} height={12} priority className="w-12px" />
								</button>
								<Image className="ml-10px w-110px" src="/svg/convoy.svg" alt="Convoy Logo" width={110} height={22} priority />
							</div>

							{children}
						</div>
					</div>
				</div>

				<svg display="none" className="hidden">
					<symbol width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="angle-down-icon">
						<path d="M11.3333 6.11333C11.2084 5.98916 11.0395 5.91946 10.8633 5.91946C10.6872 5.91946 10.5182 5.98916 10.3933 6.11333L8.00001 8.47333L5.64001 6.11333C5.5151 5.98916 5.34613 5.91946 5.17001 5.91946C4.99388 5.91946 4.82491 5.98916 4.70001 6.11333C4.63752 6.1753 4.58792 6.24904 4.55408 6.33027C4.52023 6.41151 4.50281 6.49865 4.50281 6.58666C4.50281 6.67467 4.52023 6.7618 4.55408 6.84304C4.58792 6.92428 4.63752 6.99802 4.70001 7.05999L7.52667 9.88666C7.58865 9.94914 7.66238 9.99874 7.74362 10.0326C7.82486 10.0664 7.912 10.0839 8.00001 10.0839C8.08801 10.0839 8.17515 10.0664 8.25639 10.0326C8.33763 9.99874 8.41136 9.94914 8.47334 9.88666L11.3333 7.05999C11.3958 6.99802 11.4454 6.92428 11.4793 6.84304C11.5131 6.7618 11.5305 6.67467 11.5305 6.58666C11.5305 6.49865 11.5131 6.41151 11.4793 6.33027C11.4454 6.24904 11.3958 6.1753 11.3333 6.11333Z" />
					</symbol>

					<symbol width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="arrow-circle-icon">
						<path
							d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
							fill="transparent"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M7.16 10.3533L9.50667 8L7.16 5.64667" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</symbol>
				</svg>
			</body>
			<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />

			<Script strategy="lazyOnload">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
					page_path: window.location.pathname,
					});
				`}
			</Script>
		</html>
	);
}
