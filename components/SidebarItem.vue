<template>
	<ul class="sidebar-item">
		<li v-for="(page, index) in pages" :key="index" :class="!page.children && page.title ? 'spaced' : ''">
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
	h3 {
		padding: 0;
		margin: 0 0 16px;
	}

	li {
		font-size: 14px;
		line-height: 16px;
		margin-bottom: 30px;

		&.spaced {
			margin-left: 21px;
		}

		li {
			margin-bottom: 15px;
		}

		a,
		button {
			display: flex;
			align-items: center;
			color: #fff;
			font-weight: 400;
			font-size: 14px;
		}

		span {
			font-size: 16px;
			margin-right: 10px;
		}

		img {
			width: 16px;
			margin-right: 5px;
		}

		ul {
			margin-left: 30px;
		}
	}

	a {
		&.nuxt-link-active {
			color: #47b38d;

			span {
				font-size: 24px;
			}

			h3 {
				color: inherit;
			}
		}
	}

	ul {
		margin: 16px 0 16px 21px;
	}
}
</style>
