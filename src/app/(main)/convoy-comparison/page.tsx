'use client';
import check from 'public/svg/check.svg';
import question from 'public/svg/question.svg';
import error from 'public/svg/error.svg';
import spruce from 'public/svg/spruce-health-mark.svg';
import michael from 'public/profile-images/Michael Raines.png';
import Image from 'next/image';

const features = [
	{
		name: 'Retries',
		description: 'Send webhooks with retries to ensure eventual delivery.',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Rate Limiting',
		description: 'Prevent blasting too many events at client endpoints at once.',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Endpoint Circuit Breaking',
		description: 'Automatically detect zombie endpoints and deactivate them to avoid backpressure.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Multiple URLs',
		description: 'Enable developers to add multiple webhook URLs.',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Fine-grained webhook subscriptions',
		description: 'Subscribe to webhooks beyond the event types, subscribed based on the payload structure.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Ease of debugging',
		description: 'Operators and Customer support can use our Web UI to debug webhooks delivery vs. sifting through server logs.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Developer Portal',
		description: 'A fully-suited developer portal to enable users to register endpoints, expire secrets, and debug their webhook events.',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Failure Notifications',
		description: 'Automatically send developers failure notifications when their endpoints fail.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Static IPs',
		description: 'Send webhooks with a consistent set of egress IP addresses.',
		convoy: 'supported',
		implementation: 'supported'
	},
	{
		name: 'Webhook Log',
		description: '',
		convoy: 'supported',
		implementation: 'questionable'
	}
];

const architecture = [
	{
		name: 'Language Choice',
		convoy: 'Convoy is built with Golang — the most popular cloud-native language',
		implementation: 'Usually bundled with a monolith built in Ruby/Go/Java, Python/Django, etc.'
	},
	{
		name: 'Microservices support',
		convoy: 'Convoy is built as a resilient webhooks gateway to support multiple teams and microservices.',
		implementation: "Most internal implementations are tightly coupled with a monolith and can't support the entire organization."
	},
	{
		name: 'Message Broker support',
		convoy: 'Instant events from any message broker of choice. Convoy supports Kafka, Amazon SQS, Google PubSub, and RabbitMQ.',
		implementation: 'Very limited support for Message Brokers.'
	},
	{
		name: 'Resilient & Reliable Architecture',
		convoy: 'Convoy relies on a control and data plane architecture that enables it to achieve high throughput and high availability during operations.',
		implementation: 'The entire system is coupled together and reduces overall reliability because there are too many moving parts.'
	},
	{
		name: 'Performance',
		convoy: 'Convoy delivers events in sub 1 sec latencies. You can read more about our benchmarks here.',
		implementation: "Latencies probably aren't even measured."
	},
	{
		name: 'Observability',
		convoy: 'Prometheus Metrics & OpenTelemetry',
		implementation: 'Can be hard to tell what is going on in the system.'
	},
	{
		name: 'Retention Policies',
		convoy: 'Supports flexible retention policies to archive events to S3-compatible storage.',
		implementation: "Most Providers don't support persistence because they don't want to deal with purging storage."
	}
];

export default function ConvoyComparison() {
	return (
		<main className="bg-[#fafafa]">
			<section className="pt-[100px] pb-12 desktop:pt-[137px] desktop:pb-[57px]">
				<div className="max-w-[1280px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
					<div className="flex flex-col items-center justify-center w-full">
						<h1 className="text-32 desktop:text-[40px] font-medium desktop:font-bold">Convoy vs Internal implementation</h1>
						<p className="max-w-[683px] mx-auto desktop:text-16 text-center text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:mt-24px font-medium">
							Whether you’re an engineer or product manager, this guide walks you through everything you need to become a webhook pro. Let’s begin!
						</p>
						<div className="flex footer:justify-center mt-4 desktop:mt-24px">
							<a
								target="_blank"
								href="https://cloud.getconvoy.io/signup"
								className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] text-white-100 flex items-center">
								<span>Get started</span>

								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px]">
									<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
								</svg>
							</a>
							<a
								target="_blank"
								href="https://cloud.getconvoy.io/login"
								className="px-16px py-10px text-14 ml-16px h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border shadow-btn">
								<span>Visit docs</span>

								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="block ml-1 mt-[1px]">
									<path d="M12.0039 7.06066L5.54894 13.5156L4.48828 12.455L10.9432 6H5.2539V4.5H13.5039V12.75H12.0039V7.06066Z" fill="black" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-36px desktop:pb-72px">
				<div className="border border-[#EBEBEB] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full min-h-[168px] py-40px desktop:py-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#2780F1]/20 to-[134.32%] flex items-center justify-start mobile:px-40px nav-bar-break:px-40px mobile:min-h-[304px] relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.35rem_2.35rem] absolute left-0 -top-1 w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10">
							<h3 className="text-28 font-semibold">A more feature-rich option</h3>
							<p className="text-[#666] text-16 leading-[160%] font-medium">
								Enhance your webhook reliability, security, and performance with advanced endpoint controls tailored to ensure stable, secure, and efficient message
								delivery.
							</p>
						</div>
					</div>

					<FeatureTable />
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-36px desktop:pb-72px">
				<div className="w-full bg-white-100 border border-[#e7e7e7] p-10 rounded-8px flex flex-col gap-5">
					<h3 className="text-28 font-medium">Don't just take our word for it</h3>
					<div className="flex flex-col gap-5 items-start">
						<Image src={spruce} height={30} width={150} alt="logo" quality="70" className="h-28px w-auto" />
						<p className="text-20 leading-[140%] text-[#666]">
							We considered building a webhooks system internally but quickly realised that reaching the quality and robustness our customers deserve would be highly
							time-consuming. Convoy offered this out-of-the-box.
						</p>
						<div className="flex items-center gap-2">
							<Image src={michael} height={30} width={30} alt="logo" quality="70" className="h-36px w-36px rounded-50% object-cover" />
							<div className="flex flex-col gap-1">
								<h5 className="font-semibold text-16 leading-4 ">Michael Raines</h5>
								<p className="text-[#666] text-[13px] font-medium leading-4">Principal Engineer at Spruce Health, Ex AWS</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-36px desktop:pb-72px">
				<div className="border border-[#EBEBEB] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full min-h-[168px] py-40px desktop:py-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#3F27F1]/20 to-[134.32%] flex items-center justify-start mobile:px-40px nav-bar-break:px-40px mobile:min-h-[304px] relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.35rem_2.35rem] absolute left-0 -top-1 w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10">
							<h3 className="text-28 font-semibold">A more feature-rich option</h3>
							<p className="text-[#666] text-16 leading-[160%] font-medium">
								Enhance your webhook reliability, security, and performance with advanced endpoint controls tailored to ensure stable, secure, and efficient message
								delivery.
							</p>
						</div>
					</div>

					<ArchitectureTable />
				</div>
			</section>
		</main>
	);
}

const StatusIndicator = ({ status }: { status: string }) => {
	switch (status) {
		case 'supported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={check} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Supported</span>
				</div>
			);
		case 'questionable':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={question} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Questionable</span>
				</div>
			);
		case 'unsupported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={error} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Unsupported</span>
				</div>
			);
		default:
			return null;
	}
};

function FeatureTable() {
	return (
		<div className="flex w-full justify-between items-start p-10">
			<div className="flex flex-col mt-[42px]">
				{features.map(feature => (
					<div key={feature.name} className="flex flex-col gap-[8px] py-[22.5px] pl-3 pr-72px h-[98px] justify-center">
						<h4 className="text-14 font-bold leading-[150%]">{feature.name}</h4>
						<p className="text-[#4b4b4b] text-14 font-medium leading-[150%] max-w-[416px]">{feature.description}</p>
					</div>
				))}
			</div>

			<div className="border border-[#E7E7E780] rounded-12px overflow-hidden mobile-min:w-[800px] w-max">
				<table className="w-max border-collapse">
					<thead className="text-[#000] font-medium text-14">
						<tr>
							<th className="text-14 font-medium px-4 py-[10px] border-b border-[#E7E7E780] text-center flex items-center justify-center gap-2">
								<Image src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" quality="70" className="h-16px w-auto" />
								<span>Convoy</span>
							</th>
							<th className="text-14 font-medium text-center px-4 py-[9px] border-b border-l border-[#E7E7E780]">Your implementation</th>
						</tr>
					</thead>
					<tbody className="divide-y text-[#000]">
						{features.map(feature => (
							<tr key={feature.name} className="">
								<td className="text-14 py-[35.5px] px-[62.5px] text-[#4b4b4b]">
									<StatusIndicator status={feature.convoy} />
								</td>
								<td className="text-14 py-[35.5px] px-[62.5px] border-l border-[#E7E7E780]">
									<StatusIndicator status={feature.implementation} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function ArchitectureTable() {
	return (
		<div className="flex w-full justify-between items-start p-10">
			<div className="flex flex-col mt-[42px]">
				{architecture.map(feature => (
					<div key={feature.name} className="flex flex-col gap-[8px] py-[12px] pl-3 pr-72px h-[95.5px] justify-start">
						<h4 className="text-14 font-bold leading-[150%]">{feature.name}</h4>
					</div>
				))}
			</div>

			<div className="border border-[#E7E7E780] rounded-12px overflow-hidden mobile-min:w-[800px] w-max">
				<table className="w-max border-collapse">
					<thead className="text-[#000] font-medium text-14">
						<tr>
							<th className="text-14 font-medium px-4 py-[10px] border-b border-[#E7E7E780] text-center flex items-center justify-center gap-2">
								<Image src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" quality="70" className="h-16px w-auto" />
								<span>Convoy</span>
							</th>
							<th className="text-14 font-medium text-center px-4 py-[9px] border-b border-l border-[#E7E7E780]">Your implementation</th>
						</tr>
					</thead>
					<tbody className="divide-y text-[#000]">
						{architecture.map(feature => (
							<tr key={feature.name} className="">
								<td className="text-14 py-[12px] h-[95px] px-[12px] text-[#000] bg-[#2780F10A] font-medium leading-[150%] w-[408px] align-top">{feature.convoy}</td>
								<td className="text-14 py-[12px] h-[95px] px-[12px] text-[#000] leading-[150%] border-l border-[#E7E7E780] w-[408px] align-top">
									{feature.implementation}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
