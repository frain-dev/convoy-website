<template>
    <NuxtLayout name="blog">
        <div class="m-auto pb-0 flex justify-between pt-0">
            <aside class="w-240px hidden desktop:sticky desktop:top-150px desktop:block desktop:pl-20px desktop:pr-32px">
                <ul class="p-0">
                    <h6 class="font-bold text-black mb-18px">CATEGORIES</h6>

                    <li v-for="(tag, index) in tags" :key="'tag' + index" class="font-semibold text-14 mb-30px text-grey-40">
                        <nuxt-link :to="tag !== 'All Posts' ? '/blog?tag=' + tag : '/blog'">{{ tag }}</nuxt-link>
                    </li>
                </ul>

                <!-- Pending when there is enough content for this -->
                <!-- <form class="bg-white-100 rounded-4px w-full flex border border-grey-40">
				<img src="~/assets/images/search-icon.svg" class="w-14px mr-10px" alt="search icon" />
				<input type="search" placeholder="Search" class="border-none w-full outline-none" />
			</form> -->

                <div>
                    <h6 class="font-semibold mb-18px">Follow Us</h6>

                    <ul class="socials">
                        <li class="bg-grey-40 bg-opacity-10">
                            <a target="_blank" rel="noopener noreferrer" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
                                <img src="~/assets/images/slack-grey-icon.svg" alt="slack logo" />
                            </a>
                        </li>
                        <li class="bg-grey-40 bg-opacity-10">
                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/getconvoy"><img src="~/assets/images/twitter-grey-icon.svg" alt="twitter logo" /></a>
                        </li>
                        <li class="bg-grey-40 bg-opacity-10">
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/frain-dev/convoy"><img src="~/assets/images/github-grey-icon.svg" alt="mail logo" /></a>
                        </li>
                    </ul>
                </div>
            </aside>

            <main class="max-w-[1035px] w-full px-20px">
                <div class="relative">
                    <h2 class="font-bold text-black flex items-center">
                        {{ tag !== 'Convoy' ? tag : 'All Posts' }}
                        <button @click="showCategories = !showCategories" class="h-fit mt-4px ml-8px desktop:hidden">
                            <img src="~/assets/images/angle-down-black-icon.svg" alt="arrow down iconn" />
                        </button>
                    </h2>
                    <ul class="absolute bg-white-100 shadow-sm rounded-10px p-24px z-1 w-216px mt-4px" v-if="showCategories">
                        <li v-for="(tag, index) in tags" :key="'tag' + index" class="mb-32px last-of-type:mb-0 text-14 text-grey-60">
                            <nuxt-link :to="'/blog?tag=' + tag">{{ tag }}</nuxt-link>
                        </li>
                    </ul>
                </div>

                <FeaturePost :post="featurePost"></FeaturePost>

                <div class="desktop:grid desktop:grid-cols-2 gap-y-62px gap-x-48px max-w-[970px] mb-48px mt-48px">
                    <template v-if="posts">
                        <post v-for="(post) in posts.slice(0, 4)" :post="post"></post>
                    </template>
                </div>

                <div class="bg-white-100 shadow-card rounded-8px flex flex-col items-center max-w-[970px] py-32px px-24px desktop:px-70px mt-40px desktop:mt-48px desktop:flex-row desktop:justify-around">
                    <div>
                        <p class="mb-10px text-14 text-center desktop:text-left">Join our newsletter</p>
                        <p class="text-14 text-center desktop:text-left">No spam! Just articles, events, and talks.</p>
                        <form @submit.prevent="requestAccess()" class="bg-primary-500 border-grey-20 flex p-10px rounded-8px items-center mt-24px">
                            <img src="~/assets/images/mail-primary-icon.svg" alt="mail icon" class="w-30px" />
                            <input type="email" id="email" placeholder="Your email" aria-label="Email" v-model="earlyAccessEmail" class="bg-transparent focus:outline-none focus:border-none" />
                            <button>
                                <img src="~/assets/images/send-primary-icon.svg" alt="send icon" class="w-24px h-24px" />
                            </button>
                        </form>
                    </div>
                    <img src="~/assets/images/mailbox.gif" class="w-180px order-1 m-auto desktop:order-2 desktop:m-[unset]" alt="mailbox animation" />
                </div>

                <div class="desktop:grid desktop:grid-cols-2 gap-y-62px gap-x-48px max-w-[970px] mt-48px">
                    <template v-if="posts">
                        <post v-for="(post, index) in posts.slice(4)" :post="post"></post>
                    </template>
                </div>
            </main>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const showCategories = false;
let earlyAccessEmail = ref('');
const tags = ['All Posts', 'Product Update', 'News', 'Engineering'];
let tag = tags[0];


const { data: featurePost } = await useAsyncData(() => queryContent('blog').where({ featured: { $eq: true } }).findOne())
const { data: posts } = await useAsyncData(() => queryContent('blog').where({ featured: { $eq: false } }).find())

const requestAccess = async () => {
    try {
        const response = await fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: earlyAccessEmail
            })
        });
        await response.json();
        earlyAccessEmail.value = '';
    } catch (error) {
    }
}
</script>
