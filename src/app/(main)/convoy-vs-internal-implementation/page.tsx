'use client';
import check from 'public/svg/check.svg';
import question from 'public/svg/question.svg';
import error from 'public/svg/error.svg';
import spruce from 'public/svg/spruce-health-mark.svg';
import michael from 'public/profile-images/Michael Raines.png';
import subomi from 'public/profile-images/Subomi Oluwalana.png';
import GetStarted from '@/app/components/GetStarted';
import { motion } from 'framer-motion';

import Image from 'next/image';
import { OptimizedImage } from '@/app/components/OptimizedImaged';
import RegionDropdown from '@/app/components/RegionDropdown';

const features = [
	{
		name: 'Retries',
		description: 'Automatically retry failed webhooks to ensure eventual delivery and handle temporary network issues.',
		convoy: 'supported',
		implementation: 'supported'
	},
	{
		name: 'Rate Limiting',
		description: 'Control event flow to client endpoints, preventing overload and ensuring smooth operations during traffic spikes.',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Endpoint Circuit Breaking',
		description: 'Detect and isolate malfunctioning endpoints to prevent backpressure and maintain system stability.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Multiple URLs',
		description: 'Enable developers to configure multiple webhook URLs for greater flexibility,',
		convoy: 'supported',
		implementation: 'questionable'
	},
	{
		name: 'Fine-grained webhook subscriptions',
		description: 'Filter webhook events based on payload details for precise and efficient subscriptions.',
		convoy: 'supported',
		implementation: 'unsupported'
	},
	{
		name: 'Ease of debugging',
		description: 'Use a web UI for simple debugging, eliminating the need for complex server log analysis.',
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
		description: 'Deliver webhooks from consistent egress IPs, simplifying firewall configurations and ensuring stability.',
		convoy: 'supported',
		implementation: 'supported'
	},
	{
		name: 'Webhook Log',
		description: 'Maintain a log of webhook events for easy monitoring, debugging, and compliance checks.',
		convoy: 'supported',
		implementation: 'questionable'
	}
];

const architecture = [
	{
		name: 'Language Choice',
		convoy: 'Built with Golang, the most popular language for cloud-native applications.',
		implementation: 'Often bundled in monolithic architectures using Ruby, Go, Java, or Python/Django.'
	},
	{
		name: 'Microservices support',
		convoy: 'Built to support multiple teams and microservices with a resilient webhook gateway.',
		implementation: 'Tightly coupled with monoliths, limiting scalability across teams and services.'
	},
	{
		name: 'Message Broker support',
		convoy: 'Ingest events seamlessly from any message broker, including Kafka, Amazon SQS, Google PubSub, and RabbitMQ, for flexible event processing.',
		implementation: 'Limited or no support for message brokers.'
	},
	{
		name: 'Resilient & Reliable Architecture',
		convoy: 'Uses a control and data plane architecture for high throughput and availability.',
		implementation: 'Coupled system with many dependencies, reducing overall reliability.'
	},
	{
		name: 'Performance',
		convoy: 'Convoy delivers events in sub 1 sec latencies. You can read more about our benchmarks here.',
		implementation: "Latencies probably aren't even measured."
	},
	{
		name: 'Observability',
		convoy: 'Fully supports Prometheus metrics and OpenTelemetry for monitoring.',
		implementation: 'Limited visibility, making system diagnostics difficult.'
	},
	{
		name: 'Retention Policies',
		convoy: 'Flexible retention policies to archive events to S3-compatible storage.',
		implementation: 'Most providers lack persistence and do not handle data purging efficiently.'
	}
];

export default function ConvoyComparison() {
	return (
		<main className="bg-[#fafafa]">
			<section className="pt-[100px] pb-0 desktop:pt-[137px] desktop:pb-[57px]">
				<div className="max-w-[1280px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.8,
								delay: 0,
								ease: [0.44, 0, 0, 1]
							}
						}}
						viewport={{
							amount: 'some',
							once: true
						}}
						className="flex flex-col items-start desktop:items-center justify-start desktop:justify-center w-full">
						<h1 className="text-32 desktop:text-[40px] font-medium">Convoy vs Internal implementation</h1>
						<p className="max-w-[683px] desktop:mx-auto desktop:text-16 desktop:text-center text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:my-24px font-medium">
							Discover why choosing Convoy over building an internal webhook service saves time, reduces complexity, and ensures reliability at scale.
						</p>

						<div className="flex flex-wrap gap-16px mt-4 desktop:mt-0 mb-56px">
							<RegionDropdown 
								buttonText="Try for free" 
								baseUrl="/signup" 
								variant="primary"
								className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center justify-center w-full sm-old:w-max"
							/>
							<a
								target="_blank"
								href="https://cal.com/subomi/30min"
								className="px-8px py-10px text-14 h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border hover:bg-[#e7e7e7] group transition-all duration-300 shadow-btn gap-2 w-full sm-old:w-max">
								<OptimizedImage src={subomi} alt="play" className="rounded-[50%] w-24px h-24px object-cover" />

								<span>Talk to a founder</span>
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#EBEBEB] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#2780F1]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.35rem_2.35rem] absolute left-0 -top-1 w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">A more feature-rich gateway</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Enhance your webhook reliability, security, and performance with advanced endpoint controls tailored to ensure stable, secure, and efficient message
								delivery.
							</p>
						</div>
					</div>

					<FeatureTable />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 0 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.2,
							delay: 0,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="w-full bg-white-100 border border-[#e7e7e7] p-5 desktop:p-10 rounded-8px flex flex-col gap-5">
					<h3 className="text-28 font-medium">Don't just take our word for it</h3>
					<div className="flex flex-col gap-5 items-start">
						<OptimizedImage src={spruce} height={30} width={150} alt="logo" className="h-24px desktop:h-28px w-auto" />
						<p className="text-14 desktop:text-20 leading-[140%] text-[#666]">
							We considered building a webhooks system internally but quickly realised that reaching the quality and robustness our customers deserve would be highly
							time-consuming. Convoy offered this out-of-the-box.
						</p>
						<div className="flex items-center gap-2">
							<OptimizedImage src={michael} height={30} width={30} alt="logo" className="h-36px w-36px rounded-50% object-cover" />
							<div className="flex flex-col gap-1">
								<h5 className="font-semibold text-14 desktop:text-16 leading-4 ">Michael Raines</h5>
								<p className="text-[#666] text-12 desktop:text-[13px] font-medium leading-4">Principal Engineer at Spruce Health, Ex AWS</p>
							</div>
						</div>
					</div>
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-40px md-old:pb-60px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#EBEBEB] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#3F27F1]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.35rem_2.35rem] absolute left-0 -top-1 w-full h-full"></div>

						<div className="flex flex-col gap-2 desktop:gap-0 w-[704px] z-10">
							<h3 className="text-18 desktop:text-28 font-semibold">Highly Reliable Architecture</h3>
							<p className="text-[#666] text-14 leading-[140%] desktop:leading-[160%] font-medium">
								Built for resilience and speed, the system combines a control and data plane architecture, and PostgresSQL's robustness to ensure high availability,
								durability, and seamless data handling.
							</p>
						</div>
					</div>

					<ArchitectureTable />
				</motion.div>
			</section>

			<GetStarted></GetStarted>
		</main>
	);
}

const StatusIndicator = ({ status }: { status: string }) => {
	switch (status) {
		case 'supported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<OptimizedImage src={check} height={30} width={28} alt="logo" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Supported</span>
				</div>
			);
		case 'questionable':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<OptimizedImage src={question} height={30} width={28} alt="logo" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Questionable</span>
				</div>
			);
		case 'unsupported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<OptimizedImage src={error} height={30} width={28} alt="logo" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Unsupported</span>
				</div>
			);
		default:
			return null;
	}
};

function FeatureTable() {
	return (
		<div className="flex w-full justify-between items-start pl-2 pr-5 py-5 desktop:p-10 gap-5">
			<div className="flex flex-col mt-[42px] w-full">
				{features.map(feature => (
					<div
						key={feature.name}
						className="flex flex-col gap-[8px] py-[22.5px] pl-3 desktop:pr-72px h-[270px] sm-old:h-[116px] desktop:!h-[98px] justify-center w-[110px] sm-old:w-[220px] desktop:!w-[516px]">
						<h4 className="text-14 font-bold leading-[150%]">{feature.name}</h4>
						<p className="text-[#4b4b4b] text-12 desktop:text-14 font-medium leading-[150%] w-full max-w- [416px]">{feature.description}</p>
					</div>
				))}
			</div>

			<div className="relative w-[130px] xxs-old:w-[250px] sm-old:w-[300px] md-old:w-auto desktop:w-auto">
				<div className="overflow-x-auto">
					<div className="hid den border border-[#E7E7E780] rounded-12px overflow-hidden w-max">
						<table className="w-max border-collapse">
							<thead className="text-[#000] font-medium text-14">
								<tr>
									<th className="text-14 font-medium px-4 py-[10px] border-b border-[#E7E7E780] text-center flex items-center justify-center gap-2">
										<OptimizedImage src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" className="h-16px w-auto" />
										<span>Convoy</span>
									</th>
									<th className="text-14 font-medium text-center px-4 py-[9px] border-b border-l border-[#E7E7E780]">Your implementation</th>
								</tr>
							</thead>
							<tbody className="divide-y text-[#000]">
								{features.map(feature => (
									<tr key={feature.name} className="">
										<td className="text-14 py-[44.5px] desktop:py-[35.5px] px-[62.5px] text-[#4b4b4b] h-[270px] sm-old:h-auto">
											<StatusIndicator status={feature.convoy} />
										</td>
										<td className="text-14 py-[44.5px] desktop:py-[35.5px] px-[62.5px] border-l border-[#E7E7E780] h-[270px] sm-old:h-auto">
											<StatusIndicator status={feature.implementation} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

function ArchitectureTable() {
	return (
		<div className="flex w-full justify-between items-start pl-2 pr-5 py-5 desktop:p-10 gap-5">
			<div className="flex flex-col mt-[42px]">
				{architecture.map(feature => (
					<div key={feature.name} className="flex flex-col gap-[8px] py-[12px] pl-3 w-[100px] sm-old:w-[170px] desktop:!w-full pr-3 h-[95.5px] justify-start">
						<h4 className="text-14 font-bold leading-[150%]">{feature.name}</h4>
					</div>
				))}
			</div>

			<div className="relative w-[130px] xxs-old:w-[250px] sm-old:w-[300px] md-old:w-auto desktop:w-auto">
				<div className="overflow-x-auto">
					<div className="border border-[#E7E7E780] rounded-12px overflow-hidden w-max mr-[1px] desktop:mr-0">
						<table className="w-max border-collapse">
							<thead className="text-[#000] font-medium text-14">
								<tr>
									<th className="text-14 font-medium px-4 py-[10px] border-b border-[#E7E7E780] text-center flex items-center justify-center gap-2">
										<OptimizedImage src="/svg/convoy-logo-new.svg" height={30} width={28} alt="logo" className="h-16px w-auto" />
										<span>Convoy</span>
									</th>
									<th className="text-14 font-medium text-center px-4 py-[9px] border-b border-l border-[#E7E7E780]">Your implementation</th>
								</tr>
							</thead>
							<tbody className="divide-y text-[#000]">
								{architecture.map(feature => (
									<tr key={feature.name} className="">
										<td className="text-12 desktop:text-14 py-[12px] h-[95px] px-[12px] text-[#000] bg-[#2780F10A] font-medium leading-[150%] w-[270px] desktop:w-[408px] align-top">
											{feature.convoy}
										</td>
										<td className="text-12 desktop:text-14 py-[12px] h-[95px] px-[12px] text-[#000] leading-[150%] border-l border-[#E7E7E780] w-[270px] desktop:w-[408px] align-top">
											{feature.implementation}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
