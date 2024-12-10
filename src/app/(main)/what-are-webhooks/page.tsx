'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import shopify from 'public/svg/shopify.svg';
import woocommerce from 'public/svg/big-commerce.svg';
import stripe from 'public/svg/stripe.svg';
import square from 'public/svg/modern-treasury.svg';
import spruce from 'public/svg/spruce-health.svg';
import calendar from 'public/svg/calendly.svg';
import linear from 'public/svg/linear.svg';
import github from 'public/svg/github-new.svg';
import pagerduty from 'public/svg/pagerduty.svg';

const sections = [
	{
		id: 'introduction',
		title: 'Introduction'
	},
	{
		id: 'webhooks-vs-apis',
		title: 'Webhooks vs APIs'
	},
	{
		id: 'api-polling-vs-webhooks',
		title: 'API Polling vs Webhooks'
	},
	{
		id: 'industry-use-cases',
		title: 'Industry Use-Cases'
	},
	{
		id: 'best-practices',
		title: 'Best Practices'
	}
];

export default function Webhooks() {
	const [activeSection, setActiveSection] = useState('');
	const sectionRefs = useRef({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ rootMargin: '-50% 0px -50% 0px' }
		);

		sections.forEach(section => {
			if (sectionRefs.current[section.id]) {
				observer.observe(sectionRefs.current[section.id]);
			}
		});

		return () => observer.disconnect();
	}, []);

	const scrollToSection = id => {
		sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<main className="bg-white-100">
			<section className="pt-[100px] pb-12 desktop:pt-[137px] desktop:pb-[57px] bg-[#fafafa]">
				<div className="max-w-[1280px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
					<div className="flex flex-col items-start">
						<h1 className="text-32 desktop:text-[40px] font-medium">What are Webhooks?</h1>
						<p className="max-w-[683px] mx-auto desktop:text-16 text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:mt-24px font-medium">
							Whether you’re an engineer or product manager, this guide walks you through everything you need to become a webhook pro. Let’s begin!
						</p>
						<div className="flex footer:justify-center mt-4 desktop:mt-24px">
							<a
								target="_blank"
								href="https://cloud.getconvoy.io/signup"
								className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center">
								<span>Get started</span>

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
								href="https://docs.getconvoy.io/"
								className="px-16px py-10px text-14 ml-16px h-[40px] font-semibold rounded-8px bg-white-100 text-[#000] flex items-center justify-center hover:bg-[#e7e7e7] group transition-all duration-300 border-[#E7E7E7] border shadow-btn">
								<span>Visit docs</span>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									className="block ml-1 mt-[1px] group-hover:translate-y-[-1px] group-hover:translate-x-[1px] transition-all">
									<path d="M12.0039 7.06066L5.54894 13.5156L4.48828 12.455L10.9432 6H5.2539V4.5H13.5039V12.75H12.0039V7.06066Z" fill="black" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 bg-white-100 pb-36px desktop:pb-72px">
				<div className="flex flex-col-reverse desktop:flex-row desktop:justify-between gap-10 desktop:gap-0">
					<div className="w-full desktop:w-[calc(100%-380px)] pb-10 desktop:py-[72px]">
						<div
							ref={el => (sectionRefs.current['introduction'] = el)}
							id={'introduction'}
							className="text-[#4b4b4b] text-14 desktop:text-16 font-medium leading-[200%] flex flex-col gap-9 desktop:gap-14">
							<p>
								A webhook is a way for applications to send real-time data to each other automatically when specific events happen. Unlike traditional APIs, which
								require regular requests for information, webhooks are event-driven, meaning data is "pushed" to the receiving application as soon as an event
								occurs. This approach saves time, improves data freshness, and reduces server load by delivering only the necessary information.
							</p>
							<p>
								For example, when someone completes a purchase on an e-commerce site, a webhook can instantly notify other systems to update inventory, send order
								confirmations, or initiate shipping. These lightweight, efficient notifications have made webhooks essential for seamless, real-time communication
								across applications.
							</p>
						</div>

						<div
							ref={el => (sectionRefs.current['webhooks-vs-apis'] = el)}
							id={'webhooks-vs-apis'}
							className="text-[#4b4b4b] pt-72px text-16 font-medium leading-[200%] flex flex-col gap-5">
							<h3 className="text-24 desktop:text-[32px] font-bold leading-[150%] text-[#000]">Webhooks vs. APIs</h3>
							<p className="text-14 desktop:text-16 font-medium leading-[200%] text-[#4b4b4b]">
								While webhooks and APIs facilitate data exchange between systems, they function differently. Here’s a quick comparison:
							</p>

							<div className="w-full overflow-x-auto">
								<div className="border border-[#E7E7E780] rounded-12px overflow-hidden shadow-btn mobile-min:w-[800px]">
									<table className="w-full border-collapse">
										<thead className="text-[#000] font-medium text-14">
											<tr>
												<th className="text-14 font-medium text-left px-4 py-[9px] border-b border-[#E7E7E780]">Feature</th>
												<th className="text-14 font-medium text-left px-4 py-[9px] border-b border-[#E7E7E780] bg-[#2780F10A]">Webhooks</th>
												<th className="text-14 font-medium text-left px-4 py-[9xp] border-b border-[#E7E7E780]">APIs</th>
											</tr>
										</thead>
										<tbody className="divide-y text-[#000] font-normal">
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Communication</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Event-driven (pushed on occurrence)</td>
												<td className="text-14 p-3">Request-driven (pulled by request)</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Data Freshness</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Real-time</td>
												<td className="text-14 p-3">On-demand</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Setup Requirements</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Requires endpoint setup</td>
												<td className="text-14 p-3">Requires regular polling or request setup</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Typical Use Cases</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Notifications, alerts, updates</td>
												<td className="text-14 p-3">Data retrieval, control over data operations</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Efficiency</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">High, minimal server load</td>
												<td className="text-14 p-3">Moderate, dependent on frequency of requests</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div
							ref={el => (sectionRefs.current['api-polling-vs-webhooks'] = el)}
							id={'api-polling-vs-webhooks'}
							className="text-[#4b4b4b] pt-72px text-16 font-medium leading-[200%] flex flex-col gap-5">
							<h3 className="text-24 desktop:text-[32px] font-bold leading-[150%] text-[#000]">API Polling vs. Webhooks</h3>

							<div className="w-full overflow-x-auto">
								<div className="border border-[#E7E7E780] rounded-12px overflow-hidden shadow-btn mobile-min:w-[800px]">
									<table className="w-full border-collapse">
										<thead className="text-[#000] font-medium text-14">
											<tr>
												<th className="text-14 font-medium text-left px-4 py-[9px] border-b border-[#E7E7E780]"></th>
												<th className="text-14 font-medium text-left px-4 py-[9px] border-b border-[#E7E7E780] bg-[#2780F10A]">Webhooks</th>
												<th className="text-14 font-medium text-left px-4 py-[9xp] border-b border-[#E7E7E780]">Polling</th>
											</tr>
										</thead>
										<tbody className="divide-y text-[#000] font-normal">
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Compatibility with Severless</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Highly efficient, triggered only when needed</td>
												<td className="text-14 p-3">Less efficient due to frequent requests</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Impact of Rate Limits</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Not affected by rate limits</td>
												<td className="text-14 p-3">Subject to rate limits, affecting performance</td>
											</tr>
											<tr>
												<td className="text-14 p-3 text-[#4b4b4b]">Update Mode</td>
												<td className="text-14 font-medium p-3 bg-[#2780F10A]">Automatic, real-time updates on event trigger</td>
												<td className="text-14 p-3">Requires manual polling for new data</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div
							ref={el => (sectionRefs.current['industry-use-cases'] = el)}
							id={'industry-use-cases'}
							className="text-[#4b4b4b] pt-72px text-16 font-medium leading-[200%] flex flex-col gap-5">
							<h3 className="text-24 desktop:text-[32px] font-bold leading-[150%] text-[#000]">Webhook Use Cases Across Industries</h3>

							<div className="grid grid-cols-1 sm-old:grid-cols-2 gap-6">
								{/* E-commerce Section */}
								<div className="border border-[#e7e7e7] shadow-btn relative rounded-12px py-5 px-4 space-y-3">
									<h2 className="text-18 desktop:text-20 leading-[150%] text-[#000] font-semibold">E-commerce</h2>

									<div className="space-y-3 text-14 desktop:text-16 leading-[180%] text-[#4B4B4B] pb-12">
										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Order Notifications:</span>Send order confirmations, update
											inventory, or alert teams to new purchases as soon as they happen.
										</p>

										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Shipping Updates:</span>Notify customers and logistics platforms in
											real time when an order is shipped or delivered.
										</p>
									</div>

									<div className="absolute right-4 bottom-5 flex items-center gap-3">
										<a
											href="https://shopify.dev/docs/apps/build/webhooks"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={shopify} alt="Shopify logo" width={85} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
										<a
											href="https://developer.bigcommerce.com/docs/integrations/webhooks"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={woocommerce} alt="WooCommerce logo" width={106} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
									</div>
								</div>

								{/* Finance Section */}
								<div className="border border-[#e7e7e7] shadow-btn relative rounded-12px py-5 px-4 space-y-3">
									<h2 className="text-18 desktop:text-20 leading-[150%] text-[#000] font-semibold">Finance</h2>

									<div className="space-y-3 text-14 desktop:text-16 leading-[180%] text-[#4B4B4B] pb-12">
										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Transactions Alerts:</span>Banks and financial platforms can alert
											users of transactions, withdrawals, or unusual activity instantly.
										</p>

										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Account Changes:</span>Notify users or backend systems whenever an
											account detail is updated, improving security and user experience.
										</p>
									</div>

									<div className="absolute right-4 bottom-5 flex items-center gap-3">
										<a href="https://docs.stripe.com/webhooks" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
											<Image src={stripe} alt="Stripe logo" width={60} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
										<a
											href="https://docs.moderntreasury.com/platform/docs/webhooks-1"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={square} alt="Modern Treasure logo" width={24} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
									</div>
								</div>

								{/* Healthcare Section */}
								<div className="border border-[#e7e7e7] shadow-btn relative rounded-12px py-5 px-4 space-y-3">
									<h2 className="text-18 desktop:text-20 leading-[150%] text-[#000] font-semibold">Healthcare</h2>

									<div className="space-y-3 text-14 desktop:text-16 leading-[180%] text-[#4B4B4B] pb-12">
										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Appointment Reminders:</span>Send automated notifications to
											patients and practitioners for scheduled appointments.
										</p>

										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Patient Data Update:</span>Alert healthcare providers when patient
											records are updated, keeping teams informed with real-time data.
										</p>
									</div>

									<div className="absolute right-4 bottom-5 flex items-center gap-3">
										<a
											href="https://developer.sprucehealth.com/docs/webhooks-overview"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={spruce} alt="Spruce logo" width={124} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
									</div>
								</div>

								{/* SaaS & Technology Platforms Section */}
								<div className="border border-[#e7e7e7] shadow-btn relative rounded-12px py-5 px-4 space-y-3">
									<h2 className="text-18 desktop:text-20 leading-[150%] text-[#000] font-semibold">SaaS & Technology platforms</h2>

									<div className="space-y-3 text-14 desktop:text-16 leading-[180%] text-[#4B4B4B] pb-12">
										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">User Actions:</span>Track user activities, such as login events or
											file uploads, enabling responsive notifications and audit trails.
										</p>

										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Subscription Events:</span>Notify billing systems or CRMs of user
											signups, renewals, or cancellations for streamlined account management.
										</p>
									</div>

									<div className="absolute right-4 bottom-5 flex items-center gap-3">
										<a
											href="https://help.calendly.com/hc/en-us/articles/223195488-Webhooks-overview"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={calendar} alt="Calendly logo" width={90} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
										<a
											href="https://developers.linear.app/docs/graphql/webhooks"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={linear} alt="Linear logo" width={88} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
									</div>
								</div>

								{/* Developer Platforms Section */}
								<div className="border border-[#e7e7e7] shadow-btn relative rounded-12px py-5 px-4 space-y-3">
									<h2 className="text-18 desktop:text-20 leading-[150%] text-[#000] font-semibold">Developer Platforms</h2>

									<div className="space-y-3 text-14 desktop:text-16 leading-[180%] text-[#4B4B4B] pb-12">
										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Build and Deployment Notifications:</span>Trigger automatic builds
											or deployments as soon as code is pushed, saving developers manual steps.
										</p>

										<p className="">
											<span className="font-semibold desktop:font-medium text-[#000] pr-1">Error Tracking and Incident Alerts:</span>Instantly notify teams
											when critical errors or performance issues arise for faster response times.
										</p>
									</div>

									<div className="absolute right-4 bottom-5 flex items-center gap-3">
										<a
											href="https://docs.github.com/en/webhooks/about-webhooks"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={github} alt="GitHub logo" width={62} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
										<a
											href="https://developer.pagerduty.com/docs/db0fa8c8984fc-overview"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:opacity-80 transition-opacity">
											<Image src={pagerduty} alt="PagerDuty logo" width={104} height={24} className="h-5 desktop:h-6 w-auto" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div
							ref={el => (sectionRefs.current['best-practices'] = el)}
							id={'best-practices'}
							className="text-[#4b4b4b] pt-72px text-16 font-medium leading-[200%] flex flex-col gap-5">
							<h3 className="text-24 desktop:text-[32px] font-bold leading-[150%] text-[#000]">Webhooks Best Practices </h3>
							<p className="text-14 desktop:text-16 leading-[200%]">
								If you’re an engineering leader and would like to learn more about implementing webhook best practises. We’ve written extensively on the topic, you
								can follow the guides below to learn more.If you’re an engineering leader and would like to learn more about implementing webhook best practises.
								We’ve written extensively on the topic, you can follow the guides below to learn more.
							</p>

							<div className="space-y-1 w-max">
								<a
									href="https://docs.getconvoy.io/webhook-guides/webhook-retries"
									className="flex items-center gap-2 py-1 text-14 desktop:text-16 font-medium text-[#2780F1] w-max">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="min-w-max stroke-[#BBBBBB]">
										<line x1="6" y1="11" x2="18" y2="11" stroke-width="2" />
									</svg>
									<span>Webhook Retries</span>
								</a>
								<a
									href="https://docs.getconvoy.io/webhook-guides/tackling-ssrf"
									className="flex items-center gap-2 py-1 text-14 desktop:text-16 font-medium text-[#2780F1] w-max">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="min-w-max stroke-[#BBBBBB]">
										<line x1="6" y1="11" x2="18" y2="11" stroke-width="2" />
									</svg>
									<span>Webhook Security: Preventing SSRF & Delivering Static IPs</span>
								</a>
							</div>
						</div>
					</div>

					<div className="w-[240px]">
						<div className="desktop:sticky top-4 space-y-4 pt-10 desktop:py-[72px]">
							<nav className="space-y-2 desktop:space-y-1" aria-label="Sidebar">
								{sections.map(section => (
									<a
										key={section.id}
										href={`#${section.id}`}
										onClick={e => {
											e.preventDefault();
											scrollToSection(section.id);
										}}
										className={`flex items-center gap-2 py-1 text-14 desktop:text-16 font-medium ${
											activeSection === section.id ? 'text-[#006bff]' : 'text-[#4B4B4B]'
										}`}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											className={`${activeSection === section.id ? 'stroke-[#006bff]' : 'stroke-[#4B4B4B]'}`}>
											<line x1="6" y1="11" x2="18" y2="11" className="stroke-1 desktop:stroke-2" />
										</svg>
										<span>{section.title}</span>
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
