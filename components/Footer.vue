<template>
	<footer class="bg-[#1e252b] text-white-100 pt-40px pb-32px px-20px">
		<div class="max-w-[1200px] m-auto">
			<nav class="flex justify-between items-center flex-wrap pb-42px border-b border-b-white-10">
				<div>
					<div class="mb-78px">
						<img src="~/assets/images/logo.svg" class="h-28px w-110px" alt="logo" />
					</div>
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
							<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/fraindev"><img src="~/assets/images/twitter-icon.svg" alt="twitter logo" /></a>
						</li>
					</ul>
				</div>
				<div class="w-full p-0 desktop:max-w-[430px] desktop:flex-row desktop:justify-around desktop:items-center">
					<div class="flex justify-between items-center w-full m-0">
						<div class="order-1">
							<h6 class="text-left">Join our newsletter</h6>
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
			</nav>
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
			isSubmitingloadingEarlyAccessForm: false
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