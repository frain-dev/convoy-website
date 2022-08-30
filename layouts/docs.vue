<template>
	<div class="flex h-screen">
		<aside class="max-w-[270px] bg-[#16192C] text-white-100 h-screen overflow-y-auto overflow-x-hidden fixed transition-all duration-300 z-50 md:static md:w-full" :class="showMenu ? 'w-full' : 'w-0'">
			<div class="flex items-center px-24px py-20px border-b border-b-white-4">
				<nuxt-link to="/"><img src="~/assets/images/logo.svg" class="h-22px w-84px mr-4px" alt="logo" /></nuxt-link>
				<span class="font-medium text-16 text-success-100">Docs</span>
			</div>

			<button class="absolute top-[19px] right-10px md:hidden" @click="showMenu = !showMenu">
				<img v-if="showMenu" src="~/assets/images/close-icon.svg" alt="close icon" width="24" />
			</button>

			<div class="flex flex-col relative mx-24px mt-24px">
				<select
					class="
						font-normal
						text-14 text-white-100
						bg-[#181d31]
						border border-grey-60
						rounded-4px
						py-10px
						px-16px
						transition-all
						duration-300
						focus:outline-none focus:pt-20px focus:pb-10px focus:px-16px
						valid:pt-20px valid:pb-10px valid:px-16px
						appearance-none
						peer
					"
					required
				>
					<option v-for="version in versions" selected :key="version" :value="version">{{ version }}</option>
				</select>
				<label
					for="version"
					class="font-medium text-14 text-[#a5abc1] capitalize absolute ml-16px top-10px transition-all duration-300 peer-valid:font-medium peer-valid:text-10 peer-valid:ml-16px peer-valid:top-6px"
				>
					Version
				</label>
			</div>

			<nav class="py-20px pl-20px">
				<sidebar-item :pages="pages"></sidebar-item>
			</nav>
		</aside>

		<div class="main bg-[#fafafe] w-full overflow-y-auto">
			<header class="w-full bg-white-100 flex items-center justify-between flex-wrap sticky top-0 py-10px px-20px md:py-12px md:px-24px z-10">
				<button class="block md:hidden order-1" @click="showMenu = !showMenu">
					<img v-if="!showMenu" src="~/assets/images/menu-icon-dark.svg" alt="menu icon" width="24" />
					<img v-if="showMenu" src="~/assets/images/close-icon-dark.svg" alt="close icon" width="24" />
				</button>

				<DocsSearch class="order-2 xs:order-3" />

				<div class="flex items-center order-3 xs:order-2">
					<a
						href="https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email"
						target="_blank"
						rel="noreferrer"
						class="bg-primary-100 m-auto text-white-100 whitespace-nowrap !text-12 desktop:!text-14 font-semibold flex items-center py-8px px-20px shadow-sm rounded-8px mr-24px w-fit "
					>
						Join our community
						<img src="~/assets/images/arrow-right-icon.svg" class="ml-12px w-10px h-10px" alt="arrow right" />
					</a>
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
			showMenu: false,
			versions: ['Latest v0.6.x']
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
