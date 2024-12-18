'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import subomi from '../../../../public/profile-images/Subomi Oluwalana.png';

import retries from '../../../../public/svg/retries 3.svg';
import circuit from '../../../../public/svg/circuit.svg';
import ssl from '../../../../public/svg/ssl.svg';
import rateLimiting from '../../../../public/svg/rate-limiting 2.svg';
import timeouts from '../../../../public/svg/timeouts.svg';
//
import postgresql from '../../../../public/svg/postgresql.svg';
import policies from '../../../../public/svg/policies.svg';
import archiving from '../../../../public/svg/archiving.svg';
import logs from '../../../../public/svg/logs.svg';
//
import control from '../../../../public/svg/control.svg';
import read from '../../../../public/svg/read.svg';
import multitenant from '../../../../public/svg/multitenant.svg';
import extendable from '../../../../public/svg/archiving.svg';
import extensive from '../../../../public/svg/logs.svg';
//
import hmac from '../../../../public/svg/hmac.svg';
import blacklisting from '../../../../public/svg/read.svg';
import tls from '../../../../public/svg/tls.svg';
//
import prometheus from '../../../../public/svg/prometheus.svg';
import telemetry from '../../../../public/svg/telemetry.svg';
//
import ingest from '../../../../public/svg/ingest.svg';
import connect from '../../../../public/svg/connect.svg';
import catalogue from '../../../../public/svg/catalogue.svg';
import portal from '../../../../public/svg/portal.svg';
import fineGrained from '../../../../public/svg/fine-grained.svg';
import support from '../../../../public/svg/support.svg';
import retry from '../../../../public/svg/retry.svg';
import synchronous from '../../../../public/svg/synchronous.svg';

const advancedFeatures = [
	{
		icon: retries,
		title: 'Retries:',
		description: 'Automatically retry failed webhooks to ensure eventual delivery and handle temporary network issues.',
		link: 'https://docs.getconvoy.io/webhook-guides/webhook-retries#webhook-retries'
	},
	{
		icon: circuit,
		title: 'Circuit Breaking:',
		description:
			'Temporarily pause webhook delivery to failing endpoints, preventing repeated errors and maintain system stability by redirecting traffic away from problematic connections.',
		link: ''
	},
	{
		icon: ssl,
		title: 'Enforce SSL:',
		description:
			'Guarantee secure webhook delivery by requiring SSL/TLS in production, protecting data in transit from interception and tampering, and ensuring compliance with security standards.',
		link: ''
	},
	{
		icon: rateLimiting,
		title: 'Rate Limiting:',
		description: 'Control the number of webhooks sent per second, preventing overload and ensuring system stability.',
		link: ''
	},
	{
		icon: timeouts,
		title: 'Fine-grained Connection Timeouts:',
		description: 'Customise timeout settings for each webhook, optimising performance and resource usage.',
		link: ''
	}
];

const webhookFeatures = [
	{
		icon: postgresql,
		title: 'Built on PostgreSQL:',
		description: 'Leverage the world’s most ubiquitous database to ensure durability and reliability for all events, deliveries, and delivery attempts.',
		link: ''
	},
	{
		icon: policies,
		title: 'Flexible Retention Policies:',
		description:
			'Provide customisable data retention policies for archiving older events, optimising storage costs, and ensuring compliance with regulatory requirements efficiently.',
		link: ''
	},
	{
		icon: logs,
		title: 'Filter Webhook Logs:',
		description: 'Filter events and deliveries effortlessly to quickly identify and resolve event matching or delivery issues.',
		link: ''
	}
];

const architectureFeatures = [
	{
		icon: control,
		title: 'Control and Data Plane Architecture:',
		description: 'Achieve high availability and fault tolerance by splitting the ingestion and delivery pipeline (data plane) from the configuration layer (control plane).',
		link: 'https://docs.getconvoy.io/deployment/architecture'
	},
	{
		icon: read,
		title: 'Read and Write Replicas:',
		description:
			'Leverage PostgreSQL read replicas to speed up read queries for the dashboard and other functions while writing only events, event deliveries and delivery attempts to the primary database.',
		link: ''
	},
	{
		icon: archiving,
		title: 'High-Performance Archiving to Object Storage:',
		description: "Utilise PostgreSQL partitioning to enable efficient archiving, maintaining the system's SLA and ensuring optimal performance.",
		link: ''
	}
];

const secureFeatures = [
	{
		icon: hmac,
		title: 'HMAC Signatures:',
		description: 'Verify webhook authenticity using HMAC (Hash-based Message Authentication Code), ensuring data integrity and origin validation.',
		link: ''
	},
	{
		icon: blacklisting,
		title: 'Static IPs & IP Blacklisting:',
		description: 'Ensure consistent and secure webhook delivery from designated IP addresses as well as eliminating the possibility of SSRF by blacklisting IPs.',
		link: ''
	},
	{
		icon: tls,
		title: 'Replay Attack Prevention:',
		description: 'Protect your data from malicious attacks with replay attack prevention, ensuring that each webhook delivery is unique and secure..',
		link: ''
	}
];

const observabilityFeatures = [
	{
		icon: prometheus,
		title: 'Prometheus Metrics:',
		description: 'Easily diagnose all webhook delivery issues, like high latencies and high queue backlogs per tenant.',
		link: ''
	},
	{
		icon: telemetry,
		title: 'Open Telemetry:',
		description: 'Diagnose performance issues in your entire cluster with OpenTelemetry on any backend you choose.',
		link: ''
	}
];

const otherFeatures = [
	{
		icon: ingest,
		title: 'Ingest webhooks from any source:',
		description: 'Convoy’s flexible architecture enables you to ingest webhooks from just any source like Amazon SQS, Apache Kafka, Google PubSub, RabbitMQ and HTTP.',
		link: ''
	},
	{
		icon: connect,
		title: 'Connect directly to your CDC Pipeline:',
		description: 'You can connect directly to your CDC to ingest payloads that don’t fit any ingestion structure, but add javascript transformations to re-shape them.',
		link: ''
	},
	{
		icon: portal,
		title: 'Developer Portal:',
		description: 'Create read or read-and-write developer portal for users to view their event deliveries, configure and debug their endpoints.',
		link: ''
	},
	{
		icon: fineGrained,
		title: 'Fine-grained webhook subscriptions:',
		description: 'Go beyond the basic event-type webhooks subscriptions and subscribe to specific events with a particular payload shape.',
		link: ''
	},
	{
		icon: retry,
		title: 'Bulk Retry for Failed Event Deliveries:',
		description: 'Quickly recover from delivery failures by retrying multiple events in bulk, ensuring minimal disruption and faster resolution for your workflows.',
		link: ''
	}
];

export default function WebhookGateway() {
	return (
		<main className="flex flex-col items-center pb-60px desktop:pb-120px w-full">
			<section className="pt-100px desktop:pt-150px px-20px flex items-start desktop:items-center flex-col max-w-[1180px] w-full">
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
					}}>
					<h1 className="desktop:text-center font-medium text-[32px] desktop:text-[40px] mb-24px desktop:max-w-[683px] m-auto">
						The world’s most advanced Webhooks Gateway
					</h1>
					<p className="desktop:text-center text-[#666] text-16 desktop:text-16 desktop:max-w-[683px] desktop:m-auto mb-24px font-medium leading-[200%]">
						Streamline your webhook infrastructure with advanced features for{' '}
						<span className="text-[#2780F1]">scalability, reliability and enterprise-grade security.</span> Built for developers, trusted by enterprises.
					</p>

					<div className="flex flex-wrap gap-16px mt-4 desktop:mt-6 desktop:items-center desktop:justify-center mb-56px">
						<a
							target="_blank"
							href="https://cloud.getconvoy.io/signup"
							className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center justify-center w-full sm-old:w-max">
							<span>Try for free</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="19"
								viewBox="0 0 18 19"
								className="ml-1 mt-[1px] group-hover:translate-x-[2px] transition-all">
								<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
							</svg>
						</a>
						<a
							target="_blank"
							href="https://cal.com/subomi/30min"
							className="px-8px py-10px text-14 h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border hover:bg-[#e7e7e7] group transition-all duration-300 shadow-btn gap-2 w-full sm-old:w-max">
							<Image src={subomi} alt="play" className="rounded-[50%] w-24px h-24px object-cover" />

							<span>Talk to a founder</span>
						</a>
					</div>
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#2780F1]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Advanced endpoint management</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Enhance your webhook reliability, security, and performance with advanced endpoint controls tailored to ensure stable, secure, and efficient message
								delivery.
							</p>
						</div>
					</div>

					<FeatureGrid features={advancedFeatures} />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#AE27F166]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Rock-solid Webhooks Logs & Filtering</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Easily trace and troubleshoot webhook activity with detailed logs and powerful filtering options, ensuring faster resolutions and seamless
								monitoring.
							</p>
						</div>
					</div>

					<FeatureGrid features={webhookFeatures} />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#F1852766]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Secure Webhook Delivery</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Ensure reliable and secure webhook delivery with advanced security measures including HMAC signatures, static IPs, and replay attack prevention,
								safeguarding data integrity and compliance.
							</p>
						</div>
					</div>

					<FeatureGrid features={secureFeatures} />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#27F18566]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Highly Reliable Architecture</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Built for unmatched reliability, our architecture ensures high availability, fault tolerance, and seamless performance at scale.
							</p>
						</div>
					</div>

					<FeatureGrid features={architectureFeatures} />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#AEF12766]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Observability</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Gain deep insights into system performance and webhook delivery with robust metrics and end-to-end observability tools.
							</p>
						</div>
					</div>

					<FeatureGrid features={observabilityFeatures} />
				</motion.div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 1.5,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					className="border border-[#E7E7E74D] rounded-8px overflow-hidden w-full bg-white-100">
					<div className="w-full desktop:min-h-[168px] p-5 desktop:p-40px bg-gradient-to-b from-[#fff] from-[0%] to-[#F1B52766]/20 to-[134.32%] flex items-center justify-start relative overflow-hidden">
						<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.54rem_2.35rem] absolute -left-[1.5px] -top-[1px] w-full h-full"></div>

						<div className="flex flex-col w-[704px] z-10 gap-2 desktop:gap-0">
							<h3 className="text-18 desktop:text-28 leading-[140%] font-semibold">Unparalleled Developer Experience</h3>
							<p className="text-[#666] text-14 desktop:text-16 leading-[140%] desktop:leading-[160%] font-medium">
								Empower your developers with a seamless experience, offering intuitive tools for managing webhooks, precise event control, and guaranteed
								reliability
							</p>
						</div>
					</div>

					<FeatureGrid features={otherFeatures} />
				</motion.div>
			</section>
		</main>
	);
}

type Features = {
	icon: any;
	title: string;
	description: string;
	link: string;
};

const FeatureGrid = ({ features }: { features: Features[] }) => {
	const gridRef = useRef<HTMLDivElement>(null);
	const [rowHeights, setRowHeights] = useState<number[]>([]);

	useEffect(() => {
		const calculateRowHeights = () => {
			if (!gridRef.current) return;

			const grid = gridRef.current;
			const items = Array.from(grid.children);
			const columnCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

			const heights: number[] = [];
			for (let i = 0; i < items.length; i += columnCount) {
				const rowItems = items.slice(i, i + columnCount);
				const rowHeight = Math.max(...rowItems.map(item => item.getBoundingClientRect().height));
				heights.push(rowHeight);
			}

			setRowHeights(heights);
		};

		// Calculate initially and on window resize
		calculateRowHeights();
		window.addEventListener('resize', calculateRowHeights);

		// Small delay to ensure content is properly rendered
		const timeout = setTimeout(calculateRowHeights, 100);

		return () => {
			window.removeEventListener('resize', calculateRowHeights);
			clearTimeout(timeout);
		};
	}, [features]);

	return (
		<div className="w-full relative">
			{/* Grid Lines Container */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Mobile Horizontal Lines (1 column) */}
				<div className="lg-old:hidden md-old:hidden">
					{rowHeights.slice(0, -1).map((_, index) => {
						const topOffset = rowHeights.slice(0, index + 1).reduce((sum, height) => sum + height, 0);
						return <div key={`mobile-line-${index}`} className="absolute w-full h-px bg-[#E7E7E74D]" style={{ top: `${topOffset}px` }} />;
					})}
				</div>

				{/* Tablet Lines (2 columns) */}
				<div className="hidden md-old:block lg-old:hidden">
					{/* Vertical line */}
					<div className="absolute left-1/2 top-0 h-full w-px bg-[#E7E7E74D]" />

					{/* Horizontal lines */}
					{rowHeights.slice(0, -1).map((_, index) => {
						const topOffset = rowHeights.slice(0, index + 1).reduce((sum, height) => sum + height, 0);
						return <div key={`tablet-line-${index}`} className="absolute w-full h-px bg-[#E7E7E74D]" style={{ top: `${topOffset}px` }} />;
					})}
				</div>

				{/* Desktop Lines (3 columns) */}
				<div className="hidden lg-old:block">
					{/* Vertical lines */}
					<div className="absolute left-1/3 top-0 h-full w-px bg-[#E7E7E74D]" />
					<div className="absolute left-2/3 top-0 h-full w-px bg-[#E7E7E74D]" />

					{/* Horizontal lines */}
					{rowHeights.slice(0, -1).map((_, index) => {
						const topOffset = rowHeights.slice(0, index + 1).reduce((sum, height) => sum + height, 0);
						return <div key={`desktop-line-${index}`} className="absolute w-full h-px bg-[#E7E7E74D]" style={{ top: `${topOffset}px` }} />;
					})}
				</div>
			</div>

			{/* Features Grid */}
			<div ref={gridRef} className="w-full grid grid-cols-1 md-old:grid-cols-2 lg-old:grid-cols-3">
				{features.map((feature, index) => (
					<div key={index} className="p-5 lg-old:p-10 w-full">
						<div className="flex flex-col justify-between h-full">
							<div className="flex flex-col gap-4">
								<Image src={feature.icon} alt="feature icon" className="cursor-pointer w-32px h-32px lg-old:w-40px lg-old:h-40px" />
								<p className="text-[#666] text-16 leading-[160%]">
									<span className="text-[#000] font-medium mr-1">{feature.title}</span>
									{feature.description}
								</p>
							</div>

							{feature.link && (
								<a href={feature.link} className="flex items-center gap-1 mt-4 group hover:opacity-70 transition-all">
									<p className="text-[#666] text-14 font-semibold">Learn more</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
										className="group-hover:translate-x-[2px] transition-all">
										<path d="M9.8764 9.00052L6.16406 5.2882L7.22473 4.22754L11.9977 9.00052L7.22473 13.7734L6.16406 12.7128L9.8764 9.00052Z" fill="#666666" />
									</svg>
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
