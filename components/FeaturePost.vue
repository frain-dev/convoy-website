<template>
    <div class="
                bg-white-100
                rounded-12px
                shadow-card
                max-w-[970px]
                pt-32px
                px-12px
                m-auto
                desktop:pl-56px desktop:pt-56px desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
                mobile:mb-48px
            ">
        <div class="desktop:max-w-[470px] p-10px">
            <div class="flex justify-between items-center mb-24px">
                <div class="py-2px px-16px bg-[#0747a6] bg-opacity-10 rounded-2px font-medium text-14 text-primary-100 uppercase">Blog post</div>
                <div class="font-medium text-14">{{ post.published_at }}</div>
            </div>
            <nuxt-link :to="'/blog/' + post.slug">
                <h3 class="desktop:text-32 text-26 font-bold">{{ post.title }}</h3>
            </nuxt-link>

            <p class="font-light text-grey-80 text-16 mb-16px">{{ post.description }}...</p>
            <div class="flex flex-col flex-wrap my-26px desktop:items-end desktop:flex-row desktop:justify-between">
                <!-- <a v-if="post.primary_author" :href="post.primary_author.twitter ? 'http://twitter.com/' + post.primary_author.twitter : ''" target="_blank" class="flex items-start mb-40px desktop:mb-0">
                    <div class="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center bg-grey-20">
                        <img :src="`/profile-images/${post.primary_author.name}.png`" class="w-full mr-12px rounded-[50%]" alt="author imge" />
                    </div>
                    <div>
                        <h5 class="font-medium mb-4px">{{ post.primary_author.name }}</h5>
                        <p class="text-14 text-grey-80">Convoy</p>
                    </div>
                </a> -->
                <nuxt-link :to="'/blog/' + post.slug" class="flex items-center text-primary-100 font-medium text-14">
                    Read More
                    <img src="~/assets/images/angle-right-primary.svg" class="w-20px" alt="read more icon" />
                </nuxt-link>
            </div>
        </div>
        <div class="w-full desktop:w-380px desktop:right-0 desktop:bottom-0 desktop:mt-0" v-if="post.feature_image">
            <img :src="`/feature-images/${post.feature_image}`" class="rounded-br-10px w-full" alt="featured post img" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface POST {
    body: { type: string, children: any[], toc: { title: string, links: { text: string; depth: string; id: string }[] }[] },
    description: string,
    excerpt: { type: string, children: any[] },
    feature_image: string,
    featured: boolean,
    post_image: string,
    primary_author: { name: string, twitter: string },
    primary_tag: string,
    published_at: string,
    tags: string[],
    title: string,
    slug: string
}
const { post } = defineProps<{ post: POST }>()
</script>
