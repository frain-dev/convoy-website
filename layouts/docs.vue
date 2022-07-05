<template>
	<div class="page">
		<aside :class="{ show: showMenu }">
			<div class="logo">
				<nuxt-link to="/"><img src="~/assets/images/logo.svg" alt="logo" /></nuxt-link>
				<span>Docs</span>
			</div>

			<button class="menu-button" @click="showMenu = !showMenu">
				<img v-if="showMenu" src="~/assets/images/close-icon.svg" alt="close icon" width="24" />
			</button>

			<nav>
				<sidebar-item :pages="pages"></sidebar-item>
			</nav>
		</aside>

		<div class="main">
			<header>
				<button class="menu-button" @click="showMenu = !showMenu">
					<img v-if="!showMenu" src="~/assets/images/menu-icon-dark.svg" alt="menu icon" width="24" />
					<img v-if="showMenu" src="~/assets/images/close-icon-dark.svg" alt="close icon" width="24" />
				</button>

				<DocsSearch />

				<div>
					<a href="https://github.com/frain-dev/convoy/" target="_blank" rel="noreferrer">
						<img src="~/assets/images/github-icon-dark.svg" alt="github icon" />
					</a>
				</div>
			</header>

			<Nuxt />
		</div>
	</div>
</template>

<script>
const getNav = () => import('~/data/nav.json').then(m => m.default || m);

export default {
	data() {
		return {
			pages: [],
			showMenu: false
		};
	},
	computed: {
		currentRoute() {
			return this.$route.path;
		}
	},
	async mounted() {
		const pages = await getNav();
		this.pages = pages;
		this.watchScroll();
	},
	methods: {
		stringContains(text, word) {
			return text.includes(word);
		},
		watchScroll() {
			document.querySelector('div.main').addEventListener('scroll', e => {
				const headings = document.querySelectorAll('h2');
				headings.forEach(heading => {
					const rect = heading.getBoundingClientRect();
					if (rect.top > 0 && rect.top < 200 && heading.id) {
						const location = window.location.toString().split('#')[0];
						history.replaceState(null, null, location + '#' + heading.id);
						document.querySelectorAll('li.sub-menu').forEach(element => element.classList.remove('active'));
						document.querySelector(`li.sub-menu#${heading.id}`).classList.add('active');
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
$desktopBreakPoint: 880px;
$desktopBreakPoint2: 1240px;

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
	width: 0;
	background: #16192c;
	color: #ffffff;
	height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	position: fixed;
	z-index: 1;
	transition: 0.3s all;

	&.show {
		width: 100%;
	}

	@media (min-width: $desktopBreakPoint2) {
		position: static;
		width: 100%;
	}

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

	.menu-button {
		position: absolute;
		top: 19px;
		right: 10px;

		@media (min-width: $desktopBreakPoint2) {
			display: none;
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

	nav {
		padding: 24px 0 24px 24px;
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
		width: 100%;
	}
}

header {
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: sticky;
	top: 0px;
	padding: 10px 20px;

	@media (min-width: $desktopBreakPoint2) {
		padding: 13px 24px;

		.menu-button {
			display: none;
		}
	}
}
</style>
