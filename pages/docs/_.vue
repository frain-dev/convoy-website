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
	},
	head() {
		return {
			title: `Convoy Documentation - ${this.pageData.title}`,
			meta: [
				{ hid: 'description', name: 'description', content: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure. Convoy enables you to send and receive webhook events in one place with a great developer experience.' },
				{
					hid: 'apple-mobile-web-app-title',
					name: 'apple-mobile-web-app-title',
					content: `Convoy Documentation - ${this.pageData.title}`
				},
				{ hid: 'og:title', name: 'og:title', content: `Convoy Documentation - ${this.pageData.title}` },
				{ hid: 'og:site_name', name: 'og:site_name', content: 'Convoy' },
				{ hid: 'og:type', name: 'og:type', content: 'website' },
				{
					hid: 'og:description',
					name: 'og:description',
					content: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure. Convoy enables you to send and receive webhook events in one place with a great developer experience.'
				},
				{
					hid: 'og:url',
					name: 'og:url',
					content: `https://getconvoy.io/docs/${this.$route.path}`
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: `Convoy Documentation - ${this.pageData.title}`
				},
				{
					hid: 'twitter:creator',
					name: 'twitter:creator',
					content: '@getconvoy'
				},
				{
					hid: 'twitter:url',
					name: 'twitter:url',
					content: `https://getconvoy.io/docs/${this.$route.path}`
				},
				{
					hid: 'twitter:text:title',
					name: 'twitter:text:title',
					content: `Convoy Documentation - ${this.pageData.title}`
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure. Convoy enables you to send and receive webhook events in one place with a great developer experience.'
				}
			],
			link: [{ hid: 'canonical', rel: 'canonical', href: `https://getconvoy.io/docs` }]
		};
	}
};
</script>
