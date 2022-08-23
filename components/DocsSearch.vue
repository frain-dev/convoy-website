<template>
	<div class="max-w-[378px] w-full relative my-0 mx-20px">
		<form>
			<div class="flex items-center bg-white-100 border border-grey-10 rounded-4px py-10px px-16px w-full">
				<img src="~/assets/images/search-icon.svg" class="w-18px" alt="search icon" />
				<input v-model="searchQuery" autocomplete="off" type="search" aria-label="search" id="search" name="search" placeholder="Search documentation" class="border-none ml-10px w-full outline-none" />
			</div>
		</form>
		<ul v-if="articles.length" class="absolute bg-white-100 w-full border border-grey-10 rounded-8px top-50px">
			<li class="py-14px px-20px text-14 border-b border-b-grey-10 last-of-type:border-none" v-for="article of articles" :key="article.slug" @click="clearSearchDropDown">
				<NuxtLink class="flex items-center" :to="'/docs/' + article.slug">
					<img src="~/assets/images/link-icon-2.svg" class="w-12px mr-10px" alt="link icon" />
					{{ article.title }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchQuery: '',
			articles: []
		};
	},
	watch: {
		async searchQuery(searchQuery) {
			if (!searchQuery) {
				this.articles = [];
				return;
			}
			this.articles = await this.$content('docs').search(searchQuery).fetch();
		}
	},
	methods: {
		clearSearchDropDown() {
			this.articles = [];
		}
	}
};
</script>
