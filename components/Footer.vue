<template>
	<footer class="bg-[#302F3F] text-white-100 py-40px px-20px">
		<div class="max-w-[1200px] m-auto">
			<nav class="flex justify-between flex-wrap pb-42px footer:block">
				<div class="mobile:w-full mobile:mb-40px">
					<div>
						<img src="~/assets/images/logo.svg" class="h-28px w-110px" alt="logo" />
					</div>

					<h4 class="mt-22px text-16 font-semibold mb-10px">Address</h4>
					<p class="text-14 mb-24px">251 Little Falls Drive, Wilminton, DE. 19808</p>

					<ul class="socials">
						<li>
							<a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy"><img src="~/assets/images/github-icon.svg" alt="mail logo" /></a>
						</li>
						<li>
							<a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy"><img src="~/assets/images/linkedin.svg" alt="linkedin logo" /></a>
						</li>
						<li>
							<a target="_blank" rel="noopener noreferrer" href="mailto:info@frain.dev"><img src="~/assets/images/mail-icon.svg" alt="mail logo" /></a>
						</li>
						<li>
							<a target="_blank" rel="noopener noreferrer" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
								<img src="~/assets/images/slack-icon.svg" alt="slack logo" />
							</a>
						</li>
						<li>
							<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/getconvoy"><img src="~/assets/images/twitter-icon.svg" alt="twitter logo" /></a>
						</li>
					</ul>
				</div>

				<ul v-for="(section, index) in footerLinks" :key="'section' + index" class="group">
					<h3 class="text-16 footer:border-b footer:border-b-white-24 group-hover:footer:mb-0 footer:pb-8px font-semibold footer:font-normal mb-20px flex items-center justify-between">
						{{ section.title }}
						<img src="~/assets/images/angle-down-icon.svg" alt="accordion icon" class="invisible footer:visible">
					</h3>

					<li v-for="(link, index) in section.links" :key="'link' + index" class="footer:h-0 footer:overflow-hidden group-hover:footer:h-fit footer:bg-white-8 group-hover:footer:first-of-type:pt-20px group-hover:footer:last-of-type:mb-12px">
						<nuxt-link v-if="!link.isExternal" :to="link.link" class="text-14 font-normal mb-16px block footer:pl-4px">{{ link.name }}</nuxt-link>
						<a v-if="link.isExternal" :href="link.link" class="text-14 font-normal mb-16px block footer:pl-4px" target="_blank" referrerpolicy="no-referrer">{{ link.name }}</a>
					</li>
				</ul>
			</nav>

			<div class="border-b border-b-white-10 flex justify-end pb-40px">
				<div class="w-full p-0 desktop:max-w-[430px] desktop:flex-row desktop:justify-around desktop:items-center">
					<div class="flex justify-between items-center w-full m-0">
						<div class="order-1">
							<p class="text-14 text-left mt-24px">No spam! Just articles, events, and talks.</p>
						</div>
						<img src="~/assets/images/mailbox.gif" class="w-124px order-2" alt="mailbox animation" />
					</div>
					<form class="bg-[#1c2126] border border-[#262f37] rounded-8px -mt-10px p-10px flex" @submit.prevent="requestAccess()">
						<img src="~/assets/images/mail-primary-icon.svg" class="w-32px" alt="mail icon" />
						<input type="email" id="email" placeholder="Your email" aria-label="Email" v-model="earlyAccessEmail" class="w-full bg-transparent border-none outline-none text-white-100 placeholder:text-white-100" />
						<button class="text-16 font-semibold bg-transparent border-none">
							<img src="~/assets/images/send-primary-icon.svg" alt="send icon" />
						</button>
					</form>
				</div>
			</div>

			<p class="mt-24px text-left desktop:text-right">Copyright {{ currentYear }}, All Rights Reserved</p>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			currentYear: '',
			earlyAccessEmail: '',
			isSubmitingloadingEarlyAccessForm: false,
			footerLinks: [
				{
					title: 'Product',
					links: [{ name: 'Features', link: '/#features' }, { name: 'Open Source', link: 'http://github.com/frain-dev/convoy', isExternal: true }, { name: 'Cloud', link: 'https://dashboard.getconvoy.io/login', isExternal: true }]
				},
				{
					title: 'Community',
					links: [{ name: 'Slack', link: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', isExternal: true }, { name: 'Github Discussion', link: 'https://github.com/frain-dev/convoy/discussions', isExternal: true }]
				},
				{
					title: 'Resources',
					links: [{ name: 'API Reference', link: 'https://convoy.readme.io/', isExternal: true }, { name: 'Documentation', link: '/docs', isExternal: false }, { name: 'Status Page', link: 'https://convoy.statuspage.io', isExternal: true }]
				},
				{
					title: 'Company',
					links: [{ name: 'Terms of Use', link: '/legal/Terms-of-Use-Convoy.pdf', isExternal: true }, { name: 'Privacy Policy', link: '/legal/Privacy-Policy-Convoy.pdf', isExternal: true }]
				}
			]
		};
	},
	mounted() {
		this.getCurrentYear();
	},
	methods: {
		getCurrentYear() {
			const currentDate = new Date();
			this.currentYear = currentDate.getFullYear();
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
				this.earlyAccessEmail = '';
				this.isSubmitingloadingEarlyAccessForm = false;
			} catch (error) {
				this.isSubmitingloadingEarlyAccessForm = false;
			}
		}
	}
};
</script>
