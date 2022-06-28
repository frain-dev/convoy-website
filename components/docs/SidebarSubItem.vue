<template>
	<ul>
		<li v-for="(subpage, index) in page.children" :key="index">
			<nuxt-link :to="subpage.link">
				{{ subpage.label }}
			</nuxt-link>

			<sidebar-item v-show="subpage.children" :pages="subpage.children"></sidebar-item>
		</li>
	</ul>
</template>

<script>
import SidebarItem from './SidebarItem.vue';
export default {
	components: { SidebarItem },
	props: ['page'],
	name: 'sidebar-sub-item'
};
</script>
