<template>
	<div>
		<Header></Header>

		<Nuxt />
		<!-- blog -->
		<section class="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] desktop:p-80px p-40px" v-if="showBlogPost">
			<div class="flex overflow-hidden">
				<div
					v-for="(post, index) of featurePosts"
					:key="'post' + index"
					class="min-h-[460px] flex justify-center w-full transition-all duration-1000 ease-in-out"
					:class="count === index ? 'animate-slideup block opacity-100 ' : 'animate-slidedown hidden opacity-0'"
				>
					<featured-post :featurePost="post"></featured-post>
				</div>
			</div>
			<div class="flex justify-center pt-52px">
				<button
					v-for="(post, index) of featurePosts"
					:key="'postButton' + index"
					@click="count = index"
					class="w-32px h-4px rounded-[20px] mr-14px bg-[#5F4C62] relative before:absolute before:h-4px before:rounded-[20px] before:-mt-2px before:-ml-16px"
					:class="count === index ? 'before:w-32px before:bg-[#8E7392] before:transition-all before:duration-[9s]' : 'before:bg-transparent before:w-[1px] before:transition-none'"
				></button>
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
			featurePosts: [],
			showBlogPost: false,
			count: 0
		};
	},
	async mounted() {
		const featurePosts = await this.$content('blog').where().fetch();
		this.featurePosts = featurePosts.slice(0, 7);
		setTimeout(() => {
			this.showBlogPost = true;
			this.startCarousel();
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
		},
		startCarousel() {
			setInterval(() => {
				this.count = this.count < this.featurePosts.length - 1 ? ++this.count : 0;
			}, 10000);
		}
	}
};
</script>
