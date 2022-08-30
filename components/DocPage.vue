<template>
	<main class="py-36px px-0 w-full m-0 desktop:flex desktop:justify-center">
		<article class="content max-w-[800px] w-full py-0 px-20px m-auto md:pr-100px md:m-[unset]">
			<nuxt-content class="docs w-full" :document="pageData"></nuxt-content>

			<div class="py-30px px-0 text-14 font-light desktop:flex desktop:items-center desktop:justify-between" v-if="pageData.slug !== '404'">
				<a
					:href="'https://github.com/frain-dev/convoy-website/tree/main/content' + this.$route.path + '.md'"
					target="_blank"
					referrerpolicy="noreferrer"
					class="flex items-center underline text-success-100 mobile:mb-20px"
				>
					<span>Contribute to this doc in Github</span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-10px">
						<g>
							<path
								d="M6.03331 1.66681C5.92363 1.66618 5.81491 1.6872 5.71338 1.72867C5.61185 1.77014 5.51951 1.83125 5.44164 1.90848L1.90831 5.44182C1.83107 5.51968 1.76997 5.61203 1.7285 5.71356C1.68703 5.81509 1.66601 5.92381 1.66664 6.03348C1.66601 6.14315 1.68703 6.25187 1.7285 6.3534C1.76997 6.45494 1.83107 6.54728 1.90831 6.62515L4.26664 8.98348L13.375 18.0918C13.4528 18.169 13.5452 18.2302 13.6467 18.2716C13.7482 18.3131 13.857 18.3341 13.9666 18.3335L17.5 18.3335C17.721 18.3335 17.933 18.2457 18.0892 18.0894C18.2455 17.9331 18.3333 17.7212 18.3333 17.5001L18.3333 13.9668C18.3397 13.8502 18.3214 13.7336 18.2798 13.6245C18.2381 13.5154 18.174 13.4162 18.0916 13.3335L8.98331 4.27515L6.66664 1.90848C6.58587 1.83242 6.49292 1.77045 6.39164 1.72515C6.32521 1.71712 6.25806 1.71712 6.19164 1.72515C6.15285 1.72125 6.11376 1.72125 6.07497 1.72515L6.03331 1.66681ZM16.6666 14.3085L16.6666 16.6668L14.3083 16.6668L6.03331 8.39181L8.39164 6.03348L16.6666 14.3085ZM7.21664 4.85848L4.85831 7.21681L3.68331 6.03348L6.03331 3.68348L7.21664 4.85848Z"
								class="fill-success-100"
							/>
						</g>
					</svg>
				</a>

				<div class="font-light">Updated at {{ pageData.updatedAt | date }}</div>
			</div>
			<hr class="border-grey-10" />
			<div class="bg-black bg-[url(~/assets/images/doc-footer.png)] bg-no-repeat bg-contain bg-right-top p-24px mt-32px rounded-8px mb-100px">
				<h4 class="text-white-100 font-semibold mb-10px">Don't miss anything.</h4>
				<p class="text-14 text-white-100 max-w-[460px] w-full">
					Subscribe to the
					<span class="font-semibold">Convoy Newsletter</span>
					find tutorials and tools that will help you grow as a developer and scale your project or business, and see interesting topics.
				</p>
				<form @submit.prevent="requestAccess()" class="bg-[#1C2126] border-grey-20 flex p-10px rounded-8px items-center mt-24px max-w-[460px] w-full mb-50px">
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Email"
						v-model="earlyAccessEmail"
						class="bg-transparent focus:outline-none focus:border-none w-full text-16 text-white-100"
					/>
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
		</article>

		<div class="sidemenu hidden md:min-w-[250px] md:sticky md:top-104px md:h-fit md:block" v-show="pageData.toc.length > 0">
			<h6 class="font-semibold text-black pl-10px mb-14px">ON THIS PAGE</h6>
			<ul v-show="pageData.toc.length > 0">
				<li
					class="sub-menu py-8px px-0 flex items-center border-b border-b-grey-10"
					:class="{ 'pl-[15px] py-4px': subpage.depth > 2 }"
					v-for="(subpage, index) in pageData.toc"
					:key="index"
					:id="subpage.id"
				>
					<img src="~/assets/images/arrow-right-success.svg" class="w-8px h-8px" alt="angle right" />
					<nuxt-link :to="{ path: './' + pageData.id, hash: '#' + subpage.id }" class="font-medium text-14 text-grey-40">{{ subpage.text }}</nuxt-link>
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
export default {
	props: ['pageData'],
	data() {
		return {
			earlyAccessEmail: '',
			subscribeButtonText: 'Subscribe'
		};
	},
	methods: {
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
				this.earlyAccessEmail = '';
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
		}
	}
};
</script>

<style lang="scss" scoped>
.sidemenu {
	li {
		&.sub-menu {
			&.active {
				a {
					@apply font-semibold text-success-100 transition-all duration-300;
				}
				img {
					@apply visible;
				}
			}
			img {
				@apply invisible mr-2px;
			}
		}
	}
}
</style>
