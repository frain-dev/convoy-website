import Link from 'next/link';
import Image from 'next/image';
import DocsBanner from '../../../../public/svg/doc-banner.svg';

export default function DocsIndex() {
	const sections = [
		{
			title: 'Overview',
			description: `We've put together a short easy to follow steps to get started with deploying Convoy to your environment and sending out webhook events in few minutes.`,
			link: '/docs/configuration',
			class: 'border-blue',
			buttonClass: 'bg-primary-25 text-primary-400',
			iconStroke: 'stroke-primary-400'
		},
		{
			title: 'SDK',
			description: `We went a step further to make it easier to integrate convoy through SDK.`,
			link: '/docs/sdk',
			class: 'border-yellow',
			buttonClass: 'bg-warning-50 text-warning-400',
			iconStroke: 'stroke-warning-400'
		},
		{
			title: 'Configuration',
			description: `We've put together a short easy to follow steps to get started with deploying Convoy to your environment and sending out webhook events in few minutes.`,
			link: '/docs/configuration',
			class: 'border-green',
			buttonClass: 'bg-success-25 text-success-400',
			iconStroke: 'stroke-success-400'
		},
		{
			title: 'Deployment',
			description: `Learn how to deploy Convoy to any environment of your choice.`,
			link: '/docs/deployment',
			class: 'border-red',
			buttonClass: 'bg-danger-25 text-danger-400',
			iconStroke: 'stroke-danger-400'
		},
		{
			title: 'App Portal',
			description: `With app portal, we're enabling you to extend the visibility our dashboard provides you to your customers.`,
			link: '/docs/configuration',
			class: 'border-black',
			buttonClass: 'bg-gray-100 text-gray-800',
			iconStroke: 'stroke-gray-800'
		},
		{
			title: 'Api Reference',
			description: `The API reference provides you with the available endpoints to interact with Convoy.`,
			link: '/docs/configuration',
			class: 'border-blue',
			buttonClass: 'bg-primary-25 text-primary-400',
			iconStroke: 'stroke-primary-400'
		}
	];
	return (
		<main>
			<div className="max-w-[1200px] m-auto py-0 px-20px mt-50px">
				<p className="text-h2 font-semibold text-center text-gray-strong mb-8px">Convoy Documentation</p>
				<p className=" max-w-[655px] m-auto text-center text-gray-normal text-14 mb-40px">
					Find the guides, samples, and references you need to use Convoy to start sending out and receiving webhook events as fast as possible.
				</p>

				<div className="max-w-[844px] w-full mx-auto">
					<div className="flex mobile:flex-wrap gap-32px">
						{sections.slice(0, 2).map((section, i) => (
							<div
								className={`rounded-12px border border-transparent p-16px w-full ${section.class} ${
									i === 0 ? 'max-w-[500px]' : 'max-w-[310px]'
								} mobile:max-w-[unset]`}
								key={i}>
								<h5 className="text-gray-normal font-semibold">{section.title}</h5>
								<p className="text-gray-normal mt-16px text-12 min-h-[40px] mb-30px">{section.description}</p>
								<Link href={section.link} className={`rounded-8px p-10px text-10 flex items-center w-fit ${section.buttonClass}`}>
									Read More
									<span className="ml-10px">
										<svg width="18" height="18" className={`mr-8px transition-all duration-300 ${section.iconStroke} `}>
											<use xlinkHref="#arrow-circle-icon"></use>
										</svg>
									</span>
								</Link>
							</div>
						))}
					</div>
					<div className="flex flex-wrap gap-32px mt-32px mb-50px">
						{sections.slice(2, 6).map((section, i) => (
							<div className={`rounded-12px border border-transparent p-16px max-w-[406px] mobile:max-w-[unset] w-full ${section.class}`} key={i}>
								<h5 className="text-gray-normal font-semibold">{section.title}</h5>
								<p className="text-gray-normal mt-16px text-12 min-h-[60px] mb-30px">{section.description}</p>
								<Link href={section.link} className={`rounded-8px p-10px text-10 flex items-center w-fit ${section.buttonClass}`}>
									Read More
									<span className="ml-10px">
										<svg width="18" height="18" className={`mr-8px transition-all duration-300 ${section.iconStroke} `}>
											<use xlinkHref="#arrow-circle-icon"></use>
										</svg>
									</span>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
