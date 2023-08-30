'use client';
import Link from 'next/link';
import Image from 'next/image';
import CloudImage from '../../../../public/static/cloud.png';
import DojahIcon from '../../../../public/svg/dojah.svg';
import CatlogIcon from '../../../../public/svg/Catlog.svg';
import GetWalletsIcon from '../../../../public/svg/getwallets.svg';
import PayourseIcon from '../../../../public/svg/payourse.svg';
import PiggyvestIcon from '../../../../public/svg/piggyvest.svg';
import TermiiIcon from '../../../../public/svg/termii.svg';
import HailifyIcon from '../../../../public/svg/hailify-logo.svg';
import BuycoinsIcon from '../../../../public/svg/buycoins.svg';
import ArrowRightIcon from '../../../../public/svg/arrow-right-icon.svg';
import Subscribe from '../../components/Subscribe';

export default function Cloud() {
	const cloudFeatures = [
		{
			title: 'Everything Webhooks',
			img: 'everything-webhooks',
			features: [
				'Manage millions of both outgoing and incoming web-hooks.',
				'Retries are free and rate limiting over 300 events per second.',
				'Very generous data retention policies of over 29 days.'
			]
		},
		{
			title: 'Robust features',
			img: 'robust-features',
			features: [
				'Pull events directly from message brokers like Kafka, Pubsub and SQS.',
				'Get access to Static IPs for easy management of endpoints.',
				'Debug faster with excellent payload filters that get things done.'
			]
		},
		{
			title: 'Maximum Efficiency',
			img: 'maximum-efficiency',
			features: [
				'Portal links for your customers to access their events and retry themselves',
				'Well documented APIs and Convoy CLI service.',
				'Deploy to any Environment and use any language of choice.'
			]
		}
	];
	return (
		<main>
			<section
				className="bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)] pt-200px pb-100px desktop:pt-200px desktop:pb-280px flex flex-col desktop:justify-center desktop:items-center px-20px"
				id="home">
				<div className="bg-primary-25 rounded-[40px] w-fit py-10px px-20px flex items-center text-14 mb-40px">
					We are backed by
					<Image src="/svg/y-combinator.svg" width={24} height={24} className="ml-16px" alt="y-combinator" />
				</div>
				<h1 className="desktop:text-center text-gray-25 text-32 desktop:text-[56px] desktop:leading-[80px] font-bold max-w-[841px]">
					Make Webhooks management our problem, not yours
				</h1>

				<p className="desktop:text-center text-gray-25 max-w-[841px] mx-auto text-18 mobile:text-14 mt-16px">
					Reliable Webhooks Gateway with everything you need in one place including multi-region deployment, high availability and autoscaling.
				</p>
				<div className="flex desktop:justify-center xs:flex-col mt-40px">
					<Link
						href="https://dashboard.getconvoy.io/signup"
						className="py-12px desktop:py-16px px-38px shadow-lg hover:shadow-xl transition-all duration-300 desktop:px-24px text-14 text-center font-medium rounded-8px bg-white-100 text-gray-800 mr-24px xs:mr-0 xs:mb-20px xs:w-[90vw]">
						Start your webhooks project
					</Link>

					<Link
						href="/docs"
						className="py-12px px-28px text-14 font-medium rounded-8px bg-transparent text-gray-25 border border-gray-25 flex items-center justify-center text-center xs:w-[90vw]">
						<Image src="/svg/documentation.svg" height={16} width={16} className="mr-10px" alt="document icon" />
						Documentation
					</Link>
				</div>
			</section>

			<section className="bg-white-100 px-20px hidden desktop:block min-h-[500px]">
				<div className="mx-auto max-w-[1400px] relative">
					<Image src={CloudImage} alt="cloud image" className="-mt-180px absolute" priority />
				</div>
			</section>

			<section className="bg-white-100 px-20px pt-120px desktop:pt-160px">
				<div className="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)] max-w-[1350px]">
					<div className="w-full md:bg-[url(/static/Settings.png)] bg-no-repeat bg-right desktop:bg-contain rounded-[70px] min-h-[200px] py-30px desktop:py-56px px-20px desktop:px-70px">
						<p className="font-bold text-white-100 text-24 desktop:text-32 max-w-[690px]">
							Engineering teams that value efficiency use Convoy to manage webhook events.
						</p>

						<ul className="flex items-center list-none mt-38px">
							<li className="mr-12px">
								<Link href="https://www.drivehailify.com/">
									<Image src={HailifyIcon} alt="hailify logo" />
								</Link>
							</li>
							<li className="mr-12px">
								<Link href="https://www.piggyvest.com/">
									<Image src={PiggyvestIcon} alt="piggyvest logo" />
								</Link>
							</li>
							<li className="mr-12px">
								<Link href="https://www.catlog.shop/">
									<Image src={CatlogIcon} alt="catlog logo" />
								</Link>
							</li>
							<li className="mr-12px">
								<Link href="https://www.payourse.com/">
									<Image src={PayourseIcon} className="mt-4px" alt="payourse logo" />
								</Link>
							</li>
							<li className="mr-12px hidden desktop:block">
								<Link href="https://buycoins.africa/">
									<Image src={BuycoinsIcon} alt="buycoins logo" />
								</Link>
							</li>
							<li className="mr-12px hidden desktop:block">
								<Link href="https://www.getwallets.co/">
									<Image src={GetWalletsIcon} alt="getwallets logo" />
								</Link>
							</li>
							<li className="mr-12px hidden desktop:block">
								<Link href="https://www.dojah.io/">
									<Image src={DojahIcon} alt="dojah logo" />
								</Link>
							</li>
							<li className="mr-12px hidden desktop:block">
								<Link href="https://termii.com/">
									<Image src={TermiiIcon} alt="termii logo" />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="bg-white-100 py-100px desktop:py-160px">
				<div className="max-w-[1350px] m-auto px-20px">
					<div className="bg-primary-25 rounded-[40px] w-fit footer:m-auto py-10px px-20px flex items-center text-14 mb-40px">
						<div className="mr-16px w-24px h-24px rounded-100px bg-primary-400 flex justify-center items-center">
							<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.5749 6.95841C13.5056 6.82098 13.3997 6.70541 13.2688 6.62451C13.1379 6.54361 12.9871 6.50054 12.8332 6.50008H8.66655V1.50008C8.67549 1.31731 8.62403 1.13669 8.52011 0.986077C8.41619 0.835467 8.26559 0.723249 8.09155 0.666743C7.92424 0.611696 7.74379 0.611077 7.5761 0.664976C7.40842 0.718875 7.26212 0.824519 7.15822 0.966743L0.491551 10.1334C0.408023 10.2541 0.357867 10.3948 0.34616 10.5411C0.334453 10.6874 0.361611 10.8343 0.424885 10.9667C0.483153 11.1182 0.584375 11.2493 0.716126 11.3441C0.847877 11.4388 1.00442 11.493 1.16655 11.5001H5.33322V16.5001C5.33335 16.6758 5.38903 16.847 5.4923 16.9892C5.59557 17.1314 5.74114 17.2373 5.90822 17.2917C5.99194 17.3177 6.07891 17.3317 6.16655 17.3334C6.29804 17.3338 6.42774 17.303 6.54506 17.2436C6.66237 17.1842 6.76397 17.0979 6.84155 16.9917L13.5082 7.82508C13.598 7.70074 13.6517 7.55404 13.6635 7.40112C13.6753 7.24821 13.6446 7.09502 13.5749 6.95841ZM6.99988 13.9334V10.6667C6.99988 10.4457 6.91209 10.2338 6.75581 10.0775C6.59953 9.92121 6.38756 9.83341 6.16655 9.83341H2.83322L6.99988 4.06674V7.33341C6.99988 7.55442 7.08768 7.76638 7.24396 7.92267C7.40024 8.07895 7.6122 8.16674 7.83322 8.16674H11.1666L6.99988 13.9334Z"
									fill="#FCFCFC"
								/>
							</svg>
						</div>
						First choice for developers
					</div>
					<h1 className="text-[48px] leading-[56px] font-bold footer:text-center max-w-[600px]">Why Engineers choose Convoy</h1>

					<div className="flex justify-between flex-wrap gap-6 mt-80px desktop:mt-120px">
						<div className="desktop:max-w-[340px]">
							<Image
								src="/static/fully-managed.png"
								height={48}
								width={48}
								className="mb-24px rounded-10px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]"
								alt="everything-you-need"
							/>
							<p className="text-14 desktop:text-18 text-gray-600">Fully managed global cloud infrastructure with high availability and resilience baked in.</p>
						</div>
						<div className="desktop:max-w-[400px]">
							<Image
								src="/static/stay-compliant.png"
								height={48}
								width={48}
								className="mb-24px rounded-10px shadow-[0px_22px_24px_rgba(43,214,123,0.2)]"
								alt="excellent-rate-limiting"
							/>
							<p className="text-14 desktop:text-18 max-w-[333px] text-gray-600">Stay compliant by choosing the region we host and store your webhooks data.</p>
						</div>
						<div className="desktop:max-w-[340px]">
							<Image
								src="/static/transparent-usage.png"
								height={48}
								width={48}
								className="mb-24px rounded-10px shadow-[0px_22px_24px_rgba(247,227,109,0.2)]"
								alt="transparent-pricing"
							/>
							<p className="text-14 desktop:text-18 text-gray-600">Transparent usage-based pricing, keep costs under control by paying for what you use.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="pt-100px desktop:pt-200px">
				<div className="bg-primary-25 rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-40px">
					<div className="mr-16px w-24px h-24px rounded-100px bg-primary-400 flex justify-center items-center">
						<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M13.5749 6.95841C13.5056 6.82098 13.3997 6.70541 13.2688 6.62451C13.1379 6.54361 12.9871 6.50054 12.8332 6.50008H8.66655V1.50008C8.67549 1.31731 8.62403 1.13669 8.52011 0.986077C8.41619 0.835467 8.26559 0.723249 8.09155 0.666743C7.92424 0.611696 7.74379 0.611077 7.5761 0.664976C7.40842 0.718875 7.26212 0.824519 7.15822 0.966743L0.491551 10.1334C0.408023 10.2541 0.357867 10.3948 0.34616 10.5411C0.334453 10.6874 0.361611 10.8343 0.424885 10.9667C0.483153 11.1182 0.584375 11.2493 0.716126 11.3441C0.847877 11.4388 1.00442 11.493 1.16655 11.5001H5.33322V16.5001C5.33335 16.6758 5.38903 16.847 5.4923 16.9892C5.59557 17.1314 5.74114 17.2373 5.90822 17.2917C5.99194 17.3177 6.07891 17.3317 6.16655 17.3334C6.29804 17.3338 6.42774 17.303 6.54506 17.2436C6.66237 17.1842 6.76397 17.0979 6.84155 16.9917L13.5082 7.82508C13.598 7.70074 13.6517 7.55404 13.6635 7.40112C13.6753 7.24821 13.6446 7.09502 13.5749 6.95841ZM6.99988 13.9334V10.6667C6.99988 10.4457 6.91209 10.2338 6.75581 10.0775C6.59953 9.92121 6.38756 9.83341 6.16655 9.83341H2.83322L6.99988 4.06674V7.33341C6.99988 7.55442 7.08768 7.76638 7.24396 7.92267C7.40024 8.07895 7.6122 8.16674 7.83322 8.16674H11.1666L6.99988 13.9334Z"
								fill="#FCFCFC"
							/>
						</svg>
					</div>
					Straight-forward pricing, complete peace of mind
				</div>
				<h1 className="text-center font-bold max-w-[840px] desktop:text-[48px] desktop:leading-[58px] mt-16px mx-auto mb-80px desktop:mb-198px">
					One powerful gateway for all your webhooks.
				</h1>

				{cloudFeatures.map((feature, index) => (
					<div className="flex flex-col desktop:flex-row items-center justify-between max-w-[1297px] mx-auto mb-140px feature gap-x-20 gap-y-10" key={index}>
						<div className={`order-2 px-20px xs:px-10px desktop:px-0 ${index === 1 ? 'desktop:order-2' : 'desktop:order-1'}`}>
							<h3 className="font-semibold text-26 mb-40px">{feature.title}</h3>
							{feature.features.map(feat => (
								<div className="flex items-start mb-18px" key={feat}>
									<div className="mr-18px">
										<svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="0.5" width="37" height="36" rx="18" fill="#EDF2F7" />
											<path
												d="M19.7161 12.0887C19.7992 12.2092 19.8404 12.3537 19.8332 12.4999V15.9999V16.4999H20.3332L19.7161 12.0887ZM19.7161 12.0887C19.633 11.9682 19.5125 11.8784 19.3732 11.8332L19.7161 12.0887ZM23.3134 17.0915L23.3145 17.0938C23.3285 17.1211 23.3346 17.1518 23.3323 17.1824C23.3299 17.2127 23.3193 17.2419 23.3016 17.2666C23.3015 17.2668 23.3013 17.267 23.3012 17.2671L17.9695 24.5982C17.9695 24.5983 17.9694 24.5984 17.9694 24.5984C17.9539 24.6196 17.9336 24.6367 17.9102 24.6486C17.8879 24.6599 17.8634 24.666 17.8384 24.6665C17.8181 24.6657 17.7979 24.6625 17.7783 24.6567C17.7463 24.6456 17.7184 24.6248 17.6984 24.5973C17.6778 24.569 17.6667 24.5348 17.6666 24.4998C17.6666 24.4997 17.6666 24.4996 17.6666 24.4995L17.6666 20.4999V19.9999H17.1666H13.8477C13.8178 19.9973 13.7892 19.9867 13.7648 19.9691C13.7385 19.9502 13.7182 19.924 13.7066 19.8937L13.6995 19.8754L13.6911 19.8577C13.6784 19.8312 13.673 19.8018 13.6753 19.7726C13.6776 19.7446 13.6868 19.7177 13.7022 19.6943L19.0303 12.3682C19.0304 12.3681 19.0304 12.368 19.0305 12.3679C19.0513 12.3396 19.0805 12.3185 19.1139 12.3078C19.1474 12.297 19.1835 12.2971 19.217 12.3082L19.217 12.3082L19.2188 12.3088C19.2536 12.3201 19.2838 12.3425 19.3046 12.3726L19.7125 12.0912L19.3046 12.3726C19.3253 12.4028 19.3356 12.4389 19.3338 12.4754L19.3332 12.4876V12.4999V16.4999V16.9999H19.8332H23.1656C23.1962 17.0001 23.2261 17.0087 23.2522 17.0248C23.2784 17.0409 23.2995 17.064 23.3134 17.0915ZM17.9999 22.4465V23.9923L18.9052 22.7394L22.2385 18.126L22.8114 17.3332H21.8332H19.1666C19.1224 17.3332 19.08 17.3156 19.0487 17.2844C19.0175 17.2531 18.9999 17.2107 18.9999 17.1665V14.5532V13.0075L18.0946 14.2604L14.7613 18.8737L14.1884 19.6665H15.1666H17.8332C17.8774 19.6665 17.9198 19.6841 17.9511 19.7153C17.9823 19.7466 17.9999 19.789 17.9999 19.8332V22.4465Z"
												fill="#000624"
												stroke="#477DB3"
											/>
										</svg>
									</div>
									<p className="text-16 text-gray-600 mobile:text-14 md:max-w-[542px]">{feat}</p>
								</div>
							))}
						</div>
						<div className={`md:max-w-[558px] tab:max-w-[450px] tab:ml-20px order-1 ${index === 1 ? ' desktop:order-1' : ' desktop:order-2'}`}>
							<img src={`/static/${feature.img}.png`} alt={feature.title} className="object-contain" />
						</div>
					</div>
				))}
			</section>

			<section className="bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)]">
				<div className="max-w-[1350px] m-auto px-20px pb-80px desktop:pb-150px pt-80px">
					<div className="bg-white-100 rounded-[40px] w-fit footer:mx-auto py-10px px-20px flex items-center text-14 mb-40px">
						<div className="mr-16px w-24px h-24px rounded-100px bg-primary-200 flex justify-center items-center">
							<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.5749 6.95841C13.5056 6.82098 13.3997 6.70541 13.2688 6.62451C13.1379 6.54361 12.9871 6.50054 12.8332 6.50008H8.66655V1.50008C8.67549 1.31731 8.62403 1.13669 8.52011 0.986077C8.41619 0.835467 8.26559 0.723249 8.09155 0.666743C7.92424 0.611696 7.74379 0.611077 7.5761 0.664976C7.40842 0.718875 7.26212 0.824519 7.15822 0.966743L0.491551 10.1334C0.408023 10.2541 0.357867 10.3948 0.34616 10.5411C0.334453 10.6874 0.361611 10.8343 0.424885 10.9667C0.483153 11.1182 0.584375 11.2493 0.716126 11.3441C0.847877 11.4388 1.00442 11.493 1.16655 11.5001H5.33322V16.5001C5.33335 16.6758 5.38903 16.847 5.4923 16.9892C5.59557 17.1314 5.74114 17.2373 5.90822 17.2917C5.99194 17.3177 6.07891 17.3317 6.16655 17.3334C6.29804 17.3338 6.42774 17.303 6.54506 17.2436C6.66237 17.1842 6.76397 17.0979 6.84155 16.9917L13.5082 7.82508C13.598 7.70074 13.6517 7.55404 13.6635 7.40112C13.6753 7.24821 13.6446 7.09502 13.5749 6.95841ZM6.99988 13.9334V10.6667C6.99988 10.4457 6.91209 10.2338 6.75581 10.0775C6.59953 9.92121 6.38756 9.83341 6.16655 9.83341H2.83322L6.99988 4.06674V7.33341C6.99988 7.55442 7.08768 7.76638 7.24396 7.92267C7.40024 8.07895 7.6122 8.16674 7.83322 8.16674H11.1666L6.99988 13.9334Z"
									fill="#FCFCFC"
								/>
							</svg>
						</div>
						Be a part of the community!
					</div>

					<h1 className="text-white-100 text-[40px] leading-[60px] font-bold mb-80px mt-10px max-w-[880px] footer:text-center">
						Connect with the Convoy community across all our platforms
					</h1>
					<Subscribe></Subscribe>
				</div>
			</section>

			<section className="px-20px pb-100px desktop:pb-130px">
				<div className="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(/static/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
					<h1 className="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px max-w-[562px] m-auto">
						Start sending and receiving webhooks now, risk free
					</h1>
					<p className="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">
						Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time
						and get started today.
					</p>
					<Link
						href="#home"
						className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
						Request Access
						<Image src={ArrowRightIcon} className="ml-12px" alt="arrow right icon" />
					</Link>
				</div>
			</section>
		</main>
	);
}
