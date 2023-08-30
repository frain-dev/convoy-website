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
						<p className="text-white-100 max-w-[580px] mx-auto text-18 mobile:text-14 mt-16px footer:text-center">
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
					<h1 className="text-[48px] leading-[56px] font-bold text-center">Do more with Convoy Enterprise.</h1>

					<div className="flex justify-between flex-wrap gap-6 mt-80px desktop:mt-120px">
						<div className="desktop:max-w-[340px]">
							<img src="/static/everything-you-need.png" className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]" alt="everything-you-need" />
							<p className="text-14 desktop:text-20">Granular role based access control, ensuring authorized access to infrastructure for large organizations.</p>
						</div>
						<div className="desktop:max-w-[400px]">
							<img
								src="/static/excellent-rate-limiting.png"
								className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(43,214,123,0.2)]"
								alt="excellent-rate-limiting"
							/>
							<p className="text-14 desktop:text-20">
								Efficiently create separate environments for development, staging, and production, enabling faster iteration, and improved software delivery.
							</p>
						</div>
						<div className="desktop:max-w-[340px]">
							<img src="/static/transparent-pricing.png" className="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(247,227,109,0.2)]" alt="transparent-pricing" />
							<p className="text-14 desktop:text-20">
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
							<div className="flex items-start mb-48px" key={feature}>
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

								<p className="text-18 font-light mobile:text-14 md:max-w-[542px]">{feature}</p>
							</div>
						))}
					</div>
					<div className="max-w-[566px]">
						<EnterpriseWaitlist></EnterpriseWaitlist>
					</div>
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
						href="#requestAccess"
						className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
						Request Access
						<Image src={ArrowRightIcon} className="ml-12px" alt="arrow right" />
					</Link>
				</div>
			</section>
		</main>
	);
}
