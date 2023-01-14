<template>
	<div>
		<header class="px-20px bg-gradient-to-br from-[#2c2f3e] to-[#422f41]">
			<Header></Header>
			<section class="max-w-[1200px] min-h-[900px] desktop:min-h-[780px] w-full m-auto text-white-100 pt-200px">
				<h1 class="text-center font-bold text-32 desktop:text-[48px] mb-16px">Watch or Book a Live Demo</h1>
				<p class="text-center text-18 mb-40px max-w-[530px] m-auto">Learn more about how you can use Convoy as a webhooks proxy, to send and receive webhooks events.</p>

				<div class="m-auto flex justify-center mb-50px">
					<a href="#demo" class="py-12px mobile:px-14px px-18px text-14 font-medium rounded-8px bg-white-100 text-primary-100 flex items-center mr-24px">
						<img src="~/assets/images/play.svg" class="mr-8px" alt="play" />
						Watch our Demo
					</a>
					<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/signup" class="desktop:w-full text-center py-12px px-18px max-w-[173px] text-14 font-medium rounded-8px bg-primary-100 text-white-100 flex items-center justify-center">
						Get Started
					</a>
				</div>

				<ul class="flex items-center justify-center list-none w-full mt-60px m-auto brightness-0 invert-[1]">
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
			</section>
		</header>

		<!-- calemdly -->
		<section class="m-auto -mt-230px mb-150px">
			<!-- Calendly inline widget begin -->
			<div class="calendly-inline-widget m-0 w-full min-w-[320px] md:min-h-[700px]" data-url="https://calendly.com/d/d6k-jw2-wgj/convoy-user-demo?hide_gdpr_banner=1" style="height: 600px"></div>
			<!-- Calendly inline widget end -->
		</section>

		<!-- demo -->
		<section id="demo" class="bg-[url(~/assets/images/demo.png)] bg-no-repeat bg-cover bg-top min-h-[80vh] w-full">
			<div class="flex justify-center items-center flex-col text-white-100 py-100px desktop:py-130px">
				<h1 class="font-bold text-32 desktop:text-[48px] mb-16px text-center">Watch our Demo</h1>
				<p class="text-center text-14 desktop:text-16 max-w-[529px] m-auto mb-90px">A quick getting started guide on using Convoy to send and receive webhook events.</p>
				<div class="max-w-[900px] w-full m-auto">
					<iframe class="w-full h-[350px] desktop:h-[510px] rounded-16px shadow-[0_5px_22px_rgba(232,237,250,0.2)] border-8 border-white-100" src="https://www.youtube-nocookie.com/embed/DSIet81oBsg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>
		</section>

		<GetStartedSection></GetStartedSection>

	</div>
</template>

<script>
export default {
	layout: 'home',
	head() {
		return {
			title: 'Convoy Demo',
			meta: [
				{ hid: 'description', name: 'description', content: 'Get a quick glance into what Convoy looks like and how it works' },
				{
					hid: 'apple-mobile-web-app-title',
					name: 'apple-mobile-web-app-title',
					content: 'Convoy Demo'
				},
				{ hid: 'og:title', name: 'og:title', content: 'Convoy Demo' },
				{ hid: 'og:site_name', name: 'og:site_name', content: 'Convoy' },
				{ hid: 'og:type', name: 'og:type', content: 'website' },
				{
					hid: 'og:description',
					name: 'og:description',
					content: 'Get a quick glance into what Convoy looks like and how it works'
				},
				{
					hid: 'og:url',
					name: 'og:url',
					content: `https://getconvoy.io/demo`
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: 'Convoy Demo'
				},
				{
					hid: 'twitter:url',
					name: 'twitter:url',
					content: `https://getconvoy.io/demo`
				},
				{
					hid: 'twitter:text:title',
					name: 'twitter:text:title',
					content: 'Convoy Demo'
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: 'Get a quick glance into what Convoy looks like and how it works'
				}
			],
			link: [{ hid: 'canonical', rel: 'canonical', href: `https://getconvoy.io/demo` }]
		};
	}
};
</script>
