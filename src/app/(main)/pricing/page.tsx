'use client';
import check from 'public/svg/check.svg';
import question from 'public/svg/question.svg';
import error from 'public/svg/error.svg';
import Image from 'next/image';
import { useState } from 'react';

const selfHostedFeatures = [
	{
		title: 'Core Gateway Features',
		feat: [
			{
				name: 'Web UI',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Open Telementry',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Basic Webhook Retention',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Incoming & Outcoming Webhooks',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Users',
				basic: '1',
				premium: 'Unlimited'
			},
			{
				name: 'Organisation',
				basic: '1',
				premium: 'Unlimited'
			}
		]
	},
	{
		title: 'Advanced Gateway Features',
		feat: [
			{
				name: 'Circuit Breaking',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Prometheus Metrics',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: '	Performance Tuning',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'SSO & SAML',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Advanced Webhook Retention',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'White-Labelling',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Role Based Access Control',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Advanced Storage',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Webhook Transformations with JS',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Advanced Transformation with JS',
				basic: 'Supported',
				premium: 'Unsupported'
			},
			{
				name: 'Advanced Webhook Subsription',
				basic: 'Supported',
				premium: 'Unsupported'
			}
		]
	},
	{
		title: 'Support',
		feat: [
			{
				name: 'Community Support',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Email & Phone',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Response SLA',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Solutions Engineering',
				basic: 'Unsupported',
				premium: 'Supported'
			}
		]
	}
];

const cloudFeatures = [
	{
		title: 'Limits',
		feat: [
			{
				name: 'Rate Limit',
				basic: '25 events/second',
				premium: 'Custom'
			},
			{
				name: 'Uptime SLA',
				basic: '99.99%',
				premium: '99.99%'
			},
			{
				name: 'Webhook Retention',
				basic: '7 days',
				premium: 'Custom'
			}
		]
	},
	{
		title: 'Core Capabilities',
		feat: [
			{
				name: 'Static IPs',
				basic: 'Add-on ($100/month)',
				premium: 'Supported'
			},
			{
				name: 'Incoming & Outgoing Webhooks',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Rate Limit',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Retries',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Portal Links',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Message Broker Support',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Endpoint Circuit Breaking',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Webhook Transformation with JS',
				basic: 'Supported',
				premium: 'Supported'
			}
		]
	},
	{
		title: 'Security & Compliance',
		feat: [
			{
				name: 'Google SSO',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'SAML',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Role Based Access Control',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'SOC 2',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'VPC Peering & Private Networking',
				basic: 'Unsupported',
				premium: 'Supported'
			}
		]
	},
	{
		title: 'Support',
		feat: [
			{
				name: 'Email',
				basic: 'Supported',
				premium: 'Supported'
			},
			{
				name: 'Response SLA',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Solutions Engineering',
				basic: 'Unsupported',
				premium: 'Supported'
			}
		]
	}
];

const faqs = [
	{
		question: 'Do you offer free trials?',
		answer: (
			<>
				We have a 14 days free trial in the Cloud, but we don’t offer free trials for self-hosted licenses. Please reach out to us at
				<a href="mailto:sales@getconvoy.io" className="text-[#2780F1] underline hover:no-underline px-1">
					sales@getconvoy.io
				</a>
				or book a call, we're happy to learn about your needs.
			</>
		)
	},
	{
		question: 'The 25 events/sec limit in the Cloud is too small, how can I purchase more?',
		answer: (
			<>
				Please reach out to us at
				<a href="mailto:sales@getconvoy.io" className="text-[#2780F1] underline hover:no-underline px-1">
					sales@getconvoy.io
				</a>
				or book a call, we're happy to learn about your needs.
			</>
		)
	},
	{
		question: 'What regions are supported in the Cloud?',
		answer: (
			<>
				We currently support only two regions: 'US', and 'EU'. Please reach out to us at
				<a href="mailto:sales@getconvoy.io" className="text-[#2780F1] underline hover:no-underline px-1">
					sales@getconvoy.io
				</a>
				or book a call, we're happy to learn about your needs.
			</>
		)
	}
];

const selfHostedPricing = [
	{
		name: 'Basic',
		price: 'Free',
		description:
			"In our latest release, we've simplified Convoy's architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy.",
		cta: {
			text: 'Link to Docs',
			link: 'https://docs.getconvoy.io/'
		}
	},
	{
		name: 'Premium',
		price: 'Custom',
		description:
			"In our latest release, we've simplified Convoy's architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy.",
		cta: {
			text: 'Book a call',
			link: ''
		}
	}
];

const cloudPricing = [
	{
		name: 'Pro',
		price: {
			amount: 99,
			interval: 'per month',
			label: 'Pricing starts at'
		},
		description:
			"In our latest release, we've simplified Convoy's architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy.",
		cta: {
			text: 'Link to the cloud',
			link: 'https://cloud.getconvoy.io/signup'
		}
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		description:
			"In our latest release, we've simplified Convoy's architecture. In this article I describe a little bit more about the architecture and the benefits for Convoy.",
		cta: {
			text: 'Book a call',
			link: ''
		}
	}
];

export default function Pricing() {
	const options = [
		{ id: 'cloud', label: 'Cloud' },
		{ id: 'self-hosted', label: 'Self Hosted' }
	];

	const [selected, setSelected] = useState(options[0]?.id);
	console.log(selected);

	const handleSelect = (id: string) => {
		setSelected(id);
	};

	return (
		<main className="flex flex-col items-center pb-120px">
			<section className="pt-150px px-20px flex items-center flex-col max-w-[1280px]">
				<h1 className="text-center font-medium text-[40px] desktop:text-[40px] mb-24px max-w-[1020px] m-auto">Pricing plans</h1>
				<p className="text-center text-[#666] text-14 desktop:text-16 max-w-[683px] m-auto mb-48px font-medium">
					Secure <span className="text-[#2780F1]">send, receive and manage millions of webhooks reliably</span> with robust support for Retries, Rate Limiting, Static
					IPs, Circuit Breaking, Rolling Secrets and more.
				</p>

				<div className="inline-flex mx-auo mb-30px p-1 bg-white-100 border border-[#e7e7e7] rounded-8px">
					{options.map(option => (
						<button
							key={option.id}
							onClick={() => handleSelect(option.id)}
							className={`px-4 py-2.5 text-sm font-semibold rounded-6px transition-colors' ${
								selected === option.id ? 'bg-[#2780F1] px-10 border-[#2078E8] text-white-100' : 'text-[#000]'
							}
							`}
							aria-selected={selected === option.id}
							role="tab">
							{option.label}
						</button>
					))}
				</div>

				<PricingCard data={selected === 'cloud' ? cloudPricing : selfHostedPricing} variant={selected} />

				<div className="bg-white-100 rounded-8px border border-[#e7e7e7] w-full mt-72px p-20">
					<PricingTable features={selected === 'cloud' ? cloudFeatures : selfHostedFeatures} selected={selected} />
				</div>
			</section>

			<section className="w-full flex-col px-20 px flex items-center max-w-[1280px]">
				<div className="mt-72px w-full flex flex-col gap-10">
					<div className="flex flex-col items-center gap-6">
						<h2 className="text-[40px] font-medium">Frequently Asked Questions</h2>
						<p className="text-center text-16 leading-[150%] text-[#666]">Quick answers to questions you might have</p>
					</div>

					<div className="max-w-[1100px] pt-5 pb-7 px-10 flex flex-col items-center justify-center bg-white-100 border border-[#e7e7e7] divide-y-[1px] divide-[#e7e7e7]/80 rounded-8px">
						{faqs.map((faq, index) => (
							<FAQItem key={index} question={faq.question} answer={faq.answer} />
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

const PricingCard = ({ data, variant }) => {
	const getBgGradient = index => {
		return index === 0
			? 'from-[#fff] from-[0%] via-[#EEF6FF] via-[54.97%] to-[#C7E0FF] to-[134.32%]'
			: 'from-[#fff] from-[0%] via-[#F1F1F1] via-[54.97%] to-[#D3D3D3] to-[134.32%]';
	};

	const getLabelBg = index => {
		return index === 0 ? 'bg-[#2780F11F]' : 'bg-[#DEDEDE]';
	};

	const renderPrice = price => {
		if (typeof price === 'object') {
			return (
				<div className="mt-5 mb-1 flex flex-col justify-center">
					<p className="text-14 text-[#000] font-medium leading-[150%]">{price.label}</p>
					<div className="flex items-end gap-2">
						<h4 className="text-[#000] text-[60px] font-semibold leading-[130%]">${price.amount}</h4>
						<p className="text-24 text-[#000] font-medium mb-2.5">{price.interval}</p>
					</div>
				</div>
			);
		}
		return (
			<div className="mt-5 flex flex-col justify-center py-[12.5px]">
				<h4 className="text-[60px] font-semibold leading-[130%]">{price}</h4>
			</div>
		);
	};

	return (
		<div className="flex gap-5">
			{data.map((item, index) => (
				<div
					key={item.name}
					className={`rounded-8px py-40px desktop:py-40px bg-gradient-to-b ${getBgGradient(
						index
					)} flex flex-col items-start justify-start mobile:px-40px nav-bar-break:px-40px w-[560px] h-[370px] relative overflow-hidden border border-[#e7e7e7]`}>
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.45rem_2.55rem] absolute left-0 -top-1 w-full h-full"></div>

					<div className="z-10">
						<span className={`${getLabelBg(index)} rounded-6px py-1 px-2.5 font-medium leading-[150%] text-16`}>{item.name}</span>

						<p className="text-[#666] text-16 font-medium leading-[150%] mt-3">{item.description}</p>

						{renderPrice(item.price)}
					</div>

					<a
						target="_blank"
						href={item.cta.link}
						className="mt-5 pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] text-white-100 flex items-center z-10">
						<span>{item.cta.text}</span>

						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px]">
							<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
						</svg>
					</a>
				</div>
			))}
		</div>
	);
};

const StatusIndicator = ({ status }: { status: string }) => {
	switch (status) {
		case 'Supported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={check} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Supported</span>
				</div>
			);
		case 'Questionable':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={question} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Questionable</span>
				</div>
			);
		case 'Unsupported':
			return (
				<div className="flex items-center justify-center gap-2 bg-[#E7E7E766] py-[2px] px-1.5 rounded-100px w-max">
					<Image src={error} height={30} width={28} alt="logo" quality="70" className="h-16px w-16px" />
					<span className="text-14 text-[#000]">Unsupported</span>
				</div>
			);
		default:
			return <p className="text-[#000] text-14">{status}</p>;
	}
};

function PricingTable({ features, selected }) {
	return (
		<div className="flex w-full justify-between items-start px-[90px]">
			<div className="flex flex-col mt-[42px] gap-[41px]">
				{features.map(featureType => (
					<div key={featureType.title} className="flex flex-col justify-center">
						<h4 className="text-14 font-semibold h-[41px] bor der px-3 pt-2">{featureType.title}</h4>

						<div className="flex flex-col">
							{featureType.feat.map(feature => (
								<p className="text-14 h-[48px] bor der px-3 pt-3 text-[#666]">{feature.name}</p>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="border border-[#E7E7E780] rounded-12px overflow-hidden mobile-min:w-[800px] w-max">
				<table className="w-max border-collapse">
					<thead className="text-[#000] font-medium text-14">
						<tr className="">
							<th className="text-14 font-medium p-4 py-[10px] border-b border-[#E7E7E780] text-left">{selected === 'cloud' ? 'Pro' : 'Basic'}</th>
							<th className="text-14 font-medium pl-4 py-[9px] border-b border-l border-[#E7E7E780] text-left">{selected === 'cloud' ? 'Enterprise' : 'Premium'}</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[#E7E7E780] text-[#000]">
						{features.map((featureType, typeIndex) => (
							<>
								{/* Empty row before only first feature type */}
								{typeIndex === 0 && (
									<tr>
										<td className="text-14 pl-3 w-200px h-[41px] text-[#4b4b4b]"></td>
										<td className="text-14 pl-3 w-200px h-[41px] border-l border-[#E7E7E780]"></td>
									</tr>
								)}

								{/* Empty rows before each feature type */}
								{typeIndex > 0 && (
									<>
										<tr>
											<td className="h-[41px]"></td>
											<td className="h-[41px] border-l border-[#E7E7E780]"></td>
										</tr>
										<tr>
											<td className="h-[41px]"></td>
											<td className="h-[41px] border-l border-[#E7E7E780]"></td>
										</tr>
									</>
								)}

								{/* Feature rows */}
								{featureType.feat.map((feature, index) => (
									<tr key={feature.name} className="">
										<td className="text-14 pl-3 w-200px h-48px text-[#4b4b4b]">
											<StatusIndicator status={feature.basic} />
										</td>
										<td className="text-14 pl-3 w-200px h-48px border-l border-[#E7E7E780]">
											<StatusIndicator status={feature.premium} />
										</td>
									</tr>
								))}
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

const PlusIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10 4V16M4 10H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const MinusIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 10H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="py-4 w-full flex gap-16px">
			<div className="pt-1.5">{isOpen ? <MinusIcon /> : <PlusIcon />}</div>
			<div className="">
				<button className="flex justify-between items-center w-full text-left group" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
					<span className="text-[#000] text-18 font-medium">{question}</span>
				</button>
				{isOpen && <div className="mt-2 text-14 text-[#666]">{answer}</div>}
			</div>
		</div>
	);
};
