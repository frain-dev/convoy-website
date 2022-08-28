<template>
	<div class="w-full bg-white-100 rounded-8px p-10px shadow-card mobile:mb-48px">
		<div class="rounded-4px mb-20px w-full overflow-hidden backdrop-blur-[3.4767px] h-fit desktop:h-170px desktop:mb-40px">
			<img :src="require(`~/static/feature-images/${post.feature_image}`)" class="rounded-4px w-full -z-10" alt="post image" />
		</div>
		<div class="rounded-2px font-medium text-14 text-primary-100 uppercase">{{ post.tag }}</div>
		<nuxt-link :to="'/blog/' + post.slug">
			<h3 class="text-24 font-bold mx-10px desktop:mx-16px mb-16px">{{ post.title }}</h3>
		</nuxt-link>
		<p class="text-16 font-light text-grey-80 mb-20px mx-10px desktop:mx-16px">{{ post.description }}</p>
		<div class="mx-10px desktop:mx-16px mt-18px mb-26px flex flex-col flex-wrap justify-between desktop:items-end desktop:flex-row">
			<a :href="post.primary_author.twitter ? 'http://twitter.com/' + post.primary_author.twitter : ''" target="_blank" class="flex items-start mb-40px desktop:mb-[unset]">
				<div class="w-40px h-40px rounded-50% mr-16px overflow-hidden flex items-center bg-grey-20">
					<img :src="require(`~/static/profile-images/${post.primary_author.name}.png`)" class="w-full mr-12px rounded-[50%]" alt="author imge" />
				</div>
				<div>
					<h5 class="font-medium mb-4px text-primary-100 text-14">{{ post.primary_author.name }}</h5>
					<p class="text-14 text-grey-80">Convoy</p>
				</div>
			</a>
			<nuxt-link :to="'/blog/' + post.slug" class="flex items-center text-primary-100 font-medium text-14">
				Read More
				<img src="~/assets/images/angle-right-primary.svg" class="w-20px" alt="read more icon" />
			</nuxt-link>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMenu: false
		};
	},
	props: ['post']
};
</script>
