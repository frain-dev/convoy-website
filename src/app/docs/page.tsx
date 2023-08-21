import Link from 'next/link';
import Image from 'next/image';
import DocsBanner from '../../../public/svg/doc-banner.svg';

export default function DocsIndex() {
    
	return (
		<main>
			<header className="bg-[url(/svg/docs-bg.svg)] bg-no-repeat bg-cover h-[450px] w-full"></header>

			<div className="max-w-[1200px] m-auto -mt-270px py-0 px-20px">
				<p className="text-28 font-bold text-center mb-8px text-white-100">Convoy Documentation</p>
				<p className="text-white-100 max-w-[590px] m-auto text-center text-16 mb-40px">
					Find the guides, samples, and references you need to use Convoy to start sending out and receiving webhook events as fast as possible.
				</p>

				<div className="bg-[#fcfcfc] shadow-sm rounded-8px p-24px desktop:flex desktop:justify-between desktop:items-end desktop:flex-nowrap desktop:pt-32px desktop:pr-0 desktop:pb-0 desktop:pl-60px">
					<div>
						<h4 className="mb-16px font-semibold">Overview</h4>
						<p className="text-14 text-grey-40 mb-18px desktop:max-w-[489px]">
							We've put together a short easy to follow steps to get started with deploying Convoy to your environment and sending out webhook events in few minutes.
						</p>
						<div className="mb-40px">
							<Link href="/docs/introduction" className="flex items-center text-primary-400">
								Read more
								<span className="ml-10px">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
											fill="#FCFCFC"
											stroke="#477DB3"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path d="M7.16 10.3533L9.50667 8L7.16 5.64667" stroke="#477DB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</span>
							</Link>
						</div>
					</div>
					<div className="max-w-[385px] -mb-18px rounded-bl-8px">
						<Image src={DocsBanner} alt="doc banner" />
					</div>
				</div>

				<section className="grid grid-cols-[repeat(auto-fill,minmax(333px,_1fr))] gap-24px mb-56px mt-24px">
					<div className="card rounded-16px p-32px bg-[#e7fbf4]">
						<h4 className="font-semibold mb-16px">Configuration</h4>
						<p className="text-14 text-[#7987a3] max-w-[293px] mb-24px min-h-[72px]">
							Step by step explanation on how to configure Convoy to best suite your preference and use case.
						</p>
						<Link href="/docs/configuration" className="bg-[#daeee7] rounded-8px text-14 font-medium px-24px py-10px flex items-center text-[#46548c] w-fit">
							Read more
							<Image src="/svg/dark-arrow-circle-right.svg" width={16} height={16} className="ml-10px" alt="arrow right" />
						</Link>
					</div>

					<div className="card rounded-16px p-32px bg-[#ffeeed]">
						<h4 className="font-semibold mb-16px">Deployment</h4>
						<p className="text-14 text-[#7987a3] max-w-[293px] mb-24px min-h-[72px]">Learn how to deploy Convoy to any environment of your choice.</p>
						<Link href="/docs/deploy/install-convoy" className="bg-[#f5dedc] rounded-8px text-14 font-medium px-24px py-10px flex items-center text-[#46548c] w-fit">
							Read more
							<Image src="/svg/dark-arrow-circle-right.svg" width={16} height={16} className="ml-10px" alt="arrow right" />
						</Link>
					</div>

					<div className="card rounded-16px p-32px bg-[#5a53b3] bg-opacity-10">
						<h4 className="font-semibold mb-16px">SDK</h4>
						<p className="text-14 text-[#7987a3] max-w-[293px] mb-24px min-h-[72px]">We went a step further to make it easier to integrate convoy through SDK.</p>
						<Link href="/docs/sdk" className="bg-[#e0dfed] rounded-8px text-14 font-medium px-24px py-10px flex items-center text-[#46548c] w-fit">
							Read more
							<Image src="/svg/dark-arrow-circle-right.svg" width={16} height={16} className="ml-10px" alt="arrow right" />
						</Link>
					</div>

					<div className="card rounded-16px p-32px bg-[#fcf5ec]">
						<h4 className="font-semibold mb-16px">App Portal</h4>
						<p className="text-14 text-[#7987a3] max-w-[293px] mb-24px min-h-[72px]">
							With app portal, we're enabling you to extend the visibility our dashboard provides you to your customers.
						</p>
						<Link href="/docs/app-portal" className="bg-[#f2ebe2] rounded-8px text-14 font-medium px-24px py-10px flex items-center text-[#46548c] w-fit">
							Read more
							<Image src="/svg/dark-arrow-circle-right.svg" width={16} height={16} className="ml-10px" alt="arrow right" />
						</Link>
					</div>
					<div className="card rounded-16px p-32px bg-[#d1efff]">
						<h4 className="font-semibold mb-16px">Api Reference</h4>
						<p className="text-14 text-[#7987a3] max-w-[293px] mb-24px min-h-[72px]">
							The API reference provides you with the available endpoints to interact with Convoy.
						</p>
						<Link href="https://convoy.readme.io/" className="bg-[#c1e1f2] rounded-8px text-14 font-medium px-24px py-10px flex items-center text-[#46548c] w-fit">
							Read More
							<Image src="/svg/dark-arrow-circle-right.svg" width={16} height={16} className="ml-10px" alt="arrow right" />
						</Link>
					</div>
				</section>
			</div>
		</main>
	);
}
