<template>
	<div class="post">
		<div class="post--img">
			<img :src="require(`~/static/feature-images/${post.feature_image}`)" alt="post image" />
		</div>
		<div class="tag clear">{{ post.tag }}</div>
		<nuxt-link :to="'/blog/' + post.slug">
			<h3 class="post--title">{{ post.title }}</h3>
		</nuxt-link>
		<p class="post--body">{{ post.description }}</p>
		<div class="post--footer">
			<a :href="post.primary_author.twitter ? 'http://twitter.com/' + post.primary_author.twitter : ''" target="_blank" class="post--author">
				<div class="img">
					<img :src="require(`~/static/profile-images/${post.primary_author.name}.png`)" alt="author imge" />
				</div>
				<div>
					<h5>{{ post.primary_author.name }}</h5>
					<p>Convoy</p>
				</div>
			</a>
			<nuxt-link :to="'/blog/' + post.slug">
				Read More
				<img src="~/assets/images/angle-right-primary.svg" alt="read more icon" />
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

<style lang="scss" scoped></style>
