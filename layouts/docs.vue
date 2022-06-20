<template>
	<div class="page">
		<aside>
			<div class="logo">
				<nuxt-link to="/"><img src="~/assets/images/logo.svg" alt="logo" /></nuxt-link>
				<span>Docs</span>
			</div>

			<ul>
				<li>
					<nuxt-link to="/docs/guide">Quick Start Guide</nuxt-link>
				</li>
				<li v-for="(page, index) in pages" :key="index">
					<div v-show="page.id !== 'guide' && page.id !== 'index'">
						<nuxt-link :to="'/docs/' + page.id">
							<span>•</span>
							{{ page.title }}
						</nuxt-link>

						<!-- <ul v-show="page.toc.length > 0" class="" :class="{ show: currentPage == page.id }">
							<li v-for="(subpage, index) in page.toc" :key="index">
								<nuxt-link :to="{ path: '/docs/' + page.id, hash: '#' + subpage.id }">
									{{ subpage.text }}
								</nuxt-link>
							</li>
						</ul> -->
					</div>
				</li>
			</ul>
		</aside>

		<div class="main">
			<header>
				<DocsSearch />

				<div>
					<a href="https://github.com/frain-dev/convoy/" target="_blank" rel="noreferrer">
						<img src="~/assets/images/github-icon-dark.svg" alt="github icon" />
					</a>
				</div>
			</header>

			<main class="page--container" :class="{ padding: currentRoute !== '/docs' }">
				<Nuxt />

				<div class="sidemenu">
					<h4 v-show="!stringContains(currentRoute, 'sdk') && !stringContains(currentRoute, 'release') && !stringContains(currentRoute, 'api')">ON THIS PAGE</h4>
					<ul>
						<li v-for="(page, index) in pages" :key="index">
							<ul v-show="page.toc.length > 0 && stringContains(currentRoute, page.id)">
								<li class="sub-menu" v-for="(subpage, index) in page.toc" :key="index">
									<img src="~/assets/images/arrow-right.svg" alt="angle right" :class="{ show: currentHash === subpage.id }" />
									<nuxt-link :to="{ path: './' + page.id, hash: '#' + subpage.id }" :class="{ active: currentHash === subpage.id }">{{ subpage.text }}</nuxt-link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</main>
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

				<div class="updated-at">Updated at Thu, Jan 9, 2020</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pages: [],
			currentPage: '',
			currentHash: this.$route.path
		};
	},
	computed: {
		currentRoute() {
			return this.$route.path;
		}
	},
	async mounted() {
		let pages = await this.$content('docs').only(['title', 'id', 'toc', 'order']).sortBy('order', 'asc').fetch();
		pages = pages.sort((a, b) => a.order - b.order);
		this.pages = pages;

		this.watchScroll();
	},
	methods: {
		stringContains(text, word) {
			return text.includes(word);
		},
		watchScroll() {
			document.querySelector('div.main').addEventListener('scroll', e => {
				const headings = document.querySelectorAll('h2, h3');

				headings.forEach(heading => {
					const rect = heading.getBoundingClientRect();

					if (rect.top > 0 && rect.top < 200 && heading.id) {
						const location = window.location.toString().split('#')[0];
						history.replaceState(null, null, location + '#' + heading.id);

						this.currentHash = heading.id;
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
$desktopBreakPoint: 880px;
body,
html {
	padding: 0;
}
.page {
	display: flex;
	height: 100vh;
}

aside {
	max-width: 270px;
	width: 100%;
	background: #16192c;
	color: #ffffff;
	height: 100vh;
	overflow-y: scroll;

	.logo {
		display: flex;
		align-items: center;
		padding: 20px 24px;
		border-bottom: 1px solid rgba(236, 233, 241, 0.1);

		img {
			height: 22px;
			width: 85px;
			margin-right: 4px;
		}

		span {
			font-weight: 500;
			font-size: 16px;
			line-height: 20px;
			color: #47b38d;
		}
	}

	a {
		color: #fff;
	}

	a.nuxt-link-active {
		color: #47b38d;

		span {
			font-size: 24px;
		}

		h3 {
			color: inherit;
		}
	}

	h3 {
		font-weight: bold;
		font-size: 14px;
		line-height: 17px;
		font-variant: small-caps;
		color: rgba(255, 255, 255, 0.5);
		padding: 24px 0 0 24px;
		margin: 0 0 0 0;
	}

	& > ul {
		padding: 24px 0 24px 24px;

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
				font-size: 20px;
				margin-right: 10px;
			}

			img {
				width: 16px;
				margin-right: 10px;
			}
		}

		ul {
			margin: 16px 0 16px 40px;
		}
	}
}

a.api-reference {
	img {
		transform: rotate(270deg);
		margin-left: 5px;
		filter: brightness(0) invert(1);
	}
}

.main {
	width: 100%;
	overflow-y: auto;
	padding-bottom: 100px;

	header {
		position: fixed;
		width: 100%;

		@media (min-width: $desktopBreakPoint) {
			width: calc(100% - 270px);
		}
	}
}

header {
	padding: 13px 24px;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.page--container {
	padding: 36px 20px;
	max-width: 100%;
	width: 100%;
	margin: auto;

	@media (min-width: $desktopBreakPoint) {
		display: flex;
		padding: 36px 48px;
	}
	.nuxt-content {
		width: 100%;
		margin-top: 70px;
		@media (min-width: $desktopBreakPoint) {
			width: calc(100% - 300px);
		}
	}
}

.sidemenu {
	min-width: 250px;
	margin-top: 30px;

	@media (min-width: $desktopBreakPoint) {
		margin-top: unset;
		position: fixed;
		right: 60px;
		top: 110px;
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

			a.active {
				font-weight: 600;
			}

			img {
				visibility: hidden;
				height: 8px;
				width: 8px;

				&.show {
					visibility: unset;
				}
			}
		}
	}
}

.blog-post--footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: calc(100% - 300px);
	padding: 10px 48px;
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
}
</style>
