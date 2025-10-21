'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { OptimizedImage } from './OptimizedImaged';
import RegionDropdown from './RegionDropdown';

export default function Header() {
	const [showMenu, setShowMenu] = useState(false);
	const [currentRoute, setCurrentRoute] = useState('');
	const pathname = usePathname();

	const menuItems = [
		{ name: 'Core Gateway', route: '/core-gateway', type: 'route' },
		{ name: 'Documentation', route: '/docs', type: 'route' },
		{ name: 'Blog', route: '/blog', type: 'route' },
		{ name: 'Changelog', route: '/changelog', type: 'route' },
		{ name: 'Pricing', route: '/pricing', type: 'route' },
		{ name: 'About', route: '/aboutus', type: 'route' }
	];

	return (
		<header>
			{!pathname.includes('/docs/') && (
				<nav className="w-full m-auto px-0px pt-0 pb-0 mobile:!py-4 nav-bar-break:!py-0 z-[150] fixed nav-bar-break:pt-0 nav-bar-break:pb-0 transition-all duration-300 bg-white-100 border-b border-[#E7E7E7]">
					<div className="flex items-center justify-between m-auto max-w-[1300px]">
						<div className="ml-20px nav-bar-break:w-fit nav-bar-break:ml-20px flex items-center justify-center gap-4">
							<Link href="/">
								<OptimizedImage src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" priority />
							</Link>

							<ul
								className={`mobile:absolute mobile:top-50px mobile:right-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-t-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500 ${
									showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'
								}`}>
								{menuItems.map(link => (
									<li
										className="py-14px nav-bar-break:py-8px px-12px border-b border-b-primary-25 last-of-type:border-none nav-bar-break:border-none relative"
										key={link.name}
										onClick={() => {
											setCurrentRoute(link.name);
											setShowMenu(false);
										}}>
										{link.type === 'route' && link.route && (
											<Link
												className={`text-14 font-medium hover:opacity-75 transition-all ${
													pathname == link.route ? 'text-[#2780F1] hover:opacity-100' : 'text-[#000]'
												}`}
												href={link.route}>
												{link.name}
											</Link>
										)}
										{link.type === 'link' && link.route && (
											<a className="text-14 text-[#000] font-medium transition-all duration-300 hover:text-black" target="_blank" href={link.route}>
												{link.name}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>

						<ul
							className={`mobile:absolute mobile:top-[314px] nav-bar-break:pr-20px mobile:right-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-b-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500 ${
								showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'
							}`}>
							<li className="py-14px nav-bar-break:py-14px pl-12px flex items-center nav-bar-break:pr-0 nav-bar-break:pl-40px">
								<RegionDropdown 
									buttonText="Sign In" 
									baseUrl="/login" 
									variant="secondary"
								/>
								<div className="block nav-bar-break:hidden h-18px w-[1px] bg-primary-25 mx-5px"></div>
								<RegionDropdown 
									buttonText="Get started for free" 
									baseUrl="/signup" 
									variant="primary"
								/>
							</li>
						</ul>

						<button className="block absolute nav-bar-break:hidden right-5" onClick={() => setShowMenu(!showMenu)}>
							{!showMenu && (
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<g clipPath="url(#clip0_2905_2221)">
										<path
											d="M18.8235 2.95206H1.17647C1.0154 2.95206 0.848547 2.88131 0.716524 2.73435C0.582916 2.58563 0.5 2.37349 0.5 2.14253C0.5 1.91157 0.582916 1.69943 0.716524 1.55071C0.848547 1.40376 1.0154 1.33301 1.17647 1.33301H18.8235C18.9846 1.33301 19.1515 1.40376 19.2835 1.55071C19.4171 1.69943 19.5 1.91157 19.5 2.14253C19.5 2.3735 19.4171 2.58564 19.2835 2.73435C19.1515 2.88131 18.9846 2.95206 18.8235 2.95206ZM18.8235 10.8092H1.17647C1.0154 10.8092 0.848547 10.7384 0.716524 10.5915C0.582916 10.4428 0.5 10.2306 0.5 9.99967C0.5 9.76871 0.582916 9.55657 0.716524 9.40785C0.848547 9.2609 1.0154 9.19015 1.17647 9.19015H18.8235C18.9846 9.19015 19.1515 9.2609 19.2835 9.40786C19.4171 9.55657 19.5 9.76871 19.5 9.99967C19.5 10.2306 19.4171 10.4428 19.2835 10.5915C19.1515 10.7384 18.9846 10.8092 18.8235 10.8092ZM18.8235 18.6663H1.17647C1.0154 18.6663 0.848546 18.5956 0.716525 18.4486C0.582917 18.2999 0.5 18.0878 0.5 17.8568C0.5 17.6259 0.582917 17.4137 0.716524 17.265C0.848546 17.118 1.0154 17.0473 1.17647 17.0473H18.8235C18.9846 17.0473 19.1515 17.118 19.2835 17.265C19.4171 17.4137 19.5 17.6259 19.5 17.8568C19.5 18.0878 19.4171 18.2999 19.2835 18.4486C19.1515 18.5956 18.9846 18.6663 18.8235 18.6663Z"
											fill="#6B7280"
											stroke="#6B7280"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2905_2221">
											<rect width="20" height="20" fill="white" />
										</clipPath>
									</defs>
								</svg>
							)}
							{showMenu && (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18 6L6 18" stroke="#477DB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M6 6L18 18" stroke="#477DB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</button>
					</div>
				</nav>
			)}

			<div
				className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-[25px] transition-all duration-300 ${
					showMenu ? 'pointer-events-all opacity-100 z-[100]' : 'pointer-events-none opacity-0'
				}`}
				onClick={() => setShowMenu(!showMenu)}></div>

			{(currentRoute === 'Products' || currentRoute === 'Resources') && <div className="fixed w-screen h-screen top-0 left 0" onClick={() => setCurrentRoute('')}></div>}
		</header>
	);
}
