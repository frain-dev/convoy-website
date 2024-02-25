'use client';
import Link from 'next/link';
import Image from 'next/image';
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

export default function Community() {
	const setupSteps = ['git clone https://github.com/frain-dev/convoy.git', 'cd convoy', 'docker compose -f configs/local/docker-compose.yml up'];

	const communityFeatures = [
		{
			title: 'Rate Limiting',
			img: 'rate-limiting',
			body: 'Control the number of events sent to an endpoint by setting a rate limit and duration on each of your endpoints with Convoy. Our flexible rate limiting feature allows you to adjust the default 5,000 requests per minute to fit your unique use case for your customers.'
		},
		{
			title: 'Retries',
			img: 'retries 2',
			body: 'Efficiently handle endpoint failures by setting the number of attempts that works for you. Convoy supports linear and exponential back-off retry strategies and circuit breaking to suit any use case. Rest easy knowing that your requests will be automatically retried, improving the reliability and resilience of your API.'
		},
		{
			title: 'Static IP’s',
			img: 'static-ips',
			body: 'Configure outgoing webhook requests with static IPs easily with Convoy. Set up your webhook events with static IP addresses, ensuring that your IPs remain constant throughout the entire request lifecycle. This is a prerequisite for modern API providers, and our platform makes this process effortless.'
		},
		{
			title: 'Delivery Attempt Logs',
			img: 'delivery-attempt-logs',
			body: 'Debug events faster with Convoy’s intuitive dashboard which provides a clear overview of your event system. Easily fix customer issues and have a guaranteed audit trail in addition to application logs. View delivery attempt logs, identify bottlenecks, and optimize your APIs for maximum performance.'
		},
		{
			title: 'Rolling Secrets',
			img: 'rolling-secrets',
			body: 'Ensure payload security with Convoy by signing payloads before events are sent. Convoy generates a secret if you don’t supply one and implements rolling secrets for your payload security. Your secrets are automatically rotated at regular intervals, providing an added layer of security to your APIs.'
		},
		{
			title: 'App Portal',
			img: 'app-portal',
			body: 'Provide an easy-to-use interface for your customers to view, inspect, troubleshoot issues quickly and debug events with Convoy’s App Portal. Accessible through the SDKs, you can power your custom-built UI for your users and reduce workload for your customer success team.'
		}
	];

	const copyCommand = async (event: any, textToCopy: string) => {
		event.stopPropagation();

		try {
			await navigator.clipboard.writeText(textToCopy);
		} catch (err) {
			return err;
		}
	};

	return (
		<main>
			<section className="bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] pt-200px pb-100px desktop:pt-250px desktop:pb-150px mb-100px">
				<div className="max-w-[1350px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
					<div>
						<h1 className="text-white-100 text-32 md:text-[56px] md:leading-[80px] max-w-[680px] font-bold footer:text-center">
							Open-source Gateway for incoming and outgoing webhooks
						</h1>
						<p className="text-white-100 max-w-[660px] text-16 mobile:text-14 leading-9 my-16px footer:text-center">
							Everything you need to manage webhooks in one place with security, reliability and scalability already figured out from day one.
						</p>
						<div className="flex footer:justify-center mt-40px">
							<a
								target="_blank"
								href="https://github.com/frain-dev/convoy#installation-getting-started"
								className="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-400 text-white-100 text-center mr-24px xs:mr-0 xs:mb-20px xs:w-full">
								Get set up in 3 minutes
							</a>
						</div>
					</div>

					<div className="md:bg-white-100 md:shadow-[0px_2px_4px_rgba(12,26,75,0.04),0px_4px_20px_-2px_rgba(50,50,71,0.08)] rounded-8px p-20px md:py-30px md:px-60px max-w-[565px] w-full">
						<div className="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
						{setupSteps.map(step => (
							<div
								className="bg-[#393040] border-[0.5px] border-[#F5F4F5] rounded-4px py-12px px-14px mb-24px flex items-center justify-between text-white-100 text-14"
								key={step}>
								<span>$ {step}</span>
								<button type="button" className="bg-transparent" onClick={event => copyCommand(event, step)}>
									<img src="/svg/copy-icon.svg" alt="copy icon" />
								</button>
							</div>
						))}

						<div className="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
						<div className="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
					</div>
				</div>
			</section>

			<section className="bg-white-100 px-20px desktop:mt-160px">
				<div className="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] max-w-[1350px]">
					<div className="w-full md:bg-[url(/static/Settings.png)] bg-no-repeat bg-right desktop:bg-contain rounded-[70px] min-h-[200px] py-30px desktop:py-56px px-20px desktop:px-70px">
						<p className="font-bold text-white-100 text-24 desktop:text-30 max-w-[690px]">
							Engineering teams that value efficiency use Convoy to manage webhook events.
						</p>

						<ul className="flex items-center list-none mt-38px">
							<li className="mr-12px">
								<a target="_blank" href="https://www.drivehailify.com/">
									<Image src={HailifyIcon} alt="hailify logo" />
								</a>
							</li>
							<li className="mr-12px">
								<a target="_blank" href="https://www.piggyvest.com/">
									<Image src={PiggyvestIcon} alt="piggyvest logo" />
								</a>
							</li>
							<li className="mr-12px">
								<a target="_blank" href="https://www.catlog.shop/">
									<Image src={CatlogIcon} alt="catlog logo" />
								</a>
							</li>
							<li className="mr-12px">
								<a target="_blank" href="https://www.payourse.com/">
									<Image src={PayourseIcon} className="mt-4px" alt="payourse logo" />
								</a>
							</li>
							<li className="mr-12px hidden desktop:block">
								<a target="_blank" href="https://buycoins.africa/">
									<Image src={BuycoinsIcon} alt="buycoins logo" />
								</a>
							</li>
							<li className="mr-12px hidden desktop:block">
								<a target="_blank" href="https://www.getwallets.co/">
									<Image src={GetWalletsIcon} alt="getwallets logo" />
								</a>
							</li>
							<li className="mr-12px hidden desktop:block">
								<a target="_blank" href="https://www.dojah.io/">
									<Image src={DojahIcon} alt="dojah logo" />
								</a>
							</li>
							<li className="mr-12px hidden desktop:block">
								<a target="_blank" href="https://termii.com/">
									<Image src={TermiiIcon} alt="termii logo" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="py-100px desktop:py-200px bg-white-100">
				<div className="max-w-[1350px] m-auto px-20px">
					<div className="bg-[#F0F2FA] rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-40px">
						<div className="mr-16px w-24px h-24px rounded-100px bg-gray-800 flex justify-center items-center">
							<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.5749 6.95841C13.5056 6.82098 13.3997 6.70541 13.2688 6.62451C13.1379 6.54361 12.9871 6.50054 12.8332 6.50008H8.66655V1.50008C8.67549 1.31731 8.62403 1.13669 8.52011 0.986077C8.41619 0.835467 8.26559 0.723249 8.09155 0.666743C7.92424 0.611696 7.74379 0.611077 7.5761 0.664976C7.40842 0.718875 7.26212 0.824519 7.15822 0.966743L0.491551 10.1334C0.408023 10.2541 0.357867 10.3948 0.34616 10.5411C0.334453 10.6874 0.361611 10.8343 0.424885 10.9667C0.483153 11.1182 0.584375 11.2493 0.716126 11.3441C0.847877 11.4388 1.00442 11.493 1.16655 11.5001H5.33322V16.5001C5.33335 16.6758 5.38903 16.847 5.4923 16.9892C5.59557 17.1314 5.74114 17.2373 5.90822 17.2917C5.99194 17.3177 6.07891 17.3317 6.16655 17.3334C6.29804 17.3338 6.42774 17.303 6.54506 17.2436C6.66237 17.1842 6.76397 17.0979 6.84155 16.9917L13.5082 7.82508C13.598 7.70074 13.6517 7.55404 13.6635 7.40112C13.6753 7.24821 13.6446 7.09502 13.5749 6.95841ZM6.99988 13.9334V10.6667C6.99988 10.4457 6.91209 10.2338 6.75581 10.0775C6.59953 9.92121 6.38756 9.83341 6.16655 9.83341H2.83322L6.99988 4.06674V7.33341C6.99988 7.55442 7.08768 7.76638 7.24396 7.92267C7.40024 8.07895 7.6122 8.16674 7.83322 8.16674H11.1666L6.99988 13.9334Z"
									fill="#FCFCFC"
								/>
							</svg>
						</div>
						Be a part of the community!
					</div>
					<h1 className="text-center font-bold max-w-[840px] text-24 md:text-[48px] md:leading-[58px] mt-16px mx-auto mb-80px md:mb-198px">
						Everything you need before you need it
					</h1>

					<div className="grid grid-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-100px">
						{communityFeatures.map((feature, index) => (
							<div className="flex justify-start items-start" key={index}>
								<img src={`/svg/${feature.img}.svg`} className="mr-14px w-40px" alt={feature.title} />

								<div>
									<h2 className="font-bold mb-12px desktop:mb-24px text-gray-600 text-20">{feature.title}</h2>
									<p className="text-14 text-gray-500 leading-7">{feature.body}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] mt-200px">
				<div className="max-w-[1350px] m-auto px-20px pb-80px desktop:pb-150px pt-80px">
					<div className="bg-white-100 rounded-[40px] footer:mx-auto w-fit py-10px px-20px flex items-center text-14 mb-40px">
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
					<h1 className="text-30 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px max-w-[562px] m-auto">
						Start sending and receiving webhooks now, risk free
					</h1>
					<p className="text-center text-14 text-white-100 max-w-[756px] m-auto">
						Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time
						and get started today.
					</p>
					<a
						target="_blank"
						href="https://github.com/frain-dev/convoy#installation-getting-started"
						className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-12 font-medium flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
						Get Started
						<Image src={ArrowRightIcon} className="ml-12px w-12px" alt="arrow right" />
					</a>
				</div>
			</section>
		</main>
	);
}
