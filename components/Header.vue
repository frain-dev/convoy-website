<template>
	<header>
		<nav
			class="w-full m-auto px-20px pt-60px pb-20px z-50 fixed left-[50%] -translate-x-1/2 translate-y-0 nav-bar-break:pt-50px nav-bar-break:pb-12px transition-all duration-300 bg-white-100 shadow-nav backdrop-blur-[18]"
		>
			<section class="fixed top-0 left-0 bg-primary-100 w-full h-40px py-8px px-12px flex items-center justify-center font-medium text-12 text-white-100 nav-bar-break:text-14">
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

			<div class="flex items-center justify-between m-auto max-w-[1300px]">
				<button class="block absolute nav-bar-break:hidden" @click="showMenu = !showMenu">
					<img v-if="!showMenu" src="~/assets/images/menu-icon.svg" alt="menu icon" width="24" />
					<img v-if="showMenu" src="~/assets/images/close-icon.svg" alt="close icon" width="24" />
				</button>

				<div class="ml-50px w-4/5 nav-bar-break:w-fit nav-bar-break:ml-0">
					<nuxt-link to="/">
						<img src="~/assets/images/convoy-logo.svg" class="w-110px" alt="logo" />
					</nuxt-link>
				</div>

				<ul
					class="mobile:absolute mobile:top-104px mobile:left-20px mobile:text-left mobile:bg-white-100 mobile:shadow-sm mobile:rounded-10px mobile:min-w-[250px] nav-bar-break:flex nav-bar-break:items-center nav-bar-break:justify-end nav-bar-break:bg-transparent transition-all duration-500"
					:class="showMenu ? 'mobile:h-fit mobile:block mobile:z-50' : 'mobile:hidden mobile:h-0'"
				>
					<li
						class="py-14px px-20px nav-bar-break:mr-10px border-b border-b-grey-10 last-of-type:border-none nav-bar-break:border-none relative"
						v-for="link in menuItems"
						:key="link.name"
						@click="currentRoute = link.name"
					>
						<nuxt-link class="text-14 text-grey-40 font-medium transition-all duration-300 hover:text-black" exact-active-class="text-primary-100" v-if="link.type === 'route'" :to="link.route">
							{{ link.name }}
						</nuxt-link>
						<a class="text-14 text-grey-40 font-medium transition-all duration-300 hover:text-black" v-else-if="link.type === 'link'" target="_blank" rel="noopener noreferrer" :href="link.route">
							{{ link.name }}
						</a>
						<template v-else>
							<a
								class="text-14 font-medium flex items-center justify-between transition-all duration-300 hover:text-black hover:cursor-pointer group"
								:class="isChildRouteActive(link.name) ? 'text-primary-100' : 'text-grey-40'"
							>
								{{ link.name }}
								<svg width="16" height="16" class="transition-all duration-300 group-hover:fill-black" :class="isChildRouteActive(link.name) ? 'fill-primary-100' : 'fill-grey-40 '">
									<use xlink:href="#angle-down-icon"></use>
								</svg>
							</a>
							<div
								class="nav-bar-break:absolute nav-bar-break:top-[100%] nav-bar-break:min-w-[174px] w-full bg-white-100 rounded-10px nav-bar-break:shadow-dropdown nav-bar-break:z-10 transition-all ease-in-out duration-300 nav-bar-break:h-fit"
								v-if="currentRoute === link.name"
							>
								<ul class="nav-bar-break:pl-20px nav-bar-break:pb-20px">
									<li
										class="py-10px nav-bar-break:pr-20px nav-bar-break:border-b nav-bar-break:border-b-grey-20"
										v-for="subRoute in link.children"
										:key="subRoute.name"
										@click="closeDropdown($event)"
									>
										<nuxt-link class="text-12 text-grey-40 transition-all duration-300 hover:text-black" :to="subRoute.route">{{ subRoute.name }}</nuxt-link>
									</li>
								</ul>
							</div>
						</template>
					</li>

					<li class="py-14px px-20px nav-bar-break:p-0">
						<a
							href="https://github.com/frain-dev/convoy#installation-getting-started"
							target="_blank"
							class="nav-bar-break:py-8px nav-bar-break:px-24px text-14 font-medium rounded-8px nav-bar-break:bg-primary-100 nav-bar-break:text-white-100 text-primary-100 flex items-center"
						>
							Get Started
						</a>
					</li>

					<li>
						<a href="https://github.com/frain-dev/convoy">
							<img src="~/assets/images/github-logo.svg" alt="github logo" />
						</a>
					</li>
				</ul>
				<a href="https://github.com/frain-dev/convoy" class="block nav-bar-break:hidden">
					<img src="~/assets/images/github-logo.svg" alt="github logo" />
				</a>
			</div>
		</nav>

		<div
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-[25px] transition-all duration-500"
			:class="showMenu ? 'pointer-events-all opacity-100 z-[2]' : 'pointer-events-none opacity-0'"
			@click="showMenu = !showMenu"
		></div>
		<div class="fixed w-screen h-screen top-0 left 0" v-if="currentRoute === 'Products' || currentRoute === 'Resources'" @click="currentRoute = ''"></div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			showMenu: false,
			githubStars: 0,
			menuItems: [
				{
					name: 'Products',
					type: 'dropdown',
					children: [
						{ name: 'Community Edition', route: '/community', type: 'route' },
						{ name: 'Enterprise Edition', route: '/enterprise', type: 'route' },
						{ name: 'Convoy Cloud', route: '/cloud', type: 'route' }
					]
				},
				{ name: 'Pricing', route: '/pricing', type: 'route' },
				{
					name: 'Resources',
					type: 'dropdown',
					children: [
						{ name: 'Blog', route: '/blog', type: 'route' },
						{ name: 'Docs', route: '/docs', type: 'route' },
						{ name: 'Tutorials', route: '/blog?tag=Tutorial', type: 'route' }
					]
				},
				{ name: 'Community', route: 'https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email', type: 'link' },
				{ name: 'Watch Demo', route: '/demo', type: 'route' }
			],
			hasScrolled: false,
			currentRoute: ''
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
			this.$route.name == 'blog' || window.scrollY > 50 ? (this.hasScrolled = true) : (this.hasScrolled = false);
		},
		closeDropdown(e) {
			e.stopPropagation();
			this.currentRoute = '';
			this.showMenu = false;
		},
		isChildRouteActive(parentRoute) {
			const childrenRoutes = this.menuItems.find(item => item.name === parentRoute)?.children;

			return childrenRoutes?.some(route => this.$route.path.includes(route.route));
		}
	},
	created() {
		if (process.client) {
			window.addEventListener('scroll', this.handleScroll);
		}
	}
};
</script>
