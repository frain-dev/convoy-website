'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import SOCIcon from '../../../public/svg/soc-stamp.svg';
import GithubIcon from '../../../public/svg/github-icon.svg';
import SlackIcon from '../../../public/svg/slack-icon.svg';
import MailIcon from '../../../public/svg/mail-icon.svg';
import TwitterIcon from '../../../public/svg/twitter-icon.svg';
import LinkedInIcon from '../../../public/svg/linkedin.svg';
import { usePathname } from 'next/navigation';
import { useToaster } from '@/hooks/notification';
import { isExternal } from 'util/types';

export default function Footer() {
	const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const inputRef = useRef<HTMLInputElement>(null);
	const pathname = usePathname();
	const footerLinks = [
		{
			title: 'Company',
			links: [
				{ name: 'About Us', link: '/aboutus', isExternal: false },
				{ name: 'Trust Center', link: 'https://trust.getconvoy.io/', isExternal: true },
				{ name: 'Terms of Use', link: '/legal/Terms-of-Use-Convoy.pdf', isExternal: true },
				{ name: 'Privacy Policy', link: '/legal/Privacy-Policy-Convoy.pdf', isExternal: true }
			]
		},
		{
			title: 'Product',
			links: [
				{ name: 'Open Source', link: 'http://github.com/frain-dev/convoy', isExternal: true },
				{ name: 'Core Gateway', link: '/core-gateway', isExternal: false },
				{ name: 'Cloud', link: 'https://cloud.getconvoy.io/login', isExternal: true },
				{ name: 'Convoy Playground', link: 'https://playground.getconvoy.io', isExternal: true }
			]
		},

		{
			title: 'Resources',
			links: [
				{ name: 'API Reference', link: 'https://docs.getconvoy.io/api-reference', isExternal: true },
				{ name: 'Documentation', link: 'https://docs.getconvoy.io', isExternal: true },
				{ name: 'Status Page', link: 'https://status.getconvoy.io', isExternal: true },
				{ name: 'Roadmap', link: 'https://github.com/orgs/frain-dev/projects/6', isExternal: true },
				{ name: 'What are Webhooks?', link: '/what-are-webhooks', isExternal: false },
				{ name: 'Convoy vs. Internal Implementation', link: '/convoy-vs-internal-implementation', isExternal: false }
			]
		},
		{
			title: 'Speak to us',
			links: [
				{ name: 'Slack', link: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', isExternal: true },
				{ name: 'Community', link: 'https://community.getconvoy.io', isExternal: true }
			]
		}
	];
	const subscribeToNewsletter = async (event: React.FormEvent) => {
		event.preventDefault();
		setStatus('submitting');
		try {
			const response = await fetch('https://newsletter.getconvoy.io/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: inputRef.current?.value || ''
				})
			});
			if (!response.ok) {
				throw new Error('Failed to subscribe');
			}
			await response.json();
			setStatus('success');
			if (inputRef.current) inputRef.current.value = '';
			setTimeout(() => {
				setStatus('idle');
			}, 5000);
		} catch (error) {
			console.error('Subscription error:', error);
			setStatus('error');
			setTimeout(() => {
				setStatus('idle');
			}, 5000);
		}
	};

	return (
		<>
			{!pathname.includes('/docs/') && (
				<footer className="bg-white-100 text-[#000] py-40px desktop:py-60px px-20px border-t border-[#ebebeb]">
					<div className="max-w-[1200px] m-auto">
						<nav className="flex justify-between flex-wra p pb-px footer:block">
							<div className="mobile:w-full mobile:mb-40px">
								<div>
									<Image src="/svg/convoy-logo-full-new.svg" height={32} width={160} alt="logo" className="w-[119px] nav-bar-break:w-160px" />
								</div>

								<p className="text-14 mb-24px mt-12px nav-bar-break:w-[246px] text-[#666] font-medium leading-[160%]">
									2261 Market Street, San Francisco, CA 94114
								</p>
							</div>

							<div className="flex flex-col-reverse nav-bar-break:flex-col justify-between flex-wra desktop:pb-40px desktop:footer:block bor der w-full desktop:w-min mobile:gap-10">
								<div className="flex justify-between items-start desktop:justify-end bor der desktop:gap-100px w-full gap-y-10 desktop: flex-wrap pb-42px desktop:footer:block desktop:w-max">
									{footerLinks.map((section, index) => (
										<ul key={index} className="mobile:w-[150px]">
											<h3 className="text-16 desktop:text-18 footer:border-b footer:border-b-white-24 group-hover:footer:mb-0 footer:pb-8px font-semibold footer:font-normal mb-4 desktop:mb-24px flex items-center justify-between">
												{section.title}
												<img src="/svg/angle-down-icon.svg" alt="accordion icon" className="invisible footer:visible w-16px" />
											</h3>
											{section.links.map((link, i) => (
												<li key={i} className="text-[#666]">
													{!link.isExternal && (
														<Link href={link.link} className="text-12 desktop:text-14 font-medium mb-2 desktop:mb-12px block footer:pl-4px w-full">
															{link.name}
														</Link>
													)}
													{link.isExternal && (
														<a
															target="_blank"
															href={link.link}
															className="text-12 desktop:text-14 font-medium mb-2 desktop:mb-12px block footer:pl-4px w-full">
															{link.name}
														</a>
													)}
												</li>
											))}
										</ul>
									))}
								</div>

								<form
									onSubmit={subscribeToNewsletter}
									className="flex flex-col nav-bar-break:flex-row gap-3 nav-bar-break:gap-4 items-start desktop:items-center justify-center w-full">
									<input
										type="email"
										id="email"
										className="block p-4 ps-[16px] shadow-btn placeholder-[#666] placeholder:font-[500] text-[15px] text-gray-900 border border-[#E7E7E7] rounded-8px bg-[#fff] w-full h-11 focus:outline-none"
										placeholder="Join our newsletter"
										required
										ref={inputRef}
									/>
									<button
										type="submit"
										disabled={status === 'submitting'}
										className={`px-16px py-10px text-14 font-medium rounded-8px h-10 nav-bar-break:h-11 flex items-center justify-center shadow-btn-secondary transition-all duration-300 ${
											status === 'success'
												? 'bg-success-500 text-white-100'
												: status === 'error'
												? 'bg-danger-500 text-white-100'
												: 'bg-[#2780F1] text-white-100 hover:bg-[#1a6fd4]'
										} disabled:opacity-50 min-w-[120px]`}
										aria-live="polite">
										{status === 'submitting' && (
											<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
										)}
										{status === 'success' && (
											<>
												Subscribed
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</>
										)}
										{status === 'error' && (
											<>
												Error
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
														clipRule="evenodd"
													/>
												</svg>
											</>
										)}
										{status === 'idle' && (
											<>
												Subscribe
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px]">
													<path
														d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z"
														fill="white"
													/>
												</svg>
											</>
										)}
									</button>
								</form>
							</div>
						</nav>

						<div className="flex flex-col desktop:flex-row desktop:justify-between items-start desktop:items-center gap-10 w-full">
							<div className="flex flex-col">
								<h6 className="font-semibold mb-8px text-[#666] text-12 desktop:text-14">Follow Us</h6>

								<ul className="flex">
									<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
										<a target="_blank" href="https://github.com/frain-dev/convoy">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M12 3C7.02832 3 3 7.02832 3 12C3 15.9756 5.57813 19.3506 9.15527 20.54C9.60645 20.6221 9.77051 20.3467 9.77051 20.1064C9.77051 19.8926 9.76172 19.3271 9.75879 18.5771C7.25391 19.1191 6.72656 17.3701 6.72656 17.3701C6.31641 16.3301 5.72754 16.0518 5.72754 16.0518C4.91016 15.4951 5.78906 15.5068 5.78906 15.5068C6.69141 15.5713 7.16602 16.4326 7.16602 16.4326C7.96875 17.8096 9.27246 17.4111 9.78516 17.1826C9.86719 16.5996 10.1016 16.2041 10.3564 15.9785C8.3584 15.7529 6.25781 14.9795 6.25781 11.5312C6.25781 10.5469 6.60938 9.74414 7.18359 9.11426C7.09277 8.88867 6.78223 7.97168 7.27149 6.73242C7.27149 6.73242 8.02734 6.49219 9.74707 7.65527C10.4648 7.45605 11.2354 7.35645 12 7.35352C12.7646 7.35645 13.5352 7.45605 14.2529 7.65527C15.9727 6.49219 16.7256 6.73242 16.7256 6.73242C17.2178 7.97168 16.9102 8.88867 16.8164 9.11426C17.3936 9.74414 17.7393 10.5469 17.7393 11.5312C17.7393 14.9883 15.6357 15.7471 13.6318 15.9727C13.9541 16.248 14.2412 16.7988 14.2412 17.6367C14.2412 18.8408 14.2324 19.8105 14.2324 20.1064C14.2324 20.3467 14.3936 20.6279 14.8506 20.54C18.4248 19.3477 21 15.9756 21 12C21 7.02832 16.9717 3 12 3Z"
													fill="#666666"
												/>
											</svg>
										</a>
									</li>
									<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
										<a target="_blank" href="https://www.linkedin.com/company/convoy-webhooks/">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M20.4725 1.99916H3.5325C3.34209 1.99652 3.153 2.03142 2.97607 2.10185C2.79913 2.17228 2.63782 2.27688 2.50131 2.40967C2.36481 2.54247 2.25579 2.70085 2.18051 2.87577C2.10522 3.05069 2.06512 3.23874 2.0625 3.42916V20.5692C2.06512 20.7595 2.10522 20.9477 2.18051 21.1225C2.25579 21.2975 2.36481 21.4559 2.50131 21.5886C2.63782 21.7214 2.79913 21.8261 2.97607 21.8964C3.153 21.9669 3.34209 22.0018 3.5325 21.9992H20.4725C20.663 22.0018 20.852 21.9669 21.0289 21.8964C21.2059 21.8261 21.3673 21.7214 21.5037 21.5886C21.6401 21.4559 21.7493 21.2975 21.8246 21.1225C21.8997 20.9477 21.94 20.7595 21.9425 20.5692V3.42916C21.94 3.23874 21.8997 3.05069 21.8246 2.87577C21.7493 2.70085 21.6401 2.54247 21.5037 2.40967C21.3673 2.27688 21.2059 2.17228 21.0289 2.10185C20.852 2.03142 20.663 1.99652 20.4725 1.99916ZM8.0925 18.7391H5.0925V9.73916H8.0925V18.7391ZM6.5925 8.47916C6.17878 8.47916 5.78198 8.3148 5.48942 8.02224C5.19686 7.72968 5.0325 7.3329 5.0325 6.91916C5.0325 6.50542 5.19686 6.10863 5.48942 5.81607C5.78198 5.52351 6.17878 5.35916 6.5925 5.35916C6.81221 5.33424 7.03469 5.35601 7.24539 5.42304C7.45608 5.49007 7.65025 5.60084 7.81517 5.74813C7.98009 5.8954 8.11203 6.07584 8.20238 6.27764C8.29273 6.47945 8.33942 6.69805 8.33942 6.91916C8.33942 7.14026 8.29273 7.35888 8.20238 7.56068C8.11203 7.76249 7.98009 7.94293 7.81517 8.0902C7.65025 8.23746 7.45608 8.34825 7.24539 8.41527C7.03469 8.4823 6.81221 8.50407 6.5925 8.47916ZM18.9125 18.7391H15.9125V13.9092C15.9125 12.6992 15.4825 11.9092 14.3925 11.9092C14.0552 11.9116 13.7267 12.0174 13.4513 12.2123C13.176 12.4072 12.967 12.6818 12.8525 12.9992C12.7743 13.2342 12.7403 13.4817 12.7525 13.7292V18.7291H9.75251C9.75251 18.7291 9.75251 10.5492 9.75251 9.72916H12.7525V10.9992C13.025 10.5263 13.4214 10.1367 13.8989 9.87236C14.3765 9.60805 14.9171 9.479 15.4625 9.49916C17.4625 9.49916 18.9125 10.7892 18.9125 13.5592V18.7391Z"
													fill="#666666"
												/>
											</svg>
										</a>
									</li>
									<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
										<a target="_blank" href="mailto:sales@getconvoy.io">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M2.42087 5.71665C5.16569 8.04056 9.98199 12.1291 11.3976 13.4038C11.5876 13.5759 11.7914 13.6634 12.003 13.6634C12.2142 13.6634 12.4176 13.5767 12.6072 13.4055C14.024 12.1294 18.8403 8.04056 21.5853 5.71665C21.756 5.57225 21.7822 5.31842 21.6437 5.14188C21.3239 4.73391 20.8471 4.5 20.3361 4.5H3.67C3.15896 4.5 2.68207 4.73391 2.36228 5.14191C2.22392 5.31842 2.24997 5.57225 2.42087 5.71665Z"
													fill="#666666"
												/>
												<path
													d="M21.7576 6.98122C21.6099 6.91249 21.4362 6.93646 21.3133 7.04143C18.2692 9.62116 14.3844 12.9279 13.1621 14.029C12.476 14.6481 11.5239 14.6481 10.8363 14.0281C9.53347 12.8546 5.17082 9.14686 2.68599 7.04138C2.56228 6.93642 2.38815 6.91327 2.24167 6.98117C2.09441 7.04955 2 7.19681 2 7.3591V17.8343C2 18.7533 2.74743 19.5004 3.66661 19.5004H20.3327C21.2519 19.5004 21.9992 18.7533 21.9992 17.8343V7.3591C21.9992 7.19681 21.9048 7.04917 21.7576 6.98122Z"
													fill="#666666"
												/>
											</svg>
										</a>
									</li>
									<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
										<a target="_blank" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M15.75 4.875C15.75 3.83925 14.9108 3 13.875 3C12.8392 3 12 3.83925 12 4.875C12 5.472 12 8.7765 12 9.375C12 10.4108 12.8392 11.25 13.875 11.25C14.9108 11.25 15.75 10.4108 15.75 9.375C15.75 8.7765 15.75 5.472 15.75 4.875ZM20.25 9.375C20.25 10.4108 19.4108 11.25 18.375 11.25C17.9093 11.25 16.5 11.25 16.5 11.25C16.5 11.25 16.5 9.945 16.5 9.375C16.5 8.33925 17.3392 7.5 18.375 7.5C19.4108 7.5 20.25 8.33925 20.25 9.375ZM18.375 15.75C19.4108 15.75 20.25 14.9108 20.25 13.875C20.25 12.8392 19.4108 12 18.375 12C17.778 12 14.4735 12 13.875 12C12.8392 12 12 12.8392 12 13.875C12 14.9108 12.8392 15.75 13.875 15.75C14.4735 15.75 17.778 15.75 18.375 15.75ZM13.875 20.25C12.8392 20.25 12 19.4108 12 18.375C12 17.9093 12 16.5 12 16.5C12 16.5 13.305 16.5 13.875 16.5C14.9108 16.5 15.75 17.3392 15.75 18.375C15.75 19.4108 14.9108 20.25 13.875 20.25ZM7.5 18.375C7.5 19.4108 8.33925 20.25 9.375 20.25C10.4108 20.25 11.25 19.4108 11.25 18.375C11.25 17.778 11.25 14.4735 11.25 13.875C11.25 12.8392 10.4108 12 9.375 12C8.33925 12 7.5 12.8392 7.5 13.875C7.5 14.4735 7.5 17.778 7.5 18.375ZM3 13.875C3 12.8392 3.83925 12 4.875 12C5.34075 12 6.75 12 6.75 12C6.75 12 6.75 13.305 6.75 13.875C6.75 14.9108 5.91075 15.75 4.875 15.75C3.83925 15.75 3 14.9108 3 13.875ZM4.875 7.5C3.83925 7.5 3 8.33925 3 9.375C3 10.4108 3.83925 11.25 4.875 11.25C5.472 11.25 8.7765 11.25 9.375 11.25C10.4108 11.25 11.25 10.4108 11.25 9.375C11.25 8.33925 10.4108 7.5 9.375 7.5C8.7765 7.5 5.472 7.5 4.875 7.5ZM9.375 3C10.4108 3 11.25 3.83925 11.25 4.875C11.25 5.34075 11.25 6.75 11.25 6.75C11.25 6.75 9.945 6.75 9.375 6.75C8.33925 6.75 7.5 5.91075 7.5 4.875C7.5 3.83925 8.33925 3 9.375 3Z"
													fill="#666666"
												/>
											</svg>
										</a>
									</li>
									<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
										<a target="_blank" href="https://twitter.com/getconvoy">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
												<path
													d="M3.01562 3L9.82129 13.207L3.25439 21H5.21582L10.687 14.5078L15.0156 21H15.417H21.0142L14.0371 10.5322L20.3843 3H18.4229L13.1714 9.23291L9.01562 3H3.01562ZM5.81934 4.5H8.21289L18.2119 19.5H15.8184L5.81934 4.5Z"
													fill="#666666"
												/>
											</svg>
										</a>
									</li>
								</ul>
							</div>

							<div className="flex items-center gap-10 py-10px w-full desktop:w-max justify-between desktop:justify-end">
								<p className="text-left desktop:text-right text-12 font-medium text-[#666]/60">Copyright {currentYear}, All Rights Reserved</p>
								<Image src={SOCIcon} alt="soc stamp" className="h-40px w-40px" />
							</div>
						</div>
					</div>
				</footer>
			)}
		</>
	);
}
