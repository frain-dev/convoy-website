<template>
	<div>
		<nuxt-link v-if="page.link" :to="page.link" class="flex items-center font-normal text-14 p-0">{{ page.title }}</nuxt-link>

		<button v-else @click="page.showDropdown = !page.showDropdown" class="flex items-center font-normal text-14 p-0">
			<div v-if="page.children ? page.children.length > 0 : false">
				<img v-if="showItem" src="~/assets/images/angle-down-icon.svg" class="w-16px mr-6px" alt="angle right" />
				<img v-if="!showItem" src="~/assets/images/angle-right-icon.svg" class="w-16px mr-6px" alt="angle right" />
			</div>
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