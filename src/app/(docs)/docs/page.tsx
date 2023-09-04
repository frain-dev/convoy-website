import Link from 'next/link';

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
			link: '/docs/deploy/install-convoy',
			class: 'border-red',
			buttonClass: 'bg-danger-25 text-danger-400',
			iconStroke: 'stroke-danger-400'
		},
		{
			title: 'Portal Links',
			description: `With portal links, we're enabling you to extend the visibility our dashboard provides you to your customers.`,
			link: '/docs/manual/portal-links',
			class: 'border-black',
			buttonClass: 'bg-gray-100 text-gray-800',
			iconStroke: 'stroke-gray-800'
		},
		{
			title: 'Api Reference',
			description: `The API reference provides you with the available endpoints to interact with Convoy.`,
			link: 'https://convoy.readme.io/',
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
					<div className="flex flex-wrap gap-32px">
						{sections.slice(0, 2).map((section, i) => (
							<div className={`rounded-12px border p-16px w-full border-primary-50 ${i === 0 ? 'max-w-[500px]' : 'max-w-[310px]'} mobile:max-w-[unset]`} key={i}>
								<h5 className="text-gray-normal font-semibold">{section.title}</h5>
								<p className="text-gray-light mt-16px text-12 min-h-[40px] mb-30px">{section.description}</p>
								<Link href={section.link} className={`rounded-8px p-10px text-10 flex items-center shadow w-fit ${section.buttonClass}`}>
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
							<div className={`rounded-12px border p-16px max-w-[406px] mobile:max-w-[unset] w-full  border-primary-50`} key={i}>
								<h5 className="text-gray-normal font-semibold">{section.title}</h5>
								<p className="text-gray-light mt-16px text-12 min-h-[60px] mb-30px">{section.description}</p>
								{i === 3 && (
									<a target="_blank" href={section.link} className={`rounded-8px p-10px text-10 flex items-center w-fit shadow ${section.buttonClass}`}>
										Read More
										<span className="ml-10px">
											<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M7.46615 3.25833C7.42387 3.15652 7.34296 3.07561 7.24115 3.03333C7.19106 3.01198 7.13727 3.00066 7.08282 3H2.91615C2.80565 3 2.69967 3.0439 2.62153 3.12204C2.54339 3.20018 2.49949 3.30616 2.49949 3.41667C2.49949 3.52717 2.54339 3.63315 2.62153 3.71129C2.69967 3.78943 2.80565 3.83333 2.91615 3.83333H6.07865L2.62032 7.2875C2.58127 7.32624 2.55027 7.37232 2.52911 7.42309C2.50796 7.47387 2.49707 7.52833 2.49707 7.58333C2.49707 7.63834 2.50796 7.6928 2.52911 7.74357C2.55027 7.79435 2.58127 7.84043 2.62032 7.87917C2.65905 7.91822 2.70514 7.94922 2.75591 7.97037C2.80669 7.99153 2.86115 8.00242 2.91615 8.00242C2.97116 8.00242 3.02562 7.99153 3.07639 7.97037C3.12717 7.94922 3.17325 7.91822 3.21199 7.87917L6.66615 4.42083V7.58333C6.66615 7.69384 6.71005 7.79982 6.78819 7.87796C6.86633 7.9561 6.97231 8 7.08282 8C7.19333 8 7.29931 7.9561 7.37745 7.87796C7.45559 7.79982 7.49949 7.69384 7.49949 7.58333V3.41667C7.49883 3.36222 7.4875 3.30843 7.46615 3.25833V3.25833Z"
													fill="#292D32"
												/>
											</svg>
										</span>
									</a>
								)}
								{i !== 3 && (
									<Link href={section.link} className={`rounded-8px p-10px text-10 flex items-center w-fit shadow ${section.buttonClass}`}>
										Read More
										<span className="ml-10px">
											<svg width="18" height="18" className={`mr-8px transition-all duration-300 ${section.iconStroke} `}>
												<use xlinkHref="#arrow-circle-icon"></use>
											</svg>
										</span>
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
