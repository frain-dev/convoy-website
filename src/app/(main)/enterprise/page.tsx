'use client';
import Link from 'next/link';
import Image from 'next/image';
import EnterpriseImage from '../../../../public/static/enterprise.png';
import DojahIcon from '../../../../public/svg/dojah.svg';
import CatlogIcon from '../../../../public/svg/Catlog.svg';
import GetWalletsIcon from '../../../../public/svg/getwallets.svg';
import PayourseIcon from '../../../../public/svg/payourse.svg';
import PiggyvestIcon from '../../../../public/svg/piggyvest.svg';
import TermiiIcon from '../../../../public/svg/termii.svg';
import HailifyIcon from '../../../../public/svg/hailify-logo.svg';
import BuycoinsIcon from '../../../../public/svg/buycoins.svg';
import ArrowRightIcon from '../../../../public/svg/arrow-right-icon.svg';
import EnterpriseWaitlist from '../../components/EnterpriseWaitList';

export default function Enterprise() {
	const enterpriseFeatures = [
		'Have a dedicated Customer Success team assigned to your organisational needs.',
		'With on-prem, you can create a private instance of your webhooks infrastructure and pass all security requirements pertaining to your scale.',
		'Own your data and stay compliant by deploying in regions of your choosing.',
		'Handle billions of webhook events reliably.'
	];
	return (
		<main>
			<section className="bg-[linear-gradient(248deg,#32587D_14%,#0f2a44f5_88%)] pt-200px pb-100px desktop:pt-250px desktop:pb-150px">
				<div className="max-w-[1280px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
					<div>
						<h1 className="text-white-100 desktop:text-[56px] desktop:leading-[80px] max-w-[580px] font-bold footer:text-center">High-performance Webhooks Gateway</h1>
						<p className="text-white-100 max-w-[580px] mx-auto text-16 mobile:text-14 leading-9 mt-16px footer:text-center">
							Manage billions of both incoming and outgoing webhook events while staying fully compliant by being in total control of your data on-premise.
						</p>
						<div className="flex footer:justify-center mt-40px">
							<Link
								href="#requestAccess"
								className="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-400 text-white-100 text-center mr-24px xs:mr-0 xs:mb-20px xs:w-full">
								Get Started
							</Link>
						</div>
					</div>
					<div className="max-h-[436px] max-w-[588px]">
						<Image src={EnterpriseImage} alt="enterprise image" />
					</div>
				</div>
			</section>

			<section className="py-120px desktop:py-160px">
				<div className="max-w-[1350px] m-auto px-20px">
					<div className="bg-[#F0F2FA] rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-26px">
						<div className="mr-16px w-24px h-24px rounded-100px bg-primary-600 flex justify-center items-center">
							<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.5749 6.95841C13.5056 6.82098 13.3997 6.70541 13.2688 6.62451C13.1379 6.54361 12.9871 6.50054 12.8332 6.50008H8.66655V1.50008C8.67549 1.31731 8.62403 1.13669 8.52011 0.986077C8.41619 0.835467 8.26559 0.723249 8.09155 0.666743C7.92424 0.611696 7.74379 0.611077 7.5761 0.664976C7.40842 0.718875 7.26212 0.824519 7.15822 0.966743L0.491551 10.1334C0.408023 10.2541 0.357867 10.3948 0.34616 10.5411C0.334453 10.6874 0.361611 10.8343 0.424885 10.9667C0.483153 11.1182 0.584375 11.2493 0.716126 11.3441C0.847877 11.4388 1.00442 11.493 1.16655 11.5001H5.33322V16.5001C5.33335 16.6758 5.38903 16.847 5.4923 16.9892C5.59557 17.1314 5.74114 17.2373 5.90822 17.2917C5.99194 17.3177 6.07891 17.3317 6.16655 17.3334C6.29804 17.3338 6.42774 17.303 6.54506 17.2436C6.66237 17.1842 6.76397 17.0979 6.84155 16.9917L13.5082 7.82508C13.598 7.70074 13.6517 7.55404 13.6635 7.40112C13.6753 7.24821 13.6446 7.09502 13.5749 6.95841ZM6.99988 13.9334V10.6667C6.99988 10.4457 6.91209 10.2338 6.75581 10.0775C6.59953 9.92121 6.38756 9.83341 6.16655 9.83341H2.83322L6.99988 4.06674V7.33341C6.99988 7.55442 7.08768 7.76638 7.24396 7.92267C7.40024 8.07895 7.6122 8.16674 7.83322 8.16674H11.1666L6.99988 13.9334Z"
									fill="#FCFCFC"
								/>
							</svg>
						</div>
						A better way to manage webhooks
					</div>
					<h1 className="text-[40px] text-gray-800 leading-[56px] font-semibold text-center">Do more with Convoy Enterprise.</h1>

					<div className="flex justify-between flex-wrap gap-6 mt-80px desktop:mt-120px">
						<div className="desktop:max-w-[340px]">
							<Image
								src="/static/everything-you-need.png"
								className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(65,111,244,0.2)] w-48px"
								alt="everything-you-need"
							/>
							<p className="text-14 text-gray-500 mt-24px leading-7">
								Granular role based access control, ensuring authorized access to infrastructure for large organizations.
							</p>
						</div>
						<div className="desktop:max-w-[400px]">
							<Image
								src="/static/excellent-rate-limiting.png"
								className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(43,214,123,0.2)] w-48px"
								alt="excellent-rate-limiting"
							/>
							<p className="text-14 text-gray-500 mt-24px leading-7">
								Efficiently create separate environments for development, staging, and production, enabling faster iteration, and improved software delivery.
							</p>
						</div>
						<div className="desktop:max-w-[340px]">
							<Image
								src="/static/transparent-pricing.png"
								className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(247,227,109,0.2)] w-48px"
								alt="transparent-pricing"
							/>
							<p className="text-14 text-gray-500 mt-24px leading-7">
								Detailed Audit Logs so your team can tracks all user actions and event calls for compliance and security purposes.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="px-20px">
				<div className="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(248deg,#32587D_14%,#0f2a44f5_88%)] max-w-[1350px]">
					<div className="w-full md:bg-[url(/static/Settings.png)] bg-no-repeat bg-right desktop:bg-contain rounded-[70px] min-h-[200px] py-30px desktop:py-56px px-20px desktop:px-70px">
						<p className="font-bold text-white-100 text-24 desktop:text-32 max-w-[690px]">
							Engineering teams that value efficiency use
							<span className="text-primary-300 mx-4px">Convoy</span>
							to manage webhook events.
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

			<section className="bg-white-100 py-100px px-20px" id="requestAccess">
				<div className="max-w-[1350px] m-auto flex flex-wrap items-center justify-between">
					<div>
						<h1 className="font-bold text-32 max-w-[480px] mb-60px">Enterprise-ready Webhooks Gateway</h1>
						{enterpriseFeatures.map(feature => (
							<div className="flex items-center mb-40px" key={feature}>
								<div className="mr-18px">
									<svg width="30" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="0.5" y="0.5" width="37" height="36" rx="18" fill="#EDF2F7" />
										<path
											d="M19.7161 12.0887C19.7992 12.2092 19.8404 12.3537 19.8332 12.4999V15.9999V16.4999H20.3332L19.7161 12.0887ZM19.7161 12.0887C19.633 11.9682 19.5125 11.8784 19.3732 11.8332L19.7161 12.0887ZM23.3134 17.0915L23.3145 17.0938C23.3285 17.1211 23.3346 17.1518 23.3323 17.1824C23.3299 17.2127 23.3193 17.2419 23.3016 17.2666C23.3015 17.2668 23.3013 17.267 23.3012 17.2671L17.9695 24.5982C17.9695 24.5983 17.9694 24.5984 17.9694 24.5984C17.9539 24.6196 17.9336 24.6367 17.9102 24.6486C17.8879 24.6599 17.8634 24.666 17.8384 24.6665C17.8181 24.6657 17.7979 24.6625 17.7783 24.6567C17.7463 24.6456 17.7184 24.6248 17.6984 24.5973C17.6778 24.569 17.6667 24.5348 17.6666 24.4998C17.6666 24.4997 17.6666 24.4996 17.6666 24.4995L17.6666 20.4999V19.9999H17.1666H13.8477C13.8178 19.9973 13.7892 19.9867 13.7648 19.9691C13.7385 19.9502 13.7182 19.924 13.7066 19.8937L13.6995 19.8754L13.6911 19.8577C13.6784 19.8312 13.673 19.8018 13.6753 19.7726C13.6776 19.7446 13.6868 19.7177 13.7022 19.6943L19.0303 12.3682C19.0304 12.3681 19.0304 12.368 19.0305 12.3679C19.0513 12.3396 19.0805 12.3185 19.1139 12.3078C19.1474 12.297 19.1835 12.2971 19.217 12.3082L19.217 12.3082L19.2188 12.3088C19.2536 12.3201 19.2838 12.3425 19.3046 12.3726L19.7125 12.0912L19.3046 12.3726C19.3253 12.4028 19.3356 12.4389 19.3338 12.4754L19.3332 12.4876V12.4999V16.4999V16.9999H19.8332H23.1656C23.1962 17.0001 23.2261 17.0087 23.2522 17.0248C23.2784 17.0409 23.2995 17.064 23.3134 17.0915ZM17.9999 22.4465V23.9923L18.9052 22.7394L22.2385 18.126L22.8114 17.3332H21.8332H19.1666C19.1224 17.3332 19.08 17.3156 19.0487 17.2844C19.0175 17.2531 18.9999 17.2107 18.9999 17.1665V14.5532V13.0075L18.0946 14.2604L14.7613 18.8737L14.1884 19.6665H15.1666H17.8332C17.8774 19.6665 17.9198 19.6841 17.9511 19.7153C17.9823 19.7466 17.9999 19.789 17.9999 19.8332V22.4465Z"
											fill="#000624"
											stroke="#477DB3"
										/>
									</svg>
								</div>

								<p className="text-14 leading-7 font-light md:max-w-[542px]">{feature}</p>
							</div>
						))}
					</div>
					<div className="max-w-[566px]">
						<EnterpriseWaitlist
							submitEnterPriseForm={() => {
								return;
							}}></EnterpriseWaitlist>
					</div>
				</div>
			</section>

			<section className="px-20px pb-100px desktop:pb-130px">
				<div className="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(/static/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
					<h1 className="text-30 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px max-w-[562px] m-auto">
						Start sending and receiving webhooks now, risk free
					</h1>
					<p className="text-center text-14 text-white-100 max-w-[756px] m-auto leading-7">
						Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time
						and get started today.
					</p>
					<Link
						href="#requestAccess"
						className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-12 font-medium flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
						Request Access
						<Image src={ArrowRightIcon} className="ml-12px w-12px" alt="arrow right" />
					</Link>
				</div>
			</section>
		</main>
	);
}
