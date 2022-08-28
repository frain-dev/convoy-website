<template>
	<div>
		<header class="px-20px bg-gradient-to-br from-[#2c2f3e] to-[#422f41]">
			<Header></Header>

			<section class="flex flex-col justify-between desktop:items-center desktop:flex-row m-auto pt-150px pb-60px px-20px max-w-[1200px] min-h-[80vh] w-full">
				<div class="max-w-[624px] m-auto desktop:ml-0 w-full">
					<div class="bg-[#403041] rounded-[40px] w-fit py-10px px-20px flex items-center text-14 text-white-100 m-auto desktop:ml-0 mb-40px">
						We are backed by
						<img src="~/assets/images/y-combinator.svg" class="ml-16px w-24px h-24px" alt="y-combinator" />
					</div>

					<h1 class="text-32 desktop:text-[56px] desktop:leading-[80px] font-extrabold text-white-100 text-center desktop:text-left">An Open Source Webhooks Proxy</h1>
					<p class="text-white-100 text-18 mt-16px max-w-[530px] m-auto desktop:ml-0 mb-40px text-center desktop:text-left">
						With out-of-the-box security, reliability and scalability for your webhooks infrastructure.
					</p>
					<div class="w-full text-center desktop:text-left">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://dashboard.getconvoy.io/signup"
							class="rounded-8px bg-primary-100 text-14 font-medium text-white-100 py-12px desktop:py-16px px-38px desktop:px-42px"
						>
							Get Started For Free
						</a>
					</div>

					<ul class="flex items-center justify-center desktop:justify-start list-none w-full mt-60px m-auto desktop:ml-0">
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://buycoins.africa/">
								<img src="~/assets/images/buycoins-logo.svg" class="w-90px" alt="buycoins logo" />
							</a>
						</li>
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.getwallets.co/">
								<img src="~/assets/images/getwallets-logo.svg" class="w-90px" alt="getwallets logo" />
							</a>
						</li>
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.dojah.io/">
								<img src="~/assets/images/dojah.png" class="w-70px" alt="dojah logo" />
							</a>
						</li>
						<li class="">
							<a target="_blank" rel="noopener noreferrer" href="https://termii.com/">
								<img src="~/assets/images/termii.png" class="w-100px" alt="termii logo" />
							</a>
						</li>
					</ul>
				</div>

				<div class="max-w-[600px] desktop:h-[570px] w-full m-auto desktop:m-[unset] mobile:mt-40px md:-mr-120px relative desktop:mb-40px">
					<div class="flex flex-row w-full h-full relative xs:min-h-[270px] min-h-[530px]">
						<img src="~/assets/images/Illustration2.png" alt="illostration" class="transition-all duration-500 delay-300 absolute top-0 left-0" :class="activeSlide ? 'opacity-100' : 'opacity-0'" />
						<img src="~/assets/images/Illustration1.png" alt="illostration" class="transition-all duration-500 delay-300 absolute top-0 left-0" :class="!activeSlide ? 'opacity-100' : 'opacity-0'" />
					</div>
					<div class="flex justify-center pt-52px">
						<button
							@click="activeSlide = true"
							class="w-[47px] h-[3px] rounded-16px mr-14px bg-[#5F4C62] relative before:absolute before:h-[3px] before:rounded-16px before:-mt-2px before:-ml-22px"
							:class="activeSlide ? 'before:bg-transparent before:w-[1px] before:transition-none' : 'before:w-[47px] before:bg-[#8E7392] before:transition-all before:duration-[10s]'"
						></button>
						<button
							@click="activeSlide = false"
							class="w-[47px] h-[3px] rounded-16px bg-[#5F4C62] relative before:absolute before:h-[3px] before:rounded-16px before:-mt-2px before:-ml-22px"
							:class="activeSlide ? 'before:w-[47px] before:bg-[#8E7392] before:transition-all before:duration-[10s]' : 'before:bg-transparent  before:w-[1px] before:transition-none'"
						></button>
					</div>
				</div>
			</section>
		</header>

		<!-- newsletter  -->
		<section
			class="
				bg-[url(~/assets/images/Newsletter-card-small.png)]
				desktop:bg-[url(~/assets/images/Newsletter-card.png)]
				border border-white-16
				bg-cover bg-no-repeat bg-center
				pt-34px
				pb-60px
				desktop:py-30px
				px-20px
				desktop:pt-60px desktop:pb-46px
			"
		>
			<div class="max-w-[695px] w-full m-auto">
				<p class="text-grey-80 text-14 font-medium text-center">We are constantly innovating</p>
				<p class="text-grey-80 text-14 font-medium text-center mb-40px">Join over 100 companies staying on top of any updates, subscribe to our newsletter:</p>
				<form @submit.prevent="requestAccess()" class="bg-[#FBFDFE] border border-primary-500 flex p-10px rounded-8px items-center w-full">
					<input type="email" id="email" placeholder="Your email" aria-label="Email" v-model="earlyAccessEmail" class="bg-transparent focus:outline-none focus:border-none w-full text-16" />
					<button class="flex items-center text-primary-100 text-14">
						{{ subscribeButtonText }}
						<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-16px">
							<path
								d="M7.68681 15.7357L7.0594 15.0963C6.8933 14.9271 6.79999 14.6975 6.79999 14.4581C6.79999 14.2188 6.8933 13.9892 7.0594 13.82L10.8091 10.0013L7.06014 6.18155C6.97784 6.09774 6.91255 5.99822 6.86801 5.88868C6.82347 5.77914 6.80054 5.66174 6.80054 5.54317C6.80054 5.4246 6.82347 5.3072 6.86801 5.19766C6.91255 5.08813 6.97784 4.98861 7.06014 4.90479L7.68754 4.26547C7.76983 4.18132 7.86761 4.11456 7.97528 4.069C8.08294 4.02345 8.19837 4 8.31495 4C8.43153 4 8.54696 4.02345 8.65462 4.069C8.76229 4.11456 8.86007 4.18132 8.94236 4.26547L13.9406 9.36199C14.1067 9.53126 14.2 9.76082 14.2 10.0002C14.2 10.2396 14.1067 10.4691 13.9406 10.6384L8.9394 15.7357C8.7733 15.9049 8.54801 16 8.31311 16C8.0782 16 7.85291 15.9049 7.68681 15.7357Z"
								class="fill-primary-100"
							/>
						</svg>
					</button>
				</form>
			</div>
		</section>

		<!-- why use use use  -->
		<section class="mb-100px desktop:mb-130px mt-60px desktop:mt-130px max-w-[1170px] w-full m-auto px-20px">
			<h1 class="text-center text-32 desktop:text-[48px] desktop:leading-[58px] font-bold">Why use Convoy</h1>
			<p class="text-center text-14 desktop:text-14 text-grey-80 font-normal mt-20px desktop:mt-16px mb-40px desktop:mb-88px max-w-[540px] w-full m-auto">
				Easily filter & debug events sent to multiple applications & endpoints with Delivery Attempt Logs
			</p>

			<div class="grid grid-cols-[repeat(auto-fill,minmax(333px,_1fr))] gap-32px">
				<div class="bg-white-100 shadow-card p-32px rounded-16px" v-for="(feature, index) of features" :key="'feature' + index">
					<img :src="require(`~/assets/images/${feature.img}-feature-icon.svg`)" :alt="feature.feature" class="w-48px h-48px mb-32px" :class="feature.shadow" />
					<h3 class="font-semibold mb-16px">{{ feature.feature }}</h3>
					<p class="text-16 text-grey-80 min-h-[72px]">{{ feature.description }}</p>
				</div>
			</div>
		</section>

		<!-- app-portal/open-core  -->
		<section class="max-w-[1170px] w-full m-auto px-20px">
			<div class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] rounded-16px pt-40px px-20px pb-100px desktop:px-66px desktop:pt-50px desktop:pb-200px">
				<div class="bg-white-16 rounded-8px w-fit m-auto flex flex-row mb-30px">
					<li class="list-none" v-for="tab of tabs" :key="tab.id">
						<button
							class="rounded-6px py-12px px-8px desktop:px-60px min-w-[134px] desktop:min-w-[220px] transition-all duration-300"
							:class="activeTab === tab.id ? 'bg-white-100 shadow-sm' : ''"
							@click="switchTabs(tab.id)"
						>
							<span class="text-14 tracking-[0.02em] transition-all duration-300" :class="activeTab === tab.id ? 'font-bold text-black' : 'text-white-100'">{{ tab.label }}</span>
						</button>
					</li>
				</div>

				<div class="w-full min-h-[280px] h-full">
					<div
						class="flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
						:class="activeTab === 'portal' ? 'animate-slideup block opacity-100' : 'opacity-0 hidden animate-slidedown'"
					>
						<h1 class="text-32 desktop:text-[40px] desktop:leading-[60px] text-white-100 font-bold text-center">App Portal</h1>
						<p class="text-white-100 text-center text-14 desktop:text-18 mt-20px desktop:mt-16px max-w-[860px] m-auto">
							With the app portal, we're enabling you to extend the visibility our dashboard provides you to your customers. They no longer need to reach out to you to know what is happening with
							their events.
						</p>

						<div class="flex justify-start desktop:justify-center m-auto mobile:overflow-x-scroll mobile:scroll-smooth no-scrollbar mt-30px desktop:mt-40px w-full">
							<div
								class="bg-white-10 pl-12px pr-40px desktop:px-12px py-8px rounded-6px mr-24px last-of-type:mr-0 flex items-center text-white-100 text-14 font-medium w-fit whitespace-nowrap"
								v-for="feature of appPortal"
								:key="feature"
							>
								<img src="~/assets/images/green_check.svg" class="mr-12px" alt="check" />
								{{ feature }}
							</div>
						</div>
					</div>

					<div
						class="flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
						:class="activeTab === 'open' ? 'animate-slideup block opacity-100' : 'opacity-0 hidden animate-slidedown'"
					>
						<h1 class="text-32 desktop:text-[40px] desktop:leading-[60px] text-white-100 font-bold text-center">Open Core</h1>
						<p class="text-white-100 text-center text-14 desktop:text-18 mt-20px desktop:mt-16px max-w-[860px] m-auto">
							Convoy is an open-source service that enables you to send webhook events to users, customers, and platforms reliably, securely in a scalable manner. Our open-core is open-source
							first i.e community-driven, so you can be sure to get reliable support.
						</p>

						<div class="flex justify-start desktop:justify-center m-auto mobile:overflow-x-scroll mobile:scroll-smooth no-scrollbar mt-30px desktop:mt-40px w-full">
							<div
								class="bg-white-10 pl-12px pr-40px desktop:px-12px py-8px rounded-6px mr-24px last-of-type:mr-0 whitespace-nowrap flex items-center text-white-100 text-14 font-medium w-fit"
								v-for="feature of openCore"
								:key="feature"
							>
								<img src="~/assets/images/green_check.svg" class="mr-12px" alt="check" />
								{{ feature }}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-[#082B91] bg-opacity-[0.07] w-11/12 h-220px desktop:h-270px rounded-b-16px m-auto relative">
				<div class="absolute left-1/2 -translate-x-1/2 -top-100px desktop:-top-200px w-full">
					<img src="~/assets/images/core.png" alt="group" class="xs:hidden max-w-[866px] desktop:w-full w-5/6 m-auto" />
					<img src="~/assets/images/groups-img-small.png" class="hidden xs:block m-auto w-5/6" alt="group" />
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://dashboard.getconvoy.io/"
						class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-32px w-fit"
					>
						Get started for free
						<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right" />
					</a>
				</div>
			</div>
		</section>

		<!-- core features  -->
		<section id="features" class="features mt-100px desktop:mt-130px">
			<div class="bg-[#F9FBFE] w-full py-30px px-20px mb-40px">
				<div class="w-full max-w-[1170px] m-auto">
					<h1 class="text-32 desktop:text-[48px] font-bold mb-20px desktop:mb-16px">Core Features</h1>
				</div>
			</div>

			<div class="m-auto max-w-[1170px] w-full relative index-animation-min:flex mobile:block px-5">
				<div class="desktop:max-h-[564px] desktop:overflow-y-hidden feature-list index-animation-min:max-w-[430px] w-full flex justify-center flex-wrap gap-10">
					<div class="max-w-[430px] rounded-[20px] bg-gradient-to-br from-[#2c2f3e] to-[#422f41] w-full py-88px px-40px desktop:px-54px index-animation-min:mt-56px">
						<ul class="list-none">
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Bi-directional webhooks
							</li>
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Independently scalable
							</li>
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Signature
							</li>
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Retries
							</li>
							<li class="flex items-center text-white-100">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Static IPs
							</li>
						</ul>
					</div>

					<div class="max-w-[430px] rounded-[20px] bg-gradient-to-br from-[#2c2f3e] to-[#422f41] w-full py-88px px-40px desktop:px-54px index-animation-min:mt-130px index-animation-min:mb-110px">
						<ul class="list-none">
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Language Agnostic
							</li>
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Flexible Configuration
							</li>
							<li class="flex items-center text-white-100 mb-[29px] relative font-medium text-18 after:absolute after:h-20px after:w-[1px] after:bg-white-8 after:-bottom-24px after:left-[11px]">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								URL per Event Type
							</li>
							<li class="flex items-center text-white-100">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Rich UI - Event Logs & Querying.
							</li>
						</ul>
					</div>
				</div>

				<div
					class="
						index-animation-min:max-w-[1103px] index-animation-min:translate-x-120px
						inline-block
						w-full
						index-animation-max:overflow-x-visible
						index-animation-min:overflow-x-hidden
						feature-img
						mt-16
						index-animation-min:mt-0
					"
					@click="expandImage = true"
				>
					<img src="~/assets/images/core-illustraton.png" class="index-animation-min:absolute index-animation-min:w-[1077px] index-animation-min:max-w-none" alt="core features" />
				</div>
			</div>
		</section>

		<!-- cta  -->
		<section class="px-20px pb-100px desktop:pb-130px">
			<div class="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(~/assets/images/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 class="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px desktop:mb-16px">Start sending webhooks now, risk free</h1>
				<p class="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">
					Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time and get started today.
				</p>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://dashboard.getconvoy.io/signup"
					class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit"
				>
					Get started for free
					<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right" />
				</a>
			</div>
		</section>

		<!-- blog -->
		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] desktop:p-80px p-40px">
			<div
				class="
					bg-white-100
					rounded-8px
					shadow-card
					max-w-[970px]
					pt-32px
					px-12px
					m-auto
					desktop:pl-56px desktop:pt-56px desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
					mobile:mb-48px
				"
			>
				<div class="desktop:max-w-[470px] p-10px">
					<div class="flex justify-between items-center mb-24px">
						<div class="py-2px px-16px bg-[#0747a6] bg-opacity-10 rounded-2px font-medium text-14 text-primary-100 uppercase">Blog post</div>
						<div class="font-medium text-14">{{ featurePosts[0].published_at | date }}</div>
					</div>
					<nuxt-link :to="'/blog/' + featurePosts[0].slug">
						<h3 class="desktop:text-32 text-26 font-bold">{{ featurePosts[0].title }}</h3>
					</nuxt-link>

					<p class="font-light text-grey-80 text-16 mb-16px">{{ featurePosts[0].description }}...</p>
					<div class="flex flex-col flex-wrap my-26px desktop:items-end desktop:flex-row desktop:justify-between">
						<a :href="featurePosts[0].primary_author.twitter ? 'http://twitter.com/' + featurePosts[0].primary_author.twitter : ''" target="_blank" class="flex items-start mb-40px desktop:mb-0">
							<div class="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center bg-grey-20">
								<img :src="require(`~/static/profile-images/${featurePosts[0].primary_author.name}.png`)" class="w-full mr-12px rounded-[50%]" alt="author imge" />
							</div>
							<div>
								<h5 class="font-medium mb-4px">{{ featurePosts[0].primary_author.name }}</h5>
								<p class="text-14 text-grey-80">Convoy</p>
							</div>
						</a>
						<nuxt-link :to="'/blog/' + featurePosts[0].slug" class="flex items-center text-primary-100 font-medium text-14">
							Read More
							<img src="~/assets/images/angle-right-primary.svg" class="w-20px" alt="read more icon" />
						</nuxt-link>
					</div>
				</div>
				<div class="w-full desktop:w-380px desktop:right-0 desktop:bottom-0 desktop:mt-0">
					<img :src="require(`~/static/feature-images/${featurePosts[0].feature_image}`)" class="rounded-br-10px w-full" alt="featured post img" />
				</div>
			</div>
		</section>

		<Footer></Footer>

		<section
			class="fixed top-0 left-0 w-screen h-screen bg-[#fafafe] transition-all duration-500"
			:class="expandImage ? 'visible animate-slideup opacity-100 z-[100000]' : 'invisible animate-slidedown opacity-0'"
			@click="expandImage = false"
		>
			<div class="flex justify-center items-center h-full max-w-[2000px] m-auto">
				<img src="~/assets/images/core-illustraton.png" class="w-full" alt="core features" />
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isSubmitingloadingEarlyAccessForm: false,
			subscribeButtonText: 'Subscribe',
			earlyAccessEmail: '',
			tabs: [
				{ label: 'Open Core', id: 'open' },
				{ label: 'App Portal', id: 'portal' }
			],
			activeTab: 'open',
			appPortal: ['Manage multiple endpoints', 'Debug **event logs**', 'Embed into your UI', 'SDK'],
			openCore: ['Team management', 'Mulitple projects', 'Debug logs and metric', 'Manage app and customers'],
			features: [
				{
					feature: 'Secure',
					description: 'Create secrets, sign payload, verify event. Increase security by enabling rolling secrets.',
					img: 'secure',
					shadow: 'shadow-[0_22px_24px_0px_rgba(65,111,244,0.2)]'
				},
				{
					feature: 'Ease of use',
					description: 'Easily filter & debug events sent to multiple applications & endpoints with Delivery Attempt Logs',
					img: 'ease',
					shadow: 'shadow-[0_22px_24px_0px_rgba(43,214,123,0.2)]'
				},
				{
					feature: 'Cloud & Language Agnostic',
					description: 'Deploy to any environment and send events from any language (Ruby, Golang, JavaScript etc)',
					img: 'cloud',
					shadow: 'shadow-[0_22px_24px_0px_rgba(247,227,109,0.2)]'
				},
				{
					feature: 'Rate Limiting',
					description: 'Avoid blasting too much events to a single endpoint at once with flexible rate limiting controls',
					img: 'rate',
					shadow: 'shadow-[0_22px_24px_0px_rgba(247,227,109,0.2)]'
				},
				{ feature: 'Scalable', description: 'Independently scale courier as your system needs grows.', img: 'scalable', shadow: 'shadow-[0_22px_24px_0px_rgba(43,214,123,0.2)]' },
				{ feature: 'Bi-directional webhooks', description: 'Publish and recieve web hooks events from any provider.', img: 'bidirectional', shadow: 'shadow-[0_22px_24px_0px_rgba(240,173,78,0.2)]' }
			],
			earlyAccessEmail: '',
			activeSlide: true,
			expandImage: false
		};
	},
	async asyncData({ $content }) {
		const featurePosts = await $content('blog')
			.where({ featured: { $eq: true } })
			.fetch();

		return { featurePosts };
	},
	mounted() {
		this.triggerSlide();
		this.animateOnScroll();
	},
	methods: {
		animateOnScroll() {
			let media = window.matchMedia('(min-width: 1405px)');
			if (media.matches) {
				this.$gsap.to('.feature-list', { duration: 2, scrollTo: { y: 'max' }, scrollTrigger: { trigger: '.features', scrub: true, start: '300px center', pin: true } });
				this.$gsap.to('.feature-img', {
					duration: 2,
					scrollTo: { x: 'max' },
					scrollTrigger: { trigger: '.features', scrub: true, start: '300px center', pin: true }
				});
			}
		},
		switchTabs(activeTab) {
			switch (activeTab) {
				case 'cloud':
					this.activeTab = 'cloud';
					break;
				case 'open':
					this.activeTab = 'open';
					break;
				case 'portal':
					this.activeTab = 'portal';
					break;
				default:
					break;
			}
		},
		async requestAccess() {
			this.isSubmitingloadingEarlyAccessForm = true;
			try {
				const response = await fetch('/.netlify/functions/subscribe', {
					method: 'POST',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json'
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
					body: JSON.stringify({
						email: this.earlyAccessEmail
					})
				});
				await response.json();
				this.subscribeButtonText = 'Subscribed';
				this.setDefaultAccessButtonText();
				this.isSubmitingloadingEarlyAccessForm = false;
			} catch (error) {
				this.subscribeButtonText = 'Error';
				this.setDefaultAccessButtonText();
				this.isSubmitingloadingEarlyAccessForm = false;
			}
		},
		setDefaultAccessButtonText() {
			setTimeout(() => {
				this.subscribeButtonText = 'Subscribe';
			}, 3000);
		},
		triggerSlide() {
			setInterval(() => {
				this.activeSlide = !this.activeSlide;
			}, 10000);
		}
	},
	created() {
		if (process.client) {
			window.addEventListener('scroll', this.handleScroll);
		}
	}
};
</script>
