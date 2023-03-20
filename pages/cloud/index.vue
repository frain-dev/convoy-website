<template>
	<div>
		<section class="max-w-[1162px] m-auto flex footer:flex-wrap justify-between items-center pt-220px pb-100px desktop:pb-200px px-20px">
			<div class="footer:order-2">
				<h1 class="desktop:text-[56px] desktop:leading-[80px] font-bold max-w-[569px]">
					All your webhooks management needs at the
					<span class="text-primary-100">best price.</span>
				</h1>

				<p class="max-w-[569px] mx-auto text-18 mobile:text-14 mt-16px">
					Reliable Webhooks Gateway with everything you need in one place including multi-region deployment, high availability and autoscaling.
				</p>
				<div class="mt-40px">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://dashboard.getconvoy.io/signup"
						class="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-100 text-white-100 mr-24px xs:mr-0 xs:mb-20px"
					>
						Get Started For Free
					</a>
				</div>
			</div>
			<div class="footer:order-1">
				<img src="~/assets/images/cloud-illustration.png" class="max-h-[436px]" alt="cloud image" />
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

		<!-- why engineers choose convoy  -->
		<section class="bg-white-100 py-100px desktop:py-160px px-20px">
			<div class="max-w-[1280px] m-auto">
				<h1 class="text-[48px] leading-[56px] font-bold max-w-[838px]">Why Engineers choose Convoy Cloud.</h1>

				<div class="flex justify-between flex-wrap gap-6 mt-80px desktop:mt-120px">
					<div class="max-w-[320px]">
						<img src="~/assets/images/everything-you-need.png" class="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]" alt="everything-you-need" />
						<p class="text-14 desktop:text-20">Everything you need, from using Kafka or SQS to circuit breaking to static IPs</p>
					</div>
					<div class="max-w-[320px]">
						<img src="~/assets/images/excellent-rate-limiting.png" class="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(43,214,123,0.2)]" alt="excellent-rate-limiting" />
						<p class="text-14 desktop:text-20">Excellent rate limiting and payload filtering, debug events without stress</p>
					</div>
					<div class="max-w-[320px]">
						<img src="~/assets/images/transparent-pricing.png" class="mb-16px rounded-8px shadow-[0px_22px_24px_rgba(247,227,109,0.2)]" alt="transparent-pricing" />
						<p class="text-14 desktop:text-20">Transparent pricing, we offer the best prices, pay for only what you use.</p>
					</div>
				</div>
			</div>
		</section>

		<section class="pt-100px desktop:pt-200px">
			<div class="bg-primary-500 rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-40px">
				<div class="mr-16px w-24px h-24px rounded-50% bg-success-100 flex justify-center items-center">
					<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
				</div>
				Straight-forward pricing, complete peace of mind
			</div>
			<h1 class="text-center font-bold max-w-[840px] desktop:text-[48px] desktop:leading-[58px] mt-16px mx-auto mb-80px desktop:mb-198px">One powerful gateway for all your webhooks.</h1>

			<div class="flex flex-col desktop:flex-row items-center justify-between max-w-[1297px] mx-auto mb-140px feature gap-x-20 gap-y-10" v-for="(feature, index) in cloudFeatures" :key="index">
				<div class="order-2 px-20px xs:px-10px desktop:px-0" :class="index === 1 ? 'desktop:order-2' : 'desktop:order-1'">
					<h3 class="font-semibold text-26 mb-40px">{{ feature.title }}</h3>
					<div class="flex items-start mb-18px" v-for="feat in feature.features" :key="feat">
						<img src="~/assets/images/svg/light-lightening.svg" alt="lightening" class="mr-18px" />
						<p class="text-18 font-light mobile:text-14 md:max-w-[542px]">{{ feat }}</p>
					</div>
				</div>
				<div class="md:max-w-[558px] tab:max-w-[450px] tab:ml-20px order-1" :class="index === 1 ? ' desktop:order-1' : ' desktop:order-2'">
					<img :src="require(`~/assets/images/${feature.img}.png`)" :alt="feature.title" class="object-contain" />
				</div>
			</div>
		</section>

		<GetStartedSection></GetStartedSection>
	</div>
</template>

<script>
import GetStartedSection from '~/components/GetStartedSection.vue';

export default {
	layout: 'home',
	components: { GetStartedSection },
	data() {
		return {
			cloudFeatures: [
				{
					title: 'Everything Webhooks',
					img: 'everything-webhooks',
					features: [
						'Manage millions of both outgoing and incoming web-hooks.',
						'Retries are free and rate limiting over 300 events per second.',
						'Very generous data retention policies of over 29 days.'
					]
				},
				{
					title: 'Robust features',
					img: 'robust-features',
					features: [
						'Pull events directly from message brokers like Kafka, Pubsub and SQS.',
						'Get access to Static IPs for easy management of endpoints.',
						'Debug faster with excellent payload filters that get things done.'
					]
				},
				{
					title: 'Maximum Efficiency',
					img: 'maximum-efficiency',
					features: [
						'Portal links for your customers to access their events and retry themselves',
						'Well documented APIs and Convoy CLI service.',
						'Deploy to any Environment and use any language of choice.'
					]
				}
			],
			activeSlide: true,
			expandImage: false
		};
	}
};
</script>
