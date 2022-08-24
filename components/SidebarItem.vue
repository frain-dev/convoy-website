<template>
	<ul class="sidebar-item">
		<li v-for="(page, index) in pages" :key="index" class="text-white-100 text-14" :class="!page.children && page.title ? 'spaced' : ''">
			<template @click="showMenu = false">
				<SidebarSubItem :page="page"></SidebarSubItem>
			</template>
		</li>
	</ul>
</template>

<script>
export default {
	props: ['pages'],
	computed: {
		routeLink() {
			return this.$route.path;
		}
	}
};
</script>

<style lang="scss">
.sidebar-item {
	li {
		@apply mb-30px;

		&.spaced {
			@apply ml-20px;
		}

		li {
			@apply mb-16px;

			&.spaced {
				@apply ml-0;
			}
		}
		img {
			@apply w-16px mr-4px;
		}

		ul {
			@apply ml-34px pt-16px;
		}
	}
	a {
		&.nuxt-link-active {
			@apply text-light-green;
		}
	}
}
</style>