'use client';
import check from 'public/svg/check.svg';
import question from 'public/svg/question.svg';
import error from 'public/svg/error.svg';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Prometheus Metrics',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: '	Performance Tuning',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'SSO & SAML',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Advanced Webhook Retention',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'White-Labelling',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Role Based Access Control',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Advanced Storage',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Webhook Transformations with JS',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Advanced Transformation with JS',
				basic: 'Unsupported',
				premium: 'Supported'
			},
			{
				name: 'Advanced Webhook Subsription',
				basic: 'Unsupported',
				premium: 'Supported'
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
				premium: '99.999%'
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
		answer: <>We have a 14 days free trial in the Cloud, but we don’t offer free trials for self-hosted deployments.</>
	},
	{
		question: 'The 25 events/sec limit in the Cloud is too small, how can I purchase more?',
		answer: (
			<>
				Please reach out to us in
				<a href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ" className="text-[#2780F1] underline hover:no-underline px-1">
					Slack
				</a>
				or at
				<a href="mailto:sales@getconvoy.io" className="text-[#2780F1] underline hover:no-underline px-1">
					sales@getconvoy.io
				</a>
				, we're happy to learn about your needs and increase your limit.
			</>
		)
	},
	{
		question: 'What regions are supported in the Cloud?',
		answer: <>We currently have clusters deployed in the United States and Europe to cater for regional compliance.</>
	},
	{
		question: 'Can I use Convoy to receive webhooks?',
		answer: <>Yes, Convoy is a bi-directional webhook gateway that can be used to send and receive webhooks.</>
	}
];

const selfHostedPricing = [
	{
		name: 'Community',
		price: 'Free',
		description:
			'Perfect for developers exploring self-hosted solutions, the Community plan provides everything you need to reliably manage webhooks in your own environment. Start simple with no cost and scale as your needs grow.',
		cta: {
			text: 'Link to Docs',
			link: 'https://docs.getconvoy.io/'
		}
	},
	{
		name: 'Premium',
		price: 'Custom',
		description:
			'Built for organizations with advanced requirements, the Premium plan offers unlimited flexibility and full control. Customize your webhook gateway with premium features and priority support to meet enterprise demands',
		cta: {
			text: 'Book a call',
			link: 'https://cal.com/subomi/30min'
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
			'Designed for small teams and startups, the Pro plan offers essential webhook delivery features. Get started quickly with a simple, predictable pricing model.',
		cta: {
			text: 'Link to the cloud',
			link: 'https://cloud.getconvoy.io/signup'
		}
	},
	{
		name: 'Enterprise',
		price: 'Custom',
		description: 'Tailored for scale-ups and large organizations, the Enterprise plan provides custom solutions for complex webhook needs',
		cta: {
			text: 'Book a call',
			link: 'https://cal.com/subomi/30min'
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

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<main className="flex flex-col items-center pb-120px">
			<section className="pt-100px desktop:pt-150px px-20px flex items-center flex-col max-w-[1280px]">
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
					className="w-full flex flex-col items-start sm-old:items-center justify-center desktop:gap-6">
					<h1 className="desktop:text-center font-medium text-32 desktop:text-[40px] mb-24px max-w-[1020px] desktop:m-auto">Pricing plans</h1>
					<p className="desktop:text-center text-[#666] text-14 desktop:text-16 max-w-[683px] m-auto mb-48px font-medium">
						Pricing for each stage of growth both in the Cloud and on-prem
					</p>
				</motion.div>

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
					className="inline-flex mx-auto mb-[30px] p-1 bg-white-100 border border-[#e7e7e7] rounded-[8px]">
					{options.map(option => (
						<motion.button
							key={option.id}
							onClick={() => handleSelect(option.id)}
							className={`relative px-4 py-2 desktop:py-2.5 text-[15px] font-semibold rounded-[6px] transition-all ${
								selected === option.id ? 'text-white-100' : 'text-[#000]'
							}`}
							aria-selected={selected === option.id}
							role="tab">
							{selected === option.id && (
								<motion.div
									layoutId="background"
									className="absolute inset-0 bg-[#2780F1] rounded-[6px]"
									initial={false}
									transition={{
										type: 'spring',
										stiffness: 400,
										damping: 30
									}}
								/>
							)}
							<span className="relative z-10">{option.label}</span>
						</motion.button>
					))}
				</motion.div>

				<PricingCard data={selected === 'cloud' ? cloudPricing : selfHostedPricing} variant={selected} />

				<motion.div
					initial={{ opacity: 0, y: 5 }}
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
					className="hid den bg-white-100 rounded-8px border border-[#e7e7e7] w-full mt-42px md-old:mt-72px py-30px px-10px sm-old:px-20px desktop:p-20">
					<PricingTable features={selected === 'cloud' ? cloudFeatures : selfHostedFeatures} selected={selected} />
				</motion.div>
			</section>

			<section className="w-full flex-col px-20px flex items-center max-w-[1280px] !hid den">
				<div className="mt-72px w-full flex flex-col gap-6 desktop:gap-10 items-center">
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
						className="flex flex-col items-start desktop:items-center gap-2 desktop:gap-6">
						<h2 className="text-24 desktop:text-[40px] font-medium">Frequently Asked Questions</h2>
						<p className="text-left desktop:text-center text-14 desktop:text-16 leading-[150%] text-[#666]">Quick answers to questions you might have</p>
					</motion.div>

					<motion.div
						className="max-w-[1100px] w-full px-5 pt-2 desktop:pt-5 pb-2 desktop:pb-7 desktop:px-10 flex flex-col items-center justify-center bg-white-100 border border-[#e7e7e7] divide-y-[1px] divide-[#e7e7e7]/80 rounded-8px"
						initial={{ opacity: 0, y: 5 }}
						whileInView={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.8,
								delay: 0.2,
								ease: [0.44, 0, 0, 1]
							}
						}}
						viewport={{
							amount: 'some',
							once: true
						}}>
						{faqs.map((faq, index) => (
							<FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onToggle={() => handleToggle(index)} />
						))}
					</motion.div>
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
				<div className="mb-1 flex flex-col justify-center">
					<p className="text-14 text-[#000] font-medium leading-[150%]">{price.label}</p>
					<div className="flex items-end gap-2">
						<h4 className="text-[#000] text-[44px] desktop:text-[60px] font-semibold leading-[130%]">${price.amount}</h4>
						<p className="text-18 desktop:text-24 text-[#000] font-medium mb-2.5">{price.interval}</p>
					</div>
				</div>
			);
		}
		return (
			<div className="flex flex-col justify-center py-0 desktop:py-[12.5px]">
				<h4 className="text-[44px] desktop:text-[60px] font-semibold leading-[130%]">{price}</h4>
			</div>
		);
	};

	return (
		<div className="flex flex-col desktop:flex-row gap-5">
			{data.map((item, index) => (
				<motion.div
					initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.8,
							delay: index * 0.2 + 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}}
					key={item.name}
					className={`rounded-8px p-20px desktop:p-40px bg-gradient-to-b ${getBgGradient(
						index
					)} flex flex-col items-start justify-between w-full desktop:w-[560px] h-full desktop:h-[370px] relative overflow-hidden border border-[#e7e7e7]`}>
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.45rem_2.55rem] absolute left-0 -top-1 w-full h-full"></div>

					<div className="z-10">
						<span className={`${getLabelBg(index)} rounded-6px py-1 px-2.5 font-medium leading-[150%] text-14 desktop:text-16`}>{item.name}</span>

						<p className="text-[#666] text-14 desktop:text-16 font-medium leading-[150%] mt-4 desktop:mt-3 mb-5 desktop:mb-0">{item.description}</p>
					</div>

					<div className="z-10">
						{renderPrice(item.price)}

						<a
							target="_blank"
							href={item.cta.link}
							className="mt-3 pl-20px desktop:pl-14px pr-14px desktop:pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center z-10 w-max">
							<span>{item.cta.text}</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="19"
								viewBox="0 0 18 19"
								className="ml-1 mt-[1px] group-hover:translate-x-[2px] transition-all">
								<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
							</svg>
						</a>
					</div>
				</motion.div>
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
		<div className="flex w-full justify-between items-start desktop:items-center px-0 desktop:px-[90px]">
			<div className="flex flex-col mt-[42px] gap-[58px] desktop:gap-[41px]">
				{features.map(featureType => (
					<div key={featureType.title} className="flex flex-col justify-center">
						<h4 className="text-14 font-semibold w-[100px] h-[58px] desktop:w-full desktop:h-[41px] px-3 pt-1.5 desktop:px-3 desktop:pt-2">{featureType.title}</h4>

						<div className="flex flex-col">
							{featureType.feat.map(feature => (
								<p className="text-14 h-[90px] sm-old:h-[90px] desktop:!h-[48px] w-[100px] sm-old:w-[140px] desktop:!w-full px-3 py-2.5 desktop:pb-0 text-[#666]">
									{feature.name}
								</p>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="relative w-[130px] sm-old:w-auto desktop:w-auto">
				<div className="overflow-x-auto">
					<div className="border border-[#E7E7E780] rounded-12px overflow-hidden min-w-[300px]">
						<table className="w-full border-collapse">
							<thead className="text-[#000] font-medium text-14">
								<tr className="">
									<th className="text-14 font-medium p-4 py-[10px] border-b border-[#E7E7E780] text-left">{selected === 'cloud' ? 'Pro' : 'Basic'}</th>
									<th className="text-14 font-medium pl-4 py-[9px] border-b border-l border-[#E7E7E780] text-left">
										{selected === 'cloud' ? 'Enterprise' : 'Premium'}
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-[#E7E7E780] text-[#000]">
								{features.map((featureType, typeIndex) => (
									<>
										{/* Empty row before only first feature type */}
										{typeIndex === 0 && (
											<tr>
												<td className="text-14 pl-3 w-[150px] desktop:w-200px h-[58px] desktop:h-[41px] text-[#4b4b4b]"></td>
												<td className="text-14 pl-3 w-[150px] desktop:w-200px h-[58px] desktop:h-[41px] border-l border-[#E7E7E780]"></td>
											</tr>
										)}

										{/* Empty rows before each feature type */}
										{typeIndex > 0 && (
											<>
												<tr>
													<td className="h-[58px] desktop:h-[41px]"></td>
													<td className="h-[58px] desktop:h-[41px] border-l border-[#E7E7E780]"></td>
												</tr>
												<tr>
													<td className="h-[58px] desktop:h-[41px]"></td>
													<td className="h-[58px] desktop:h-[41px] border-l border-[#E7E7E780]"></td>
												</tr>
											</>
										)}

										{/* Feature rows */}
										{featureType.feat.map((feature, index) => (
											<tr key={feature.name} className="">
												<td className="text-14 pl-3 w-[150px] desktop:w-200px h-[90px] desktop:h-48px text-[#4b4b4b]">
													<StatusIndicator status={feature.basic} />
												</td>
												<td className="text-14 pl-3 w-[150px] desktop:w-200px h-[90px] desktop:h-48px border-l border-[#E7E7E780]">
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

interface FAQItemProps {
	question: string;
	answer: React.ReactNode;
	isOpen: boolean;
	onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
	return (
		<motion.div layout className="py-4 w-full flex gap-4">
			<div onClick={onToggle} className="mt-1.5 cursor-pointer">
				<motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="">
					{isOpen ? <MinusIcon /> : <PlusIcon />}
				</motion.div>
			</div>
			<div className="flex-1">
				<button className="flex justify-between items-center w-full text-left group" onClick={onToggle} aria-expanded={isOpen}>
					<span className="text-[#000] text-14 desktop:text-18 font-medium">{question}</span>
				</button>
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="overflow-hidden">
							<div className="mt-2 text-14 text-[#666]">{answer}</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};
