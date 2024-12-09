'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import playButton from '../../../public/svg/play-button.svg';
import frame from '../../../public/static/screenshot-frame.svg';
import neynar from '../../../public/svg/neynar-new.svg';
import source from '../../../public/svg/source-new.svg';
import spruce from '../../../public/svg/spruce-health-mark.svg';
import marble from '../../../public/svg/marble-new.svg';
import maple from '../../../public/svg/maple-new.svg';

import manan from '../../../public/profile-images/Manan Patel.png';
import michael from '../../../public/profile-images/Michael Raines.png';
import pascal from '../../../public/profile-images/Pascal Delange.jpeg';
import jonathan from '../../../public/profile-images/jonathan.jpeg';
import aravindkumar from '../../../public/profile-images/Aravindkumar Rajendira.png';
import subomi from '../../../public/profile-images/Subomi Oluwalana.png';

import advancedEndpoint from '../../../public/static/advanced-endpoint.png';
import developerExperience from '../../../public/static/advanced-endpoint.png';
import reliableArchitecture from '../../../public/static/reliable-architecture.png';

import OfficeHours from '../components/OfficeHours';
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
	const companies = [
		{ name: 'pinata-full', url: 'https://pinata.cloud/', class: 'h-20px desktop:h-28px ml-[30px]' },
		{ name: 'maple-full', url: 'https://maplebilling.com/', class: 'h-20px desktop:h-30px' },
		{ name: 'testlify-full', url: 'https://testlify.com/', class: 'h-20px desktop:h-28px' },
		{ name: 'mono-full', url: 'https://mono.co/', class: 'h-20px desktop:h-20px' },
		{ name: 'ascenda-full', url: 'https://www.ascenda.com/', class: 'h-20px desktop:h-24px' },
		{ name: 'xendit-full', url: 'https://www.xendit.co/', class: 'h-20px desktop:h-28px mr-[20px]' },
		{ name: 'spruce-full', url: 'https://sprucehealth.com/', class: 'h-20px desktop:h-28px' },
		{ name: 'caxton-full', url: 'https://www.caxton.io/', class: 'h-20px desktop:h-20px' },
		{ name: 'neynar-full', url: 'https://neynar.com/', class: 'h-20px desktop:h-26px' },
		{ name: 'source-full', url: 'https://source.ag/', class: 'h-20px desktop:h-26px' },
		{ name: 'piggyvest-full', url: 'https://www.piggyvest.com/', class: 'h-20px desktop:h-30px' },
		{ name: 'trustmi-full', url: 'https://www.trustmi.ai/', class: 'h-20px desktop:h-24px' },
		{ name: 'sline-full', url: 'https://www.sline.io/', class: 'h-20px desktop:h-26px' },
		{ name: 'elenpay-full', url: 'https://elenpay.tech/', class: 'h-20px desktop:h-24px' },
		{ name: 'freshtrack-full', url: 'https://www.freshtrack.ma/', class: 'h-20px desktop:h-36px mx-20px -mt-8px' },
		{ name: 'marble-full', url: 'https://www.checkmarble.com/', class: 'h-20px desktop:h-28px ml-[20px]' }
	];

	const words = ['sending', 'receiving'];

	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(prevIndex => (prevIndex + 1) % words.length);
		}, 2000); // Change word every 0.5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="flex flex-col items-center pb-60px desktop:pb-120px w-full">
			<section className="pt-150px px-20px flex desktop:items-center flex-col max-w-[1180px] w-full">
				<h1 className="desktop:text-center font-medium text-[32px] desktop:text-[40px] mb-6 desktop:max-w-[683px]">
					The webhook gateway for <br />
					<span>sending</span>{' '}
					events
				</h1>
				<p className="desktop:text-center text-[#666] text-[16px] desktop:max-w-[683px] m-auto mb-6 desktop:font-medium">
					The complete solution for <span className="text-[#2780F1]">secure, scalable, and reliable</span> webhook delivery. Built for developers, trusted by enterprises.
				</p>

				<div className="flex desktop:justify-center mb-56px">
					<a
						target="_blank"
						href="https://cloud.getconvoy.io/signup"
						className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] text-white-100 flex items-center">
						<span>Try for free</span>

						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px]">
							<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
						</svg>
					</a>
					<a
						target="_blank"
						href="https://cal.com/subomi/30min"
						className="px-8px py-10px text-14 ml-16px h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border shadow-btn gap-2">
						<Image src={subomi} alt="play" className="rounded-[50%] w-24px h-24px object-cover" />

						<span>Talk to a founder</span>
					</a>
				</div>

				<VideoPlayer />
			</section>

			<section className="pt-80px pb-40px desktop:py-80px w-full px-20px flex items-center justify-center">
				<div className="w-full desktop:w-[1180px] overflow-hidden relative">
					<div className="w-80px h-20px desktop:h-40px bg-gradient-to-r from-[#fafafa] to-transparent bo rder absolute left-0 top-0 z-20" />
					<div className="w-80px h-20px desktop:h-40px bg-gradient-to-l from-[#fafafa] to-transparent bo rder absolute right-0 top-0 z-20" />
					<div className="slideshow h-20px desktop:h-40px">
						<div className="firstSlide">
							{[0, 1, 2].map(index => (
								<ul className="flex items-center justify-center" key={index}>
									{companies.map(company => (
										<li className="min-w-[150px] desktop:min-w-[200px] flex justify-center" key={company.name}>
											<a target="_blank" href={company.url} className="">
												<img src={`/svg/${company.name}.svg`} alt={`${company.name} logo`} className={company.class} />
											</a>
										</li>
									))}
								</ul>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-10 desktop:gap-20 max-w-[1180px] w-full my-0 desktop:my-10 px-20px">
				<div className="w-full flex items-center justify-center">
					<h2 className="desktop:text-center text-32 desktop:text-[40px] font-medium w-full desktop:w-[603px]">The World’s Most Advanced Webhooks Gateway</h2>
				</div>
				<div className="flex flex-col desktop:flex-row gap-30px desktop:gap-[60px]">
					<div className="flex flex-col gap-3">
						<h4 className="text-24 desktop:text-20 font-semibold leading-[150%]">Advanced Endpoint Management</h4>
						<p className="text-14 desktop:text-16 leading-[150%] text-[#666] w-full desktop:w-[378px]">
							Enhance your webhook reliability, security, and performance with advanced endpoint controls tailored to ensure stable, secure, and efficient message
							delivery.
						</p>
					</div>
					<div
						className="w-full desktop:w-[742px] h-max desktop:h-[360px] pt-3 desktop:pt-10 pl-3 desktop:pl-10  overflow-hidden rounded-t-16px"
						style={{ backgroundImage: `url(${frame.src})` }}>
						<div className="bg-white-100 h-full w-full rounded-tl-8px overflow-hidden shadow-video">
							<Image src={advancedEndpoint} alt="screenshot" className="bg-cover object-cover w-full" />
						</div>
					</div>
				</div>

				<OfficeHours type="playground" />

				<div className="flex flex-col desktop:flex-row gap-30px desktop:gap-[60px]">
					<div className="flex flex-col gap-3">
						<h4 className="text-24 desktop:text-20 font-semibold leading-[150%]">Unparalleled Developer Experience</h4>
						<p className="text-14 desktop:text-16 leading-[150%] text-[#666] w-full desktop:w-[378px]">
							Create secrets, sign payload, verify events. Increase security by enabling rolling secrets. Prevents well known attacks like SSRF (Server-Side Request
							Forgery).
						</p>
					</div>
					<div
						className="w-full desktop:w-[742px] h-max desktop:h-[360px] pt-3 desktop:pt-10 pl-3 desktop:pl-10  overflow-hidden rounded-t-16px"
						style={{ backgroundImage: `url(${frame.src})` }}>
						<div className="bg-white-100 h-full w-full rounded-tl-8px overflow-hidden shadow-video">
							<Image src={developerExperience} alt="screenshot" className="bg-cover object-cover w-full" />
						</div>
					</div>
				</div>

				<OfficeHours type="guides" />

				<div className="flex flex-col desktop:flex-row gap-30px desktop:gap-[60px]">
					<div className="flex flex-col gap-3">
						<h4 className="text-24 desktop:text-20 font-semibold leading-[150%]">Highly Reliable Architecture</h4>
						<p className="text-14 desktop:text-16 leading-[150%] text-[#666] w-full desktop:w-[378px]">
							Built for resilience and speed, the system combines a control and data plane architecture, and PostgreSQL’s robustness to ensure high availability,
							durability, and seamless data handling.
						</p>
					</div>
					<div
						className="w-full desktop:w-[742px] h-max desktop:h-[360px] pt-3 desktop:pt-10 pl-3 desktop:pl-10  overflow-hidden rounded-t-16px"
						style={{ backgroundImage: `url(${frame.src})` }}>
						<div className="bg-white-100 h-full w-full rounded-tl-8px overflow-hidden shadow-video">
							<Image src={reliableArchitecture} alt="screenshot" className="bg-cover object-cover w-full" />
						</div>
					</div>
				</div>
			</section>

			<section className="flex items-center justify-center w-full px-20px">
				<div className="bg-white-100 rounded-8px gap-40px desktop:gap-60px my-10 desktop:my-20 p-5 desktop:p-10 border border-[#e7e7e7] flex flex-col max-w-[1180px] w-full">
					<div className="flex flex-col items-start desktop:items-center gap-3">
						<h2 className="text-32 desktop:text-[40px] font-medium desktop:text-center">Customer Remarks</h2>
						<p className="text-[#666] desktop:text-center text-14 desktop:text-16 leading-[150%]">Read what our customers have to say about Convoy</p>
					</div>

					<div className="flex flex-col gap-5 desktop:gap-10 items-center">
						<div className="flex flex-col desktop:flex-row gap-6 items-center w-full">
							<div className="min-w-[47.5%] desktop:pr-5 pb-0px desktop:pb-28px flex flex-col gap-5 items-start">
								<Image src={neynar} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
								<p className="text-14 desktop:text-20 leading-[160%] desktop:leading-[140%] text-[#666] w-full">
									We tried a few different solutions in the market, but Convoy stood out for its dynamic filtering capabilities, and it was extremely easy to set
									up; we had test webhooks sent within the hour.
								</p>
								<div className="flex items-center gap-2">
									<Image src={manan} height={300} width={300} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
									<div className="flex flex-col gap-1">
										<h5 className="font-semibold text-14 desktop:text-16 leading-4">Manan Patel</h5>
										<p className="text-[#666] text-12 desktop:text-[13px] font-medium leading-4">CTO at Neynar, Ex Coinbase</p>
									</div>
								</div>
							</div>

							<div className="bg-[#e7e7e7] min-w-full desktop:min-w-[0.5px] min-h-[0.5px] desktop:!min-h-[280px]" />

							<div className="min-w-[47.5%] bor der flex pl-0 desktop:pl-5 pb-0px desktop:pb-28px flex-col gap-5 items-start">
								<Image src={spruce} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
								<p className="text-14 desktop:text-20 leading-[160%] desktop:leading-[140%] text-[#666]">
									We considered building a webhooks system internally but quickly realised that reaching the quality and robustness our customers deserve would be
									highly time-consuming. Convoy offered this out-of-the-box.
								</p>
								<div className="flex items-center gap-2">
									<Image src={michael} height={300} width={300} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
									<div className="flex flex-col gap-1">
										<h5 className="font-semibold text-14 desktop:text-16 leading-4">Michael Raines</h5>
										<p className="text-[#666] text-12 desktop:text-[13px] font-medium leading-4">Principal Engineer at Spruce Health, Ex AWS</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-[#e7e7e7] w-full min-h-[0.5px] desktop:min-h-[1px]" />

						<div className="flex flex-col desktop:flex-row gap-5 w-full">
							<div className="w-full desktop:min-w-[340px] [47.5%] bor der flex pb-0px desktop:pb-58px flex-col gap-5 items-start">
								<Image src={marble} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
								<p className="text-14 desktop:text-16 w-full desktop:w-[316px] h-auto desktop:h-[140px] leading-[160%] desktop:leading-[150%] text-[#666]">
									We appreciate that they handle all the complexity of webhooks retries and dispatching for us, letting us focus on our core business.{' '}
								</p>
								<div className="flex items-center gap-2">
									<Image src={pascal} height={300} width={300} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
									<div className="flex flex-col gap-1">
										<h5 className="font-semibold text-14 desktop:text-16 leading-4">Pascal Delange</h5>
										<p className="text-[#666] text-[12px] font-medium leading-4">CTO at Marble, Ex-Director of Engineering, Shine</p>
									</div>
								</div>
							</div>

							<div className="bg-[#e7e7e7] min-w-full desktop:min-w-[1px] min-h-[0.5px] desktop:min-h-full" />

							<div className="w-full desktop:min-w-[340px] [47.5%] bor der flex pb-0px desktop:pb-58px flex-col gap-5 items-start">
								<Image src={source} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
								<p className="text-14 desktop:text-16 w-full desktop:w-[316px] h-auto desktop:h-[140px] leading-[160%] desktop:leading-[150%] text-[#666]">
									Convoy provides all the features that we are looking for at a fair price, and we were able to integrate and offer a webhook solution in a matter
									of days.
								</p>
								<div className="flex items-center gap-2">
									<Image src={jonathan} height={300} width={300} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
									<div className="flex flex-col gap-1">
										<h5 className="font-semibold text-14 desktop:text-16 leading-4">Jonathan Wiemer</h5>
										<p className="text-[#666] text-[12px] font-medium leading-4">Lead Software Engineer, Source.ag</p>
									</div>
								</div>
							</div>

							<div className="bg-[#e7e7e7] min-w-full desktop:min-w-[1px] min-h-[0.5px] desktop:min-h-full" />

							<div className="w-full desktop:min-w-[340px] flex pb-0px desktop:pb-58px flex-col gap-5 items-start">
								<Image src={maple} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
								<p className="text-14 desktop:text-16 w-full desktop:w-[316px] h-auto desktop:h-[140px] leading-[160%] desktop:leading-[150%] text-[#666]">
									Convoy had everything we needed from a webhook gateway—retries, signatures, and SDKs. This allowed our engineering team to focus on building our
									core product.
								</p>
								<div className="flex items-center gap-2">
									<Image src={aravindkumar} height={300} width={300} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
									<div className="flex flex-col gap-1">
										<h5 className="font-semibold text-14 desktop:text-16 leading-4">Aravindkumar Rajendiran</h5>
										<p className="text-[#666] text-[12px] font-medium leading-4">CTO at Maple, Ex Airbnb</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col desktop:flex-row items-center justify-center w-full px-5">
				<div className="gap-32px desktop:gap-60px my- 20 flex flex-col max-w-[1180px] w-full items-center">
					<div className="flex flex-col desktop:items-center gap-6">
						<h2 className="text-32 desktop:text-[40px] w-full desktop:w-[436px] font-medium desktop:text-center">Security, Scalability and Compliance</h2>
						<p className="text-[#666] w-full desktop:w-[512px] desktop:text-center text-14 desktop:text-16 leading-[180%] desktop:leading-[150%]">
							Built for the highest standards of security, we ensure your business runs with reliability and meets the compliance requirements you rely on.
						</p>
					</div>

					<div className="flex flex-col-reverse desktop:flex-row items-center justify-center gap-32px desktop:gap-0 desktop:justify-between w-full">
						<ul className="flex flex-col gap-3 desktop:gap-5 list-none w-full desktop:w-auto">
							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M16.0026 0.666992C12.3327 0.666992 9.33594 3.66378 9.33594 7.33366V12.3337H9.36458C6.91387 14.2902 5.33594 17.2964 5.33594 20.667C5.33594 26.5462 10.1234 31.3337 16.0026 31.3337C21.8818 31.3337 26.6693 26.5462 26.6693 20.667C26.6693 17.2964 25.0913 14.2902 22.6406 12.3337H22.6693V7.33366C22.6693 3.66378 19.6725 0.666992 16.0026 0.666992ZM16.0026 2.66699C18.5914 2.66699 20.6693 4.74487 20.6693 7.33366V11.0915C19.2572 10.4 17.6772 10.0003 16.0026 10.0003C14.328 10.0003 12.748 10.4 11.3359 11.0915V7.33366C11.3359 4.74487 13.4138 2.66699 16.0026 2.66699ZM16.0026 12.0003C20.8009 12.0003 24.6693 15.8687 24.6693 20.667C24.6693 25.4653 20.8009 29.3337 16.0026 29.3337C11.2043 29.3337 7.33594 25.4653 7.33594 20.667C7.33594 15.8687 11.2043 12.0003 16.0026 12.0003ZM16.0026 16.0003C15.2385 16.0025 14.4984 16.2672 13.9062 16.7499C13.314 17.2327 12.9056 17.9043 12.7494 18.6522C12.5932 19.4001 12.6987 20.179 13.0482 20.8584C13.3977 21.5378 13.97 22.0766 14.6693 22.3844V24.667C14.6693 25.4037 15.2659 26.0003 16.0026 26.0003C16.7393 26.0003 17.3359 25.4037 17.3359 24.667V22.387C18.0368 22.0801 18.6107 21.5414 18.9614 20.8614C19.3121 20.1814 19.4181 19.4014 19.2618 18.6525C19.1054 17.9035 18.6962 17.2311 18.1027 16.7482C17.5092 16.2653 16.7677 16.0012 16.0026 16.0003Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">SOC2 Compliant</p>
							</li>

							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M16.0029 1.33301C15.874 1.33292 15.7453 1.40174 15.6826 1.53874L15.3558 2.25749L14.3597 2.41113C14.075 2.45513 13.961 2.80415 14.1644 3.00749L14.8389 3.68066L14.6982 4.52181C14.6502 4.81114 14.9565 5.0277 15.2139 4.8877L16.0029 4.45801L16.792 4.889C17.0493 5.029 17.3543 4.81114 17.3063 4.52181L17.167 3.68197L17.8415 3.00749C18.0448 2.80415 17.9308 2.45513 17.6461 2.41113L16.6501 2.25879L16.3232 1.53874C16.2609 1.4014 16.1318 1.33309 16.0029 1.33301ZM9.71385 3.31478C9.58502 3.3147 9.45718 3.38351 9.39484 3.52051L9.06802 4.23926L8.07193 4.3929C7.78726 4.4369 7.67328 4.78592 7.87661 4.98926L8.54849 5.66374L8.40917 6.50488C8.36117 6.79422 8.66746 7.01077 8.92479 6.87077L9.71385 6.43978L10.5029 6.87077C10.7602 7.01077 11.0665 6.79422 11.0185 6.50488L10.8779 5.66374L11.5524 4.98926C11.7557 4.78592 11.6417 4.43821 11.3571 4.39421L10.361 4.24056L10.0342 3.52051C9.97183 3.38317 9.84269 3.31486 9.71385 3.31478ZM22.292 3.31478C22.163 3.31478 22.0334 3.38317 21.9704 3.52051L21.6435 4.24056L20.6474 4.39421C20.3628 4.43821 20.2488 4.78592 20.4521 4.98926L21.1266 5.66374L20.986 6.50488C20.938 6.79422 21.2443 7.01077 21.5016 6.87077L22.2907 6.43978L23.0797 6.87077C23.3371 7.01077 23.6434 6.79422 23.5954 6.50488L23.456 5.66374L24.1292 4.98926C24.3325 4.78592 24.2186 4.43821 23.9339 4.39421L22.9378 4.24056L22.611 3.52051C22.5487 3.38317 22.421 3.31478 22.292 3.31478ZM5.11099 7.91894C4.98216 7.91894 4.85334 7.98734 4.79068 8.12467L4.46385 8.84342L3.46776 8.99707C3.18309 9.04107 3.06911 9.39009 3.27245 9.59342L3.94562 10.2666L3.805 11.1077C3.757 11.3971 4.06329 11.6149 4.32062 11.4749L5.10969 11.0439L5.90005 11.4749C6.15738 11.6149 6.46237 11.3971 6.41437 11.1077L6.27505 10.2666L6.94953 9.59342C7.15286 9.39009 7.03888 9.04107 6.75422 8.99707L5.75812 8.84342L5.4313 8.12467C5.36863 7.98734 5.23982 7.91894 5.11099 7.91894ZM26.8948 7.91894C26.7659 7.91894 26.6366 7.98734 26.5732 8.12467L26.2464 8.84342L25.2503 8.99707C24.9656 9.04107 24.8517 9.39009 25.055 9.59342L25.7295 10.2666L25.5902 11.1077C25.5422 11.3971 25.8471 11.6149 26.1045 11.4749L26.8948 11.0439L27.6839 11.4749C27.9412 11.6149 28.2475 11.3971 28.1995 11.1077L28.0589 10.2666L28.7334 9.59342C28.9367 9.39009 28.8227 9.04107 28.5381 8.99707L27.542 8.84342L27.2152 8.12467C27.1528 7.98734 27.0238 7.91894 26.8948 7.91894ZM16.0029 7.99967C13.8057 7.99967 12.0029 9.80243 12.0029 11.9997V13.5192C10.8453 13.9364 10.0029 15.0396 10.0029 16.333V19.6663C10.0029 21.3113 11.3579 22.6663 13.0029 22.6663H19.0029C20.6479 22.6663 22.0029 21.3113 22.0029 19.6663V16.333C22.0029 15.0396 21.1605 13.9364 20.0029 13.5192V11.9997C20.0029 9.80243 18.2002 7.99967 16.0029 7.99967ZM16.0029 9.99967C17.119 9.99967 18.0029 10.8836 18.0029 11.9997V13.333H14.0029V11.9997C14.0029 10.8836 14.8868 9.99967 16.0029 9.99967ZM3.42609 14.2067C3.29718 14.2066 3.16714 14.2754 3.10448 14.4124L2.77766 15.1312L1.78286 15.2848C1.4982 15.3288 1.38422 15.6779 1.58755 15.8812L2.26073 16.5544L2.12141 17.3955C2.07341 17.6848 2.37839 17.9027 2.63573 17.7627L3.42479 17.3317L4.21385 17.7627C4.47119 17.9027 4.77748 17.6861 4.72948 17.3968L4.59016 16.5557L5.26333 15.8812C5.46667 15.6779 5.35269 15.3301 5.06802 15.2861L4.07193 15.1325L3.7451 14.4124C3.68277 14.2751 3.55501 14.2068 3.42609 14.2067ZM28.5797 14.2067C28.4507 14.2067 28.3224 14.2751 28.2594 14.4124L27.9326 15.1325L26.9365 15.2861C26.6518 15.3301 26.5379 15.6779 26.7412 15.8812L27.4144 16.5557L27.275 17.3968C27.227 17.6861 27.5333 17.9027 27.7907 17.7627L28.5797 17.3317L29.3688 17.7627C29.6261 17.9027 29.9324 17.6861 29.8844 17.3968L29.7438 16.5557L30.4183 15.8812C30.6216 15.6779 30.5076 15.3301 30.223 15.2861L29.2269 15.1325L28.9 14.4124C28.8377 14.2751 28.7087 14.2067 28.5797 14.2067ZM13.0029 15.333H19.0029C19.5672 15.333 20.0029 15.7687 20.0029 16.333V19.6663C20.0029 20.2307 19.5672 20.6663 19.0029 20.6663H13.0029C12.4386 20.6663 12.0029 20.2307 12.0029 19.6663V16.333C12.0029 15.7687 12.4386 15.333 13.0029 15.333ZM16.0029 16.6663C15.6493 16.6663 15.3102 16.8068 15.0601 17.0569C14.8101 17.3069 14.6696 17.6461 14.6696 17.9997C14.6696 18.3533 14.8101 18.6924 15.0601 18.9425C15.3102 19.1925 15.6493 19.333 16.0029 19.333C16.3565 19.333 16.6957 19.1925 16.9457 18.9425C17.1958 18.6924 17.3362 18.3533 17.3362 17.9997C17.3362 17.6461 17.1958 17.3069 16.9457 17.0569C16.6957 16.8068 16.3565 16.6663 16.0029 16.6663ZM5.11099 20.4958C4.98207 20.4958 4.85237 20.5642 4.78937 20.7015L4.46255 21.4215L3.46646 21.5739C3.18179 21.6179 3.06781 21.9669 3.27114 22.1702L3.94562 22.8447L3.805 23.6846C3.757 23.9739 4.06329 24.1918 4.32062 24.0518L5.10969 23.6208L5.90005 24.0518C6.15738 24.1918 6.46237 23.9739 6.41437 23.6846L6.27505 22.8447L6.94953 22.1702C7.15286 21.9669 7.03888 21.6179 6.75422 21.5739L5.75812 21.4215L5.4313 20.7015C5.36863 20.5642 5.23991 20.4958 5.11099 20.4958ZM26.8948 20.4958C26.7659 20.4958 26.6366 20.5642 26.5732 20.7015L26.2464 21.4215L25.2503 21.5739C24.9656 21.6179 24.8517 21.9669 25.055 22.1702L25.7295 22.8447L25.5902 23.6846C25.5422 23.9739 25.8471 24.1918 26.1045 24.0518L26.8948 23.6208L27.6839 24.0518C27.9412 24.1918 28.2475 23.9739 28.1995 23.6846L28.0589 22.8447L28.7334 22.1702C28.9367 21.9669 28.8227 21.6179 28.5381 21.5739L27.542 21.4215L27.2152 20.7015C27.1528 20.5642 27.0238 20.4958 26.8948 20.4958ZM9.71385 25.0999C9.58485 25.0999 9.45654 25.1683 9.39354 25.3057L9.06672 26.0244L8.07062 26.1781C7.78596 26.2221 7.67198 26.5711 7.87531 26.7744L8.54849 27.4489L8.40917 28.2887C8.36117 28.5781 8.66746 28.7959 8.92479 28.6559L9.71385 28.2249L10.5029 28.6559C10.7602 28.7959 11.0665 28.5781 11.0185 28.2887L10.8779 27.4489L11.5524 26.7744C11.7557 26.5711 11.6417 26.2221 11.3571 26.1781L10.361 26.0244L10.0342 25.3057C9.97183 25.1683 9.84285 25.0999 9.71385 25.0999ZM22.292 25.0999C22.163 25.0999 22.0334 25.1683 21.9704 25.3057L21.6435 26.0244L20.6474 26.1781C20.3628 26.2221 20.2488 26.5711 20.4521 26.7744L21.1266 27.4489L20.986 28.2887C20.938 28.5781 21.2443 28.7959 21.5016 28.6559L22.2907 28.2249L23.0797 28.6559C23.3371 28.7959 23.6434 28.5781 23.5954 28.2887L23.456 27.4489L24.1292 26.7744C24.3325 26.5711 24.2186 26.2221 23.9339 26.1781L22.9378 26.0244L22.611 25.3057C22.5487 25.1683 22.421 25.0999 22.292 25.0999ZM16.0029 26.7848C15.874 26.7847 15.7453 26.8523 15.6826 26.9893L15.3558 27.7093L14.3597 27.863C14.075 27.907 13.961 28.2547 14.1644 28.458L14.8389 29.1325L14.6982 29.9736C14.6502 30.263 14.9565 30.4795 15.2139 30.3395L16.0029 29.9085L16.792 30.3408C17.0493 30.4808 17.3543 30.263 17.3063 29.9736L17.167 29.1325L17.8415 28.4593C18.0448 28.256 17.9308 27.907 17.6461 27.863L16.6501 27.7093L16.3232 26.9906C16.2609 26.8532 16.1318 26.7849 16.0029 26.7848Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">GDPR Compliant</p>
							</li>

							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M15.998 7C13.384 7 11.1123 8.2385 9.48828 10.0625C9.35328 10.0475 9.23489 10 9.08789 10C6.91689 10 5.14062 11.801 5.14062 14C3.43263 15.055 2.17969 16.836 2.17969 19C2.17969 22.301 4.84356 25 8.10156 25H23.8945C27.1525 25 29.8164 22.301 29.8164 19C29.8164 15.844 27.3599 13.3158 24.2949 13.0938C23.0889 9.57375 19.873 7 15.998 7ZM15.998 9C19.233 9 21.9314 11.2543 22.6914 14.2812L22.877 15.0625L23.7109 15.0312C23.9189 15.0203 23.9635 15 23.8945 15C26.0845 15 27.8438 16.781 27.8438 19C27.8438 21.219 26.0845 23 23.8945 23H8.10156C5.91156 23 4.15234 21.219 4.15234 19C4.15234 17.34 5.14759 15.9225 6.55859 15.3125L7.23828 15.0312L7.14453 14.2812C7.12553 14.1172 7.11328 14.023 7.11328 14C7.11328 12.883 7.98489 12 9.08789 12C9.22689 12 9.38078 12.0205 9.55078 12.0625L10.168 12.2188L10.5371 11.7188C11.8021 10.0747 13.777 9 15.998 9ZM18.3867 11.1816L14.1406 15.4258C13.649 15.1625 13.0948 15 12.498 15C10.565 15 8.99805 16.567 8.99805 18.5C8.99805 20.433 10.565 22 12.498 22C14.431 22 15.998 20.433 15.998 18.5C15.998 17.9983 15.8874 17.5232 15.6973 17.0918L19.998 12.793L19.8398 11.3027L18.3867 11.1816ZM11.998 18C12.55 18 12.998 18.448 12.998 19C12.998 19.552 12.55 20 11.998 20C11.446 20 10.998 19.552 10.998 19C10.998 18.448 11.446 18 11.998 18Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">SSO & SAML</p>
							</li>

							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M4 15.25V16.75C4 17.175 4.325 17.5 4.75 17.5C5.175 17.5 5.5 17.175 5.5 16.75V15.25C5.5 14.825 5.175 14.5 4.75 14.5C4.325 14.5 4 14.825 4 15.25ZM9.35 25.775L10.65 26.525C10.775 26.6 10.9 26.625 11.025 26.625C11.275 26.625 11.525 26.5 11.675 26.25C11.875 25.9 11.75 25.425 11.4 25.225L10.1 24.475C9.75 24.275 9.275 24.4 9.075 24.75C8.875 25.1 9 25.575 9.35 25.775ZM20.325 26.25C20.475 26.5 20.725 26.625 20.975 26.625C21.1 26.625 21.225 26.6 21.35 26.525L22.65 25.775C23 25.575 23.125 25.1 22.925 24.75C22.725 24.4 22.25 24.275 21.9 24.475L20.6 25.225C20.25 25.425 20.125 25.9 20.325 26.25ZM26.5 15.25V16.75C26.5 17.175 26.825 17.5 27.25 17.5C27.675 17.5 28 17.175 28 16.75V15.25C28 14.825 27.675 14.5 27.25 14.5C26.825 14.5 26.5 14.825 26.5 15.25ZM22.65 6.225L21.35 5.475C21 5.275 20.525 5.4 20.325 5.75C20.125 6.1 20.25 6.575 20.6 6.775L21.9 7.525C22.025 7.6 22.15 7.625 22.275 7.625C22.525 7.625 22.775 7.5 22.925 7.25C23.125 6.9 23 6.425 22.65 6.225ZM9.725 7.625C9.85 7.625 9.975 7.6 10.1 7.525L11.4 6.775C11.75 6.575 11.875 6.1 11.675 5.75C11.475 5.4 11 5.275 10.65 5.475L9.35 6.225C9 6.425 8.875 6.9 9.075 7.25C9.2 7.5 9.475 7.625 9.725 7.625ZM16 6.75C17.8 6.75 19.25 5.3 19.25 3.5C19.25 1.7 17.8 0.25 16 0.25C14.2 0.25 12.75 1.7 12.75 3.5C12.75 5.3 14.2 6.75 16 6.75ZM16 1.75C16.975 1.75 17.75 2.525 17.75 3.5C17.75 4.475 16.975 5.25 16 5.25C15.025 5.25 14.25 4.475 14.25 3.5C14.25 2.525 15.025 1.75 16 1.75ZM12.75 28.5C12.75 30.3 14.2 31.75 16 31.75C17.8 31.75 19.25 30.3 19.25 28.5C19.25 26.7 17.8 25.25 16 25.25C14.2 25.25 12.75 26.7 12.75 28.5ZM17.75 28.5C17.75 29.475 16.975 30.25 16 30.25C15.025 30.25 14.25 29.475 14.25 28.5C14.25 27.525 15.025 26.75 16 26.75C16.975 26.75 17.75 27.525 17.75 28.5ZM27.25 25.5C29.05 25.5 30.5 24.05 30.5 22.25C30.5 20.45 29.05 19 27.25 19C25.45 19 24 20.45 24 22.25C24 24.05 25.45 25.5 27.25 25.5ZM27.25 20.5C28.225 20.5 29 21.275 29 22.25C29 23.225 28.225 24 27.25 24C26.275 24 25.5 23.225 25.5 22.25C25.5 21.275 26.275 20.5 27.25 20.5ZM30.5 9.75C30.5 7.95 29.05 6.5 27.25 6.5C25.45 6.5 24 7.95 24 9.75C24 11.55 25.45 13 27.25 13C29.05 13 30.5 11.55 30.5 9.75ZM27.25 11.5C26.275 11.5 25.5 10.725 25.5 9.75C25.5 8.775 26.275 8 27.25 8C28.225 8 29 8.775 29 9.75C29 10.725 28.225 11.5 27.25 11.5ZM1.5 9.75C1.5 11.55 2.95 13 4.75 13C6.55 13 8 11.55 8 9.75C8 7.95 6.55 6.5 4.75 6.5C2.95 6.5 1.5 7.95 1.5 9.75ZM6.5 9.75C6.5 10.725 5.725 11.5 4.75 11.5C3.775 11.5 3 10.725 3 9.75C3 8.775 3.775 8 4.75 8C5.725 8 6.5 8.775 6.5 9.75ZM4.75 25.5C6.55 25.5 8 24.05 8 22.25C8 20.45 6.55 19 4.75 19C2.95 19 1.5 20.45 1.5 22.25C1.5 24.05 2.95 25.5 4.75 25.5ZM4.75 20.5C5.725 20.5 6.5 21.275 6.5 22.25C6.5 23.225 5.725 24 4.75 24C3.775 24 3 23.225 3 22.25C3 21.275 3.775 20.5 4.75 20.5ZM19.75 14.875H19.5V12.875C19.5 10.95 17.925 9.375 16 9.375C14.075 9.375 12.5 10.95 12.5 12.875V14.875H12.25C11.55 14.875 11 15.425 11 16.125V17.875C11 20.625 13.25 22.875 16 22.875C18.75 22.875 21 20.625 21 17.875V16.125C21 15.425 20.45 14.875 19.75 14.875ZM16 19C15.575 19 15.25 18.675 15.25 18.25C15.25 17.825 15.575 17.5 16 17.5C16.425 17.5 16.75 17.825 16.75 18.25C16.75 18.675 16.425 19 16 19ZM18 14.875H14V12.875C14 11.775 14.9 10.875 16 10.875C17.1 10.875 18 11.775 18 12.875V14.875Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">Private Networking</p>
							</li>

							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M15.9974 2.66699C8.64544 2.66699 2.66406 8.64837 2.66406 16.0003C2.66406 23.3523 8.64544 29.3337 15.9974 29.3337C23.3494 29.3337 29.3307 23.3523 29.3307 16.0003C29.3307 8.64837 23.3494 2.66699 15.9974 2.66699ZM15.9974 4.66699C22.2685 4.66699 27.3307 9.72925 27.3307 16.0003C27.3307 22.2714 22.2685 27.3337 15.9974 27.3337C9.72632 27.3337 4.66406 22.2714 4.66406 16.0003C4.66406 9.72925 9.72632 4.66699 15.9974 4.66699ZM15.9974 5.66699C15.7322 5.66699 15.4778 5.77235 15.2903 5.95989C15.1028 6.14742 14.9974 6.40178 14.9974 6.66699C14.9974 6.93221 15.1028 7.18656 15.2903 7.3741C15.4778 7.56164 15.7322 7.66699 15.9974 7.66699C16.2626 7.66699 16.517 7.56164 16.7045 7.3741C16.892 7.18656 16.9974 6.93221 16.9974 6.66699C16.9974 6.40178 16.892 6.14742 16.7045 5.95989C16.517 5.77235 16.2626 5.66699 15.9974 5.66699ZM9.39844 8.40137C9.13322 8.40137 8.87887 8.50672 8.69133 8.69426C8.50379 8.8818 8.39844 9.13615 8.39844 9.40137C8.39844 9.66658 8.50379 9.92094 8.69133 10.1085C8.87887 10.296 9.13322 10.4014 9.39844 10.4014C9.66365 10.4014 9.91801 10.296 10.1055 10.1085C10.2931 9.92094 10.3984 9.66658 10.3984 9.40137C10.3984 9.13615 10.2931 8.8818 10.1055 8.69426C9.91801 8.50672 9.66365 8.40137 9.39844 8.40137ZM22.5964 8.40137C22.3311 8.40137 22.0768 8.50672 21.8892 8.69426C21.7017 8.8818 21.5964 9.13615 21.5964 9.40137C21.5964 9.66658 21.7017 9.92094 21.8892 10.1085C22.0768 10.296 22.3311 10.4014 22.5964 10.4014C22.8616 10.4014 23.1159 10.296 23.3035 10.1085C23.491 9.92094 23.5964 9.66658 23.5964 9.40137C23.5964 9.13615 23.491 8.8818 23.3035 8.69426C23.1159 8.50672 22.8616 8.40137 22.5964 8.40137ZM22.9961 12.8115C21.4696 12.7858 16.082 14.5218 15.487 14.7686C14.807 15.0506 14.4836 15.8307 14.7656 16.5107C15.0476 17.1907 15.8278 17.5141 16.5078 17.2321C17.1885 16.9501 23.67 13.6185 23.388 12.9391C23.3528 12.854 23.2142 12.8152 22.9961 12.8115ZM6.66406 15.0003C6.39885 15.0003 6.14449 15.1057 5.95696 15.2932C5.76942 15.4808 5.66406 15.7351 5.66406 16.0003C5.66406 16.2655 5.76942 16.5199 5.95696 16.7074C6.14449 16.895 6.39885 17.0003 6.66406 17.0003C6.92928 17.0003 7.18363 16.895 7.37117 16.7074C7.55871 16.5199 7.66406 16.2655 7.66406 16.0003C7.66406 15.7351 7.55871 15.4808 7.37117 15.2932C7.18363 15.1057 6.92928 15.0003 6.66406 15.0003ZM25.3307 15.0003C25.0655 15.0003 24.8112 15.1057 24.6236 15.2932C24.4361 15.4808 24.3307 15.7351 24.3307 16.0003C24.3307 16.2655 24.4361 16.5199 24.6236 16.7074C24.8112 16.895 25.0655 17.0003 25.3307 17.0003C25.5959 17.0003 25.8503 16.895 26.0378 16.7074C26.2254 16.5199 26.3307 16.2655 26.3307 16.0003C26.3307 15.7351 26.2254 15.4808 26.0378 15.2932C25.8503 15.1057 25.5959 15.0003 25.3307 15.0003ZM9.39844 21.5993C9.13322 21.5993 8.87887 21.7046 8.69133 21.8922C8.50379 22.0797 8.39844 22.3341 8.39844 22.5993C8.39844 22.8645 8.50379 23.1189 8.69133 23.3064C8.87887 23.4939 9.13322 23.5993 9.39844 23.5993C9.66365 23.5993 9.91801 23.4939 10.1055 23.3064C10.2931 23.1189 10.3984 22.8645 10.3984 22.5993C10.3984 22.3341 10.2931 22.0797 10.1055 21.8922C9.91801 21.7046 9.66365 21.5993 9.39844 21.5993ZM22.5964 21.5993C22.3311 21.5993 22.0768 21.7046 21.8892 21.8922C21.7017 22.0797 21.5964 22.3341 21.5964 22.5993C21.5964 22.8645 21.7017 23.1189 21.8892 23.3064C22.0768 23.4939 22.3311 23.5993 22.5964 23.5993C22.8616 23.5993 23.1159 23.4939 23.3035 23.3064C23.491 23.1189 23.5964 22.8645 23.5964 22.5993C23.5964 22.3341 23.491 22.0797 23.3035 21.8922C23.1159 21.7046 22.8616 21.5993 22.5964 21.5993Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">99.999% uptime SLA.</p>
							</li>

							<li className="flex gap-2.5 items-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="w-24px desktop:w-32px">
									<path
										d="M16.0352 1.33349C15.7773 1.32545 15.5263 1.41735 15.3346 1.59001C15.3346 1.59001 10.3294 6.00016 4.33594 6.00016C4.07073 6.00019 3.81639 6.10555 3.62886 6.29308C3.44133 6.48061 3.33596 6.73495 3.33594 7.00016V15.1733C3.33594 19.6254 5.39555 26.9511 15.6146 31.2554C15.7374 31.3071 15.8693 31.3337 16.0026 31.3337C16.1359 31.3337 16.2678 31.3071 16.3906 31.2554C26.6097 26.9511 28.6693 19.6254 28.6693 15.1733V7.00016C28.6692 6.73495 28.5639 6.48061 28.3763 6.29308C28.1888 6.10555 27.9345 6.00019 27.6693 6.00016C21.6758 6.00016 16.6706 1.59001 16.6706 1.59001C16.4956 1.43234 16.2706 1.34151 16.0352 1.33349ZM16.0026 3.61865C17.3779 4.7244 21.4101 7.55829 26.6693 7.91683V15.1733C26.6693 19.0015 25.1982 25.1773 16.0026 29.2176C6.80697 25.1773 5.33594 19.0015 5.33594 15.1733V7.91683C10.5951 7.55829 14.6273 4.7244 16.0026 3.61865ZM16.0026 8.00016C13.8054 8.00016 12.0026 9.80292 12.0026 12.0002V13.5197C10.845 13.9369 10.0026 15.0401 10.0026 16.3335V19.6668C10.0026 21.3118 11.3576 22.6668 13.0026 22.6668H19.0026C20.6476 22.6668 22.0026 21.3118 22.0026 19.6668V16.3335C22.0026 15.0401 21.1602 13.9369 20.0026 13.5197V12.0002C20.0026 9.80292 18.1998 8.00016 16.0026 8.00016ZM16.0026 10.0002C17.1187 10.0002 18.0026 10.8841 18.0026 12.0002V13.3335H14.0026V12.0002C14.0026 10.8841 14.8865 10.0002 16.0026 10.0002ZM13.0026 15.3335H19.0026C19.5669 15.3335 20.0026 15.7692 20.0026 16.3335V19.6668C20.0026 20.2312 19.5669 20.6668 19.0026 20.6668H13.0026C12.4383 20.6668 12.0026 20.2312 12.0026 19.6668V16.3335C12.0026 15.7692 12.4383 15.3335 13.0026 15.3335ZM16.0026 16.6668C15.649 16.6668 15.3098 16.8073 15.0598 17.0574C14.8097 17.3074 14.6693 17.6465 14.6693 18.0002C14.6693 18.3538 14.8097 18.6929 15.0598 18.943C15.3098 19.193 15.649 19.3335 16.0026 19.3335C16.3562 19.3335 16.6954 19.193 16.9454 18.943C17.1955 18.6929 17.3359 18.3538 17.3359 18.0002C17.3359 17.6465 17.1955 17.3074 16.9454 17.0574C16.6954 16.8073 16.3562 16.6668 16.0026 16.6668Z"
										fill="black"
									/>
								</svg>
								<p className="text-14 desktop:text-20 font-semibold leading-[150%]">Role-based access control.</p>
							</li>
						</ul>

						<div className="w-full desktop:w-[720px] h-[250px] desktop:h-[360px] rounded-16px bg-gradient-to-b from-[#2780F11A] to-[#fafafa]"></div>
					</div>
				</div>
			</section>
		</main>
	);
}
