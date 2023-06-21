<template>
	<div>
		<section class="bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)] pt-200px pb-100px desktop:pt-200px desktop:pb-120px" id="home">
			<div class="max-w-[1350px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
				<div>
					<h1 class="text-white-100 text-32 md:text-[56px] md:leading-[80px] max-w-[680px] font-bold footer:text-center">Make Webhooks management our problem, not yours</h1>
					<p class="text-white-100 max-w-[660px] mx-auto text-18 mobile:text-14 mt-16px mb-40px footer:text-center">
						Reliable Webhooks Gateway with everything you need in one place including multi-region deployment, high availability and autoscaling.
					</p>
				</div>
				<div class="max-w-[565px]">
					<CloudWaitlist></CloudWaitlist>
				</div>
			</div>
		</section>

		<section class="bg-white-100 px-20px mt-100px desktop:mt-160px">
			<div class="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)] max-w-[1350px]">
				<div class="w-full md:bg-[url(~/assets/images/Settings.png)] bg-no-repeat bg-right desktop:bg-contain rounded-[70px] min-h-[200px] py-30px desktop:py-56px px-20px desktop:px-70px">
					<p class="font-bold text-white-100 text-24 desktop:text-32 max-w-[690px]">Engineering teams that value efficiency use Convoy to manage webhook events.</p>

					<ul class="flex items-center list-none mt-38px">
						<li class="mr-12px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.drivehailify.com/">
								<img src="~/assets/images/hailify-logo.svg" alt="hailify logo" />
							</a>
						</li>
						<li class="mr-12px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.piggyvest.com/">
								<img src="~/assets/images/piggyvest.svg" alt="piggyvest logo" />
							</a>
						</li>
						<li class="mr-12px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.catlog.shop/">
								<img src="~/assets/images/Catlog.svg" alt="catlog logo" />
							</a>
						</li>
						<li class="mr-12px">
							<a target="_blank" rel="noopener noreferrer" href="https://www.payourse.com/">
								<img src="~/assets/images/payourse.svg" class="mt-4px" alt="payourse logo" />
							</a>
						</li>
						<li class="mr-12px hidden desktop:block">
							<a target="_blank" rel="noopener noreferrer" href="https://buycoins.africa/">
								<img src="~/assets/images/buycoins.svg" alt="buycoins logo" />
							</a>
						</li>
						<li class="mr-12px hidden desktop:block">
							<a target="_blank" rel="noopener noreferrer" href="https://www.getwallets.co/">
								<img src="~/assets/images/getwallets.svg" alt="getwallets logo" />
							</a>
						</li>
						<li class="mr-12px hidden desktop:block">
							<a target="_blank" rel="noopener noreferrer" href="https://www.dojah.io/">
								<img src="~/assets/images/dojah.svg" alt="dojah logo" />
							</a>
						</li>
						<li class="mr-12px hidden desktop:block">
							<a target="_blank" rel="noopener noreferrer" href="https://termii.com/">
								<img src="~/assets/images/termii.svg" alt="termii logo" />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<section class="bg-white-100 py-100px desktop:py-160px">
			<div class="max-w-[1350px] m-auto px-20px">
				<div class="bg-primary-500 rounded-[40px] w-fit footer:m-auto py-10px px-20px flex items-center text-14 mb-40px">
					<div class="mr-16px w-24px h-24px rounded-50% bg-primary-100 flex justify-center items-center">
						<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
					</div>
					First choice for developers
				</div>
				<h1 class="text-[48px] leading-[56px] font-bold footer:text-center max-w-[600px]">Why Engineers choose Convoy</h1>

				<div class="flex justify-between flex-wrap gap-6 mt-80px desktop:mt-120px">
					<div class="desktop:max-w-[340px]">
						<img src="~/assets/images/fully-managed.png" class="mb-16px h-48px rounded-10px shadow-[0px_22px_24px_rgba(65,111,244,0.2)]" alt="everything-you-need" />
						<p class="text-14 desktop:text-20">Fully managed global cloud infrastructure with high availability and resilience baked in.</p>
					</div>
					<div class="desktop:max-w-[400px]">
						<img src="~/assets/images/stay-compliant.png" class="mb-16px h-48px rounded-10px shadow-[0px_22px_24px_rgba(43,214,123,0.2)]" alt="excellent-rate-limiting" />
						<p class="text-14 desktop:text-20 max-w-[333px]">Stay compliant by choosing the region we host and store your webhooks data.</p>
					</div>
					<div class="desktop:max-w-[340px]">
						<img src="~/assets/images/transparent-usage.png" class="mb-16px h-48px rounded-10px shadow-[0px_22px_24px_rgba(247,227,109,0.2)]" alt="transparent-pricing" />
						<p class="text-14 desktop:text-20">Transparent usage-based pricing, keep costs under control by paying for what you use.</p>
					</div>
				</div>
			</div>
		</section>

		<section class="pt-100px desktop:pt-200px">
			<div class="bg-primary-500 rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-40px">
				<div class="mr-16px w-24px h-24px rounded-50% bg-primary-100 flex justify-center items-center">
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
						<p class="text-18 font-light mobile:text-14 md:max-w-[542px]">
							{{ feat }}
						</p>
					</div>
				</div>
				<div class="md:max-w-[558px] tab:max-w-[450px] tab:ml-20px order-1" :class="index === 1 ? ' desktop:order-1' : ' desktop:order-2'">
					<img :src="require(`~/assets/images/${feature.img}.png`)" :alt="feature.title" class="object-contain" />
				</div>
			</div>
		</section>

		<section class="bg-[linear-gradient(77deg,#36317A_-29%,#4A87C5_88%)]">
			<div class="max-w-[1350px] m-auto px-20px pb-80px desktop:pb-150px pt-80px">
				<div class="bg-white-100 rounded-[40px] w-fit footer:mx-auto py-10px px-20px flex items-center text-14 mb-40px">
					<div class="mr-16px w-24px h-24px rounded-50% bg-primary-200 flex justify-center items-center">
						<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
					</div>
					Be a part of the community!
				</div>

				<h1 class="text-white-100 text-[40px] leading-[60px] font-bold mb-80px mt-10px max-w-[880px] footer:text-center">Connect with the Convoy community across all our platforms</h1>
				<div class="grid grid-cols-1 tab:grid-cols-2 md:grid-cols-3 gap-5 flex-wrap">
					<form class="bg-white-100 rounded-10px p-40px md:col-span-2" @submit.prevent="subscribeToNewsletter()">
						<img src="~/assets/images/svg/subscribe.svg" class="mb-20px" alt="subscribe icon" />

						<h3 class="font-bold mb-10px">Subscribe to our newsletter</h3>
						<p class="text-16 mb-44px">We are constantly innovating, join the companies staying on top of Convoy updates.</p>

						<input
							id="email"
							type="email"
							class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-new.gray-300 text-grey-100 border border-new.primary-25 valid:border-new.primary-25 disabled:border-new.primary-25 disabled:bg-white-100 hover:border-new.primary-50 focus:border-new.primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px mb-20px"
							v-model="earlyAccessEmail"
							placeholder="Email address"
							required
						/>
						<div class="flex justify-end">
							<button
								@click.prevent="subscribeToNewsletter()"
								class="flex items-center justify-center py-12px desktop:py-16px px-38px desktop:px-42px whitespace-nowrap text-14 font-medium rounded-8px bg-primary-100 text-white-100 xs:mb-20px shadow-sm xs:w-full"
								:disabled="isSubmittingEmailForNewsletter"
							>
								{{ subscribeButtonText }}
								<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right icon" />
							</button>
						</div>
					</form>
					<div class="bg-white-100 rounded-10px p-40px">
						<img src="~/assets/images/svg/join-slack.svg" class="mb-20px" alt="subscribe icon" />

						<h3 class="font-bold mb-10px">Join our developer community</h3>
						<p class="text-16 desktop:h-116px">Convoy is open source. Follow us on Twitter, star our Github repo and join our Slack community!</p>
						<div class="flex items-center mt-20px xs:mb-20px">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email"
								class="flex items-center py-12px desktop:py-16px px-20px desktop:px-32px whitespace-nowrap text-14 font-medium rounded-8px bg-primary-100 text-white-100 mr-20px shadow-sm"
							>
								Join our Slack
								<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right icon" />
							</a>

							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/frain-dev/convoy"
								class="flex items-center py-12px desktop:py-16px whitespace-nowrap text-14 font-medium rounded-8px text-primary-100"
							>
								Star our Github
								<img src="~/assets/images/svg/github.svg" class="ml-12px" alt="github icon" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="px-20px pb-100px desktop:pb-130px">
			<div class="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(~/assets/images/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 class="text-32 desktop:text-[40px] text-white-100 font-bold tracking-[0.02em] text-center mb-20px max-w-[562px] m-auto">Start sending and receiving webhooks now, risk free</h1>
				<p class="text-center text-14 desktop:text-18 text-white-100 max-w-[806px] m-auto">
					Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time and get started today.
				</p>
				<a href="#home" class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
					Request Access
					<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right" />
				</a>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	layout: 'home',
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
			isSubmittingEmailForNewsletter: false,
			activeSlide: true,
			expandImage: false,
			subscribeButtonText: 'Subscribe',
			earlyAccessEmail: ''
		};
	},
	methods: {
		async subscribeToNewsletter() {
			this.isSubmittingEmailForNewsletter = true;
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
				this.isSubmittingEmailForNewsletter = false;
			} catch (error) {
				this.subscribeButtonText = 'Error';
				this.setDefaultAccessButtonText();
				this.isSubmittingEmailForNewsletter = false;
			}
		},
		setDefaultAccessButtonText() {
			setTimeout(() => {
				this.subscribeButtonText = 'Subscribe';
			}, 3000);
		}
	}
};
</script>
