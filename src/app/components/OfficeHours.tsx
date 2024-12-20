import { motion } from 'framer-motion';

export default function OfficeHours({ type }: { type: 'playground' | 'guides' }) {
	return (
		<motion.section
			initial={{ opacity: 0, x: 0 }}
			whileInView={{
				opacity: 1,
				x: 0,
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
			className="w-full flex items-center justify-center">
			<div className="desktop:max-w-[1180px] w-full h-auto desktop:h-[217px] bg-white-100 border border-[#ebebeb] flex mx-auto rounded-16px overflow-hidden">
				<div className="w-[90px] desktop:w-[210px] min-h-full bg-gradient-to-r from-white-100/40 from-[-20%] to-[#2780F1]/40 to-[150%] rounded-l-16px relative p-6 desktop:p-5">
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] absolute top-0 right-0 w-full h-full"></div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="z-10 w-10 h-10 desktop:w-16 desktop:h-16">
						{type === 'playground' ? (
							<path
								d="M8 10.25V54.25H10H56V16.25H32V10.25H8ZM12 14.25H16V50.25H12V14.25ZM20 14.25H28V20.25H52V50.25H20V14.25ZM26 24.25V28.25H38V24.25H26ZM32 30.25V34.25H44V30.25H32ZM36 36.25V40.25H48V36.25H36ZM26 42.25V46.25H38V42.25H26Z"
								fill="black"
							/>
						) : (
							<path
								d="M29.9961 8.25V12.25H11.9961V28.25H29.9961V32.25H15.0742L8.21875 40.25L9.33594 41.5508L15.0742 48.25H29.9961V56.25H33.9961V48.25H51.9961V32.25H33.9961V28.25H48.918L49.5156 27.5508L55.7734 20.25L48.918 12.25H33.9961V8.25H29.9961ZM15.9961 16.25H47.0742L50.5039 20.25L47.0742 24.25H15.9961V16.25ZM16.918 36.25H47.9961V44.25H16.918L13.4883 40.25L16.918 36.25Z"
								fill="black"
							/>
						)}
					</svg>
				</div>

				<div className="gap-8 desktop:gap-2 flex flex-col justify-between items-start desktop:items-end px-5 desktop:px-10 py-4 desktop:pt-6 desktop:pb-9">
					<div className="flex flex-col gap-3 desktop:gap-5">
						<h3 className="text-16 desktop:text-32 font-semibold"> {type === 'playground' ? 'Try out our playground' : 'Read our API & Webhook Guides'}</h3>
						<p className="text-12 desktop:text-18 text-[#666] font-normal leading-[160%] w-full desktop:w-[899px] full">
							{type === 'playground'
								? 'The Convoy Playground makes testing webhook integrations effortless. Generate webhook URLs, inspect payloads, and analyze headers—all in one place.'
								: 'Explore our in-depth guides on webhooks and API-First engineering. As your trusted partner, we cover best practices across a wide range of topics to help you deliver world class APIs and Webhooks.'}
						</p>
					</div>

					<a
						target="_blank"
						href={type === 'playground' ? 'https://playground.getconvoy.io' : 'https://docs.getconvoy.io/webhook-guides'}
						className="desktop:px-16px py-10px w-auto [107px] text-14 font-medium rounded-8px h-10 nav-bar-break:h-11 bg-white-100 desktop:bg-[#2780F1] text-[#2780F1] hover:desktop:bg-[#1f66c1] group transition-all duration-300 desktop:text-white-100 flex items-center desktop:shadow-btn-secondary cursor-pointer">
						<span>{type === 'playground' ? 'Try for free' : 'Read Guides'}</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="19"
							viewBox="0 0 18 19"
							className="ml-1 mt-[1px] fill-[#2780F1] desktop:fill-white-100 group-hover:translate-x-[2px] transition-all">
							<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" />
						</svg>
					</a>
				</div>
			</div>
		</motion.section>
	);
}
