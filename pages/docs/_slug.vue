<template>
	<div class="nuxt-content">
		<nuxt-content :document="pageData"></nuxt-content>
		<div class="blog-post--footer">
			<a :href="'https://github.com/frain-dev/convoy-website/tree/main/content/' + currentRoute" target="_blank" class="edit-link">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-1">
					<path
						d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</svg>
				<span>Edit this page on GitHub</span>
			</a>

			<div class="updated-at">Updated at {{ pageData.updatedAt | date }}</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'docs',
	async asyncData({ $content, params }) {
		try {
			const pageData = await $content('docs/' + params.slug || 'index').fetch();
			return { pageData };
		} catch (error) {
			const pageData = await $content('404').fetch();
			return { pageData };
		}
	}
};
</script>

<style lang="scss" scoped>
.blog-post--footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30px 0;
	font-size: 14px;
	font-weight: 300;

	.updated-at,
	.edit-link {
		font-weight: 300;
	}

	.edit-link {
		display: flex;
		align-items: center;

		svg {
			margin-right: 10px;
			width: 14px;
		}
	}

	.updated-at {
		font-weight: 200;
	}
}
</style>
