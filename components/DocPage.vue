<template>
	<main class="page--container">
		<article class="content">
			<nuxt-content :document="pageData"></nuxt-content>

			<div class="blog-post--footer" v-if="pageData.slug !== '404'">
				<a :href="'https://github.com/frain-dev/convoy-website/tree/main/content' + this.$route.path + '.md'" target="_blank" referrerpolicy="noreferrer" class="edit-link">
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
		</article>

		<div class="sidemenu" v-show="pageData.toc.length > 0">
			<h4>ON THIS PAGE</h4>
			<ul v-show="pageData.toc.length > 0">
				<li class="sub-menu" :class="{ sub: subpage.depth > 2 }" v-for="(subpage, index) in pageData.toc" :key="index" :id="subpage.id">
					<img src="~/assets/images/arrow-right.svg" alt="angle right" />
					<nuxt-link :to="{ path: './' + pageData.id, hash: '#' + subpage.id }">{{ subpage.text }}</nuxt-link>
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
export default {
	props: ['pageData']
};
</script>

<style lang="scss" scoped>
$desktopBreakPoint: 1060px;
$desktopBreakPoint2: 1240px;

article {
	max-width: 800px;
	width: 100%;
	padding: 0 20px;
	margin: auto;

	@media (min-width: $desktopBreakPoint) {
		padding: 0 60px;
		margin: unset;
	}
}

.page--container {
	padding: 36px 0;
	width: 100%;
	margin: auto;

	@media (min-width: $desktopBreakPoint) {
		display: flex;
		justify-content: center;
	}

	.nuxt-content {
		width: 100%;
	}
}

.sidemenu {
	display: none;

	@media (min-width: $desktopBreakPoint) {
		min-width: 250px;
		position: sticky;
		top: 104px;
		height: fit-content;
		display: block;
	}

	h4 {
		font-weight: 600;
		font-size: 14px;
		line-height: 22px;
		color: #000624;
		padding-left: 10px;
		margin-bottom: 8px;
	}

	li {
		&.sub-menu {
			font-weight: 400;
			font-size: 14px;
			line-height: 22px;
			color: #737a91;
			padding: 8px 0;
			border-bottom: 1px solid #edeff5;

			&.active {
				a {
					font-weight: 600;
				}

				img {
					visibility: unset;
				}
			}

			img {
				visibility: hidden;
				height: 8px;
				width: 8px;
			}
		}

		&.sub {
			padding: 4px 0 4px 15px;
		}
	}
}

.blog-post--footer {
	padding: 30px 0;
	font-size: 14px;
	font-weight: 300;

	@media (min-width: $desktopBreakPoint) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.updated-at,
	.edit-link {
		font-weight: 300;
	}

	.edit-link {
		display: flex;
		align-items: center;
		text-decoration: underline;
		color: #47b38d;
		margin-bottom: 20px;

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
