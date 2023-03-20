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
                <select class="
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
					" required>
                    <option v-for="version in versions" selected :key="version" :value="version">{{ version }}</option>
                </select>
                <label for="version" class="font-medium text-14 text-[#a5abc1] capitalize absolute ml-16px top-10px transition-all duration-300 peer-valid:font-medium peer-valid:text-10 peer-valid:ml-16px peer-valid:top-6px">
                    Version
                </label>
            </div>

            <nav class="py-20px pl-20px docs--side-nav">
                <!-- <sidebar-item :pages="pages"></sidebar-item> -->
                <ContentNavigation :query="docs"></ContentNavigation>

                <a href="https://convoy.readme.io/" target="_blank" class="flex items-center text-white-100 text-14 ml-20px mb-30px">
                    Api Reference
                    <img src="~/assets/images/arrow-right-icon.svg" class="ml-12px mt-[3px] w-12px h-12px rotate-[320deg]" alt="arrow right" />
                </a>
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
                    <a href="https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email" target="_blank" rel="noreferrer" class="bg-primary-100 m-auto text-white-100 whitespace-nowrap !text-12 desktop:!text-14 font-semibold flex items-center py-8px px-20px shadow-sm rounded-8px mr-24px w-fit">
                        Join our community
                        <img src="~/assets/images/arrow-right-icon.svg" class="ml-12px w-10px h-10px" alt="arrow right" />
                    </a>
                    <a href="https://github.com/frain-dev/convoy/" target="_blank" rel="noreferrer">
                        <img src="~/assets/images/github-icon-dark.svg" alt="github icon" />
                    </a>
                </div>
            </header>

            <main class="py-62px px-0 w-full m-0 desktop:flex desktop:justify-center">
                <article class="content docs max-w-[800px] w-full py-0 px-20px m-auto md:pr-100px md:m-[unset]">
                    <slot />

                    <div class="py-30px px-0 text-14 font-light desktop:flex desktop:items-center desktop:justify-between">
                        <a :href="'https://github.com/frain-dev/convoy-website/tree/main/content' + path + '.md'" target="_blank" referrerpolicy="noreferrer" class="flex items-center underline text-success-100 mobile:mb-20px">
                            <span>Edit this doc in Github</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-10px">
                                <g>
                                    <path
                                        d="M6.03331 1.66681C5.92363 1.66618 5.81491 1.6872 5.71338 1.72867C5.61185 1.77014 5.51951 1.83125 5.44164 1.90848L1.90831 5.44182C1.83107 5.51968 1.76997 5.61203 1.7285 5.71356C1.68703 5.81509 1.66601 5.92381 1.66664 6.03348C1.66601 6.14315 1.68703 6.25187 1.7285 6.3534C1.76997 6.45494 1.83107 6.54728 1.90831 6.62515L4.26664 8.98348L13.375 18.0918C13.4528 18.169 13.5452 18.2302 13.6467 18.2716C13.7482 18.3131 13.857 18.3341 13.9666 18.3335L17.5 18.3335C17.721 18.3335 17.933 18.2457 18.0892 18.0894C18.2455 17.9331 18.3333 17.7212 18.3333 17.5001L18.3333 13.9668C18.3397 13.8502 18.3214 13.7336 18.2798 13.6245C18.2381 13.5154 18.174 13.4162 18.0916 13.3335L8.98331 4.27515L6.66664 1.90848C6.58587 1.83242 6.49292 1.77045 6.39164 1.72515C6.32521 1.71712 6.25806 1.71712 6.19164 1.72515C6.15285 1.72125 6.11376 1.72125 6.07497 1.72515L6.03331 1.66681ZM16.6666 14.3085L16.6666 16.6668L14.3083 16.6668L6.03331 8.39181L8.39164 6.03348L16.6666 14.3085ZM7.21664 4.85848L4.85831 7.21681L3.68331 6.03348L6.03331 3.68348L7.21664 4.85848Z"
                                        class="fill-success-100" />
                                </g>
                            </svg>
                        </a>
                    </div>
                    <hr class="border-grey-10" />
                    <div class="bg-black bg-[url(~/assets/images/doc-footer.png)] bg-no-repeat bg-contain bg-right-top p-24px mt-32px rounded-8px mb-100px">
                        <h4 class="text-white-100 font-semibold mb-10px">Don't miss anything.</h4>
                        <p class="!text-14 !text-white-100 !font-light max-w-[460px] w-full">
                            Subscribe to the
                            <span class="font-semibold">Convoy Newsletter</span>
                            find tutorials and tools that will help you grow as a developer and scale your project or business, and see interesting topics.
                        </p>
                        <form @submit.prevent="requestAccess()" class="bg-[#1C2126] border-grey-20 flex p-10px rounded-8px items-center mt-24px max-w-[460px] w-full mb-50px">
                            <input type="email" id="email" placeholder="Your email" aria-label="Email" v-model="earlyAccessEmail" class="bg-transparent focus:outline-none focus:border-none w-full text-16 text-white-100" />
                            <button class="flex items-center text-primary-100 text-14">
                                {{ subscribeButtonText }}
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-16px">
                                    <path
                                        d="M7.68681 15.7357L7.0594 15.0963C6.8933 14.9271 6.79999 14.6975 6.79999 14.4581C6.79999 14.2188 6.8933 13.9892 7.0594 13.82L10.8091 10.0013L7.06014 6.18155C6.97784 6.09774 6.91255 5.99822 6.86801 5.88868C6.82347 5.77914 6.80054 5.66174 6.80054 5.54317C6.80054 5.4246 6.82347 5.3072 6.86801 5.19766C6.91255 5.08813 6.97784 4.98861 7.06014 4.90479L7.68754 4.26547C7.76983 4.18132 7.86761 4.11456 7.97528 4.069C8.08294 4.02345 8.19837 4 8.31495 4C8.43153 4 8.54696 4.02345 8.65462 4.069C8.76229 4.11456 8.86007 4.18132 8.94236 4.26547L13.9406 9.36199C14.1067 9.53126 14.2 9.76082 14.2 10.0002C14.2 10.2396 14.1067 10.4691 13.9406 10.6384L8.9394 15.7357C8.7733 15.9049 8.54801 16 8.31311 16C8.0782 16 7.85291 15.9049 7.68681 15.7357Z"
                                        class="fill-primary-100" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </article>


                <div class="sidemenu hidden md:min-w-[250px] md:sticky md:top-104px md:h-fit md:block" v-show="doc && doc.body.toc.links.length > 0">
                    <h6 class="font-semibold text-black pl-10px mb-14px">ON THIS PAGE</h6>
                    <ul>
                        <li class="sub-menu px-0" v-for="(toc, index) in doc?.body.toc.links" :key="index" :id="toc.id">
                            <div class=" flex items-center border-b border-b-grey-10 py-8px">
                                <img src="~/assets/images/arrow-right-success.svg" class="w-8px h-8px" alt="angle right" />
                                <a class="font-medium text-14 text-grey-40" :href="`#${toc.id}`">{{ toc.text }}</a>
                            </div>

                            <ul>
                                <li class="sub-menu px-0 flex items-center border-b border-b-grey-10 pl-[15px] py-4px" v-for="(subtoc, index) in toc.children" :key="'subtoc' + index" :id="subtoc.id">
                                    <img src="~/assets/images/arrow-right-success.svg" class="w-8px h-8px" alt="angle right" />
                                    <a class="font-medium text-14 text-grey-40" :href="`#${subtoc.id}`">{{ subtoc.text }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
interface POST {
    body: { type: string, children: any[], toc: { title: string, links: { text: string; depth: number; id: string, children: { text: string; depth: number; id: string }[] }[] } },
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
    _path: string,
    readingTime: string
}

let showMenu = false;
const versions = ['Latest v0.6.x']
let subscribeButtonText = 'Subscribe'

const docs = {
    where: [
        { _path: /^\/docs/ },
    ],
}
const { path } = useRoute();

const { data: doc } = await useAsyncData(`content-${path}`, () => {
    return queryContent<POST>().where({ _path: path }).findOne()
})


let earlyAccessEmail: string;

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
        earlyAccessEmail = '';
    } catch (error) {
    }
}

const watchScroll = () => {
    document.querySelector('div.main').addEventListener('scroll', e => {
        const headings2 = document.querySelectorAll('h2');
        const headings3 = document.querySelectorAll('h3');
        const headings = [...headings2, ...headings3]
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top > 0 && rect.top < 200 && heading.id) {
                const location = window.location.toString().split('#')[0];
                history.replaceState(null, null, location + '#' + heading.id);
                document.querySelectorAll('.sidemenu li').forEach(element => element.classList.remove('active'));
                document.querySelector(`.sidemenu li#${heading.id}`).classList.add('active');
            }
        });
    });
}

onMounted(() => {
    watchScroll();
})
// const getNav = () => import('~/data/nav.json').then(m => m.default || m);

// export default {
//     data() {
//         return {
//             pages: [],
//             showMenu: false,
//             versions: ['Latest v0.6.x']
//         };
//     },
//     computed: {
//         currentRoute() {
//             return this.$route.path;
//         }
//     },
//     async mounted() {
//         const pages = await getNav();
//         this.pages = pages;
//         this.watchScroll();
//     },
//     methods: {
//         stringContains(text, word) {
//             return text.includes(word);
//         },
//         watchScroll() {
//             document.querySelector('div.main').addEventListener('scroll', e => {
//                 const headings = document.querySelectorAll('h2');
//                 headings.forEach(heading => {
//                     const rect = heading.getBoundingClientRect();
//                     if (rect.top > 0 && rect.top < 200 && heading.id) {
//                         const location = window.location.toString().split('#')[0];
//                         history.replaceState(null, null, location + '#' + heading.id);
//                         document.querySelectorAll('li.sub-menu').forEach(element => element.classList.remove('active'));
//                         document.querySelector(`li.sub-menu#${heading.id}`).classList.add('active');
//                     }
//                 });
//             });
//         }
//     }
// };
</script>



<style lang="scss" scoped>
.sidemenu {
    li {
        &.sub-menu {
            &.active {

                &>a,
                &>div>a {
                    @apply font-semibold text-success-100 transition-all duration-300;
                }

                &>img,
                &>div>img {
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
