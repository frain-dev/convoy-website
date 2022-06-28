<template>
	<ul class="sidebar-item">
		<li v-for="(page, index) in pages" :key="index">
			<template v-if="page.id !== 'guide' && page.id !== 'index'" @click="showMenu = false">
				<nuxt-link :to="'/docs/' + page.id" v-if="page.title">
					<img v-if="page.children ? page.children.length > 0 : false" src="~/assets/images/angle-down-icon.svg" alt="angle right" />
					<span v-else>•</span>
					{{ page.title }}
				</nuxt-link>

				<sidebar-sub-item v-show="page.children ? page.children.length > 0 : false" :page="page"></sidebar-sub-item>
			</template>
		</li>
	</ul>
</template>

<script>
import SidebarSubItem from './SidebarSubItem.vue';

export default {
	components: { SidebarSubItem },
	props: ['pages'],
	name: 'sidebar-item'
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

		li {
			margin-bottom: 20px;
		}

		a,
		button {
			display: flex;
			align-items: center;
		}

		span {
			font-size: 16px;
			margin-right: 10px;
		}

		img {
			width: 16px;
			margin-right: 10px;
		}
	}

	a {
		color: #fff;

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
		margin: 16px 0 16px 25px;
	}
}
</style>
