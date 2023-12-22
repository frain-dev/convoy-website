'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import GithubIcon from '../../../public/svg/github-icon.svg';
import SlackIcon from '../../../public/svg/slack-icon.svg';
import MailIcon from '../../../public/svg/mail-icon.svg';
import TwitterIcon from '../../../public/svg/twitter-icon.svg';
import LinkedInIcon from '../../../public/svg/linkedin.svg';
import { usePathname } from 'next/navigation';
import { useToaster } from '@/hooks/notification';

export default function Footer() {
	const [submittingEmail, setIsSubmittingEmail] = useState(false);
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const inputRef = useRef(null);
	const pathname = usePathname();
	const footerLinks = [
		{
			title: 'Product',
			links: [
				{ name: 'Features', link: '/#features' },
				{ name: 'Open Source', link: 'http://github.com/frain-dev/convoy', isExternal: true },
				{ name: 'Cloud', link: 'https://cloud.getconvoy.io/login', isExternal: true },
				{ name: 'Convoy Playground', link: 'https://playground.getconvoy.io', isExternal: true },
				{ name: 'Nohooks', link: 'https://nohooks.io', isExternal: true }
			]
		},
		{
			title: 'Community',
			links: [
				{ name: 'Slack', link: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', isExternal: true },
				{ name: 'Github Discussion', link: 'https://github.com/frain-dev/convoy/discussions', isExternal: true }
			]
		},
		{
			title: 'Resources',
			links: [
				{ name: 'API Reference', link: 'https://convoy.readme.io/', isExternal: true },
				{ name: 'Documentation', link: '/docs', isExternal: false },
				{ name: 'Watch Demo', link: 'https://youtu.be/DSIet81oBsg?si=1ni58qJWlLFAH1KZ', isExternal: true },
				{ name: 'Status Page', link: 'https://status.getconvoy.io/status/cloud', isExternal: true },
				{ name: 'Roadmap', link: 'https://github.com/orgs/frain-dev/projects/3/views/1', isExternal: true }
			]
		},
		{
			title: 'Company',
			links: [
				{ name: 'About Us', link: '/aboutus', isExternal: false },
				{ name: 'Terms of Use', link: '/legal/Terms-of-Use-Convoy.pdf', isExternal: true },
				{ name: 'Privacy Policy', link: '/legal/Privacy-Policy-Convoy.pdf', isExternal: true }
			]
		}
	];

	const requestAccess = async () => {
		setIsSubmittingEmail(true);
		try {
			const response = await fetch('/.netlify/functions/subscribe', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					email: inputRef.current !== null ? inputRef.current['value'] : ''
				})
			});
			await response.json();
			useToaster({ message: 'Email submitted successfully', style: 'success' });
			setIsSubmittingEmail(false);
		} catch (error) {
			useToaster({ message: 'An error occurred, please try again', style: 'danger' });
			setIsSubmittingEmail(false);
		}
	};
	return (
		<>
			{!pathname.includes('/docs/') && (
				<footer className="bg-[#302F3F] text-white-100 py-40px px-20px">
					<div className="max-w-[1200px] m-auto">
						<nav className="flex justify-between flex-wrap pb-42px footer:block">
							<div className="mobile:w-full mobile:mb-40px">
								<div>
									<Image src="/svg/logo.svg" height={29} width={110} alt="logo" className="w-110px" />
								</div>

								<h4 className="mt-22px text-14 font-semibold mb-10px">Address</h4>
								<p className="text-12 mb-24px">2261 Market Street, San Francisco, CA 94114</p>

								<ul className="socials flex">
									<li className="w-42px h-42px bg-white-8  flex items-center justify-center rounded-[50%] mr-16px">
										<a target="_blank" href="https://github.com/frain-dev/convoy">
											<Image src={GithubIcon} alt="github logo" />
										</a>
									</li>
									<li className="w-42px h-42px bg-white-8  flex items-center justify-center rounded-[50%] mr-16px">
										<a target="_blank" href="https://www.linkedin.com/company/convoy-webhooks/">
											<Image src={LinkedInIcon} alt="linkedin logo" />
										</a>
									</li>
									<li className="w-42px h-42px bg-white-8  flex items-center justify-center rounded-[50%] mr-16px">
										<a target="_blank" href="mailto:sales@getconvoy.io">
											<Image src={MailIcon} alt="mail logo" />
										</a>
									</li>
									<li className="w-42px h-42px bg-white-8  flex items-center justify-center rounded-[50%] mr-16px">
										<a target="_blank" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
											<Image src={SlackIcon} alt="slack logo" />
										</a>
									</li>
									<li className="w-42px h-42px bg-white-8  flex items-center justify-center rounded-[50%]">
										<a target="_blank" href="https://twitter.com/getconvoy">
											<Image src={TwitterIcon} alt="twitter logo" />
										</a>
									</li>
								</ul>
							</div>

							{footerLinks.map((section, index) => (
								<ul key={index} className="group">
									<h3 className="text-14 footer:border-b footer:border-b-white-24 group-hover:footer:mb-0 footer:pb-8px font-semibold footer:font-normal mb-20px flex items-center justify-between">
										{section.title}
										<img src="/svg/angle-down-icon.svg" alt="accordion icon" className="invisible footer:visible w-16px" />
									</h3>
									{section.links.map((link, i) => (
										<li
											key={i}
											className="footer:h-0 footer:overflow-hidden group-hover:footer:h-fit footer:bg-white-8 group-hover:footer:first-of-type:pt-20px group-hover:footer:last-of-type:mb-12px">
											{!link.isExternal && (
												<Link href={link.link} className="text-12 font-normal mb-16px block footer:pl-4px">
													{link.name}
												</Link>
											)}
											{link.isExternal && (
												<a target="_blank" href={link.link} className="text-12 font-normal mb-16px block footer:pl-4px">
													{link.name}
												</a>
											)}
										</li>
									))}
								</ul>
							))}
						</nav>

						<div className="border-b border-b-white-8 flex justify-end pb-40px">
							<div className="w-full p-0 desktop:max-w-[430px] desktop:flex-row desktop:justify-around desktop:items-center">
								<div className="flex justify-between items-center w-full m-0">
									<div className="order-1">
										<p className="text-12 text-left mt-24px">No spam! Just articles, events, and talks.</p>
									</div>
									<img src="/gif/mailbox.gif" className="w-124px order-2" alt="mailbox animation" />
								</div>
								<form className="bg-[#1c2126] border border-[#262f37] rounded-8px -mt-10px p-10px flex" onSubmit={requestAccess}>
									<div>
										<svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M23.6875 11.9688C22.9688 12.5312 22.0625 13.2188 18.875 15.5312C18.25 16 17.0938 17.0312 16 17.0312C14.875 17.0312 13.75 16 13.0938 15.5312C9.90625 13.2188 9 12.5312 8.28125 11.9688C8.15625 11.875 8 11.9688 8 12.125V18.5C8 19.3438 8.65625 20 9.5 20H22.5C23.3125 20 24 19.3438 24 18.5V12.125C24 11.9688 23.8125 11.875 23.6875 11.9688ZM16 16C16.7188 16.0312 17.75 15.0938 18.2812 14.7188C22.4375 11.7188 22.75 11.4375 23.6875 10.6875C23.875 10.5625 24 10.3438 24 10.0938V9.5C24 8.6875 23.3125 8 22.5 8H9.5C8.65625 8 8 8.6875 8 9.5V10.0938C8 10.3438 8.09375 10.5625 8.28125 10.6875C9.21875 11.4375 9.53125 11.7188 13.6875 14.7188C14.2188 15.0938 15.25 16.0312 16 16Z"
												fill="#477DB3"
											/>
										</svg>
									</div>
									<input
										type="email"
										id="email"
										placeholder="Your email"
										aria-label="Email"
										ref={inputRef}
										className="w-full bg-transparent border-none outline-none text-white-100 placeholder:text-white-100"
									/>
									<button className="text-16 font-semibold bg-transparent border-none" disabled={submittingEmail}>
										<img src="/svg/send-primary-icon.svg" alt="send icon" />
									</button>
								</form>
							</div>
						</div>

						<p className="mt-24px text-left desktop:text-right text-12">Copyright {currentYear}, All Rights Reserved</p>
					</div>
				</footer>
			)}
		</>
	);
}
