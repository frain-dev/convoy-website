<template>
	<DocPage :pageData="pageData"></DocPage>
</template>

<script>
export default {
	layout: 'docs',
	scrollToTop: true,
	async asyncData({ $content, params }) {
		try {
			const pageData = await $content('docs/' + params.pathMatch || 'index').fetch();
			return { pageData };
		} catch (error) {
			const pageData = await $content('404').fetch();
			return { pageData };
		}
	}
};
</script>
