'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
	const [githubStars, setGithubStars] = useState(0);
	const [showMenu, setShowMenu] = useState(false);
	const [currentRoute, setCurrentRoute] = useState('');
	const pathname = usePathname();
	// const isChildRouteActive = (parentRoute: any) => {
	// 	const childrenRoutes = menuItems.find(item => item.name === parentRoute)?.children;

	// 	return childrenRoutes?.some(route => pathname.includes(route.route));
	// };
	const menuItemsOld = [
		{
			name: 'Products',
			type: 'dropdown',
			children: [
				{ name: 'Community Edition', route: '/community', type: 'route' },
				{ name: 'Enterprise Edition', route: '/enterprise', type: 'route' },
				{ name: 'Convoy Cloud', route: '/cloud', type: 'route' },
				{ name: 'Convoy Playground', route: 'https://playground.getconvoy.io', type: 'external' }
			]
		},
		{ name: 'Pricing', route: '/pricing', type: 'route' },
		{
			name: 'Resources',
			type: 'dropdown',
			children: [
				{ name: 'Slack', route: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', type: 'external' },
				{ name: 'Blog', route: '/blog', type: 'route' },
				{ name: 'Docs', route: 'https://docs.getconvoy.io', type: 'external' },
				{ name: 'Tutorials', route: '/blog?tag=Tutorial', type: 'route' }
			]
		},
		{ name: 'Community', route: 'https://community.getconvoy.io', type: 'link' }
	];

	const menuItems = [
		{ name: 'Core Gateway', route: '/core-gateway', type: 'route' },
		{ name: 'Enterprise', route: '/enterprise', type: 'route' },
		{ name: 'Blog', route: '/blog', type: 'route' },
		{ name: 'Pricing', route: '/pricing', type: 'route' },
		{ name: 'About', route: '/about', type: 'route' }
	];

	const getGithubStars = async () => {
		try {
			const response = await fetch('https://api.github.com/repos/frain-dev/convoy');
			const data = await response.json();
			setGithubStars(data.stargazers_count);
		} catch (_error) {}
	};

	useEffect(() => {
		getGithubStars();
	}, []);

	return (
		<header>
			{!pathname.includes('/docs/') && (
				<nav className="w-full m-auto px-0px pt-0 pb-0 mobile:!py-4 nav-bar-break:!py-0 z-50 fixed nav-bar-break:pt-0 nav-bar-break:pb-0 transition-all duration-300 bg-white-100 border-b border-[#E7E7E7]">
					{/* <section className="fixed top-0 left-0 bg-primary-400 w-full h-40px py-8px px-12px flex items-center justify-center font-medium text-12 text-white-100 nav-bar-break:text-14">
						<span>Give us a star on GitHub</span>
						<a className="h-20px w-20px mx-12px hover:cursor-pointer" target="_blank" href="https://github.com/frain-dev/convoy">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.99875 0.20813C4.4775 0.20813 0 4.70313 0 10.2481C0 14.6831 2.865 18.4456 6.84 19.7744C7.34 19.8669 7.5225 19.5569 7.5225 19.2906C7.5225 19.0519 7.51375 18.4206 7.50875 17.5831C4.7275 18.1894 4.14 16.2369 4.14 16.2369C3.68625 15.0769 3.03 14.7681 3.03 14.7681C2.12125 14.1456 3.0975 14.1581 3.0975 14.1581C4.10125 14.2294 4.62875 15.1931 4.62875 15.1931C5.52125 16.7269 6.97 16.2844 7.54 16.0269C7.63 15.3781 7.88875 14.9356 8.175 14.6844C5.955 14.4306 3.62 13.5694 3.62 9.72313C3.62 8.62688 4.01 7.73063 4.65 7.02813C4.54625 6.77438 4.20375 5.75313 4.7475 4.37188C4.7475 4.37188 5.5875 4.10188 7.4975 5.40063C8.295 5.17813 9.15 5.06688 10.0013 5.06313C10.85 5.06813 11.7062 5.17813 12.505 5.40188C14.4137 4.10313 15.2525 4.37313 15.2525 4.37313C15.7975 5.75563 15.455 6.77563 15.3525 7.02938C15.9937 7.73188 16.38 8.62813 16.38 9.72438C16.38 13.5806 14.0425 14.4294 11.815 14.6781C12.1737 14.9881 12.4937 15.6006 12.4937 16.5369C12.4937 17.8794 12.4812 18.9619 12.4812 19.2906C12.4812 19.5594 12.6613 19.8719 13.1687 19.7731C17.1375 18.4431 20 14.6819 20 10.2481C20 4.70313 15.5225 0.20813 9.99875 0.20813Z"
									fill="white"
								/>
							</svg>
						</a>
						<a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy">
							<button className="bg-white-100 border border-primary-25 shadow-default rounded-4px text-primary-400 font-medium text-12 h-24px p-10px flex items-center ml-10px">
								<Image src="/svg/github-star.svg" height={16} width={16} className="mr-4px" alt="github star" />
								{githubStars}
							</button>
						</a>
					</section> */}

					<div className="flex items-center justify-between m-auto max-w-[1300px]">
						<div className="ml-20px nav-bar-break:w-fit nav-bar-break:ml-0 flex items-center justify-center gap-4">
							<Link href="/">
								<Image src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" quality="70" />
							</Link>

							<ul
								className={`mobile:absolute mobile:top-50px mobile:right-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-t-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500 ${
									showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'
								}`}>
								{menuItems.map(link => (
									<li
										className="py-14px nav-bar-break:py-8px px-12px border-b border-b-primary-25 last-of-type:border-none nav-bar-break:border-none relative"
										key={link.name}
										onClick={() => setCurrentRoute(link.name)}>
										{link.type === 'route' && link.route && (
											<Link
												className={`text-14 font-medium transition-all duration-300 hover:text-gray-800 ${
													pathname == link.route ? 'text-[#2780F1]' : 'text-[#000]'
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
										{link.type !== 'route' && link.type !== 'link' && (
											<div>
												{/* <a
													className={`text-14 font-medium flex items-center justify-between transition-all duration-300 hover:text-black hover:cursor-pointer group ${
														isChildRouteActive(link.name) ? 'text-primary-400' : 'text-gray-500'
													}`}>
													{link.name}
													<svg
														width="16"
														height="16"
														className={`transition-all duration-300 group-hover:fill-black ${
															isChildRouteActive(link.name) ? 'fill-primary-400' : 'fill-gray-500 '
														}`}>
														<use xlinkHref="#angle-down-icon"></use>
													</svg>
												</a> */}
												{currentRoute === link.name && (
													<div className="nav-bar-break:absolute nav-bar-break:top-[100%] nav-bar-break:shadow nav-bar-break:min-w-[198px] w-fit bg-white-100 rounded-10px nav-bar-break:shadow-dropdown nav-bar-break:z-10 transition-all ease-in-out duration-300 nav-bar-break:h-fit">
														<ul className="nav-bar-break:pl-20px nav-bar-break:pb-20px">
															{/* {link.children?.map(subRoute => (
																<li
																	className="py-10px nav-bar-break:pr-20px nav-bar-break:border-b nav-bar-break:border-b-gray-100"
																	v-for="subRoute in link.children"
																	key={subRoute.name}
																	onClick={event => {
																		event.stopPropagation();
																		setCurrentRoute('');
																		setShowMenu(false);
																	}}>
																	{subRoute.type === 'route' && (
																		<Link className="text-12 text-gray-500 transition-all duration-300 hover:text-black" href={subRoute.route}>
																			{subRoute.name}
																		</Link>
																	)}

																	{subRoute.type !== 'route' && (
																		<a
																			className="text-12 text-gray-500 transition-all duration-300 hover:text-black flex items-center"
																			target="_blank"
																			href={subRoute.route}>
																			{subRoute.name}
																			<span className="px-8px bg-primary-25 text-primary-400 ml-8px rounded-12px text-10">new</span>
																		</a>
																	)}
																</li>
															))} */}
														</ul>
													</div>
												)}
											</div>
										)}
									</li>
								))}
							</ul>
						</div>

						<ul
							className={`mobile:absolute mobile:top-[314px] mobile:right-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-b-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500 ${
								showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'
							}`}>
							<li className="py-14px nav-bar-break:py-14px px-12px flex items-center nav-bar-break:pr-0 nav-bar-break:pl-40px">
								<a
									target="_blank"
									href="https://cloud.getconvoy.io/login"
									className="nav-bar-break:px-16px py-10px text-14 mr-16px h-[40px] font-medium rounded-8px nav-bar-break:bg-white-100 nav-bar-break:text-[#000] text-[#2780F1] flex items-center justify-center nav-bar-break:border-[#E7E7E7] nav-bar-break:border nav-bar-break:shadow-btn">
									<span>Sign In</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none" className="hidden nav-bar-break:block ml-1 mt-[1px]">
										<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="black" />
									</svg>
								</a>
								<div className="block nav-bar-break:hidden h-18px w-[1px] bg-primary-25 mx-10px"></div>
								<a
									target="_blank"
									href="https://cloud.getconvoy.io/signup"
									className="px-12px py-10px text-14 font-medium rounded-8px h-10 nav-bar-break:bg-[#2780F1] nav-bar-break:text-white-100 text-[#2780F1] flex items-center">
									<span>Start your project</span>

									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="hidden nav-bar-break:block ml-1 mt-[1px]">
										<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
									</svg>
								</a>
							</li>
						</ul>

						<button className="block absolute nav-bar-break:hidden right-5" onClick={() => setShowMenu(!showMenu)}>
							{!showMenu && (
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<g clip-path="url(#clip0_2905_2221)">
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
				className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-[25px] transition-all duration-500 ${
					showMenu ? 'pointer-events-all opacity-100 z-[2]' : 'pointer-events-none opacity-0'
				}`}
				onClick={() => setShowMenu(!showMenu)}></div>

			{(currentRoute === 'Products' || currentRoute === 'Resources') && <div className="fixed w-screen h-screen top-0 left 0" onClick={() => setCurrentRoute('')}></div>}
		</header>
	);
}
