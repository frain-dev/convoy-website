<template>
	<div>
		<section class="cta-section">
			<div class="flex flex-col justify-between desktop:items-center desktop:flex-row m-auto pt-150px pb-60px px-20px max-w-[1200px] min-h-[80vh] w-full">
				<div class="max-w-[624px] m-auto desktop:ml-0 w-full">
					<div class="bg-[#403041] rounded-[40px] w-fit py-10px px-20px flex items-center text-14 text-white-100 m-auto desktop:ml-0 mb-40px">
						We are backed by
						<img src="~/assets/images/y-combinator.svg" class="ml-16px w-24px h-24px" alt="y-combinator" />
					</div>

					<h1 class="text-32 desktop:text-[56px] desktop:leading-[80px] font-extrabold text-white-100 text-center desktop:text-left">An Open Source Webhooks Proxy</h1>
					<p class="text-white-100 text-18 mt-16px max-w-[530px] m-auto desktop:ml-0 mb-40px text-center desktop:text-left">
						With out-of-the-box security, reliability and scalability for your webhooks infrastructure.
					</p>
					<div class="w-full m-auto flex justify-center desktop:justify-start xs:flex-wrap mb-50px">
						<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/signup" class="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-100 text-white-100 mr-24px xs:mr-0 xs:mb-20px">
							Get Started For Free
						</a>

						<a href="/demo" class="py-12px px-28px text-14 font-medium rounded-8px bg-white-100 text-primary-100 flex items-center">Book a Demo</a>
					</div>

					<ul class="flex items-center justify-center desktop:justify-start list-none w-full mt-60px m-auto desktop:ml-0" style="filter: brightness(0) invert(1)">
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://buycoins.africa/">
								<img src="~/assets/images/buycoins.png" class="w-90px" alt="buycoins logo" />
							</a>
						</li>
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.getwallets.co/">
								<img src="~/assets/images/getwallets.svg" class="w-90px" alt="getwallets logo" />
							</a>
						</li>
						<li class="mr-20px desktop:mr-50px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.dojah.io/">
								<img src="~/assets/images/dojah.svg" class="w-70px" alt="dojah logo" />
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
						<button @click="activeSlide = true" class="w-[47px] h-[3px] rounded-16px mr-14px bg-[#5F4C62] relative before:absolute before:h-[3px] before:rounded-16px before:-mt-2px before:-ml-22px" :class="activeSlide ? 'before:bg-transparent before:w-[1px] before:transition-none' : 'before:w-[47px] before:bg-[#8E7392] before:transition-all before:duration-[10s]'"></button>
						<button @click="activeSlide = false" class="w-[47px] h-[3px] rounded-16px bg-[#5F4C62] relative before:absolute before:h-[3px] before:rounded-16px before:-mt-2px before:-ml-22px" :class="activeSlide ? 'before:w-[47px] before:bg-[#8E7392] before:transition-all before:duration-[10s]' : 'before:bg-transparent  before:w-[1px] before:transition-none'"></button>
					</div>
				</div>
			</div>
		</section>

		<!-- why use use use  -->
		<section class="mb-100px desktop:mb-130px mt-60px desktop:mt-130px max-w-[1170px] w-full m-auto px-20px">
			<h1 class="text-center text-32 desktop:text-[48px] desktop:leading-[58px] font-bold">Why use Convoy</h1>
			<p class="text-center text-14 desktop:text-14 text-grey-80 font-normal mt-20px desktop:mt-16px mb-40px desktop:mb-88px max-w-[540px] w-full m-auto">
				Easily filter & debug events sent to multiple applications & endpoints with Delivery Attempt Logs
			</p>

			<div class="grid grid-cols-[repeat(auto-fill,minmax(260px,_1fr))] gap-32px">
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
						<button class="rounded-6px py-12px px-8px desktop:px-60px min-w-[134px] desktop:min-w-[220px] transition-all duration-300" :class="activeTab === tab.id ? 'bg-white-100 shadow-sm' : ''" @click="switchTabs(tab.id)">
							<span class="text-14 tracking-[0.02em] transition-all duration-300" :class="activeTab === tab.id ? 'font-bold text-black' : 'text-white-100'">{{ tab.label }}</span>
						</button>
					</li>
				</div>

				<div class="w-full min-h-[280px] h-full">
					<div class="flex flex-col items-center justify-center transition-all duration-500 ease-in-out" :class="activeTab === 'portal' ? 'animate-slideup block opacity-100' : 'opacity-0 hidden animate-slidedown'">
						<h1 class="text-32 desktop:text-[40px] desktop:leading-[60px] text-white-100 font-bold text-center">App Portal</h1>
						<p class="text-white-100 text-center text-14 desktop:text-18 mt-20px desktop:mt-16px max-w-[860px] m-auto">
							With the app portal, we're enabling you to extend the visibility our dashboard provides you to your customers. They no longer need to reach out to you to know what is happening with
							their events.
						</p>

						<div class="flex justify-start desktop:justify-center m-auto mobile:overflow-x-scroll mobile:scroll-smooth no-scrollbar mt-30px desktop:mt-40px w-full">
							<div class="bg-white-10 pl-12px pr-40px desktop:px-12px py-8px rounded-6px mr-24px last-of-type:mr-0 flex items-center text-white-100 text-14 font-medium w-fit whitespace-nowrap" v-for="feature of appPortal" :key="feature">
								<img src="~/assets/images/green_check.svg" class="mr-12px" alt="check" />
								{{ feature }}
							</div>
						</div>
					</div>

					<div class="flex flex-col items-center justify-center transition-all duration-500 ease-in-out" :class="activeTab === 'open' ? 'animate-slideup block opacity-100' : 'opacity-0 hidden animate-slidedown'">
						<h1 class="text-32 desktop:text-[40px] desktop:leading-[60px] text-white-100 font-bold text-center">Open Core</h1>
						<p class="text-white-100 text-center text-14 desktop:text-18 mt-20px desktop:mt-16px max-w-[860px] m-auto">
							Convoy is an open-source service that enables you to send webhook events to users, customers, and platforms reliably, securely in a scalable manner. Our open-core is open-source
							first i.e community-driven, so you can be sure to get reliable support.
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
							<li class="flex items-center text-white-100 font-medium text-18">
								<img src="~/assets/images/feature-check-icon.svg" class="w-24px mr-24px" alt="check icon" />
								Rich UI - Event Logs & Querying
							</li>
						</ul>
					</div>
				</div>

				<div class="
						index-animation-min:max-w-[1103px] index-animation-min:translate-x-120px
						inline-block
						w-full
						index-animation-max:overflow-x-visible
						index-animation-min:overflow-x-hidden
						feature-img
						mt-16
						index-animation-min:mt-0
					" @click="expandImage = true">
					<img src="~/assets/images/core-illustraton.png" class="index-animation-min:absolute index-animation-min:w-[1077px] index-animation-min:max-w-none" alt="core features" />
				</div>
			</div>
		</section>

		<section class="fixed top-0 left-0 w-screen h-screen bg-[#fafafe] transition-all duration-500" :class="expandImage ? 'visible animate-slideup opacity-100 z-[100000]' : 'invisible animate-slidedown opacity-0'" @click="expandImage = false">
			<div class="flex justify-center items-center h-full max-w-[2000px] m-auto">
				<img src="~/assets/images/core-illustraton.png" class="w-full" alt="core features" />
			</div>
		</section>

		<GetStartedSection></GetStartedSection>
	</div>
</template>

<script>
import GetStartedSection from '~/components/GetStartedSection.vue';

export default {
	layout: "home",
	data() {
		return {
			tabs: [
				{ label: "Open Core", id: "open" },
				{ label: "App Portal", id: "portal" }
			],
			activeTab: "open",
			appPortal: ["Manage multiple endpoints", "Debug **event logs**", "Embed into your UI", "SDK"],
			openCore: ["Team management", "Mulitple projects", "Debug logs and metric", "Manage app and customers"],
			features: [
				{
					feature: "Secure",
					description: "Create secrets, sign payload, verify event. Increase security by enabling rolling secrets.",
					img: "secure",
					shadow: "shadow-[0_22px_24px_0px_rgba(65,111,244,0.2)]"
				},
				{
					feature: "Ease of use",
					description: "Easily filter & debug events sent to multiple applications & endpoints with Delivery Attempt Logs",
					img: "ease",
					shadow: "shadow-[0_22px_24px_0px_rgba(43,214,123,0.2)]"
				},
				{
					feature: "Cloud & Language Agnostic",
					description: "Deploy to any environment and send events from any language (Ruby, Golang, JavaScript etc)",
					img: "cloud",
					shadow: "shadow-[0_22px_24px_0px_rgba(247,227,109,0.2)]"
				},
				{
					feature: "Rate Limiting",
					description: "Avoid blasting too much events to a single endpoint at once with flexible rate limiting controls",
					img: "rate",
					shadow: "shadow-[0_22px_24px_0px_rgba(247,227,109,0.2)]"
				},
				{ feature: "Scalable", description: "Independently scale courier as your system needs grows.", img: "scalable", shadow: "shadow-[0_22px_24px_0px_rgba(43,214,123,0.2)]" },
				{ feature: "Bi-directional webhooks", description: "Publish and recieve web hooks events from any provider.", img: "bidirectional", shadow: "shadow-[0_22px_24px_0px_rgba(240,173,78,0.2)]" }
			],
			activeSlide: true,
			expandImage: false
		};
	},
	mounted() {
		this.triggerSlide();
		this.animateOnScroll();
	},
	methods: {
		animateOnScroll() {
			let media = window.matchMedia("(min-width: 1405px)");
			if (media.matches) {
				this.$gsap.to(".feature-list", { duration: 2, scrollTo: { y: "max" }, scrollTrigger: { trigger: ".features", scrub: true, start: "300px center", pin: true } });
				this.$gsap.to(".feature-img", {
					duration: 2,
					scrollTo: { x: "max" },
					scrollTrigger: { trigger: ".features", scrub: true, start: "300px center", pin: true }
				});
			}
		},
		switchTabs(activeTab) {
			switch (activeTab) {
				case "cloud":
					this.activeTab = "cloud";
					break;
				case "open":
					this.activeTab = "open";
					break;
				case "portal":
					this.activeTab = "portal";
					break;
				default:
					break;
			}
		},
		triggerSlide() {
			setInterval(() => {
				this.activeSlide = !this.activeSlide;
			}, 10000);
		}
	},
	components: { GetStartedSection }
};
</script>
