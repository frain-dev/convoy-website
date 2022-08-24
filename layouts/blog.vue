<template>
	<div class="flex-wrap min-h-screen bg-[#fafafe]">
		<header class="w-full bg-transparent -mt-110px">
			<Header></Header>
		</header>

		<div class="pt-150px pb-100px max-w-[1237px] w-full mt-110px m-auto">
			<Nuxt />
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
export default {
	data: () => {
		return {
			showMenu: false,
			pages: []
		};
	},
	async mounted() {
		let pages = await this.$content('docs').only(['title', 'id', 'toc', 'order']).sortBy('order', 'asc').fetch();
		pages = pages.sort((a, b) => a.order - b.order);
		this.pages = pages;
	}
};
</script>

