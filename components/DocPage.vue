<template>
	<main class="py-36px px-0 w-full m-0 desktop:flex desktop:justify-center">
		<article class="content max-w-[800px] w-full py-0 px-20px m-auto md:px-60px md:m-[unset]">
			<nuxt-content class="docs w-full" :document="pageData"></nuxt-content>

			<div class="py-30px px-0 text-14 font-light desktop:flex desktop:items-center desktop:justify-between" v-if="pageData.slug !== '404'">
				<a
					:href="'https://github.com/frain-dev/convoy-website/tree/main/content' + this.$route.path + '.md'"
					target="_blank"
					referrerpolicy="noreferrer"
					class="flex items-center underline text-light-green mobile:mb-20px"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-10px w-14px">
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

				<div class="font-light">Updated at {{ pageData.updatedAt | date }}</div>
			</div>
		</article>

		<div class="sidemenu hidden md:min-w-[250px] md:sticky md:top-104px md:h-fit md:block" v-show="pageData.toc.length > 0">
			<h4 class="font-semibold text-14 text-black pl-10px mb-8px">ON THIS PAGE</h4>
			<ul v-show="pageData.toc.length > 0">
				<li
					class="sub-menu py-8px px-0 flex items-center border-b border-b-grey-10"
					:class="{ 'pl-[15px] py-4px': subpage.depth > 2 }"
					v-for="(subpage, index) in pageData.toc"
					:key="index"
					:id="subpage.id"
				>
					<img src="~/assets/images/arrow-right.svg" class="w-8px h-8px invisible group-active:visible" alt="angle right" />
					<nuxt-link :to="{ path: './' + pageData.id, hash: '#' + subpage.id }" class="font-light text-14 text-grey-60 group-active:font-semibold">{{ subpage.text }}</nuxt-link>
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
.sidemenu {
	li {
		&.sub-menu {
			&.active {
				a {
					@apply font-semibold transition-all duration-300;
				}
				img {
					@apply visible;
				}
			}
			img {
				@apply invisible mr-2px;
			}
		}
	}
}
</style>
