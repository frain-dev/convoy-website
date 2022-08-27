<template>
	<div>
		<nav
			class="w-full m-auto px-20px pt-60px pb-20px z-50 fixed left-[50%] -translate-x-1/2 translate-y-0 desktop:pt-50px desktop:pb-12px transition-all duration-300"
			:class="hasScrolled ? 'bg-[#302f3f] shadow-nav backdrop-blur-[36]' : 'bg-[#302f3f]'"
		>
			<section class="fixed top-0 left-0 bg-primary-100 w-full h-40px py-8px px-12px flex items-center justify-center font-medium text-12 text-white-100 desktop:text-14">
				<span>Give us a star on GitHub</span>
				<a class="h-20px w-20px mx-12px hover:cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy">
					<img src="~/assets/images/github-icon-white.svg" class="w-18px h-18px" alt="github icon" />
				</a>
				<a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy">
					<button class="bg-white-100 border border-grey-10 shadow-default rounded-4px text-primary-100 font-medium text-12 h-24px p-10px flex items-center ml-10px">
						<img src="~/assets/images/github-star.svg" class="w-16px h-16px mr-4px" alt="github star" />
						{{ githubStars }}
					</button>
				</a>
			</section>

			<div class="flex items-center justify-between m-auto max-w-[1200px]">
				<button class="block absolute desktop:hidden" @click="showMenu = !showMenu">
					<img v-if="!showMenu" src="~/assets/images/menu-icon.svg" alt="menu icon" width="24" />
					<img v-if="showMenu" src="~/assets/images/close-icon.svg" alt="close icon" width="24" />
				</button>

				<div class="ml-50px w-4/5 desktop:w-fit desktop:ml-0">
					<nuxt-link to="/">
						<img src="~/assets/images/logo.svg" class="w-110px" alt="logo" />
					</nuxt-link>
				</div>

				<ul
					class="
						mobile:absolute mobile:top-104px mobile:left-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-10px mobile:min-w-[250px]
						desktop:flex desktop:items-center desktop:justify-end desktop:bg-transparent
						transition-all
						duration-500
					"
					:class="showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'"
				>
					<li class="py-14px px-20px desktop:mr-20px border-b border-b-grey-10 last-of-type:border-none desktop:border-none" v-for="link in menuItems" :key="link.name">
						<nuxt-link class="text-black desktop:text-white-100 text-14" v-if="link.type === 'route'" :to="link.route">{{ link.name }}</nuxt-link>
						<a class="text-black desktop:text-white-100 text-14" v-else target="_blank" rel="noopener noreferrer" :href="link.route">{{ link.name }}</a>
					</li>

					<li>
						<a href="https://github.com/frain-dev/convoy">
							<img src="~/assets/images/github-logo.svg" alt="github logo" />
						</a>
					</li>
				</ul>
				<a href="https://github.com/frain-dev/convoy" class="block desktop:hidden">
					<img src="~/assets/images/github-logo.svg" alt="github logo" />
				</a>
			</div>
		</nav>
		<div
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-[25px] transition-all duration-500"
			:class="showMenu ? 'pointer-events-all opacity-100 z-[2]' : 'pointer-events-none opacity-0'"
			@click="showMenu = !showMenu"
		></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showMenu: false,
			githubStars: 0,
			menuItems: [
				{ name: 'Features', route: '/#features', type: 'route' },
				{ name: 'Blog', route: '/blog', type: 'route' },
				{ name: 'Docs', route: '/docs', type: 'route' },
				{ name: 'Community', route: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', type: 'link' },
				{ name: 'Download', route: '/download', type: 'route' }
			],
			hasScrolled: false
		};
	},
	mounted() {
		this.getGithubStars();
		this.handleScroll();
	},
	methods: {
		async getGithubStars() {
			try {
				const response = await fetch('https://api.github.com/repos/frain-dev/convoy');
				const data = await response.json();
				this.githubStars = data.stargazers_count;
			} catch (_error) {}
		},
		handleScroll() {
			this.$route.name == 'blog' || window.scrollY > 70 ? (this.hasScrolled = true) : (this.hasScrolled = false);
		}
	},
	created() {
		if (process.client) {
			window.addEventListener('scroll', this.handleScroll);
		}
	}
};
</script>
