<template>
	<div>
		<nuxt-link v-if="page.link" :to="page.link">
			<img v-if="page.children ? page.children.length > 0 : false" src="~/assets/images/angle-down-icon.svg" alt="angle right" />
			{{ page.title }}
		</nuxt-link>

		<button v-else @click="page.showDropdown = !page.showDropdown">
			<img v-if="page.children ? page.children.length > 0 : false" src="~/assets/images/angle-down-icon.svg" alt="angle right" />
			{{ page.title }}
		</button>

		<sidebar-item v-if="showItem" :pages="page.children"></sidebar-item>
	</div>
</template>

<script>
export default {
	props: ['page'],
	computed: {
		showItem() {
			return this.page.showDropdown;
		},
		routeLink() {
			return this.$route.path;
		}
	}
};
</script>
