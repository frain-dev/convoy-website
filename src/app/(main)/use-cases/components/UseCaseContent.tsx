'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { OptimizedImage } from '@/app/components/OptimizedImaged';
import RegionDropdown from '@/app/components/RegionDropdown';
import GetStarted from '@/app/components/GetStarted';
import type { UseCase } from '../data';

function smartLowerCase(str: string): string {
	const acronyms = ['AI', 'ML', 'IoT', 'SaaS', 'EHR'];
	return str.split(' ').map(word => (acronyms.includes(word) ? word : word.toLowerCase())).join(' ');
}

const fadeUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.44, 0, 0, 1] }
	},
	viewport: { amount: 'some' as const, once: true }
};

const stagger = (delay: number) => ({
	...fadeUp,
	whileInView: {
		...fadeUp.whileInView,
		transition: { ...fadeUp.whileInView.transition, delay }
	}
});

export default function UseCaseContent({ useCase }: { useCase: UseCase }) {
	return (
		<main className="bg-[#fafafa]">
			{/* Hero */}
			<section className="pt-[100px] pb-12 desktop:pt-[137px] desktop:pb-[57px]">
				<div className="max-w-[1280px] m-auto flex flex-col items-start desktop:items-center px-20px">
					<motion.div {...fadeUp} className="flex flex-col items-start desktop:items-center w-full">
						<p className="text-[#2780F1] text-14 font-semibold mb-2 desktop:mb-3">{useCase.industry}</p>
						<h1 className="text-32 desktop:text-[40px] font-medium desktop:text-center max-w-[800px]">{useCase.heroTitle}</h1>
						<p className="max-w-[683px] desktop:mx-auto desktop:text-center desktop:text-16 text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:mt-24px font-medium">
							{useCase.heroDescription}
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

			{/* Hero Image */}
			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-10 desktop:pb-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.2, ease: [0.44, 0, 0, 1] } }}
					viewport={{ amount: 'some', once: true }}
					className="w-full h-[200px] sm-old:h-[280px] desktop:h-[400px] rounded-16px bg-gradient-to-b from-[#2780F1]/10 to-[#fafafa] border border-[#E7E7E7] flex items-center justify-center overflow-hidden">
					<OptimizedImage
						src="/static/use-cases-placeholder.png"
						alt={`${useCase.title} webhook use case`}
						width={200}
						height={200}
						className="w-[100px] h-[100px] sm-old:w-[140px] sm-old:h-[140px] desktop:w-[200px] desktop:h-[200px] object-contain"
					/>
				</motion.div>
			</section>

			{/* Pain Points */}
			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div {...fadeUp} className="mb-10 desktop:mb-14">
					<h2 className="text-24 desktop:text-32 font-semibold mb-3">Why {smartLowerCase(useCase.title)} teams struggle with webhooks</h2>
					<p className="text-[#666] text-14 desktop:text-16 leading-[160%] max-w-[700px]">
						Webhooks seem simple until you need them to work at production scale. Here are the challenges {smartLowerCase(useCase.title)} companies face.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm-old:grid-cols-2 gap-5">
					{useCase.painPoints.map((point, i) => (
						<motion.div key={point.title} {...stagger(i * 0.1)} className="border border-[#e7e7e7] bg-white-100 rounded-12px p-5 desktop:p-6 shadow-btn">
							<h3 className="text-16 desktop:text-18 font-semibold mb-2 text-[#000]">{point.title}</h3>
							<p className="text-14 desktop:text-16 leading-[180%] text-[#4B4B4B]">{point.description}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* How Convoy helps */}
			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
				<motion.div {...fadeUp} className="mb-10 desktop:mb-14">
					<h2 className="text-24 desktop:text-32 font-semibold mb-3">How Convoy solves this</h2>
					<p className="text-[#666] text-14 desktop:text-16 leading-[160%] max-w-[700px]">
						Convoy gives {smartLowerCase(useCase.title)} teams production-grade webhook infrastructure, so you can focus on your core product.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 sm-old:grid-cols-2 desktop:grid-cols-3 gap-5">
					{useCase.features.map((feature, i) => (
						<motion.div key={feature.title} {...stagger(i * 0.08)} className="border border-[#e7e7e7] bg-white-100 rounded-12px p-5 desktop:p-6 shadow-btn">
							<div className="w-10 h-10 rounded-10px bg-[#2780F10A] border border-[#2780F11A] flex items-center justify-center mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path
										d="M16.6667 5.83337L7.50001 15L3.33334 10.8334"
										stroke="#2780F1"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h3 className="text-16 desktop:text-18 font-semibold mb-2 text-[#000]">{feature.title}</h3>
							<p className="text-14 leading-[180%] text-[#4B4B4B]">{feature.description}</p>
						</motion.div>
					))}
				</div>
			</section>


			{/* Testimonial */}
			{useCase.testimonial && (
				<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-24px desktop:pb-72px">
					<motion.div
						{...fadeUp}
						className="w-full bg-white-100 border border-[#e7e7e7] p-5 desktop:p-10 rounded-8px flex flex-col gap-5">
						<h3 className="text-24 desktop:text-28 font-medium">Don&apos;t just take our word for it</h3>
						<div className="flex flex-col gap-5 items-start">
							<OptimizedImage src={useCase.testimonial.logo} height={30} width={150} alt={`${useCase.testimonial.company} logo`} className="h-24px desktop:h-28px w-auto" />
							<p className="text-14 desktop:text-20 leading-[160%] desktop:leading-[140%] text-[#666]">{useCase.testimonial.quote}</p>
							<div className="flex items-center gap-2">
								<OptimizedImage
									src={useCase.testimonial.avatar}
									height={300}
									width={300}
									alt={useCase.testimonial.name}
									className="h-36px w-36px rounded-50% object-cover"
								/>
								<div className="flex flex-col gap-1">
									<h5 className="font-semibold text-14 desktop:text-16 leading-4">{useCase.testimonial.name}</h5>
									<p className="text-[#666] text-12 desktop:text-[13px] font-medium leading-4">
										{useCase.testimonial.role} at {useCase.testimonial.company}
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</section>
			)}

			{/* FAQ */}
			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-40px desktop:pb-72px">
				<motion.div {...fadeUp} className="mb-10">
					<h2 className="text-24 desktop:text-32 font-semibold mb-3">Frequently asked questions</h2>
				</motion.div>

				<div className="flex flex-col gap-4">
					{useCase.faq.map((item, i) => (
						<motion.details
							key={i}
							{...stagger(i * 0.08)}
							className="group border border-[#e7e7e7] bg-white-100 rounded-12px shadow-btn overflow-hidden">
							<summary className="flex items-center justify-between cursor-pointer p-5 desktop:p-6 text-16 desktop:text-18 font-semibold text-[#000] list-none [&::-webkit-details-marker]:hidden">
								<span className="pr-4">{item.question}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									className="min-w-[20px] transition-transform group-open:rotate-45">
									<path d="M10 4.16669V15.8334M4.16667 10H15.8333" stroke="#666" strokeWidth="2" strokeLinecap="round" />
								</svg>
							</summary>
							<div className="px-5 desktop:px-6 pb-5 desktop:pb-6">
								<p className="text-14 desktop:text-16 leading-[180%] text-[#4B4B4B]">{item.answer}</p>
							</div>
						</motion.details>
					))}
				</div>
			</section>

			{/* Cross-links to other use cases */}
			<section className="w-full max-w-[1280px] mx-auto px-4 mobile:px-6 desktop:px-8 pb-40px desktop:pb-72px">
				<motion.div {...fadeUp} className="mb-8">
					<h2 className="text-24 desktop:text-28 font-semibold">Explore other use cases</h2>
				</motion.div>
				<div className="flex flex-wrap gap-3">
					{['fintech', 'ai-ml', 'developer-tools', 'logistics', 'healthcare', 'saas', 'ecommerce', 'iot']
						.filter(slug => slug !== useCase.slug)
						.map(slug => {
							const labels: Record<string, string> = {
								fintech: 'Fintech',
								'ai-ml': 'AI & ML',
								'developer-tools': 'Developer Tools',
								logistics: 'Logistics',
								healthcare: 'Healthcare',
								saas: 'SaaS',
								ecommerce: 'E-commerce',
								iot: 'IoT'
							};
							return (
								<Link
									key={slug}
									href={`/use-cases/${slug}`}
									className="px-4 py-2 text-14 font-medium rounded-8px border border-[#e7e7e7] bg-white-100 text-[#000] hover:bg-[#f5f5f5] hover:border-[#2780F1] transition-all shadow-btn">
									{labels[slug]}
								</Link>
							);
						})}
				</div>
			</section>

			<GetStarted />
		</main>
	);
}
