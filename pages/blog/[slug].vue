<template>
    <NuxtLayout name="blog">
        <div v-if="post" class="m-auto p-0">
            <div class="max-w-[780px] w-full m-auto px-20px desktop:p-0">
                <div class="flex w-full flex-col desktop:flex-row desktop:items-center desktop:justify-between">
                    <div class="font-medium text-14 text-grey-80">
                        <NuxtLink tag="button" to="/blog">Blog</NuxtLink>

                        <span class="mx-16px">|</span>
                        <span class="text-primary-100">{{ post.primary_tag }}</span>
                    </div>

                    <div class="font-medium text-14 flex items-center mt-16px desktop:mt-0">
                        {{ post.readingTime }} min read
                        <span class="mx-6px mb-2px"><img src="~/assets/images/ellipse.svg" class="w-4px h-4px" alt="ellipse" /></span>
                        {{ post.published_at }}
                    </div>
                </div>

                <h3 class="font-bold text-black mt-16px mb-40px desktop:mt-30px desktop:mb-26px desktop:text-[48px] desktop:leading-[58px]">{{ post.title }}</h3>

                <div class="flex items-end justify-between mb-56px desktop:mb-44px">
                    <a :href="post.primary_author.twitter ? 'http://twitter.com/' + post.primary_author.twitter : ''" target="_blank" class="flex items-start">
                        <div class="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center bg-[#f5f5f5]">
                            <!-- <img :src="`/profile-images/${post.primary_author.name}.png`" class="w-full rounded-[50%] mr-12px" alt="author imge" /> -->
                        </div>
                        <div>
                            <!-- <h6 class="font-semibold text-primary-100 mb-2px">{{ post.primary_author.name }}</h6> -->
                            <p class="font-normal text-14 mb-6px text-grey-80">{{ post.primary_author.meta_title }} Convoy</p>
                        </div>
                    </a>

                    <div>
                        <p class="mb-8px text-14 text-grey-80">Share to:</p>
                        <ul class="socials">
                            <li class="!w-32px !h-32px">
                                <a rel="noopener noreferrer" :href="'https://twitter.com/intent/tweet/?text=' + post.title + '%20from%20@getconvoy&url=https://getconvoy.io' + post._path + '&via=getconvoy'" target="_blank">
                                    <img src="~/assets/images/twitter-grey-icon.svg" alt="twitter logo" />
                                </a>
                            </li>

                            <li class="!w-32px !h-32px">
                                <a rel="noopener noreferrer" :href="'https://www.linkedin.com/sharing/share-offsite/?mini=true&url=https://getconvoy.io' + post._path + ''" target="_blank">
                                    <img src="~/assets/images/linkedin-grey-icon.svg" alt="linkedin logo" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <main class="max-w-[780px] w-full">
                        <div class="font-normal text-16 text-grey-80">
                            <ContentDoc />
                        </div>
                    </main>
                </div>
            </div>

            <div class="max-w-[970px] w-full m-auto px-20px desktop:mt-130px">
                <h1 class="font-bold">More Posts</h1>
                <div class="mt-32px justify-center desktop:grid desktop:grid-cols-2 desktop:gap-48px">
                    <Post v-for="(post, index) in morePosts" :key="index" :post="post" />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
interface POST {
    body: { type: string, children: any[], toc: { title: string, links: { text: string; depth: string; id: string }[] }[] },
    description: string,
    excerpt: { type: string, children: any[] },
    feature_image: string,
    featured: boolean,
    post_image: string,
    primary_author: { [x: string]: any; name: string, twitter: string },
    primary_tag: string,
    published_at: string,
    tags: string[],
    title: string,
    _path: string,
    readingTime: string
}

const { path } = useRoute()

const { data: post } = await useAsyncData(`content-${path}`, () => {
    return queryContent<POST>().where({ _path: path }).findOne()
})
console.log("🚀 ~ file: [slug].vue ~ line 91 ~ const{data:post}=awaituseAsyncData ~ post", post)
const { data: morePosts } = await useAsyncData(() => queryContent<POST>('blog').sort({ title: 1 }).limit(2).find())

// import Prism from 'prismjs';

// export default {
// 	layout: 'blog',
// 	scrollToTop: true,
// 	async asyncData({ $content, params }) {
// 		try {
// 			const post = await $content('blog/' + params.slug).fetch();
// 			const posts = await $content('blog').limit(2).sortBy('published_at', 'asc').fetch();
// 			post.readingTime = Math.ceil(post.readingTime / (1000 * 60));
// 			return { post, posts };
// 		} catch (error) {
// 			const post = await $content('404').fetch();
// 			return { post };
// 		}
// 	},
// 	mounted() {
// 		Prism.highlightAll();
// 	},
// 	head() {
// 		return {
// 			title: this.post.title,
// 			__dangerouslyDisableSanitizers: ['meta', 'script'],
// 			meta: [
// 				{ hid: 'description', name: 'description', content: this.post.description },
// 				{
// 					hid: 'article:tag',
// 					name: 'article:tag',
// 					content: this.post.primary_tag
// 				},
// 				{
// 					hid: 'twitter:label1',
// 					name: 'twitter:label1',
// 					content: 'Written by'
// 				},
// 				{
// 					hid: 'twitter:data1',
// 					name: 'twitter:data1',
// 					content: this.post.primary_author.name
// 				},
// 				{
// 					hid: 'twitter:label2',
// 					name: 'twitter:label2',
// 					content: 'Filed under'
// 				},
// 				{
// 					hid: 'twitter:data2',
// 					name: 'twitter:data2',
// 					content: `Convoy`
// 				},
// 				{
// 					hid: 'apple-mobile-web-app-title',
// 					name: 'apple-mobile-web-app-title',
// 					content: this.post.title
// 				},
// 				{ hid: 'og:title', name: 'og:title', content: this.post.title },
// 				{ hid: 'og:site_name', name: 'og:site_name', content: 'Convoy' },
// 				{ hid: 'og:type', name: 'og:type', content: 'article' },
// 				{
// 					hid: 'og:description',
// 					name: 'og:description',
// 					content: this.post.description
// 				},
// 				{
// 					hid: 'og:url',
// 					name: 'og:url',
// 					content: `https://getconvoy.io/blog/${this.post.slug}`
// 				},
// 				{
// 					hid: 'article:published_time',
// 					name: 'article:published_time',
// 					content: this.post.published_at
// 				},
// 				{
// 					hid: 'article:modified_time',
// 					name: 'article:modified_time',
// 					content: this.post.updatedAt
// 				},
// 				{
// 					hid: 'article:publisher',
// 					name: 'article:publisher',
// 					content: 'http://twitter.com/' + this.post.primary_author.twitter
// 				},
// 				{
// 					hid: 'twitter:title',
// 					name: 'twitter:title',
// 					content: this.post.title
// 				},
// 				{
// 					hid: 'twitter:card',
// 					name: 'twitter:card',
// 					content: 'summary_large_image'
// 				},
// 				{
// 					hid: 'twitter:url',
// 					name: 'twitter:url',
// 					content: `https://getconvoy.io/blog/${this.post.slug}`
// 				},
// 				{
// 					hid: 'twitter:text:title',
// 					name: 'twitter:text:title',
// 					content: this.post.title
// 				},
// 				{
// 					hid: 'twitter:description',
// 					name: 'twitter:description',
// 					content: this.post.description
// 				},
// 				{
// 					hid: 'og:image',
// 					property: 'og:image',
// 					content: 'https://getconvoy.io/post-images/' + this.post.post_image
// 				},
// 				{
// 					hid: 'twitter:image',
// 					property: 'twitter:image',
// 					content: 'https://getconvoy.io/post-images/' + this.post.post_image
// 				},
// 				{
// 					hid: 'twitter:url',
// 					name: 'twitter:url',
// 					content: `https://getconvoy.io/blog/${this.post.slug}`
// 				}
// 			],
// 			link: [{ rel: 'canonical', href: `https://getconvoy.io/blog/${this.post.slug}` }],
// 			script: [
// 				{
// 					innerHTML: `
// 				{
// 					"@context": "https://schema.org",
// 					"@type": "Article",
// 					"publisher": {
// 						"@type": "Organization",
// 						"name": "Convoy",
// 						"url": "https://getconvoy.io/blog",
// 						"logo": {
// 							"@type": "ImageObject",
// 							"url": "https://getconvoy.io/favicon.ico",
// 							"width": 48,
// 							"height": 48
// 						}
// 					},
// 					"author": {
// 						"@type": "Person",
// 						"name": "${this.post.primary_author.name}",
// 						"url": "http://twitter.com/${this.post.primary_author.twitter}",
// 						"sameAs": []
// 					},
// 					"headline": ${this.post.title}",
// 					"url": "https://getconvoy.io/blog/${this.post.slug}",
// 					"datePublished": "${this.post.published_at}",
// 					"dateModified": "${this.post.updatedAt}",
// 					"image": {
// 						"@type": "ImageObject",
// 						"url": "https://getconvoy.io/post-images/${this.post.post_image}",
// 						"width": 882,
// 						"height": 346
// 					},
// 					"keywords": "Convoy",
// 					"description": "${this.post.description}",
// 					"mainEntityOfPage": {
// 						"@type": "WebPage",
// 						"@id": "https://getconvoy.io/"
// 					}
// 				}
// 			`,
// 					type: 'application/ld+json'
// 				},
// 				{
// 					type: 'application/rss+xml',
// 					rel: 'alternate',
// 					title: 'Convoy RSS Feed',
// 					href: 'https://getconvoy.io/blog/rss'
// 				},
// 				{
// 					type: 'application/json',
// 					rel: 'alternate',
// 					title: 'Convoy Json Feed',
// 					href: 'https://getconvoy.io/blog/json'
// 				}
// 			]
// 		};
// 	}
// };
</script>
