'use client';
import Image from 'next/image';
import ArrowRightIcon from '../../../../public/svg/arrow-right-icon.svg';
import AngleDownIcon from '../../../../public/svg/angle-down-black-icon.svg';
import PricingImage from '../../../../public/static/Frame.png';
import { useRef, useState } from 'react';
import EnterpriseWaitlist from '@/app/components/EnterpriseWaitList';
import Toast from '@/app/components/Toast';

export default function Pricing() {
	const [openQuestion, setOpenQuestion] = useState('Will you match the price of another platform?');
	const enterpriseModal = useRef<HTMLDialogElement>(null);

	const plans = [
		{
			name: 'Developer',
			id: 'developer',
			description: 'This is a perfect plan for starters',
			price: '$0',
			frequency: '/monthly',
			link: 'https://github.com/frain-dev/convoy#installation-getting-started',
			subText: 'This is a perfect plan for starters and hobby projects',
			tagClass: 'bg-primary-25 text-primary-400',
			preText: 'You’ll get started with:',
			features: [
				'Capped at 200,000 events monthly',
				'1 user',
				'2 projects',
				'3 days retention',
				'Endpoint Management: Retries & Rate Limiting',
				'Message Broker Integration (Google PubSub & Amazon SQS)'
			]
		},
		{
			name: 'Growth',
			id: 'growth',
			description: 'This is a perfect plan for startups',
			price: '$40',
			frequency: '/monthly',
			link: '/cloud',
			subText: 'This is a perfect plan for growing startups, aiming to scale',
			tagClass: 'bg-success-100 text-success-400',
			preText: 'Everything in developer plan, plus:',
			features: ['Unlimited events at $50/million events', '5 users', '10 projects', '30 days retention', 'Shared Static IPs']
		},

		{
			name: 'Scale',
			id: 'scale',
			description: 'For users who want to do more',
			price: '$150',
			frequency: '',
			link: '/enterprise#requestAccess',
			subText: 'We meet you at your point of scale and join you further',
			tagClass: 'bg-warning-50 text-warning-400',
			preText: 'Everything in growth plan, plus:',
			features: ['Unlimited events at $45/million events', 'Unlimited users', 'Unlimited projects', '90 days retention', 'Role-Based Access Controls', 'Dedicated Static IPs']
		}
	];

	const enterpriseFeatures = [
		'Unlimited events at $40/million events',
		'Custom retention policy',
		'SSO & SAML',
		'Audit Logs',
		'Dedicated Technical Support',
		'Deployment Options: Cloud, Dedicated Cluster, On-prem Cluster'
	];

	const features = [
		'Resilient webhooks delivery with linear or exponential time retries, bulk retries and rate limiting.',
		'Endpoint failure notifications via email and slack.',
		'Advanced webhooks security with endpoint authentication, payload signing, rolling webhook secrets, replay attack prevention, and forward-compatible scheme upgrades.',
		'Route a single webhook event to several microservices based on the event type or webhook payload structure.',
		'Customer-facing webhooks dashboard.',
		'Support for local debugging with Convoy CLI.',
		'SDK support in Ruby, JS, Golang, and Python.'
	];

	const testimonials = [
		{
			author: { name: 'K.O.O', twitter: 'Dominus_Kelvin' },
			html: `<p>I just discovered <a href="https://twitter.com/getconvoy" target="_blank">@getConvoy</a> and being an API lover this seems interesting.</p>
<p>Do you all want me to have a TKYT session on Convoy?</p>`,
			link: 'https://twitter.com/Dominus_Kelvin/status/1583085997536948224'
		},
		{
			author: { name: 'Aleph', twitter: 'Alephile' },
			html: `<p>Been using <a href="https://twitter.com/getconvoy" target="_blank">@getConvoy</a> across the 
<a href="https://twitter.com/helicarrierinc">@helicarrierinc</a>
stack (Buycoins, Sendcash, Sendcash Pay) and we’re really loving it! E soft plenty 😀</p>`,
			link: 'https://twitter.com/alephile/status/1451540300132986883'
		},
		{
			author: { name: 'Dad!', twitter: 'mykeels' },
			html: `<p>Spent good friday with <a href="https://twitter.com/allengblack" target="_blank">@allengblack</a> and 
                <a href="https://twitter.com/madu_victor" target="_blank">@madu_victor</a>, setting up <a href="https://twitter.com/getconvoy" target="_blank">@getConvoy</a>'s open source binaries for webhooks.</p>
<p>Awesome software!</p>
<p>Their support even for open source issues >>>></p>
<p>Webhooks are harder than you'd think.</p>
<p>Listen to Ray explain here:</p>`,
			link: 'https://twitter.com/mykeels/status/1515749130810925060'
		},
		{
			author: { name: 'Anthony Alaribe', twitter: 'tonialaribe' },
			html: `<p>Thanks for the kind words bro. The folks at <a href="https://twitter.com/getconvoy" target="_blank">@getConvoy</a> are also doing really amazing stuff</p>`,
			link: 'https://twitter.com/tonialaribe/status/1592746811470798848'
		},
		{
			author: { name: 'favour.eth', twitter: 'OkeibunorFavour' },
			html: `<p>Integrated <a href="https://twitter.com/getconvoy" target="_blank">@getConvoy</a> into an existing app. Awesome service for webhooks delivery and monitoring🚀.</p>`,
			link: 'https://twitter.com/OkeibunorFavour/status/1509113222799974404'
		}
	];

	const questions = [
		{
			question: 'Will you match the price of another platform?',
			answer: 'At Convoy, we have the most transparent and cost-efficient pricing packages in the market today, we will be happy to be proven wrong. Please reach us here if you find a better priced platform.'
		},
		{
			question: 'What happens if I go over my limit?',
			answer: 'You have nothing you worry about. We don’t apply hard limits, else we will break critical business workflows. We also understand you can experience unplanned traffic burst which can lead to an inevitable webhooks increase. If you exceed the limits of your plan for a brief period, we will get in touch about upgrading to something more suited to your needs. Please feel free to contact support if you have any questions about your use-case.'
		},
		{
			question: 'Do you have a Free Plan?',
			answer: 'Yes, as a Developer you can use Convoy to send and receive up to 150,000 events for free. You can also benefit from our sales referral program, email sales@getconvoy.io to learn more about it.'
		},
		{
			question: 'How are events counted?',
			answer: 'Events are the amount of unique events ingested into your project, regardless of the project type. If a single event is routed to multiple destinations, it doesn’t qualify as multiple events. If an event is retried multiple times, it doesn’t qualify as multiple events. Every unique event ingested into Convoy from any source is counted as an event.'
		},
		{
			question: 'Do you offer any of your paid plans as self-hosted?',
			answer: 'At the moment, we don’t offer any of our paid plans as a self-hosted offering. If this is something you are interested in,  please feel free to reach out to us via email -  sales@getconvoy.io '
		},
		{
			question: 'How Secure is Convoy?',
			answer: 'Webhooks by nature more often than not include sensitive data. With this in mind, Convoy was built to be secure from the ground up following industry best practices. We encrypt all data in transit and at rest.'
		},
		{
			question: 'What happens after the data retention period elapses?',
			answer: 'On Convoy Cloud, after your data retention period,  all event data is hard deleted from both the db and the search backend. But with Convoy OSS, you control your data retention and what happens to your data afterwards.'
		},
		{
			question: 'Do you provide discounts?',
			answer: 'Yes, we provide discounts for people who pay annually instead of monthly, a 10% savings the process. Also, we have a very robust sales referral program providing up to 1 year free subscription for our customers who we believe are in the best position to sell Convoy to other companies, email sales@getconvoy.io to learn more about it here.'
		},
		{
			question: 'Will Customer Data Leave my infrastructure?',
			answer: 'Yes, on Convoy Cloud, customer data will leave your infrastructure, however we make use of AES256 to securely store all customer and event data such that nobody not even us can access it. Event data is stored in the database in an encrypted format, but we index parts of it so you can search through them on your dashboard. Reach us at engineering@getconvoy.io if you have any concerns.'
		}
	];

	const closeDialog = event => {
		const dialogWrapper = event.target;
		if (dialogWrapper === event.currentTarget) enterpriseModal.current?.close();
	};

	return (
		<main>
			<section className="pt-214px px-20px">
				<h1 className="text-center font-bold text-32 desktop:text-[42px] desktop:leading-[48px] mb-24px max-w-[1020px] m-auto">Usage Pricing, no surprises.</h1>
				<p className="text-center text-gray-600 text-14 max-w-[561px] m-auto mb-66px">
					All the tools you need to take control and manage your webhook events infrastructure, from your hubby project to scale.
				</p>

				<div className="max-w-[1248px] w-full m-auto">
					<div className="grid grid-cols-1 tab:grid-cols-2 md:grid-cols-3 gap-24px items-end">
						{plans.map((plan, i) => (
							<div
								className={`rounded-16px border border-primary-50 bg-white-100 shadow-default pb-24px flex justify-between flex-col ${
									i === 1 ? '' : 'md:max-h-[912px] md:min-h-[742px]'
								}`}
								key={i}>
								<div>
									<div className={`${i === 1 ? 'bg-success-50 pb-24px rounded-tl-16px rounded-tr-16px' : ''} px-24px md:px-32px pt-24px md:pt-32px`}>
										<div className="flex items-center mb-24px">
											<img src={`/svg/${plan.id}-plan.svg`} alt={`${plan.id} plan`} className="mr-16px" />
											<div>
												<p className="text-16 text-gray-800">For</p>
												<h1 className="text-24 text-gray-800 font-bold">{plan.name}</h1>
											</div>
										</div>

										<p className="text-gray-600 text-12">{plan.subText}</p>
										<hr className={`${i === 1 ? 'border-success-100' : 'border-primary-25'} border-t my-24px`} />
										{i !== 0 && <div className={`${plan.tagClass} py-2px px-4px rounded-22px mb-10px w-fit text-10`}>Starts with</div>}

										<p className="flex items-center">
											<span className="text-36 font-bold">{plan.price}</span>
											<span className="text-18 text-gray-600 ml-10px">/ monthly</span>
										</p>
									</div>

									<div className={`${i === 1 ? 'pt-24px' : ''} px-24px md:px-32px pb-24px md:pb-32px`}>
										{i !== 1 && <hr className="border-t border-primary-25 my-24px" />}

										<div className={`${i === 1 ? 'h-[244px] md:h-[340px]' : 'h-[244px] md:h-[300px]'}`}>
											<p className="text-12 text-gray-400 mb-16px">{plan.preText}</p>
											{plan.features.map((feature, index) => (
												<div className="flex items-start mb-10px" key={index}>
													<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-16px mt-6px">
														<path
															d="M0.580256 4.33949L1.78196 3.13352L3.75497 5.07244L8.13139 0.713068L9.34162 1.91903L3.75497 7.47585L0.580256 4.33949Z"
															fill="#477DB3"
														/>
													</svg>

													<p className="text-12 text-gray-600 md:max-w-[542px]">{feature}</p>
												</div>
											))}
										</div>
									</div>
								</div>

								<a
									target="_blank"
									href="https://dashboard.getconvoy.io/signup"
									className="mx-24px bg-[linear-gradient(0deg,#376DA4_0%,#477DB3_100%)] shadow-sm rounded-10px p-16px flex items-center justify-center text-white-100 text-14">
									Start your project
									<Image src={ArrowRightIcon} alt="arrow right icon" className="ml-12px" />
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="max-w-[1288px] w-full m-auto px-20px mt-68px mb-160px">
				<div className="w-full bg-white-100 border border-primary-50 rounded-16px shadow-default p-24px md:p-32px flex flex-wrap gap-x-40px">
					<div className="min-w-[300px]">
						<h1 className="text-24 font-bold text-gray-800 mb-12px">Enterprise</h1>
						<p className="text-12 text-gray-600 max-w-[307px] mb-24px">For large scale products and teams with heavier events loads.</p>
						<button onClick={() => enterpriseModal.current?.showModal()} className="bg-gray-100 rounded-6px px-16px py-12px text-gray-800 text-14 mb-30px md:mb-0">
							Contact Us
						</button>
					</div>
					<div className="min-w-[300px]">
						{enterpriseFeatures.slice(0, 4).map((feature, index) => (
							<div className="flex items-start mb-10px" key={index}>
								<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-16px mt-6px">
									<path d="M0.580256 4.33949L1.78196 3.13352L3.75497 5.07244L8.13139 0.713068L9.34162 1.91903L3.75497 7.47585L0.580256 4.33949Z" fill="#477DB3" />
								</svg>
								<p className="text-12 text-gray-600 md:max-w-[542px]">{feature}</p>
							</div>
						))}
					</div>
					<div className="min-w-[300px]">
						{enterpriseFeatures.slice(4, 6).map((feature, index) => (
							<div className="flex items-start mb-10px" key={index}>
								<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-16px mt-6px">
									<path d="M0.580256 4.33949L1.78196 3.13352L3.75497 5.07244L8.13139 0.713068L9.34162 1.91903L3.75497 7.47585L0.580256 4.33949Z" fill="#477DB3" />
								</svg>
								<p className="text-12 text-gray-600 md:max-w-[542px]">{feature}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] text-white-100 py-36px desktop:py-80px overflow-x-hidden">
				<div className="flex max-w-[1288px] mx-auto relative px-20px">
					<div className="max-w-[1200px] md:m-0 m-auto">
						<h2 className="text-32 font-bold mb-46px desktop:mb-76px">Available on all plans</h2>
						<ul className="max-w-[523px]">
							{features.map(feature => (
								<li className="list-check pb-6px mb-26px flex items-center text-14 leading-8" key={feature}>
									<div className="h-24px w-24px mr-24px">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												opacity="0.15"
												fillRule="evenodd"
												clipRule="evenodd"
												d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
												fill="white"
											/>
											<path
												d="M10.3984 15.8242L7.13672 12.582C7.04557 12.4909 7 12.3737 7 12.2305C7 12.0872 7.04557 11.97 7.13672 11.8789L7.85937 11.1758C7.95052 11.0716 8.06445 11.0195 8.20117 11.0195C8.33789 11.0195 8.45833 11.0716 8.5625 11.1758L10.75 13.3633L15.4375 8.67578C15.5416 8.57161 15.6621 8.51953 15.7988 8.51953C15.9355 8.51953 16.0495 8.57161 16.1406 8.67578L16.8633 9.3789C16.9544 9.47005 17 9.58724 17 9.73047C17 9.87369 16.9544 9.99088 16.8633 10.082L11.1016 15.8242C11.0104 15.9284 10.8932 15.9805 10.75 15.9805C10.6068 15.9805 10.4896 15.9284 10.3984 15.8242Z"
												fill="white"
											/>
										</svg>
									</div>

									{feature}
								</li>
							))}
						</ul>
					</div>
					<div className="md:block hidden max-w-[708px] right-[-200px] absolute">
						<Image src={PricingImage} alt="pricing image" />
					</div>
				</div>
			</section>

			<section className="px-20px py-60px desktop:py-100px">
				<p className="text-center text-16 font-semibold mb-60px desktop:mb-90px">What people are saying about Convoy...</p>
				<div className="px-30px flex items-start flex-nowrap gap-10 overflow-x-auto no-scrollbar justify-center">
					{testimonials.map((testimonial, index) => (
						<div className="bg-white-100 rounded-10px p-26px min-h-[200px] max-w-[300px] min-w-[300px]" key={index}>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img src={`/static/twitter-user${index + 1}.jpeg`} alt="avatar icon" className="mr-10px w-40px rounded-100px" />
									<div>
										<p className="text-12 font-medium text-grey-80">{testimonial.author.name}</p>
										<p className="text-10 text-grey-40">@{testimonial.author.twitter}</p>
									</div>
								</div>
								<div>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_6184_16378)">
											<path
												d="M22.9377 5.04667C22.155 5.39333 21.3143 5.628 20.431 5.73333C21.3323 5.19333 22.0243 4.338 22.35 3.319C21.5067 3.819 20.5733 4.183 19.5787 4.37767C18.7837 3.53 17.6497 3 16.3943 3C13.9843 3 12.0303 4.95333 12.0303 7.36433C12.0303 7.70633 12.0697 8.03767 12.143 8.35767C8.51466 8.17567 5.30033 6.43933 3.14699 3.79867C2.77199 4.444 2.55699 5.19333 2.55699 5.992C2.55699 7.50633 3.32766 8.84267 4.49833 9.62533C3.78299 9.602 3.10999 9.406 2.52166 9.07867C2.52099 9.09733 2.52099 9.11533 2.52099 9.133C2.52099 11.248 4.02533 13.0123 6.02233 13.413C5.65566 13.5123 5.27033 13.5653 4.87233 13.5653C4.59066 13.5653 4.31699 13.5393 4.05099 13.4887C4.60666 15.222 6.21766 16.4837 8.12766 16.5187C6.63366 17.6887 4.75099 18.387 2.70766 18.387C2.35599 18.387 2.00899 18.367 1.66699 18.3257C3.59833 19.5647 5.89233 20.2863 8.35599 20.2863C16.3837 20.2863 20.7727 13.6363 20.7727 7.86967C20.7727 7.68133 20.7683 7.492 20.76 7.30533C21.6127 6.68967 22.3527 5.922 22.9373 5.04733L22.9377 5.04667Z"
												fill="#1DA1F2"
											/>
										</g>
										<defs>
											<clipPath id="clip0_6184_16378">
												<rect width="24" height="24" fill="white" />
											</clipPath>
										</defs>
									</svg>
								</div>
							</div>
							<div className="mt-6px testimonial" dangerouslySetInnerHTML={{ __html: testimonial.html }}></div>
						</div>
					))}
				</div>
			</section>

			<section className="bg-[url(/static/bg-pattern-light.png)] bg-no-repeat bg-[#fcfcfc] bg-cover bg-center py-46px desktop:py-80px px-20px">
				<h1 className="desktop:text-center text-grey-100 font-bold mb-50px desktop:mb-76px">Questions and Answers</h1>
				<div className="max-w-[1000px] m-auto">
					<div className="grid grid-cols-1 desktop:grid-cols-2 desktop:gap-x-12">
						<div>
							{questions.slice(0, 5).map((question, index) => (
								<div className="mb-16px" key={index}>
									<button className="flex items-center text-16 font-semibold justify-between mb-16px w-full" onClick={() => setOpenQuestion(question.question)}>
										{question.question}
										<Image
											src={AngleDownIcon}
											alt="angle down icon"
											className={`transition-all duration-300 ${openQuestion === question.question ? 'rotate-180' : ''}`}
										/>
									</button>
									<p className={`text-14 text-grey-40 transition-all duration-300 ${openQuestion === question.question ? 'h-full' : 'max-h-0 overflow-hidden'}`}>
										{question.answer}
									</p>
								</div>
							))}
						</div>
						<div>
							{questions.slice(5, 9).map((question, index) => (
								<div className="mb-16px" key={index}>
									<button className="flex items-center text-16 font-semibold justify-between mb-16px w-full" onClick={() => setOpenQuestion(question.question)}>
										{question.question}
										<Image
											src={AngleDownIcon}
											alt="angle down icon"
											className={`transition-all duration-300 ${openQuestion === question.question ? 'rotate-180' : ''}`}
										/>
									</button>
									<p className={`text-14 text-grey-40 transition-all duration-300 ${openQuestion === question.question ? 'h-full' : 'max-h-0 overflow-hidden'}`}>
										{question.answer}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="px-20px pb-100px desktop:pb-130px">
				<div className="mt-100px desktop:mt-50px max-w-[1000px] w-full m-auto bg-[url(/static/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
					<h1 className="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px desktop:mb-16px">Need something else?</h1>
					<p className="text-center text-14 text-white-100 max-w-[806px] m-auto">
						Get in touch with us today to find out how best we can support your business and work needs.
					</p>
					<a
						target="_blank"
						href="https://calendly.com/d/d6k-jw2-wgj/convoy-user-demo"
						className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-14 font-medium flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
						Contact Sales
						<Image src={ArrowRightIcon} className="ml-12px" alt="arrow icon right" />
					</a>
				</div>
			</section>

			<dialog ref={enterpriseModal} onClick={event => closeDialog(event)} className="backdrop:backdrop-blur-md rounded-8px">
				<EnterpriseWaitlist submitEnterPriseForm={() => enterpriseModal.current?.close()}></EnterpriseWaitlist>
				<Toast></Toast>
			</dialog>
		</main>
	);
}
