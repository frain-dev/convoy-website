'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/app/components/OptimizedImaged';

export default function AboutUs() {
	const backedLeaders = [
		{ name: 'Aadil Mamujee', role: 'Musha Ventures', image: 'aadil-mamujee' },
		{ name: 'David Cramer', role: 'Founder & CTO, Sentry', image: 'david-cramer' },
		{ name: 'Timi Ajiboye', role: 'Founder & CEO, Helicarrier', image: 'timi-ajiboye' },
		{ name: 'Tomiwa Lasebikan', role: 'Founder & CPO, Helicarrier', image: 'tomiwa-lasebikan' },
		{ name: 'Arup Chakrabarti', role: 'Ex-Director of Engineering, PagerDuty', image: 'arup-chakrabarti' },
		{ name: 'Prosper Otemuyiwa', role: 'Senior Developer Advocate, Novu', image: 'prosper-otemuyiwa' },
		{ name: 'Ezra Olubi', role: 'Cofounder and CTO, Paystack', image: 'ezra-olubi' },
		{ name: 'Fernando Mayo', role: 'Director of Engineering, Datadog', image: 'fernando-mayo' },
		{ name: 'Kareem Kouddous', role: 'Ex-Engineering Leader, Airbnb', image: 'kareem-kouddous' },
		{ name: 'Claudio Cherubino', role: 'Senior Director of Engineering, Calendly', image: 'claudio-cherubino' }
	];

	const teamMembers = [
		{
			name: 'Raymond Tukpe',
			role: 'CTO',
			image: 'raymond',
			github: 'https://github.com/jirevwe',
			linkedIn: 'https://www.linkedin.com/in/rtukpe/',
			twitter: 'https://twitter.com/rtukpe'
		},
		{
			name: 'Subomi Oluwalana',
			role: 'Founder & CEO',
			image: 'subomi',
			github: 'https://github.com/subomi',
			linkedIn: 'https://www.linkedin.com/in/subomi-oluwalana-one/',
			twitter: 'https://twitter.com/subomiOluwalana'
		}
		,{
			name: 'Oluwatosin Fatungase',
			role: 'Business',
			image: 'tosin',
			github: '',
			linkedIn: 'https://www.linkedin.com/in/oluwatosinfatungase/',
			twitter: ''
		},
		{
			name: 'Smart Mekiliuwa',
			role: 'Engineering',
			image: 'smart',
			github: 'https://github.com/mekilis',
			linkedIn: 'https://www.linkedin.com/in/mekilis/',
			twitter: 'https://x.com/mekiliuwa'
		},
		{
			name: 'Olalekan Odukoya',
			role: 'Engineering',
			image: 'olalekan',
			github: 'https://github.com/olamilekan000',
			linkedIn: 'https://www.linkedin.com/in/olalekan-odukoya-a5aab811b/',
			twitter: ''
		}
	];

	return (
		<main>
			<motion.section
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
				className="max-w-[1062] flex flex-col justify-center desktop:items-center pt-100px desktop:pt-150px pb-70px desktop:pb-80px px-20px">
				<a
					target="_blank"
					href="https://www.ycombinator.com/companies/convoy-2"
					className="bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer rounded-[6px] w-fit py-10px px-12px flex items-center text-14 font-medium mb-40px">
					We are backed by
					<OptimizedImage src="/svg/y-combinator.svg" width={24} height={24} className="ml-10px w-24px" alt="y-combinator" />
				</a>
				<h1 className="text-32 desktop:text-[40px] font-medium desktop:max-w-[683px] desktop:text-center">Building the webhooks infrastructure for the internet.</h1>
				<p className="max-w-[683px] desktop:mx-auto desktop:text-16 desktop:text-center text-14 !leading-[200%] text-[#4b4b4b] mt-2 desktop:my-24px font-medium">
					We’re a team of fine engineers building the finest webhooks infrastructure that engineers and teams of all sizes can rely on at scale.
				</p>
				<ul className="flex gap-16px mt-40px">
					<a href="https://github.com/frain-dev/convoy" target="_blank">
						<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_9679_33366)">
									<path
										d="M6.99913 0.145752C3.13425 0.145752 0 3.29225 0 7.17375C0 10.2783 2.0055 12.912 4.788 13.8421C5.138 13.9069 5.26575 13.6899 5.26575 13.5035C5.26575 13.3364 5.25962 12.8945 5.25612 12.3083C3.30925 12.7326 2.898 11.3659 2.898 11.3659C2.58037 10.5539 2.121 10.3378 2.121 10.3378C1.48487 9.902 2.16825 9.91075 2.16825 9.91075C2.87087 9.96063 3.24013 10.6353 3.24013 10.6353C3.86488 11.7089 4.879 11.3991 5.278 11.2189C5.341 10.7648 5.52212 10.455 5.7225 10.2791C4.1685 10.1015 2.534 9.49863 2.534 6.80625C2.534 6.03888 2.807 5.4115 3.255 4.91975C3.18237 4.74213 2.94263 4.02725 3.32325 3.06038C3.32325 3.06038 3.91125 2.87138 5.24825 3.7805C5.8065 3.62475 6.405 3.54688 7.00088 3.54425C7.595 3.54775 8.19438 3.62475 8.7535 3.78138C10.0896 2.87225 10.6768 3.06125 10.6768 3.06125C11.0582 4.029 10.8185 4.743 10.7467 4.92063C11.1956 5.41238 11.466 6.03975 11.466 6.80713C11.466 9.5065 9.82975 10.1006 8.2705 10.2748C8.52162 10.4918 8.74562 10.9205 8.74562 11.5759C8.74562 12.5156 8.73687 13.2734 8.73687 13.5035C8.73687 13.6916 8.86287 13.9104 9.21812 13.8413C11.9963 12.9103 14 10.2774 14 7.17375C14 3.29225 10.8658 0.145752 6.99913 0.145752Z"
										fill="#477DB3"
									/>
								</g>
								<defs>
									<clipPath id="clip0_9679_33366">
										<rect width="14" height="14" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</li>
					</a>

					<a href="https://www.linkedin.com/company/convoy-webhooks/" target="_blank">
						<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.7617 1.66682H2.61951C2.51674 1.66541 2.4147 1.68402 2.31921 1.72159C2.22372 1.75915 2.13665 1.81494 2.06298 1.88576C1.98931 1.95658 1.93048 2.04105 1.88985 2.13435C1.84922 2.22764 1.82758 2.32793 1.82617 2.42949V11.5708C1.82758 11.6724 1.84922 11.7727 1.88985 11.866C1.93048 11.9593 1.98931 12.0437 2.06298 12.1145C2.13665 12.1854 2.22372 12.2412 2.31921 12.2787C2.4147 12.3163 2.51674 12.3349 2.61951 12.3335H11.7617C11.8645 12.3349 11.9665 12.3163 12.062 12.2787C12.1575 12.2412 12.2446 12.1854 12.3183 12.1145C12.3919 12.0437 12.4508 11.9593 12.4914 11.866C12.532 11.7727 12.5537 11.6724 12.5551 11.5708V2.42949C12.5537 2.32793 12.532 2.22764 12.4914 2.13435C12.4508 2.04105 12.3919 1.95658 12.3183 1.88576C12.2446 1.81494 12.1575 1.75915 12.062 1.72159C11.9665 1.68402 11.8645 1.66541 11.7617 1.66682ZM5.08046 10.5948H3.46141V5.79482H5.08046V10.5948ZM4.27093 5.12282C4.04765 5.12282 3.83351 5.03517 3.67562 4.87913C3.51773 4.7231 3.42903 4.51148 3.42903 4.29082C3.42903 4.07016 3.51773 3.85854 3.67562 3.70251C3.83351 3.54648 4.04765 3.45882 4.27093 3.45882C4.3895 3.44553 4.50957 3.45714 4.62328 3.49289C4.73699 3.52864 4.84178 3.58772 4.93078 3.66627C5.01978 3.74481 5.091 3.84105 5.13975 3.94868C5.18851 4.05631 5.21372 4.1729 5.21372 4.29082C5.21372 4.40874 5.18851 4.52534 5.13975 4.63296C5.091 4.74059 5.01978 4.83683 4.93078 4.91538C4.84178 4.99392 4.73699 5.053 4.62328 5.08875C4.50957 5.1245 4.3895 5.13611 4.27093 5.12282ZM10.9198 10.5948H9.30078V8.01882C9.30078 7.37349 9.06871 6.95216 8.48046 6.95216C8.2984 6.95347 8.12113 7.0099 7.97253 7.11385C7.82393 7.21779 7.71113 7.36425 7.64935 7.53349C7.60711 7.65884 7.58881 7.79086 7.59538 7.92282V10.5895H5.97633C5.97633 10.5895 5.97633 6.22682 5.97633 5.78949H7.59538V6.46682C7.74246 6.21461 7.95638 6.00683 8.21409 5.86586C8.47181 5.72489 8.76356 5.65608 9.05792 5.66682C10.1373 5.66682 10.9198 6.35482 10.9198 7.83216V10.5948Z"
									fill="#477DB3"
								/>
							</svg>
						</li>
					</a>

					<a href="https://twitter.com/getconvoy" target="_blank">
						<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
							<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.0874 2.66651C11.5636 2.29155 11.9921 1.84155 12.3255 1.31651C11.8969 1.51651 11.3968 1.66651 10.8969 1.71651C11.4207 1.39155 11.8016 0.891553 11.9921 0.266513C11.5159 0.566513 10.9683 0.791553 10.4207 0.916513C9.9445 0.391553 9.30161 0.0915527 8.58732 0.0915527C7.20637 0.0915527 6.08736 1.26651 6.08736 2.71651C6.08736 2.91651 6.11113 3.11651 6.15875 3.31651C4.08736 3.19155 2.23022 2.14155 0.992124 0.566513C0.7778 0.941553 0.658791 1.39155 0.658791 1.89155C0.658791 2.79155 1.08736 3.59155 1.7778 4.06651C1.37308 4.04155 0.968276 3.94155 0.634943 3.74155V3.76651C0.634943 5.04155 1.49209 6.09155 2.63494 6.34155C2.44447 6.39155 2.20637 6.44155 1.99212 6.44155C1.82542 6.44155 1.68256 6.41651 1.51593 6.39155C1.82542 7.44155 2.75403 8.19155 3.84927 8.21651C2.99212 8.91651 1.92066 9.34155 0.754029 9.34155C0.539705 9.34155 0.349229 9.31651 0.158752 9.29155C1.25399 10.0416 2.56355 10.4665 3.99212 10.4665C8.58732 10.4665 11.0874 6.49155 11.0874 3.01651C11.0874 2.89155 11.0874 2.79155 11.0874 2.66651Z"
									fill="#477DB3"
								/>
							</svg>
						</li>
					</a>
				</ul>
			</motion.section>

			<section className="w-full px-20px m-auto py-24 bg-[#Fff] flex desktop:items-center justify-center">
				<div className="max-w-[1233px] w-full">
					<motion.h3
						initial={{ opacity: 0, y: 40 }}
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
						}}
						className="text-24 desktop:text-[32px] font-medium leading-[150%] text-[#000] desktop:text-center mb-10 md:mb-16 lg-old:mb-20">
						By the best team
					</motion.h3>

					<div className="grid gap-32px m-auto w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
						{teamMembers.map((member, i) => (
							<motion.div
								initial={{ opacity: 0, y: 5 }}
								whileInView={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 1.2,
										delay: i * 0.2 + 0.2,
										ease: [0.44, 0, 0, 1]
									}
								}}
								viewport={{
									amount: 'some',
									once: true
								}}
								key={i}
								className="">
								<div className="flex flex-col justify-center lg-old:items-center lg-old:text-center m-auto">
									<div className="w-full lg-old:w-[220px] h-auto aspect-square lg-old:aspect-auto lg-old:h-[220px] overflow-hidden rounded-8px">
										<OptimizedImage src={`/employees/${member.image}.jpg`} alt={member.image} className="object-cover" width={320} height={320} />
									</div>

									<p className="mt-16px mb-2px text-16 desktop:text-18 font-semibold">{member.name}</p>
									<p className="text-[#666] text-14 desktop:text-16 font-medium">{member.role}</p>

									<ul className="flex gap-16px mt-16px">
										<a href={member.github} target="_blank">
											<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
												<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
													<g clipPath="url(#clip0_9679_33366)">
														<path
															d="M6.99913 0.145752C3.13425 0.145752 0 3.29225 0 7.17375C0 10.2783 2.0055 12.912 4.788 13.8421C5.138 13.9069 5.26575 13.6899 5.26575 13.5035C5.26575 13.3364 5.25962 12.8945 5.25612 12.3083C3.30925 12.7326 2.898 11.3659 2.898 11.3659C2.58037 10.5539 2.121 10.3378 2.121 10.3378C1.48487 9.902 2.16825 9.91075 2.16825 9.91075C2.87087 9.96063 3.24013 10.6353 3.24013 10.6353C3.86488 11.7089 4.879 11.3991 5.278 11.2189C5.341 10.7648 5.52212 10.455 5.7225 10.2791C4.1685 10.1015 2.534 9.49863 2.534 6.80625C2.534 6.03888 2.807 5.4115 3.255 4.91975C3.18237 4.74213 2.94263 4.02725 3.32325 3.06038C3.32325 3.06038 3.91125 2.87138 5.24825 3.7805C5.8065 3.62475 6.405 3.54688 7.00088 3.54425C7.595 3.54775 8.19438 3.62475 8.7535 3.78138C10.0896 2.87225 10.6768 3.06125 10.6768 3.06125C11.0582 4.029 10.8185 4.743 10.7467 4.92063C11.1956 5.41238 11.466 6.03975 11.466 6.80713C11.466 9.5065 9.82975 10.1006 8.2705 10.2748C8.52162 10.4918 8.74562 10.9205 8.74562 11.5759C8.74562 12.5156 8.73687 13.2734 8.73687 13.5035C8.73687 13.6916 8.86287 13.9104 9.21812 13.8413C11.9963 12.9103 14 10.2774 14 7.17375C14 3.29225 10.8658 0.145752 6.99913 0.145752Z"
															fill="#477DB3"
														/>
													</g>
													<defs>
														<clipPath id="clip0_9679_33366">
															<rect width="14" height="14" fill="white" />
														</clipPath>
													</defs>
												</svg>
											</li>
										</a>

										<a href={member.linkedIn} target="_blank">
											<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
												<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M11.7617 1.66682H2.61951C2.51674 1.66541 2.4147 1.68402 2.31921 1.72159C2.22372 1.75915 2.13665 1.81494 2.06298 1.88576C1.98931 1.95658 1.93048 2.04105 1.88985 2.13435C1.84922 2.22764 1.82758 2.32793 1.82617 2.42949V11.5708C1.82758 11.6724 1.84922 11.7727 1.88985 11.866C1.93048 11.9593 1.98931 12.0437 2.06298 12.1145C2.13665 12.1854 2.22372 12.2412 2.31921 12.2787C2.4147 12.3163 2.51674 12.3349 2.61951 12.3335H11.7617C11.8645 12.3349 11.9665 12.3163 12.062 12.2787C12.1575 12.2412 12.2446 12.1854 12.3183 12.1145C12.3919 12.0437 12.4508 11.9593 12.4914 11.866C12.532 11.7727 12.5537 11.6724 12.5551 11.5708V2.42949C12.5537 2.32793 12.532 2.22764 12.4914 2.13435C12.4508 2.04105 12.3919 1.95658 12.3183 1.88576C12.2446 1.81494 12.1575 1.75915 12.062 1.72159C11.9665 1.68402 11.8645 1.66541 11.7617 1.66682ZM5.08046 10.5948H3.46141V5.79482H5.08046V10.5948ZM4.27093 5.12282C4.04765 5.12282 3.83351 5.03517 3.67562 4.87913C3.51773 4.7231 3.42903 4.51148 3.42903 4.29082C3.42903 4.07016 3.51773 3.85854 3.67562 3.70251C3.83351 3.54648 4.04765 3.45882 4.27093 3.45882C4.3895 3.44553 4.50957 3.45714 4.62328 3.49289C4.73699 3.52864 4.84178 3.58772 4.93078 3.66627C5.01978 3.74481 5.091 3.84105 5.13975 3.94868C5.18851 4.05631 5.21372 4.1729 5.21372 4.29082C5.21372 4.40874 5.18851 4.52534 5.13975 4.63296C5.091 4.74059 5.01978 4.83683 4.93078 4.91538C4.84178 4.99392 4.73699 5.053 4.62328 5.08875C4.50957 5.1245 4.3895 5.13611 4.27093 5.12282ZM10.9198 10.5948H9.30078V8.01882C9.30078 7.37349 9.06871 6.95216 8.48046 6.95216C8.2984 6.95347 8.12113 7.0099 7.97253 7.11385C7.82393 7.21779 7.71113 7.36425 7.64935 7.53349C7.60711 7.65884 7.58881 7.79086 7.59538 7.92282V10.5895H5.97633C5.97633 10.5895 5.97633 6.22682 5.97633 5.78949H7.59538V6.46682C7.74246 6.21461 7.95638 6.00683 8.21409 5.86586C8.47181 5.72489 8.76356 5.65608 9.05792 5.66682C10.1373 5.66682 10.9198 6.35482 10.9198 7.83216V10.5948Z"
														fill="#477DB3"
													/>
												</svg>
											</li>
										</a>

										<a href={member.twitter} target="_blank">
											<li className="w-32px h-32px bg-[#2780F1]/[0.1] hover:opacity-75 transition-all cursor-pointer bg-opacity-10 flex items-center justify-center rounded-[50%]">
												<svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path
														d="M11.0874 2.66651C11.5636 2.29155 11.9921 1.84155 12.3255 1.31651C11.8969 1.51651 11.3968 1.66651 10.8969 1.71651C11.4207 1.39155 11.8016 0.891553 11.9921 0.266513C11.5159 0.566513 10.9683 0.791553 10.4207 0.916513C9.9445 0.391553 9.30161 0.0915527 8.58732 0.0915527C7.20637 0.0915527 6.08736 1.26651 6.08736 2.71651C6.08736 2.91651 6.11113 3.11651 6.15875 3.31651C4.08736 3.19155 2.23022 2.14155 0.992124 0.566513C0.7778 0.941553 0.658791 1.39155 0.658791 1.89155C0.658791 2.79155 1.08736 3.59155 1.7778 4.06651C1.37308 4.04155 0.968276 3.94155 0.634943 3.74155V3.76651C0.634943 5.04155 1.49209 6.09155 2.63494 6.34155C2.44447 6.39155 2.20637 6.44155 1.99212 6.44155C1.82542 6.44155 1.68256 6.41651 1.51593 6.39155C1.82542 7.44155 2.75403 8.19155 3.84927 8.21651C2.99212 8.91651 1.92066 9.34155 0.754029 9.34155C0.539705 9.34155 0.349229 9.31651 0.158752 9.29155C1.25399 10.0416 2.56355 10.4665 3.99212 10.4665C8.58732 10.4665 11.0874 6.49155 11.0874 3.01651C11.0874 2.89155 11.0874 2.79155 11.0874 2.66651Z"
														fill="#477DB3"
													/>
												</svg>
											</li>
										</a>
									</ul>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#FFF]">
				<div className="max-w-[1233px] px-20px m-auto pt-30px lg-old:pt-70px pb-150px bg-[#FFF]">
					<motion.h2
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
						className="text-24 desktop:text-[32px] font-medium leading-[150%] text-[#000] desktop:text-center mb-20">
						Backed by Industry leaders
					</motion.h2>

					<div className="grid gap-40px desktop:gap-60px" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
						{backedLeaders.map((leader, i) => (
							<motion.div
								initial={{ opacity: 0, y: 5 }}
								whileInView={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 1.2,
										delay: i * 0.1,
										ease: [0.44, 0, 0, 1]
									}
								}}
								viewport={{
									amount: 'some',
									once: true
								}}
								className="flex flex-col justify-center items-center text-16 text-center"
								key={i}>
								<OptimizedImage
									src={`/static/${leader.image}.png`}
									alt={leader.image}
									className="w-200px sm-old:w-250px desktop:w-180px"
									width={300}
									height={300}
								/>

								<p className="mt-24px mb-2px font-semibold text-18">{leader.name}</p>
								<p className="font-medium text-[#666]">{leader.role}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
