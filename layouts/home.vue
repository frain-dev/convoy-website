<template>
	<div>
		<Header></Header>

		<Nuxt />
		<!-- blog -->
		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] desktop:p-80px p-40px">
			<div class="min-h-[460px] flex justify-center">
				<featured-post :featurePost="featurePost" v-if="showBlogPost"></featured-post>
			</div>
		</section>

		<Footer></Footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isSubmitingloadingEarlyAccessForm: false,
			subscribeButtonText: 'Subscribe',
			earlyAccessEmail: '',
			earlyAccessEmail: '',
			featurePost: [],
			showBlogPost: false
		};
	},
	async mounted() {
		const featurePosts = await this.$content('blog')
			.where({ featured: { $eq: true } })
			.fetch();
		this.featurePost = featurePosts[0];

		setTimeout(() => {
			this.showBlogPost = true
		}, 1000);
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
