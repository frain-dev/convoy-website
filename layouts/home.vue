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
	}
};
</script>
