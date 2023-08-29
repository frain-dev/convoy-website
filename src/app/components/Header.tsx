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
	const isChildRouteActive = (parentRoute: any) => {
		const childrenRoutes = menuItems.find(item => item.name === parentRoute)?.children;

		return childrenRoutes?.some(route => pathname.includes(route.route));
	};
	const menuItems = [
		{
			name: 'Products',
			type: 'dropdown',
			children: [
				{ name: 'Community Edition', route: '/community', type: 'route' },
				{ name: 'Enterprise Edition', route: '/enterprise', type: 'route' },
				{ name: 'Convoy Cloud', route: '/cloud', type: 'route' },
				{ name: 'Convoy Playground', route: 'https://playground.getconvoy.io', type: 'external' },
				{ name: 'Nohooks', route: 'https://nohooks.io', type: 'external' }
			]
		},
		{ name: 'Pricing', route: '/pricing', type: 'route' },
		{
			name: 'Resources',
			type: 'dropdown',
			children: [
				{ name: 'Blog', route: '/blog', type: 'route' },
				{ name: 'Docs', route: '/docs', type: 'route' },
				{ name: 'Tutorials', route: '/blog?tag=Tutorial', type: 'route' }
			]
		},
		{ name: 'Community', route: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', type: 'link' }
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
				<nav className="w-full m-auto px-20px pt-60px pb-20px z-50 fixed left-[50%] -translate-x-1/2 translate-y-0 nav-bar-break:pt-50px nav-bar-break:pb-12px transition-all duration-300 bg-white-100 shadow-nav backdrop-blur-[18]">
					<section className="fixed top-0 left-0 bg-primary-400 w-full h-40px py-8px px-12px flex items-center justify-center font-medium text-12 text-white-100 nav-bar-break:text-14">
						<span>Give us a star on GitHub</span>
						<Link className="h-20px w-20px mx-12px hover:cursor-pointer" href="https://github.com/frain-dev/convoy">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9.99875 0.20813C4.4775 0.20813 0 4.70313 0 10.2481C0 14.6831 2.865 18.4456 6.84 19.7744C7.34 19.8669 7.5225 19.5569 7.5225 19.2906C7.5225 19.0519 7.51375 18.4206 7.50875 17.5831C4.7275 18.1894 4.14 16.2369 4.14 16.2369C3.68625 15.0769 3.03 14.7681 3.03 14.7681C2.12125 14.1456 3.0975 14.1581 3.0975 14.1581C4.10125 14.2294 4.62875 15.1931 4.62875 15.1931C5.52125 16.7269 6.97 16.2844 7.54 16.0269C7.63 15.3781 7.88875 14.9356 8.175 14.6844C5.955 14.4306 3.62 13.5694 3.62 9.72313C3.62 8.62688 4.01 7.73063 4.65 7.02813C4.54625 6.77438 4.20375 5.75313 4.7475 4.37188C4.7475 4.37188 5.5875 4.10188 7.4975 5.40063C8.295 5.17813 9.15 5.06688 10.0013 5.06313C10.85 5.06813 11.7062 5.17813 12.505 5.40188C14.4137 4.10313 15.2525 4.37313 15.2525 4.37313C15.7975 5.75563 15.455 6.77563 15.3525 7.02938C15.9937 7.73188 16.38 8.62813 16.38 9.72438C16.38 13.5806 14.0425 14.4294 11.815 14.6781C12.1737 14.9881 12.4937 15.6006 12.4937 16.5369C12.4937 17.8794 12.4812 18.9619 12.4812 19.2906C12.4812 19.5594 12.6613 19.8719 13.1687 19.7731C17.1375 18.4431 20 14.6819 20 10.2481C20 4.70313 15.5225 0.20813 9.99875 0.20813Z"
									fill="white"
								/>
							</svg>
						</Link>
						<a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy">
							<button className="bg-white-100 border border-primary-25 shadow-default rounded-4px text-primary-400 font-medium text-12 h-24px p-10px flex items-center ml-10px">
								<Image src="/svg/github-star.svg" height={16} width={16} className="mr-4px" alt="github star" />
								{githubStars}
							</button>
						</a>
					</section>

					<div className="flex items-center justify-between m-auto max-w-[1300px]">
						<button className="block absolute nav-bar-break:hidden" onClick={() => setShowMenu(!showMenu)}>
							{!showMenu && (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3 7H21" stroke="#477DB3" strokeWidth="1.5" strokeLinecap="round" />
									<path d="M3 12H21" stroke="#477DB3" strokeWidth="1.5" strokeLinecap="round" />
									<path d="M3 17H21" stroke="#477DB3" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							)}
							{showMenu && (
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18 6L6 18" stroke="#477DB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M6 6L18 18" stroke="#477DB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</button>

						<div className="ml-50px w-4/5 nav-bar-break:w-fit nav-bar-break:ml-0">
							<Link href="/">
								<Image src="/svg/convoy-logo.svg" height={29} width={110} alt="logo" />
							</Link>
						</div>

						<ul
							className={`mobile:absolute mobile:top-104px mobile:left-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500 ${
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
												pathname == link.route ? 'text-primary-400' : 'text-gray-600'
											}`}
											href={link.route}>
											{link.name}
										</Link>
									)}
									{link.type === 'link' && link.route && (
										<Link className="text-14 text-gray-600 font-medium transition-all duration-300 hover:text-black" href={link.route}>
											{link.name}
										</Link>
									)}
									{link.type !== 'route' && link.type !== 'link' && (
										<div>
											<a
												className={`text-14 font-medium flex items-center justify-between transition-all duration-300 hover:text-black hover:cursor-pointer group ${
													isChildRouteActive(link.name) ? 'text-primary-400' : 'text-gray-600'
												}`}>
												{link.name}
												<svg
													width="16"
													height="16"
													className={`transition-all duration-300 group-hover:fill-black ${
														isChildRouteActive(link.name) ? 'fill-primary-400' : 'fill-gray-600 '
													}`}>
													<use xlinkHref="#angle-down-icon"></use>
												</svg>
											</a>
											{currentRoute === link.name && (
												<div className="nav-bar-break:absolute nav-bar-break:top-[100%] nav-bar-break:min-w-[198px] w-fit bg-white-100 rounded-10px nav-bar-break:shadow-dropdown nav-bar-break:z-10 transition-all ease-in-out duration-300 nav-bar-break:h-fit">
													<ul className="nav-bar-break:pl-20px nav-bar-break:pb-20px">
														{link.children?.map(subRoute => (
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
																	<Link className="text-12 text-gray-600 transition-all duration-300 hover:text-black" href={subRoute.route}>
																		{subRoute.name}
																	</Link>
																)}

																{subRoute.type !== 'route' && (
																	<a
																		className="text-12 text-gray-600 transition-all duration-300 hover:text-black flex items-center"
																		href={subRoute.route}>
																		{subRoute.name}{' '}
																		<span className="px-8px bg-primary-25 text-primary-400 ml-8px rounded-12px text-10">new</span>
																	</a>
																)}
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									)}
								</li>
							))}

							<li className="py-14px nav-bar-break:py-8px px-12px flex items-center nav-bar-break:pr-0 nav-bar-break:pl-40px">
								<Link
									href="https://dashboard.getconvoy.io/login"
									className="nav-bar-break:px-10px py-10px text-14 mr-16px font-medium rounded-8px nav-bar-break:bg-primary-25 nav-bar-break:text-primary-400 text-primary-400 flex items-center">
									Sign In
								</Link>
								<div className="block nav-bar-break:hidden h-18px w-[1px] bg-primary-25 mx-12px"></div>
								<Link
									href="https://dashboard.getconvoy.io/signup"
									className="px-14px py-10px text-14 font-medium rounded-8px nav-bar-break:bg-primary-400 nav-bar-break:text-white-100 text-primary-400 flex items-center">
									Start your project
								</Link>
							</li>
						</ul>
						<Link
							href="https://dashboard.getconvoy.io/login"
							className="px-20px py-8px text-10 font-medium rounded-8px bg-primary-400 text-white-100 block nav-bar-break:hidden whitespace-nowrap">
							Get Started
						</Link>
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
