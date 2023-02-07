<template>
	<div>
		<section class="max-w-[1062] flex flex-col justify-center items-center pt-220px pb-100px desktop:pb-236px px-20px">
			<div class="bg-primary-500 rounded-[40px] w-fit py-10px px-20px flex items-center text-14 mb-40px">
				We are backed by
				<img src="~/assets/images/y-combinator.svg" class="ml-16px w-24px h-24px" alt="y-combinator" />
			</div>
			<h1 class="text-center desktop:text-[56px] desktop:leading-[80px] font-bold">Reliable Webhooks Gateway for</h1>
			<h1 class="text-center desktop:text-[56px] desktop:leading-[80px] font-bold text-primary-100">Efficient Engineers</h1>
			<p class="text-center max-w-[1062px] mx-auto text-18 mobile:text-14 mt-16px">
				Securely Send, Receive and Manage millions of Webhooks Reliably with robust support for Retries, Rate Limiting, Static IPs, Circuit Breaking, Rolling Secrets and more.
			</p>
			<div class="flex justify-center xs:flex-col mt-40px">
				<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/signup" class="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-100 text-white-100 mr-24px xs:mr-0 xs:mb-20px">
					Get Started For Free
				</a>

				<a href="/demo" class="py-12px px-28px text-14 font-medium rounded-8px bg-white-100 text-primary-100 text-center">Book a Demo</a>
			</div>
		</section>

		<section class="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(180deg,#2c2f3e_0%,#422f41_100%)] -mb-78px max-w-[1350px] w-[90%] z-auto relative">
			<div class="w-full md:bg-[url(~/assets/images/Settings.png)] bg-no-repeat bg-right desktop:bg-contain rounded-[70px] min-h-[200px] py-30px desktop:py-56px px-20px desktop:px-70px">
				<p class="font-bold text-white-100 text-24 desktop:text-32 max-w-[690px]">
					Engineering teams that value efficiency use
					<span class="text-primary-300">Convoy</span>
					to manage webhook events.
				</p>

				<ul class="flex items-center list-none mt-38px">
					<li class="mr-12px">
						<a target="_blank" rel="noopener noreferrer" href="https://buycoins.africa/">
							<img src="~/assets/images/buycoins.svg" alt="buycoins logo" />
						</a>
					</li>
					<li class="mr-12px">
						<a target="_blank" rel="noopener noreferrer" href="https://www.getwallets.co/">
							<img src="~/assets/images/getwallets.svg" alt="getwallets logo" />
						</a>
					</li>
					<li class="mr-12px">
						<a target="_blank" rel="noopener noreferrer" href="https://www.dojah.io/">
							<img src="~/assets/images/dojah.svg" alt="dojah logo" />
						</a>
					</li>
					<li class="">
						<a target="_blank" rel="noopener noreferrer" href="https://termii.com/">
							<img src="~/assets/images/termii.svg" alt="termii logo" />
						</a>
					</li>
				</ul>
			</div>
		</section>

		<!-- why use us  -->
		<section class="flex flex-col justify-center items-center pt-254px bg-white-100">
			<div class="bg-primary-500 rounded-[40px] w-fit py-10px px-20px flex items-center text-14 mb-40px">
				<div class="mr-16px w-24px h-24px rounded-50% bg-success-100 flex justify-center items-center">
					<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
				</div>
				Why use Convoy?
			</div>
			<h1 class="text-center font-bold max-w-[840px] desktop:text-[48px] desktop:leading-[58px] mt-16px mx-auto">Convoy is the Fastest Webhooks Gateway</h1>

			<div class="py-60px desktop:py-120px px-20px bg-white-100 features">
				<div class="flex flex-col desktop:flex-row items-center justify-between max-w-[1236px] mx-auto my-120px feature" v-for="(feature, index) of newFeatures.slice(0, 3)" :key="'feature' + index">
					<div class="order-2 desktop:order-1 px-30px desktop:px-0">
						<img :src="require(`~/assets/images/${feature.img}.png`)" :alt="feature.feature" class="w-48px h-48px mb-32px rounded-8px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]" />
						<h3 class="font-semibold mb-16px">{{ feature.title }}</h3>
						<p class="text-18 mobile:text-14 min-h-[72px] md:max-w-[542px]">{{ feature.body }}</p>
					</div>
					<div class="md:max-w-[558px] tab:max-w-[450px] tab:ml-20px order-1 desktop:order-2">
						<img :src="require(`~/assets/images/${feature.featureImg}.png`)" :alt="feature.featureImg" class="object-contain" />
					</div>
				</div>
				<div class="flex flex-col desktop:flex-row items-center justify-between max-w-[1236px] mx-auto my-120px feature" v-for="(feature, index) of newFeatures.slice(3, 6)" :key="'feature-b' + index">
					<div class="md:max-w-[558px] tab:max-w-[450px] tab:mr-20px">
						<img :src="require(`~/assets/images/${feature.featureImg}.png`)" :alt="feature.featureImg" class="object-contain" />
					</div>
					<div class="px-30px desktop:px-0">
						<img :src="require(`~/assets/images/${feature.img}.png`)" :alt="feature.feature" class="w-48px h-48px mb-32px rounded-8px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]" />
						<h3 class="font-semibold mb-16px">{{ feature.title }}</h3>
						<p class="text-18 mobile:text-14 min-h-[72px] md:max-w-[542px]">{{ feature.body }}</p>
					</div>
				</div>
			</div>
		</section>

		<!-- open-core  -->
		<section class="py-60px desktop:py-110px">
			<div class="max-w-[1170px] w-full m-auto px-20px">
				<div class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] rounded-16px pt-40px px-20px pb-100px desktop:px-66px desktop:pt-50px desktop:pb-200px">
					<div class="bg-[#4B4862] rounded-[40px] w-fit py-10px px-20px flex items-center text-14 text-white-100 mb-40px mx-auto">
						<div class="mr-16px w-24px h-24px rounded-50% bg-success-100 flex justify-center items-center">
							<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
						</div>
						Something great
					</div>

					<div class="w-full min-h-[280px] h-full">
						<div class="flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
							<h1 class="text-32 desktop:text-[40px] desktop:leading-[60px] text-white-100 font-bold text-center">Open Source</h1>
							<p class="text-white-100 text-center text-14 desktop:text-18 mt-20px desktop:mt-16px max-w-[860px] m-auto">
								Convoy is an open-source software that enables you to send webhook events to users, customers, and platforms reliably, securely in a scalable manner. Our software is fully
								open-source for developers to use and deploy in their environments.
							</p>

							<div class="flex justify-start desktop:justify-center m-auto mobile:overflow-x-scroll mobile:scroll-smooth no-scrollbar mt-30px desktop:mt-40px w-full">
								<div class="bg-white-10 pl-12px pr-40px desktop:px-12px py-8px rounded-6px mr-24px last-of-type:mr-0 whitespace-nowrap flex items-center text-white-100 text-14 font-medium w-fit" v-for="feature of openCore" :key="feature">
									<img src="~/assets/images/green_check.svg" class="mr-12px" alt="check" />
									{{ feature }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-[#082B91] bg-opacity-[0.07] w-11/12 h-220px desktop:h-270px rounded-b-16px m-auto relative">
					<div class="absolute left-1/2 -translate-x-1/2 -top-100px xs:-top-70px desktop:-top-200px w-full">
						<img src="~/assets/images/core.png" alt="group" class="xs:hidden max-w-[866px] desktop:w-full w-5/6 m-auto" />
						<img src="~/assets/images/groups-img-small.png" class="hidden xs:block m-auto w-5/6" alt="group" />
						<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/" class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-32px w-fit">
							Get started for free
							<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right" />
						</a>
					</div>
				</div>
			</div>
		</section>

		<section class="bg-[#fcfcfc] py-60px desktop:py-80px px-24px desktop:px-64px">
			<div class="max-w-[1312px] w-full m-auto">
				<h2 class="font-bold desktop:text-32 mb-22px">Developers use Convoy Webhooks Gateway to securely ingest, persist, debug, deliver and manage millions of events reliably...</h2>
				<a href="#" class="text-primary-100">Learn about our infrastructure</a>
			</div>

			<div class="bg-white-100 rounded-[30px] max-w-[1062px] mx-auto mt-52px flex justify-center py-20px px-20px desktop:px-80px hover:cursor-pointer" @click="expandImage = true">
				<img src="~/assets/images/2nd-illustration.png" alt="infrastructure" />
			</div>
		</section>

		<section class="max-w-[1234px] mx-auto pt-60px px-20px desktop:pt-180px pb-60px desktop:pb-116px">
			<div class="bg-primary-500 rounded-[40px] w-fit py-10px px-20px flex items-center text-14 mb-40px">
				<div class="mr-16px w-24px h-24px rounded-50% bg-warning-100 flex justify-center items-center">
					<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
				</div>
				Work more efficiently!
			</div>
			<h1 class="desktop:text-[48px] desktop:leading-[60px] font-bold max-w-[842px]">All-in-one Webhooks Gateway for all your event needs</h1>
		</section>

		<section>
			<div class="slideshow">
				<div class="firstSlide">
					<div v-for="(offer, index) of offerings" :key="'offer' + index" class="shadow-[14px_20px_24px_rgba(20,37,63,0.04)] rounded-[60px] flex flex-col justify-center items-center py-20px px-86px h-[80px] desktop:h-[98px] w-fit mx-20px" :class="offer.class">
						<img :src="require(`~/assets/images/svg/${offer.img}.svg`)" class="w-24px mb-10px" alt="feature icon" />
						<p class="text-16">{{ offer.offer }}</p>
					</div>
				</div>
			</div>
			<div class="slideshow">
				<div class="secondSlide">
					<div v-for="(offer, index) of offerings.reverse()" :key="'offer' + index" class="shadow-[14px_20px_24px_rgba(20,37,63,0.04)] rounded-[60px] flex flex-col justify-center items-center h-[80px] desktop:h-[98px] w-fit mx-20px py-20px px-86px" :class="offer.class">
						<img :src="require(`~/assets/images/svg/${offer.img}.svg`)" class="w-24px mb-10px" alt="feature icon" />
						<p class="text-16">{{ offer.offer }}</p>
					</div>
				</div>
			</div>
		</section>

		<section class="fixed top-0 left-0 w-screen h-screen bg-[#fafafe] transition-all duration-500" :class="expandImage ? 'visible animate-slideup opacity-100 z-[100000]' : 'invisible animate-slidedown opacity-0'" @click="expandImage = false">
			<div class="flex justify-center items-center h-full max-w-[2000px] m-auto">
				<img src="~/assets/images/2nd-illustration.png" class="w-full" alt="infrastructure" />
			</div>
		</section>

		<GetStartedSection></GetStartedSection>
	</div>
</template>

<script>
import GetStartedSection from '~/components/GetStartedSection.vue';

export default {
	layout: 'home',
	data() {
		return {
			tabs: [
				{ label: 'Open Source', id: 'open' },
				{ label: 'App Portal', id: 'portal' }
			],
			activeTab: 'open',
			openCore: ['Team management', 'Mulitple projects', 'Debug logs and metric', 'Manage app and customers'],

			newFeatures: [
				{
					img: 'send',
					title: 'Send and Recieve webhooks',
					body: 'You can both publish and receive millions of Webhooks events from any provider. Both API providers and API consumers can benefit from using Convoy',
					featureImg: 'send-and-receive-webhooks'
				},
				{
					img: 'secure',
					title: 'Secure all Payload',
					body: 'Create secrets, sign payload, verify events. Increase security by enabling rolling secrets. Prevents well known attacks like SSRF (Server-Side Request Forgery).',
					featureImg: 'secure-all-payload'
				},
				{
					img: 'no-language',
					title: 'No Language Lock-in',
					body: 'Use any cloud technology and deploy to any environment and send events from any language. We have built SDKs in a number of languages (Ruby, Golang, JavaScript etc) to make integrating sending and receiving webhooks a breeze.',
					featureImg: 'no-language-lock-in'
				},
				{
					img: 'scale',
					title: 'Scale without worries',
					body: 'Independently scale convoy as your system needs grows. You can horizontally scale convoy’s components (API server, dispatch workers, egress gateway)',
					featureImg: 'scale-without-worries'
				},
				{
					img: 'efficient',
					title: 'Efficient Rate Limiting',
					body: 'Avoid blasting too much events to a single endpoint at once with flexible rate limiting controls. Rate limits can be configured at both high level and per endpoint.',
					featureImg: 'efficient-rate-limiting'
				},
				{
					img: 'stress',
					title: 'Stress free event debugging',
					body: 'Easily filter & debug events sent to multiple applications & endpoints with Delivery Attempt Logs. The Dashboards helps you easily fix customer issues and have a guaranteed audit trail in addition to application logs.',
					featureImg: 'stress-free-event-debugging'
				}
			],
			offerings: [
				{ offer: 'Independently scalable', img: 'independently', class: 'bg-success-400' },
				{ offer: 'Bi-directional webhooks', img: 'bi-directional', class: 'bg-[#D4D1FA]' },
				{ offer: 'Static IP’s', img: 'static', class: 'bg-[#F8DEC7]' },
				{ offer: 'Retries', img: 'retries', class: 'bg-[#F2F2F2]' },
				{ offer: 'Language Agnostic', img: 'language-agnostic', class: 'bg-[#D1F0FA]' },
				{ offer: 'Rich UI - Event Logs & Querying', img: 'monitor', class: 'bg-[#FCE3AD]' },
				{ offer: 'Flexible Configuration', img: 'flexible', class: 'bg-[#E3EDF7]' },
				{ offer: 'URL per Event Type', img: 'url', class: 'bg-alert-500' },
				{ offer: 'Independently scalable', img: 'independently', class: 'bg-success-400' },
				{ offer: 'Bi-directional webhooks', img: 'bi-directional', class: 'bg-[#D4D1FA]' },
				{ offer: 'Static IP’s', img: 'static', class: 'bg-[#F8DEC7]' },
				{ offer: 'Retries', img: 'retries', class: 'bg-[#F2F2F2]' },
				{ offer: 'Language Agnostic', img: 'language-agnostic', class: 'bg-[#D1F0FA]' },
				{ offer: 'Rich UI - Event Logs & Querying', img: 'monitor', class: 'bg-[#FCE3AD]' },
				{ offer: 'Flexible Configuration', img: 'flexible', class: 'bg-[#E3EDF7]' },
				{ offer: 'URL per Event Type', img: 'url', class: 'bg-alert-500' },
			],
			activeSlide: true,
			expandImage: false
		};
	},
	mounted() {
		this.animateOnScroll();
	},
	methods: {
		animateOnScroll() {
			let media = window.matchMedia('(min-width: 1024px)');
			if (media.matches) {
				const animate = this.$gsap.utils.toArray('.feature');
				animate.forEach(feature => {
					this.$gsap.to(feature, { duration: 5, scrollTrigger: { trigger: feature, start: '140px center', scrub: true, pin: true } });
				});
			}
		}
	},
	components: { GetStartedSection }
};
</script>

<style lang="scss" scoped>
.slideshow {
	height: 150px;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	transform: translate3d(0, 0, 0);
	white-space: nowrap;

	.firstSlide {
		animation: moveSlideshow 20s linear infinite;
		display: flex;
		width: calc(250px * 12);

		&:hover {
			-webkit-animation-play-state: paused;
			-moz-animation-play-state: paused;
			-o-animation-play-state: paused;
			animation-play-state: paused;
		}
	}

	.secondSlide {
		animation: scroll 20s linear infinite;
		display: flex;
		width: calc(250px * 12);

		&:hover {
			-webkit-animation-play-state: paused;
			-moz-animation-play-state: paused;
			-o-animation-play-state: paused;
			animation-play-state: paused;
		}
	}
}

@keyframes scroll {
	0% {
		transform: translateX(100px);
	}

	100% {
		transform: translateX(calc(-2330px)) // transform: translateX(5160.688px)
	}
}
</style>
