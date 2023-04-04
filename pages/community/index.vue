<template>
	<div>
		<section class="bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] pt-200px pb-100px desktop:pt-250px desktop:pb-150px mb-100px">
			<div class="max-w-[1350px] m-auto flex footer:flex-wrap justify-between items-center px-20px">
				<div>
					<h1 class="text-white-100 text-32 md:text-[56px] md:leading-[80px] max-w-[680px] font-bold footer:text-center">Open-source Gateway for incoming and outgoing webhooks</h1>
					<p class="text-white-100 max-w-[660px] text-14 md:text-18 my-16px footer:text-center">
						Everything you need to manage webhooks in one place with security, reliability and scalability already figured out from day one.
					</p>
					<div class="flex footer:justify-center mt-40px">
						<a
							target="_blank"
							href="https://github.com/frain-dev/convoy#installation-getting-started"
							class="py-12px desktop:py-16px px-38px desktop:px-42px text-14 font-medium rounded-8px bg-primary-100 text-white-100 text-center mr-24px xs:mr-0 xs:mb-20px xs:w-full"
						>
							Get set up in 3 minutes
						</a>
					</div>
				</div>
				<div class="md:bg-white-100 md:shadow-[0px_2px_4px_rgba(12,26,75,0.04),0px_4px_20px_-2px_rgba(50,50,71,0.08)] rounded-8px p-20px md:py-30px md:px-60px max-w-[565px] w-full">
					<div class="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
					<div class="bg-[#393040] border-[0.5px] border-[#F5F4F5] rounded-4px py-12px px-14px mb-24px flex items-center justify-between text-white-100 text-14" v-for="step of setupSteps" :key="step">
						<span>$ {{ step }}</span>
						<button type="button" class="bg-transparent" @click="copyCommand(step)">
							<img src="~/assets/images/svg/copy-icon.svg" alt="copy icon" />
						</button>
					</div>
					<div class="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
					<div class="hidden md:block rounded-10px max-w-[360px] h-8px bg-[#F5F4F5] my-30px m-auto"></div>
				</div>
			</div>
		</section>

		<section class="bg-white-100 px-20px desktop:mt-160px">
			<div class="rounded-[20px] desktop:rounded-[70px] mx-auto bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] max-w-[1350px]">
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
								<img src="~/assets/images/catlog.svg" alt="catlog logo" />
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

		<section class="py-100px desktop:py-200px bg-white-100">
			<div class="max-w-[1350px] m-auto px-20px">
				<div class="bg-[#F0F2FA] rounded-[40px] w-fit m-auto py-10px px-20px flex items-center text-14 mb-40px">
					<div class="mr-16px w-24px h-24px rounded-50% bg-grey-80 flex justify-center items-center">
						<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
					</div>
					Be a part of the community!
				</div>
				<h1 class="text-center font-bold max-w-[840px] text-24 md:text-[48px] md:leading-[58px] mt-16px mx-auto mb-80px md:mb-198px">Everything you need before you need it</h1>

				<div class="grid gird-cols-1 desktop:grid-cols-2 gap-8 desktop:gap-100px">
					<div class="flex justify-start items-start" v-for="(feature, index) of communityFeatures" :key="index">
						<img :src="require(`~/assets/images/svg/${feature.img}.svg`)" class="mr-14px" :alt="feature.title" />

						<div>
							<h2 class="font-bold mb-12px desktop:mb-24px footer:text-14">{{ feature.title }}</h2>
							<p class="text-12 desktop:text-18 text-grey-60">{{ feature.body }}</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="bg-[linear-gradient(180deg,#2C2F3E_0%,#422F41_100%)] mt-200px">
			<div class="max-w-[1350px] m-auto px-20px pb-80px desktop:pb-150px pt-80px">
				<div class="bg-white-100 rounded-[40px] footer:mx-auto w-fit py-10px px-20px flex items-center text-14 mb-40px">
					<div class="mr-16px w-24px h-24px rounded-50% bg-primary-200 flex justify-center items-center">
						<img src="~/assets/images/svg/lightening.svg" alt="lightening icon" />
					</div>
					Be a part of the community!
				</div>

				<h1 class="text-white-100 text-[40px] leading-[60px] font-bold mb-80px mt-10px max-w-[880px] footer:text-center">Connect with the Convoy community across all our platforms</h1>
				<div class="grid grid-cols-1 tab:grid-cols-2 md:grid-cols-3 gap-5 flex-wrap">
					<div class="bg-white-100 rounded-10px p-40px md:col-span-2">
						<img src="~/assets/images/svg/subscribe.svg" class="mb-20px" alt="subscribe icon" />

						<h3 class="font-bold mb-10px">Subscribe to our newsletter</h3>
						<p class="text-16 mb-44px">We are constantly innovating, join the companies staying on top of Convoy updates.</p>

						<input
							id="email"
							type="email"
							class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px appearance-none mb-20px"
							v-model="earlyAccessEmail"
							placeholder="Email address"
							required
						/>
						<div class="flex justify-end">
							<button
								@click="subscribeToNewsletter()"
								class="flex items-center justify-center py-12px desktop:py-16px px-38px desktop:px-42px whitespace-nowrap text-14 font-medium rounded-8px bg-primary-100 text-white-100 xs:mb-20px shadow-sm xs:w-full"
								:disabled="isSubmittingEmailForNewsletter"
							>
								{{ subscribeButtonText }}
								<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px" alt="arrow right icon" />
							</button>
						</div>
					</div>
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
				<a
					target="_blank"
					href="https://github.com/frain-dev/convoy#installation-getting-started"
					class="bg-primary-100 m-auto text-white-100 whitespace-nowrap text-12 desktop:text-18 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit"
				>
					Get Started
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
			communityFeatures: [
				{
					title: 'Rate Limiting',
					img: 'rate-limiting',
					body: 'Control the number of events sent to an endpoint by setting a rate limit and duration on each of your endpoints with Convoy. Our flexible rate limiting feature allows you to adjust the default 5,000 requests per minute to fit your unique use case for your customers.'
				},
				{
					title: 'Retries',
					img: 'retries 2',
					body: 'Efficiently handle endpoint failures by setting the number of attempts that works for you. Convoy supports linear and exponential back-off retry strategies and circuit breaking to suit any use case. Rest easy knowing that your requests will be automatically retried, improving the reliability and resilience of your API.'
				},
				{
					title: 'Static IP’s',
					img: 'static-ips',
					body: 'Configure outgoing webhook requests with static IPs easily with Convoy. Set up your webhook events with static IP addresses, ensuring that your IPs remain constant throughout the entire request lifecycle. This is a prerequisite for modern API providers, and our platform makes this process effortless.'
				},
				{
					title: 'Delivery Attempt Logs',
					img: 'delivery-attempt-logs',
					body: 'Debug events faster with Convoy’s intuitive dashboard which provides a clear overview of your event system. Easily fix customer issues and have a guaranteed audit trail in addition to application logs. View delivery attempt logs, identify bottlenecks, and optimize your APIs for maximum performance.'
				},
				{
					title: 'Rolling Secrets',
					img: 'rolling-secrets',
					body: 'Ensure payload security with Convoy by signing payloads before events are sent. Convoy generates a secret if you don’t supply one and implements rolling secrets for your payload security. Your secrets are automatically rotated at regular intervals, providing an added layer of security to your APIs.'
				},
				{
					title: 'App Portal',
					img: 'app-portal',
					body: 'Provide an easy-to-use interface for your customers to view, inspect, troubleshoot issues quickly and debug events with Convoy’s App Portal. Accessible through the SDKs, you can power your custom-built UI for your users and reduce workload for your customer success team.'
				}
			],
			setupSteps: ['git clone https://github.com/frain-dev/convoy.git', 'cd convoy', 'docker compose -f configs/local/docker-compose.yml up'],
			requestForm: {
				firstname: null,
				lastname: null,
				usecase: null,
				organisation: null
			},
			isSubmitingRequestAccessForm: false,
			isSubmittingEmailForNewsletter: false,
			activeSlide: true,
			expandImage: false,
			subscribeButtonText: 'Subscribe',
			earlyAccessEmail: '',
			useCases: ['Work', 'Personal projects']
		};
	},
	methods: {
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
		},
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
		},
		copyCommand(step) {
			if (step) return;
			const text = step;
			const el = document.createElement('textarea');
			el.value = text;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			this.textCopied = true;
			document.body.removeChild(el);
		}
	}
};
</script>
