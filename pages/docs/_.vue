<template>
	<div>
		<DocPage :pageData="pageData"></DocPage>
	</div>
</template>

<script>
export default {
	layout: 'docs',
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
