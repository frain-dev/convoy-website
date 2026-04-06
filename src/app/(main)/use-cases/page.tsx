'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RegionDropdown from '@/app/components/RegionDropdown';
import GetStarted from '@/app/components/GetStarted';
import { OptimizedImage } from '@/app/components/OptimizedImaged';

const industries = [
	{
		slug: 'fintech',
		title: 'Fintech',
		description: 'Real-time transaction alerts, payment confirmations, and compliance notifications with sub-second latency and cryptographic verification.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="2" y="5" width="20" height="14" rx="2" />
				<line x1="2" y1="10" x2="22" y2="10" />
			</svg>
		)
	},
	{
		slug: 'ai-ml',
		title: 'AI & Machine Learning',
		description: 'Deliver model training completions, inference results, and pipeline events reliably so your team can focus on building AI.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
				<path d="M16 14a4 4 0 0 1 4 4v2H4v-2a4 4 0 0 1 4-4" />
				<circle cx="12" cy="6" r="1" fill="#2780F1" />
			</svg>
		)
	},
	{
		slug: 'developer-tools',
		title: 'Developer Tools',
		description: 'Ship world-class webhooks in your developer platform, CI/CD notifications, deployment hooks, and event-driven integrations, in days, not months.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<polyline points="16 18 22 12 16 6" />
				<polyline points="8 6 2 12 8 18" />
			</svg>
		)
	},
	{
		slug: 'logistics',
		title: 'Logistics & Supply Chain',
		description: 'Keep every link in your supply chain synchronized, shipment tracking, inventory updates, and fleet management events delivered in real time.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="1" y="3" width="15" height="13" />
				<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
				<circle cx="5.5" cy="18.5" r="2.5" />
				<circle cx="18.5" cy="18.5" r="2.5" />
			</svg>
		)
	},
	{
		slug: 'healthcare',
		title: 'Healthcare',
		description: 'Secure, reliable event delivery for patient notifications, EHR integrations, and clinical workflows, with SOC 2 certification and audit trails.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
			</svg>
		)
	},
	{
		slug: 'saas',
		title: 'SaaS Platforms',
		description: 'Give your customers the webhook experience they expect, self-service endpoint management, delivery logs, and an embeddable portal, out of the box.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
				<line x1="8" y1="21" x2="16" y2="21" />
				<line x1="12" y1="17" x2="12" y2="21" />
			</svg>
		)
	},
	{
		slug: 'ecommerce',
		title: 'E-commerce & Marketplaces',
		description: 'Real-time order, inventory, and payment events across your entire e-commerce ecosystem, from flash sales to marketplace integrations.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="9" cy="21" r="1" />
				<circle cx="20" cy="21" r="1" />
				<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
			</svg>
		)
	},
	{
		slug: 'iot',
		title: 'IoT & Connected Devices',
		description: 'Bridge your IoT event streams to external systems, device telemetry, sensor alerts, and firmware update notifications delivered at massive scale.',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2780F1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<path d="M5.12 19a7 7 0 0 1 0-14" />
				<path d="M18.88 5a7 7 0 0 1 0 14" />
				<circle cx="12" cy="12" r="3" />
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			</svg>
		)
	}
];

const fadeUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.44, 0, 0, 1] }
	},
	viewport: { amount: 'some' as const, once: true }
};

export default function UseCasesIndex() {
	return (
		<main className="bg-[#fafafa]">
			<section className="pt-[100px] pb-12 desktop:pt-[137px] desktop:pb-[57px]">
				<div className="max-w-[1280px] m-auto flex flex-col items-start desktop:items-center px-20px">
					<motion.div {...fadeUp} className="flex flex-col items-start desktop:items-center w-full">
						<h1 className="text-32 desktop:text-[40px] font-medium desktop:text-center">Webhooks for every industry</h1>
						<p className="max-w-[683px] desktop:mx-auto desktop:text-center desktop:text-16 text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:mt-24px font-medium">
							From fintech to IoT, teams across industries use Convoy to deliver reliable, secure, and scalable webhook events. Explore how Convoy fits your use case.
						</p>
						<div className="flex flex-wrap gap-16px mt-6 desktop:mt-24px">
							<RegionDropdown
								buttonText="Try for free"
								baseUrl="/signup"
								variant="primary"
								className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center justify-center w-full sm-old:w-max"
							/>
							<a
								target="_blank"
								href="https://cal.com/subomi/30min"
								className="px-16px py-10px text-14 h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border hover:bg-[#e7e7e7] group transition-all duration-300 shadow-btn w-full sm-old:w-max">
								<span>Talk to a founder</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="block ml-1 mt-[1px] group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-all">
									<path d="M12.0039 7.06066L5.54894 13.5156L4.48828 12.455L10.9432 6H5.2539V4.5H13.5039V12.75H12.0039V7.06066Z" fill="black" />
								</svg>
							</a>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-40px desktop:pb-80px">
				<div className="grid grid-cols-1 sm-old:grid-cols-2 desktop:grid-cols-3 gap-5">
					{industries.map((industry, i) => (
						<motion.div
							key={industry.slug}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: { duration: 0.6, delay: i * 0.06, ease: [0.44, 0, 0, 1] }
							}}
							viewport={{ amount: 'some', once: true }}>
							<Link
								href={`/use-cases/${industry.slug}`}
								className="group flex flex-col border border-[#e7e7e7] bg-white-100 rounded-12px shadow-btn hover:border-[#2780F1] hover:shadow-md transition-all h-full overflow-hidden">
								<div className="w-full h-[120px] bg-gradient-to-b from-[#2780F1]/8 to-transparent flex items-center justify-center">
									<OptimizedImage
										src="/static/use-cases-placeholder.png"
										alt={`${industry.title} webhooks`}
										width={60}
										height={60}
										className="w-[50px] h-[50px] desktop:w-[60px] desktop:h-[60px] object-contain group-hover:scale-110 transition-transform"
									/>
								</div>
								<div className="flex flex-col gap-2 p-5 desktop:p-6 pt-0 flex-1">
									<div className="flex items-center gap-3 mb-1">
										<div className="w-10 h-10 rounded-10px bg-[#2780F10A] border border-[#2780F11A] flex items-center justify-center shrink-0">
											{industry.icon}
										</div>
										<h2 className="text-18 desktop:text-20 font-semibold text-[#000] group-hover:text-[#2780F1] transition-colors">{industry.title}</h2>
									</div>
									<p className="text-14 leading-[180%] text-[#4B4B4B]">{industry.description}</p>
								</div>
								<div className="flex items-center gap-1 text-14 font-medium text-[#2780F1] px-5 desktop:px-6 pb-5 desktop:pb-6 mt-auto">
									<span>Learn more</span>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 19" fill="none" className="group-hover:translate-x-1 transition-transform">
										<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="#2780F1" />
									</svg>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</section>

			<GetStarted />
		</main>
	);
}
