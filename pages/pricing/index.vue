<template>
	<div>
		<section class="cta-section">
			<div class="max-w-[1200px] min-h-[900px] mobile:min-h-[700px] desktop:min-h-[780px] w-full m-auto text-white-100 px-20px pt-200px">
				<h1 class="text-center font-bold text-32 desktop:text-[48px] mb-16px">Convoy Pricing</h1>
				<p class="text-center text-18 mb-40px max-w-[530px] m-auto">Convoy scales with you; choose a plan that fits you and we'll take it from there.</p>
			</div>
		</section>

		<section class="plans pb-250px px-40px">
			<ul class="grid md-max:gap-40px m-auto max-w-[1200px] -mt-270px type items-center justify-center">
				<li class="shadow-default bg-white-100" v-for="(plan, index) in plans" :key="index" :class="`${index == 0 ? 'rounded-tl-16px rounded-bl-16px rounded-br-16px md-max:rounded-tr-16px' : ''} ${index == 2 ? 'rounded-tr-16px rounded-bl-16px rounded-br-16px md-max:rounded-tl-16px' : ''}`">
					<div class="head px-32px pt-32px pb-16px">
						<div class="flex">
							<img src="~/assets/images/developer-plan-icon.png" class="mr-16px" alt="plan icon">
							<h2 class="text-grey-100 text-24 font-bold">
								<span class="text-grey-40 text-18 font-medium">For</span><br>
								{{ plan.name }}
							</h2>
						</div>
						<p class="text-16 font-normal text-grey-80 my-24px">{{ plan.description }}</p>
						<p class="text-[48px] font-bold leading-[64px]">{{ plan.price }} <span class="text-18 font-medium">{{ plan.frequency }}</span></p>
					</div>

					<div class="pt-26px mx-32px pb-42px border-t border-t-grey-20" :class="`${index == 1 ? 'border-none' : ''}`">
						<ul class="ml-20px">
							<h3 class="mb-16px text-16 font-semibold -ml-20px">What’s Included</h3>
							<li class="mb-32px pl-16px" :class="`${index == 0 ? 'blue-check' : ''} ${index == 1 ? 'green-check' : ''} ${index == 2 ? 'yellow-check' : ''} `" v-for="(feature, _index) in plan.features" :key="_index">{{ feature }}</li>
						</ul>

						<button class="bg-primary-100 text-white-100 py-16px px-26px rounded-10px mt-48px flex items-center shadow-pricing-button">Get Started <img src="~/assets/images/arrow-right-icon.svg" class="ml-8px" alt="arrow icon"></button>
					</div>
				</li>
			</ul>
		</section>

		<section class="flex items-center justify-center flex-wrap bg-primary-500 all-plans">
			<div class="list bg-gradient-to-br from-[#2c2f3e] to-[#422f41] text-white-100 p-60px max-w-[610px] w-full">
				<h2 class="text-32 font-bold mb-16px">Available on all plans</h2>
				<p class="max-w-[390px]">Convoy scales with you; choose a plan that fits you and we'll take it from there.</p>
				<ul class="mt-46px">
					<li class="list-check pb-6px mb-26px flex items-center" v-for="(feature, index) in features" :key="index">
						<img src="~/assets/images/check-round-icon.svg" alt="check icon" class="mr-24px">
						{{ feature }}
					</li>
				</ul>
			</div>
			<div class="mobile:pt-84px desktop:pl-84px px-40px">
				<img src="~/assets/images/pricing-plans-img.png" class="max-h-[530px]" alt="convoy dashboard screenshot">
			</div>
		</section>

		<section class="px-20px pb-100px desktop:pb-130px">
			<div class="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(~/assets/images/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 class="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px desktop:mb-16px">Need something else?</h1>
				<p class="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">Get in touch with us today to find out how best we can support your business and work needs.</p>
				<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/signup" class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
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
					id: 'developers',
					description: 'This is a perfect plan for starters',
					price: '$0',
					frequency: '/monthly',
					features: ['1 user', '100,000 events', '3 day retention']
				},
				{
					name: 'Businesses',
					id: 'businesses',
					description: 'This is a perfect plan for startups',
					price: '$40',
					frequency: '/monthly',
					features: ['Unlimited users', '1 million events', '30 day retention']
				},
				{
					name: 'Enterprise',
					id: 'enterprise',
					description: 'For users who want to do more',
					price: 'Custom',
					frequency: '',
					features: ['Unlimited users and events', 'Custom data retention', 'Enterprise support and more']
				}
			],
			features: ['Batch event retry', 'Portal links', 'CLI', 'Replay attack prevention', 'Advanced signatures', 'SDK support in multiple languages', 'Endpoint authentication', 'Email and slack notifications']
		}
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
	background: url('~/assets/images/background-pattern-dark.svg') no-repeat, #EDF2F7;
	background-size: cover;
	background-position: center;
}
</style>