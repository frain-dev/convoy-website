<template>
    <div class="max-w-[378px] w-full relative my-12px desktop:my-0 desktop:mx-20px">
        <form @submit.prevent="searchDocs">
            <div class="flex items-center bg-white-100 border border-grey-10 rounded-4px py-10px px-16px w-full">
                <img src="~/assets/images/search-icon.svg" class="w-18px" alt="search icon" />
                <input v-model="searchQuery" autocomplete="off" type="search" aria-label="search" id="search" name="search" placeholder="Search documentation" class="border-none ml-10px w-full outline-none text-14" />
            </div>
        </form>

        <!-- <ul v-if="articles.length" class="absolute bg-white-100 w-full border border-grey-10 rounded-8px top-50px">
            <li class="py-14px px-20px text-14 border-b border-b-grey-10 last-of-type:border-none" v-for="article of articles" :key="article.slug" @click="clearSearchDropDown">
                <NuxtLink class="flex items-center" :to="'/docs/' + article.slug">
                    <img src="~/assets/images/link-icon-2.svg" class="w-12px mr-10px" alt="link icon" />
                    {{ article.title }}
                </NuxtLink>
            </li>
        </ul> -->
    </div>
</template>

<script setup lang="ts">
let searchQuery = '';
let articles: any[] = [];

const searchDocs = async () => {
    if (!searchQuery) {
        articles = [];
        return;
    }

    // console.log("🚀 ~ file: DocsSearch.vue ~ line 27 ~ watch ~ searchQuery", searchQuery)
    const { data: doc } = await useAsyncData(() => {
        return queryContent('docs').where({ title: 'API' }).find()
    })
    console.log("🚀 ~ file: DocsSearch.vue ~ line 35 ~ const{data:doc}=awaituseAsyncData ~ doc", doc)
    // console.log("🚀 ~ file: DocsSearch.vue ~ line 32 ~ watch ~ searchQuery", articles)
}
watch(() => searchQuery, () => searchDocs())


// export default {
//     data() {
//         return {
//             searchQuery: '',
//             articles: []
//         };
//     },
//     watch: {
//         async searchQuery(searchQuery) {
//             if (!searchQuery) {
//                 this.articles = [];
//                 return;
//             }
//             // this.articles = await this.$content('docs').search(searchQuery).fetch();
//         }
//     },
//     methods: {
//         clearSearchDropDown() {
//             this.articles = [];
//         }
//     }
// };
</script>
