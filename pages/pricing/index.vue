<template>
	<div>
		<section class="cta-section">
			<div class="max-w-[1200px] min-h-[900px] mobile:min-h-[700px] desktop:min-h-[780px] w-full m-auto text-white-100 px-20px pt-200px">
				<h1 class="text-center font-bold text-32 desktop:text-[48px] mb-16px">Convoy Pricing</h1>
				<p class="text-center text-18 mb-40px max-w-[530px] m-auto">Convoy scales with you; choose a plan that fits you and we'll take it from there.</p>

				<div class="rounded-8px bg-primary-500 p-12px max-w-[536px] w-full text-14 italic flex items-center justify-center mb-58px border border-primary-200 m-auto">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-10px">
						<rect width="24" height="24" rx="8" fill="#C8D8E8" />
						<path
							d="M12 11.3125C11.8177 11.3125 11.6428 11.3849 11.5139 11.5139C11.3849 11.6428 11.3125 11.8177 11.3125 12V14.75C11.3125 14.9323 11.3849 15.1072 11.5139 15.2361C11.6428 15.3651 11.8177 15.4375 12 15.4375C12.1823 15.4375 12.3572 15.3651 12.4861 15.2361C12.6151 15.1072 12.6875 14.9323 12.6875 14.75V12C12.6875 11.8177 12.6151 11.6428 12.4861 11.5139C12.3572 11.3849 12.1823 11.3125 12 11.3125ZM12.2613 8.6175C12.0939 8.54874 11.9061 8.54874 11.7388 8.6175C11.6544 8.65022 11.5773 8.69928 11.5119 8.76187C11.4512 8.8287 11.4023 8.90544 11.3675 8.98875C11.329 9.07034 11.3102 9.15982 11.3125 9.25C11.312 9.34048 11.3293 9.43017 11.3635 9.51394C11.3977 9.5977 11.4482 9.67388 11.5119 9.73812C11.5787 9.79885 11.6554 9.84768 11.7388 9.8825C11.8429 9.92529 11.956 9.94184 12.068 9.9307C12.1801 9.91956 12.2877 9.88107 12.3814 9.81861C12.4751 9.75615 12.552 9.67163 12.6054 9.57249C12.6587 9.47334 12.6869 9.3626 12.6875 9.25C12.685 9.06797 12.6138 8.89362 12.4881 8.76187C12.4227 8.69928 12.3456 8.65022 12.2613 8.6175ZM12 5.125C10.6403 5.125 9.31105 5.52821 8.18046 6.28365C7.04987 7.03908 6.16868 8.11281 5.64833 9.36905C5.12798 10.6253 4.99183 12.0076 5.2571 13.3412C5.52238 14.6749 6.17716 15.8999 7.13864 16.8614C8.10013 17.8228 9.32514 18.4776 10.6588 18.7429C11.9924 19.0082 13.3747 18.872 14.631 18.3517C15.8872 17.8313 16.9609 16.9501 17.7164 15.8195C18.4718 14.689 18.875 13.3597 18.875 12C18.875 11.0972 18.6972 10.2032 18.3517 9.36905C18.0062 8.53494 17.4998 7.77704 16.8614 7.13864C16.223 6.50024 15.4651 5.99383 14.631 5.64833C13.7968 5.30283 12.9028 5.125 12 5.125ZM12 17.5C10.9122 17.5 9.84884 17.1774 8.94437 16.5731C8.0399 15.9687 7.33495 15.1098 6.91867 14.1048C6.50238 13.0998 6.39347 11.9939 6.60568 10.927C6.8179 9.86011 7.34173 8.8801 8.11092 8.11091C8.8801 7.34172 9.86011 6.8179 10.927 6.60568C11.9939 6.39346 13.0998 6.50238 14.1048 6.91866C15.1098 7.33494 15.9687 8.03989 16.5731 8.94436C17.1774 9.84883 17.5 10.9122 17.5 12C17.5 13.4587 16.9205 14.8576 15.8891 15.8891C14.8576 16.9205 13.4587 17.5 12 17.5Z"
							fill="#477DB3" />
					</svg>
					<p class="text-black">Important Notice: Billing is scheduled to starts in January 2023</p>
				</div>
			</div>
		</section>

		<section class="plans pb-250px px-40px">
			<ul class="grid md-max:gap-40px m-auto max-w-[1200px] -mt-198px type items-center justify-center">
				<li class="shadow-default bg-white-100" v-for="(plan, index) in plans" :key="index" :class="`${index == 0 ? 'rounded-tl-16px rounded-bl-16px rounded-br-16px md-max:rounded-tr-16px' : ''} ${index == 2 ? 'rounded-tr-16px rounded-bl-16px rounded-br-16px md-max:rounded-tl-16px' : ''
				}`">
					<div class="head px-32px pt-32px pb-16px">
						<div class="flex">
							<img :src="require(`~/assets/images/${plan.id}-plan.svg`)" class="mr-16px" alt="plan icon" />
							<h2 class="text-grey-100 text-24 font-bold">
								<span class="text-grey-40 text-18 font-medium">For</span>
								<br />
								{{ plan.name }}
							</h2>
						</div>
						<p class="text-16 font-normal text-grey-80 my-24px">{{ plan.description }}</p>
						<p class="text-[48px] font-bold leading-[64px]">
							{{ plan.price }}
							<span class="text-18 font-medium">{{ plan.frequency }}</span>
						</p>
					</div>

					<div class="pt-26px mx-32px pb-42px border-t border-t-grey-20" :class="`${index == 1 ? 'border-none' : ''}`">
						<ul class="ml-20px">
							<h3 class="mb-16px text-16 font-semibold -ml-20px">What’s Included</h3>
							<li class="mb-32px pl-16px" :class="`${index == 0 ? 'blue-check' : ''} ${index == 1 ? 'green-check' : ''} ${index == 2 ? 'yellow-check' : ''} `" v-for="(feature, _index) in plan.features" :key="_index">
								{{ feature }}
							</li>
						</ul>

						<!-- Pending go live  -->
						<!-- <button class="bg-primary-100 text-white-100 py-16px px-26px rounded-10px mt-48px flex items-center shadow-pricing-button">Get Started <img src="~/assets/images/arrow-right-icon.svg" class="ml-8px" alt="arrow icon"></button> -->
					</div>
				</li>
			</ul>
		</section>

		<section class="all-plans">
			<div class="flex items-center justify-center md-max:flex-wrap bg-primary-500 max-w-[1440px] m-auto">
				<div class="list bg-gradient-to-br from-[#2c2f3e] to-[#422f41] text-white-100 p-60px w-full md:max-w-[610px]">
					<div class="max-w-[390px] m-auto">
						<h2 class="text-32 font-bold mb-16px">Available on all plans</h2>
						<p>Convoy scales with you; choose a plan that fits you and we'll take it from there.</p>
						<ul class="mt-46px">
							<li class="list-check pb-6px mb-26px flex items-center" v-for="(feature, index) in features" :key="index">
								<img src="~/assets/images/check-round-icon.svg" alt="check icon" class="mr-24px" />
								{{ feature }}
							</li>
						</ul>
					</div>
				</div>
				<div class="pl-40px md-max:py-84px desktop:pl-84px md-max:pr-40px md:ml-auto md-max:m-auto">
					<img src="~/assets/images/pricing-plans.png" class="max-h-[398px]" alt="convoy dashboard screenshot" />
				</div>
			</div>
		</section>

		<section class="px-20px pb-100px desktop:pb-130px">
			<div class="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(~/assets/images/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 class="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px desktop:mb-16px">Need something else?</h1>
				<p class="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">Get in touch with us today to find out how best we can support your business and work needs.</p>
				<a target="_blank" rel="noopener noreferrer" href="https://calendly.com/d/d6k-jw2-wgj/convoy-user-demo" class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
					Contact Sales
					<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right" />
				</a>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	layout: 'home',
	data: () => {
		return {
			plans: [
				{
					name: 'Developers',
					id: 'developer',
					description: 'This is a perfect plan for starters',
					price: '$0',
					frequency: '/monthly',
					features: ['1 user', '100,000 events', '3 days data retention', 'Community Support']
				},
				{
					name: 'Businesses',
					id: 'business',
					description: 'This is a perfect plan for startups',
					price: '$40',
					frequency: '/monthly',
					features: ['Unlimited users', '1 million events', '30 day retention', 'Customer service support']
				},
				{
					name: 'Enterprise',
					id: 'enterprise',
					description: 'For users who want to do more',
					price: 'Custom',
					frequency: '',
					features: ['Unlimited users', 'Unlimited events', 'Custom data retention', 'Enterprise support and more']
				}
			],
			features: [
				'Batch event retry',
				'Portal links',
				'CLI',
				'Replay attack prevention',
				'Advanced signatures',
				'SDK support in multiple languages',
				'Endpoint authentication',
				'Email and slack notifications'
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.plans {
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(400px, 400px));

		&>li:nth-of-type(2) {
			@apply -mt-80px md-max:mt-0 mobile:mt-0 rounded-16px z-10;

			.head {
				@apply bg-success-500 rounded-t-16px;
			}
		}
	}
}

.blue-check {
	list-style-image: url('~/assets/images/pricing-check-icon.svg');
}

.green-check {
	list-style-image: url('~/assets/images/check-icon-success.svg');
}

.yellow-check {
	list-style-image: url('~/assets/images/check-icon-warn.svg');
}

.all-plans {
	background: url('~/assets/images/background-pattern-dark.svg') no-repeat, #edf2f7;
	background-size: cover;
	background-position: center;
}
</style>
