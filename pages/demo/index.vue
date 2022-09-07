<template>
	<div>
		<header class="px-20px bg-gradient-to-br from-[#2c2f3e] to-[#422f41]">
			<Header></Header>
			<section class="max-w-[1200px] min-h-[90vh] w-full m-auto text-white-100 pt-200px">
				<h1 class="text-center font-bold text-32 desktop:text-[48px] mb-16px">Watch or Book a Live Demo</h1>
				<p class="text-center text-18 mb-40px max-w-[530px] m-auto">Learn more about how you can use Convoy as a webhooks proxy, to send and receive webhooks events.</p>

				<div class="m-auto flex justify-center mb-50px">
					<a href="#demo" class="py-12px px-18px text-14 font-medium rounded-8px bg-white-100 text-primary-100 flex items-center mr-24px">
						<img src="~/assets/images/play.svg" class="mr-8px" alt="play" />
						Watch our Demo
					</a>
					<a target="_blank" rel="noopener noreferrer" href="https://dashboard.getconvoy.io/signup" class="py-12px px-48px text-14 font-medium rounded-8px bg-primary-100 text-white-100">
						Get Started
					</a>
				</div>

				<ul class="flex items-center justify-center list-none w-full mt-60px m-auto">
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
			</section>
		</header>

		<!-- calemdly -->
		<section class="bg-white-100 rounded-16px max-w-[930px] m-auto -mt-200px mb-220px md:min-h-[685px]">
			<!-- Calendly inline widget begin -->
			<div class="calendly-inline-widget w-full min-w-[320px]" data-url="https://calendly.com/pelumioni/15min?hide_gdpr_banner=1" style="height: 600px"></div>
			<!-- Calendly inline widget end -->
		</section>

		<!-- demo -->
		<section id="demo" class="bg-[url(~/assets/images/demo.png)] bg-no-repeat bg-cover bg-top min-h-[80vh] w-full">
			<div class="flex justify-center items-center flex-col text-white-100 py-100px desktop:py-130px">
				<h1 class="font-bold text-32 desktop:text-[48px] mb-16px text-center">Watch our Demo</h1>
				<p class="text-center text-14 desktop:text-16 max-w-[529px] m-auto mb-90px">A quick getting started guide on using Convoy to send and receive webhook events.</p>
				<div class="max-w-[900px] w-full m-auto">
					<iframe
						class="w-full h-[350px] desktop:h-[510px] rounded-16px shadow-[0_5px_22px_rgba(232,237,250,0.2)] border-8 border-white-100"
						src="https://www.youtube-nocookie.com/embed/DSIet81oBsg"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>
			</div>
			<div class="bg-[#3D3041] py-30px flex justify-start desktop:justify-center m-auto overflow-x-scroll scroll-smooth no-scrollbar mt-30px desktop:mt-40px w-full">
				<div
					class="bg-white-10 pl-12px pr-40px md:px-12px py-8px rounded-6px mr-24px last-of-type:mr-0 flex items-center text-white-100 text-14 font-medium w-fit whitespace-nowrap"
					v-for="feature of features"
					:key="feature"
				>
					<img src="~/assets/images/green_check.svg" class="mr-12px" alt="check" />
					{{ feature }}
				</div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	layout: 'home',
	data() {
		return {
			features: ['Mulitple projects', 'Debug logs and metric', 'Manage app and customers', 'Manage multiple endpoints', 'Debug **event logs**', 'Embed into your UI']
		};
	}
};
</script>
<style lang="scss" scoped>
._3efP_GeH5kyBAzqnLzL._kN_bCa3VNYpqFLH311L {
	@apply max-w-[unset];
}
._3efP_GeH5kyBAzqnLzL.w_Mtb2W9166EgOSv9i3M {
	@apply w-full;
}
._cUP1np9gMvFQrcPftuf.xahN8AEzyAvQtVj17TPv {
	@apply m-0;
}
</style>
