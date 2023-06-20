<template>
	<div>
		<section class="pt-214px px-20px">
			<h1 class="text-center font-bold text-32 desktop:text-[42px] desktop:leading-[48px] mb-16px max-w-[1020px] m-auto">Usage Pricing, no surprises.</h1>
			<p class="text-center text-new.gray-600 text-16 max-w-[561px] m-auto mb-66px">
				All the tools you need to take control and manage your webhook events infrastructure, from your hubby project to scale.
			</p>

			<div class="max-w-[1248px] w-full m-auto">
				<div class="grid grid-cols-1 tab:grid-cols-2 md:grid-cols-3 gap-24px items-end">
					<div class="rounded-16px border border-new.primary-50 bg-white-100 shadow-default" :class="`${i === 1 ? '' : 'md:max-h-[912px]'}`" v-for="(plan, i) of plans" :key="i">
						<div :class="`${i === 1 ? 'bg-new.success-50 pb-24px rounded-tl-16px rounded-tr-16px' : ''} px-24px md:px-32px pt-24px md:pt-32px`">
							<div class="flex items-center mb-24px">
								<img :src="require(`~/assets/images/${plan.id}-plan.svg`)" :alt="`${plan.id} plan`" class="mr-16px" />
								<div>
									<p class="text-16 text-new.gray-800">For</p>
									<h1 class="text-24 text-new.gray-800 font-bold">{{ plan.name }}</h1>
								</div>
							</div>
							<p class="text-new.gray-600 text-12">{{ plan.subText }}</p>
							<hr :class="`${i === 1 ? 'border-new.success-100' : 'border-new.primary-25'} border-t my-24px`" />
							<div :class="`${plan.tagClass} py-2px px-4px rounded-22px mb-10px w-fit text-10`">{{ i === 0 ? 'Usage based price' : 'Starts with' }}</div>
							<p class="flex items-center">
								<span class="text-36 font-bold">{{ plan.price }}</span>
								<span class="text-18 text-new.gray-600 ml-10px">/ monthly</span>
							</p>
						</div>
						<div :class="`${i === 1 ? 'pt-24px' : ''} px-24px md:px-32px pb-24px md:pb-32px`">
							<hr v-if="i !== 1" class="border-t border-new.primary-25 my-24px" />
							<div :class="`${i === 1 ? 'h-[414px] md:h-[510px]' : 'h-[414px] md:h-[470px]'}`">
								<p class="text-12 text-new.gray-400 mb-16px">{{ plan.preText }}</p>
								<div class="flex items-start mb-10px" v-for="(feature, index) in plan.features" :key="index">
									<img src="~/assets/images/svg/checkmark-icon.svg" alt="checkmark icon" class="mr-16px mt-6px" />
									<p class="text-12 text-new.gray-600 md:max-w-[542px]">{{ feature }}</p>
								</div>
							</div>

							<p class="text-10 text-new.gray-400 mb-16px">Additional cost may apply for usage beyond these limits</p>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://dashboard.getconvoy.io/"
								class="bg-[linear-gradient(0deg,#376DA4_0%,#477DB3_100%)] shadow-sm rounded-10px p-16px w-full flex items-center justify-center text-white-100 text-14"
							>
								Start your project
								<img src="~/assets/images/arrow-right-icon.svg" alt="arrow right icon" class="ml-12px" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="max-w-[1288px] w-full m-auto px-20px mt-68px mb-160px">
			<div class="w-full bg-white-100 border border-new.primary-50 rounded-16px shadow-default p-24px md:p-32px flex flex-wrap gap-x-40px">
				<div class="min-w-[300px]">
					<h1 class="text-24 font-bold text-new.gray-800 mb-24px">Enterprise</h1>
					<p class="text-12 text-new.gray-600 max-w-[307px] mb-24px">For large scale products and teams with heavier events loads.</p>
					<button @click="showEnterpriseForm = true" class="bg-new.gray-100 rounded-6px px-16px py-12px text-new.gray-800 text-14 mb-30px md:mb-0">Contact Us</button>
				</div>
				<div class="min-w-[300px]">
					<div class="flex items-start mb-10px" v-for="(feature, index) in enterpriseFeatures.slice(0, 4)" :key="index">
						<img src="~/assets/images/svg/checkmark-icon.svg" alt="checkmark icon" class="mr-16px mt-6px" />
						<p class="text-12 text-new.gray-600 md:max-w-[542px]">{{ feature }}</p>
					</div>
				</div>
				<div class="min-w-[300px]">
					<div class="flex items-start mb-10px" v-for="(feature, index) in enterpriseFeatures.slice(4, 8)" :key="index">
						<img src="~/assets/images/svg/checkmark-icon.svg" alt="checkmark icon" class="mr-16px mt-6px" />
						<p class="text-12 text-new.gray-600 md:max-w-[542px]">{{ feature }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] text-white-100 py-36px desktop:py-80px">
			<div class="desktop:bg-[url(~/assets/images/Frame.png)] bg-no-repeat bg-right bg-contain">
				<div class="max-w-[1200px] m-auto px-20px">
					<h2 class="text-32 font-bold mb-46px desktop:mb-76px">Available on all plans</h2>
					<ul class="max-w-[523px]">
						<li class="list-check pb-6px mb-26px flex items-start" v-for="(feature, index) in features" :key="index">
							<img src="~/assets/images/check-round-icon.svg" alt="check icon" class="mr-24px" />
							{{ feature }}
						</li>
					</ul>
				</div>
			</div>
		</section>

		<section class="px-20px py-60px desktop:py-100px">
			<p class="text-center text-16 font-semibold mb-60px desktop:mb-90px">What people are saying about Convoy...</p>
			<div class="px-30px flex items-start flex-nowrap gap-10 overflow-x-auto no-scrollbar justify-center">
				<div class="bg-white-100 rounded-10px p-26px min-h-[200px] max-w-[300px] min-w-[300px]" v-for="(testimonial, index) in testimonials" :key="testimonial.author.twitter">
					<div class="flex items-center justify-between">
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
					<div class="mt-6px testimonial" v-html="testimonial.html"></div>
				</div>
			</div>
		</section>

		<section class="questions py-46px desktop:py-80px px-20px">
			<h1 class="desktop:text-center text-grey-100 font-bold mb-50px desktop:mb-76px">Questions and Answers</h1>
			<div class="max-w-[1000px] m-auto">
				<div class="grid grid-cols-1 desktop:grid-cols-2 desktop:gap-x-12">
					<div>
						<div class="mb-16px" v-for="(question, index) in questions.slice(0, 5)" :key="index">
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
						<div class="mb-16px" v-for="(question, index) in questions.slice(5, 9)" :key="index">
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

		<!-- sales modal  -->
		<div v-if="showEnterpriseForm" @click="showEnterpriseForm = false" class="fixed h-screen w-screen top-0 right-0 bottom-0 z-50 bg-black bg-opacity-60"></div>
		<div v-if="showEnterpriseForm" class="fixed w-full px-20px md:px-0 z-[60] h-fit top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 rounded-[16px] max-w-[600px] mx-auto">
			<div class="w-full shadow-sm">
				<CloudWaitlist @requestAccess="showEnterpriseForm = false"></CloudWaitlist>
			</div>
		</div>
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
					link: 'https://github.com/frain-dev/convoy#installation-getting-started',
					subText: 'This is a perfect plan for starters and hobby projects',
					tagClass: 'bg-new.primary-25 text-new.primary-400',
					preText: 'You’ll get started with:',
					features: [
						'Up to 200,000 events monthly',
						'Automated event retries',
						'Customizable event headers',
						'Basic debugging',
						'Basic circuit breaking',
						'Message broker integration',
						'Payload event filtering',
						'Rate limit: 10 events/sec',
						'7 days data retention',
						'Cloud and open-source deployment usage option',
						'SSO: G-Suite',
						'Community support'
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
					tagClass: 'bg-new.success-100 text-new.success-400',
					preText: 'Everything in developer plan, plus:',
					features: [
						'Unlimited events',
						'Advanced debugging',
						'Advanced circuit breaking',
						'Shared forward proxy integration',
						'Rate limit: 300 events/sec',
						'Role based access control',
						'30 days data retention',
						'Dedicated email support'
					]
				},

				{
					name: 'Scale',
					id: 'scale',
					description: 'For users who want to do more',
					price: '$150',
					frequency: '',
					link: '/enterprise#requestAccess',
					subText: 'We meet you at your point of scale and join you further',
					tagClass: 'bg-new.warning-50 text-new.warning-400',
					preText: 'Everything in growth plan, plus:',
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
			],
			tabs: [
				{ label: 'Self Hosted', id: 'self' },
				{ label: 'Cloud', id: 'cloud' }
			],
			communityFeatures: [
				'Unlimited Usage (Users, Events etc. )',
				'Message Broker Integration',
				'Customer-Facing Dashboards',
				'Community Support',
				'Headless API',
				'Endpoint Management (Retries, Rate Limiting & Basic Circuit Breaking)',
				'Google SSO (Coming Soon)'
			],
			enterpriseFeatures: [
				'Dedicated forward proxy integration',
				'Rate limit: Custom',
				'Custom data retention period',
				'SSO: ODIC and SAML',
				'Audit logs',
				'Dedicated email, slack and phone support',
				'Advanced role based permission with custom roles',
				'Cloud or on-prem deployment options'
			],
			activeTab: 'self',
			requestForm: {
				firstname: null,
				lastname: null,
				usecase: null,
				organisation: null
			},
			useCases: ['Work', 'Personal projects'],
			isSubmitingRequestAccessForm: false,
			showEnterpriseForm: false
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
	},
	methods: {
		switchTabs(tabId) {
			this.activeTab = tabId;
		},
		async requestAccess() {
			this.isSubmitingRequestAccessForm = true;
			try {
				const response = await fetch(
					`https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-8f44e6aa-e5d6-4e31-b781-5080c050bb37/welcome-user/welcome-mail?usecase=${this.requestForm.usecase}&firstname=${this.requestForm.firstname}&lastname=${this.requestForm.lastname}&organisation=${this.requestForm.organisation}&cloud=true`
				);

				await response.json();
				this.isSubmitingRequestAccessForm = false;
			} catch (error) {
				this.isSubmitingRequestAccessForm = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.plans {
	.grid {
		grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
		@media (max-width: 1024px) {
			grid-template-columns: repeat(auto-fill, minmax(310px, 310px));
		}
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
