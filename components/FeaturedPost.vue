<template>
	<div
		class="
			rounded-[11px]
			shadow-card
			max-w-[970px]
			bg-white-100
			mt-32px
			pt-20px
			px-12px
			desktop:pl-56px desktop:pt-26px desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
			mobile:mb-48px
		"
		v-if="featurePost"
	>
		<div class="desktop:max-w-[470px] p-10px">
			<div class="flex justify-between items-center mb-24px">
				<div class="py-2px px-16px bg-[#0747a6] bg-opacity-10 rounded-2px font-medium text-14 text-primary-100 uppercase">FEATURED</div>
				<div class="font-medium text-14">{{ featurePost.published_at | date }}</div>
			</div>
			<nuxt-link :to="'/blog/' + featurePost.slug">
				<h3 class="desktop:text-32 text-26 font-bold mb-16px">{{ featurePost.title }}</h3>
			</nuxt-link>
			<p class="font-light text-grey-80 text-16 mb-16px overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4">{{ featurePost.description }}</p>
			<div class="flex flex-col flex-wrap my-26px desktop:items-end desktop:flex-row desktop:justify-between">
				<a :href="featurePost.primary_author.twitter ? 'http://twitter.com/' + featurePost.primary_author.twitter : ''" target="_blank" class="flex items-start mb-40px desktop:mb-0">
					<div class="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center">
						<img :src="`/profile-images/${featurePost.primary_author.name}.png`" class="w-full mr-12px rounded-[50%]" alt="author imge" />
					</div>
					<div>
						<h5 class="font-medium mb-4px">{{ featurePost.primary_author.name }}</h5>
						<p class="text-14 text-grey-80">Convoy</p>
					</div>
				</a>
				<nuxt-link :to="'/blog/' + featurePost.slug" class="flex items-center text-primary-100 font-medium text-14">
					Read More
					<img src="~/assets/images/angle-right-primary.svg" class="w-20px" alt="read more icon" />
				</nuxt-link>
			</div>
		</div>

		<div class="w-full desktop:w-380px desktop:right-0 desktop:bottom-0 desktop:mt-0">
			<img :src="`/feature-images/${featurePost.feature_image}`" class="rounded-bl-10px w-full rounded-br-[11px]" alt="featured post img" />
		</div>
	</div>
</template>

<script>
export default {
	props: ['featurePost']
};
</script>
