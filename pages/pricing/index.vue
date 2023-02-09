<template>
	<div>
		<section>
			<div class="max-w-[1200px] min-h-[500px] mobile:min-h-[500px] desktop:min-h-[500px] w-full m-auto px-20px pt-200px">
				<h1 class="text-center font-bold text-32 desktop:text-[40px] desktop:leading-[48px] mb-22px max-w-[502px] m-auto">Transparent Pricing, pay as you grow</h1>
				<p class="text-center text-18 mb-40px max-w-[384px] m-auto">Convoy scales with you; choose a plan that fits you and we'll take it from there.</p>
			</div>
		</section>

		<section class="px-50px mt-104px">
			<ul class="grid grid-cols-[repeat(auto-fill,minmax(270px,_1fr))] max-w-[1200px] m-auto gap-x-30px gap-y-40px">
				<li v-for="(plan, index) in plans" :key="index">
					<div
						class="pl-20px border-dashed border-l mb-22px"
						:class="{ 'border-l-primary-400': index == 0, 'border-l-success-400': index == 1, 'border-l-warning-400': index == 2, 'border-l-danger-400': index == 3 }"
					>
						<img :src="require(`~/assets/images/${plan.id}-plan.svg`)" class="mr-16px" alt="plan icon" />
					</div>
					<div
						class="pl-20px border-dashed border-l mb-22px"
						:class="{ 'border-l-primary-100': index == 0, 'border-l-success-100': index == 1, 'border-l-warning-100': index == 2, 'border-l-danger-100': index == 3 }"
					>
						<h2 class="text-grey-100 text-24 font-bold">
							{{ plan.name }}
						</h2>
					</div>
					<ul
						class="pl-32px border-dashed border-l"
						:class="{ 'border-l-primary-400': index == 0, 'border-l-success-400': index == 1, 'border-l-warning-400': index == 2, 'border-l-danger-400': index == 3 }"
					>
						<li
							class="mb-20px pl-8px"
							:class="`${index == 0 ? 'blue-check' : ''} ${index == 1 ? 'green-check' : ''} ${index == 2 ? 'yellow-check' : ''} ${index == 3 ? 'red-check' : ''} text-14 text-grey-80 font-light`"
							v-for="(feature, _index) in plan.features"
							:key="_index"
						>
							{{ feature }}
						</li>
					</ul>
					<div
						class="pl-20px border-dashed border-l mb-32px"
						:class="{ 'border-l-primary-100': index == 0, 'border-l-success-100': index == 1, 'border-l-warning-100': index == 2, 'border-l-danger-100': index == 3 }"
					>
						<p class="text-[48px] font-bold leading-[64px] mobile:text-[36px] mobile:leading-[48px]">
							{{ plan.price }}
							<span class="text-18 mobile:text-14 font-medium text-grey-80">{{ plan.frequency }}</span>
						</p>
						<button class="border-none bg-none">
							<a
								href="https://dashboard.getconvoy.io/signup"
								target="_blank"
								class="
									bg-primary-100
									text-white-100
									py-16px
									px-26px
									rounded-10px
									mt-22px
									flex
									items-center
									shadow-pricing-button
									transition-all
									duration-300
									hover:shadow-[0px_1px_1px_rgba(22,29,37,0.1),inset_0px_2px_0px_rgba(255,255,255,0.06)]
								"
							>
								{{ index === 3 ? 'Contact Us' : 'Get Started' }}
							</a>
						</button>
					</div>
				</li>
			</ul>
		</section>

		<section class="py-100px px-20px">
			<p class="text-14 text-grey-60 text-center max-w-[500px] m-auto mb-72px">Hundreds of engineering teams that value efficiency use Convoy to manage their webhook infrastructure events.</p>
			<ul class="flex justify-between items-center max-w-[960px] m-auto">
				<li class="mr-20px desktop:mr-50px">
					<a target="_blank" rel="noopener noreferrer" href="https://buycoins.africa/">
						<img src="~/assets/images/svg/buycoins-primary.svg" class="desktop:max-w-[110px] w-100px" alt="buycoins logo" />
					</a>
				</li>
				<li class="mr-20px desktop:mr-50px">
					<a target="_blank" rel="noopener noreferrer" href="https://www.getwallets.co/">
						<img src="~/assets/images/svg/getwallets-primary.svg" class="desktop:max-w-[150px] w-100px" alt="getwallets logo" />
					</a>
				</li>
				<li class="mr-20px desktop:mr-50px">
					<a target="_blank" rel="noopener noreferrer" href="https://www.dojah.io/">
						<img src="~/assets/images/svg/dojah-primary.svg" class="desktop:max-w-[100px] w-full" alt="dojah logo" />
					</a>
				</li>
				<li class="">
					<a target="_blank" rel="noopener noreferrer" href="https://termii.com/">
						<img src="~/assets/images/svg/termii-primary.svg" class="desktop:max-w-[150px] w-100px" alt="termii logo" />
					</a>
				</li>
			</ul>
		</section>

		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] text-white-100 py-36px desktop:py-80px">
			<div class="max-w-[1200px] m-auto px-20px">
				<h2 class="text-32 font-bold desktop:text-center mb-46px desktop:mb-76px">Available on all plans</h2>
				<div class="grid grid-cols-1 desktop:grid-cols-2 desktop:gap-x-[90px]">
					<ul>
						<li class="list-check pb-6px mb-26px flex items-start" v-for="(feature, index) in features.slice(0, 3)" :key="index">
							<img src="~/assets/images/check-round-icon.svg" alt="check icon" class="mr-24px" />
							{{ feature }}
						</li>
					</ul>
					<ul>
						<li class="list-check pb-6px mb-26px flex items-start" v-for="(feature, index) in features.slice(3, 7)" :key="index">
							<img src="~/assets/images/check-round-icon.svg" alt="check icon" class="mr-24px" />
							{{ feature }}
						</li>
					</ul>
				</div>
			</div>
		</section>

		<section class="all-plans pt-72px px-20px">
			<div class="max-w-[1000px] m-auto bg-[url(~/assets/images/Events.png)] bg-no-repeat bg-contain bg-bottom min-h-[200px] desktop:min-h-[300px]"></div>
		</section>

		<section class="questions py-46px desktop:py-80px px-20px">
			<h1 class="desktop:text-center text-grey-100 font-bold mb-50px desktop:mb-76px">Questions and Answers</h1>
			<div class="max-w-[1000px] m-auto">
				<div class="grid grid-cols-1 desktop:grid-cols-2 desktop:gap-x-12">
					<div>
						<div class="mb-16px" v-for="(question, index) in questions.slice(0, 4)" :key="index">
							<a class="flex items-center text-16 font-semibold justify-between mb-16px hover:cursor-pointer" @click="openQuestion = question.question">
								{{ question.question }}
								<img src="~/assets/images/angle-down-black-icon.svg" alt="angle icon" class="transition-all duration-300" :class="{ 'rotate-180': openQuestion === question.question }" />
							</a>
							<p class="text-14 text-grey-40 transition-all duration-300" :class="{ 'h-full': openQuestion === question.question, 'max-h-0 overflow-hidden': openQuestion !== question.question }">
								{{ question.answer }}
							</p>
						</div>
					</div>
					<div>
						<div class="mb-16px" v-for="(question, index) in questions.slice(4, 8)" :key="index">
							<a class="flex items-center text-16 font-semibold justify-between mb-16px hover:cursor-pointer" @click="openQuestion = question.question">
								{{ question.question }}
								<img src="~/assets/images/angle-down-black-icon.svg" alt="angle icon" class="transition-all duration-300" :class="{ 'rotate-180': openQuestion === question.question }" />
							</a>
							<p class="text-14 text-grey-40 transition-all duration-300" :class="{ 'h-full': openQuestion === question.question, 'max-h-0 overflow-hidden': openQuestion !== question.question }">
								{{ question.answer }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="px-20px py-60px desktop:py-100px">
			<p class="text-center text-16 font-semibold mb-60px desktop:mb-90px">What people are saying about Convoy...</p>
			<div class="px-30px flex items-start flex-nowrap gap-10 overflow-x-auto no-scrollbar justify-center">
				<div class="max-w-[300px] min-w-[300px]" v-for="(testimonial, index) in testimonials" :key="testimonial.author.twitter">
					<div class="flex items-center justify-between border-dashed border-l border-l-primary-400 pl-30px">
						<div class="flex items-center">
							<img :src="require(`~/assets/images/twitter-user${index + 1}.jpeg`)" alt="avatar icon" class="mr-10px w-40px rounded-50%" />
							<div>
								<p class="text-12 font-medium text-grey-80">{{ testimonial.author.name }}</p>
								<p class="text-10 text-grey-40">@{{ testimonial.author.twitter }}</p>
							</div>
						</div>
						<div>
							<img src="~/assets/images/twitter-logo-blue.svg" alt="twitter icon" />
						</div>
					</div>
					<div class="border-dashed border-l border-l-primary-100 pl-30px mt-6px testimonial" v-html="testimonial.html"></div>
				</div>
			</div>
		</section>

		<section class="px-20px pb-100px desktop:pb-130px">
			<div class="mt-100px desktop:mt-50px max-w-[1000px] w-full m-auto bg-[url(~/assets/images/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 class="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px desktop:mb-16px">Need something else?</h1>
				<p class="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">Get in touch with us today to find out how best we can support your business and work needs.</p>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://calendly.com/d/d6k-jw2-wgj/convoy-user-demo"
					class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit"
				>
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
					name: 'Developer',
					id: 'developer',
					description: 'This is a perfect plan for starters',
					price: '$0',
					frequency: '/monthly',
					link: '',
					features: ['Send up to 150,000 events, retries are free', 'Access with up to 2 users', 'Data retention for up to 3 days', 'Basic Role-Based Access Control', 'Priority developer support']
				},
				{
					name: 'Growth',
					id: 'growth',
					description: 'This is a perfect plan for startups',
					price: '$60',
					frequency: '/monthly',
					link: '',
					features: ['Send up to 1.5m events, retries are free', 'Access for unlimited users', 'Data retention for up to 30 days', 'Basic Role-Based Access Control', 'Priority developer support']
				},
				{
					name: 'Scale',
					id: 'scale',
					description: 'For users who want to do more',
					price: '$700',
					frequency: '/monthly',
					link: '',
					features: ['Send up to 20m events, retries are free', 'Access for unlimited users', 'Data retention for up to 3 months', 'Advanced Role-Based Access Control', 'Dedicated Customer Success']
				},
				{
					name: 'Enterprise',
					id: 'enterprise',
					description: 'For users who want to do more',
					price: 'Custom',
					frequency: '',
					link: 'http://getconvoy.io/demo',
					features: ['Send unlimited number of events', 'Access for unlimited users', 'Custom data retention policy', 'Advanced Role-Based Access Control', 'Dedicated Customer Success']
				}
			],
			features: [
				'Resilient webhooks delivery with linear or exponential time retries, bulk retries and rate limiting.',
				'Endpoint failure notifications via email and slack.',
				'Advanced webhooks security with endpoint authentication, payload signing, rolling webhook secrets, replay attack prevention, and forward-compatible scheme upgrades.',
				'Route a single webhook event to several microservices based on the event type or webhook payload structure.',
				'Customer-facing webhooks dashboard.',
				'Support for local debugging with Convoy CLI.',
				'SDK support in Ruby, JS, Golang, and Python.'
			],
			questions: [
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
			],
			openQuestion: 'Will you match the price of another platform?',
			testimonials: [
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
			]
		};
	},
	head() {
		return {
			title: 'Convoy Pricing',
			meta: [
				{ hid: 'description', name: 'description', content: 'Find out how much it cost to use Convoy Cloud' },
				{
					hid: 'apple-mobile-web-app-title',
					name: 'apple-mobile-web-app-title',
					content: 'Convoy Pricing'
				},
				{ hid: 'og:title', name: 'og:title', content: 'Convoy Pricing' },
				{ hid: 'og:site_name', name: 'og:site_name', content: 'Convoy' },
				{ hid: 'og:type', name: 'og:type', content: 'website' },
				{
					hid: 'og:description',
					name: 'og:description',
					content: 'Find out how much it cost to use Convoy Cloud'
				},
				{
					hid: 'og:url',
					name: 'og:url',
					content: `https://getconvoy.io/pricing`
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: 'Convoy Pricing'
				},
				{
					hid: 'twitter:url',
					name: 'twitter:url',
					content: `https://getconvoy.io/pricing`
				},
				{
					hid: 'twitter:text:title',
					name: 'twitter:text:title',
					content: 'Convoy Pricing'
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: 'Find out how much it cost to use Convoy Cloud'
				}
			],
			link: [{ hid: 'canonical', rel: 'canonical', href: `https://getconvoy.io/pricing` }]
		};
	}
};
</script>

<style lang="scss" scoped>
.plans {
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(310px, 310px));
	}
}

.blue-check {
	list-style-image: url('~/assets/images/check-icon-info.svg');
}

.green-check {
	list-style-image: url('~/assets/images/check-icon-success.svg');
}

.yellow-check {
	list-style-image: url('~/assets/images/check-icon-warn.svg');
}

.red-check {
	list-style-image: url('~/assets/images/check-icon-danger.svg');
}

.all-plans {
	background: url('~/assets/images/background-pattern-dark.svg') no-repeat, #edf2f7;
	background-size: cover;
	background-position: center;
}

.questions {
	background: url('~/assets/images/bg-pattern-light.png') no-repeat, #fcfcfc;
	background-size: cover;
	background-position: center;
}
</style>
