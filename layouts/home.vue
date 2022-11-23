<template>
	<div>
		<Header></Header>

		<Nuxt />
		<!-- blog -->
		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] desktop:p-80px p-40px">
			<div class="
					bg-white-100
					rounded-8px
					shadow-card
					max-w-[970px]
					pt-32px
					px-12px
					m-auto
					desktop:pl-56px desktop:pt-56px desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
					mobile:mb-48px
				">
				<div class="desktop:max-w-[470px] p-10px">
					<div class="flex justify-between items-center mb-24px">
						<div class="py-2px px-16px bg-[#0747a6] bg-opacity-10 rounded-2px font-medium text-14 text-primary-100 uppercase">Blog post</div>
						<div class="font-medium text-14">{{ featurePosts.published_at | date }}</div>
					</div>
					<nuxt-link :to="'/blog/' + featurePosts.slug">
						<h3 class="desktop:text-32 text-26 font-bold">{{ featurePosts.title }}</h3>
					</nuxt-link>

					<p class="font-light text-grey-80 text-16 mb-16px">{{ featurePosts.description }}...</p>
					<div class="flex flex-col flex-wrap my-26px desktop:items-end desktop:flex-row desktop:justify-between">
						<a v-if="featurePosts.primary_author" :href="featurePosts.primary_author.twitter ? 'http://twitter.com/' + featurePosts.primary_author.twitter : ''" target="_blank" class="flex items-start mb-40px desktop:mb-0">
							<div class="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center bg-grey-20">
								<img :src="require(`~/static/profile-images/${featurePosts.primary_author.name}.png`)" class="w-full mr-12px rounded-[50%]" alt="author imge" />
							</div>
							<div>
								<h5 class="font-medium mb-4px">{{ featurePosts.primary_author.name }}</h5>
								<p class="text-14 text-grey-80">Convoy</p>
							</div>
						</a>
						<nuxt-link :to="'/blog/' + featurePosts.slug" class="flex items-center text-primary-100 font-medium text-14">
							Read More
							<img src="~/assets/images/angle-right-primary.svg" class="w-20px" alt="read more icon" />
						</nuxt-link>
					</div>
				</div>
				<div class="w-full desktop:w-380px desktop:right-0 desktop:bottom-0 desktop:mt-0" v-if="featurePosts.feature_image">
					<img :src="require(`~/static/feature-images/${featurePosts.feature_image}`)" class="rounded-br-10px w-full" alt="featured post img" />
				</div>
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
			featurePosts: []
		};
	},
	async mounted() {
		const featurePosts = await this.$content('blog')
			.where({ featured: { $eq: true } })
			.fetch();
		this.featurePosts = featurePosts[0];
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
