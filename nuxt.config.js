const create = async feed => {
	feed.options = {
		title: 'Convoy',
		link: 'https://getconvoy.io/blog/rss',
		description: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure.'
	};

	const { $content } = require('@nuxt/content');
	const posts = await $content('blog').fetch();

	posts.forEach(post => {
		const url = `https://getconvoy.io/blog/${post.slug}`;

		feed.addItem({
			title: post.title,
			id: url,
			category: post.primary_tag,
			link: url,
			description: post.description,
			content: post.description,
			author: [
				{
					name: post.primary_author.name,
					link: 'http://twitter.com/' + post.primary_author.twitter
				}
			],
			image: 'https://getconvoy.io/feature-images/' + post.feature_image
		});
	});
};

export default {
	target: 'static',
	head: {
		script: [
			{
				src: 'https://assets.calendly.com/assets/external/widget.js',
				type: 'text/javascript',
				async: 'true'
			}
		],
		title: 'Convoy',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				name: 'robots',
				hid: 'robots',
				content: 'index, follow'
			},
			{
				hid: 'description',
				name: 'description',
				content:
					'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure. Convoy enables you to send and receive webhook events in one place with a great developer experience.'
			},
			{
				hid: 'og:title',
				property: 'og:title',
				content: 'Convoy'
			},
			{
				hid: 'twitter:creator',
				name: 'twitter:creator',
				content: '@getconvoy'
			},
			{
				hid: 'twitter:title',
				property: 'twitter:title',
				content: 'Convoy'
			},
			{
				hid: 'og:url',
				property: 'og:url',
				content: 'https://getconvoy.io/'
			},
			{
				hid: 'twitter:url',
				property: 'twitter:url',
				content: 'https://getconvoy.io/'
			},
			{
				hid: 'og:image',
				property: 'og:image',
				content: 'https://getconvoy.io/assets/convoy.png'
			},
			{
				hid: 'twitter:image',
				property: 'twitter:image',
				content: 'https://getconvoy.io/assets/convoy.png'
			},
			{
				hid: 'twitter:site',
				name: 'twitter:site',
				content: '@getconvoy'
			},
			{
				hid: 'image',
				property: 'image',
				content: 'https://getconvoy.io/assets/convoy.png'
			},
			{
				hid: 'og:description',
				property: 'og:description',
				content: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure.'
			},
			{
				hid: 'twitter:description',
				property: 'twitter:description',
				content: 'An open source webhooks proxy with out-of-the-box security, reliability and scalability for your webhooks infrastructure.'
			},
			{
				hid: 'og:image:width',
				property: 'og:image:width',
				content: '437'
			},
			{
				hid: 'og:image:height',
				property: 'og:image:height',
				content: '182'
			},
			{
				hid: 'og:image:type',
				property: 'og:image:type',
				content: 'img/png'
			},
			{
				hid: 'twitter:image:alt',
				name: 'twitter:image:alt',
				content: 'Convoy Logo'
			},
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				content: 'summary_large_image'
			},
			{
				hid: 'og:type',
				name: 'og:type',
				content: 'website'
			},
			{
				hid: 'keywords',
				property: 'keywords',
				content: [
					'webhooks',
					'webhook',
					'webhooks service',
					'webhooks provider',
					'webhooks infrastructure',
					'opensource webhooks',
					'opensource',
					'low code',
					'github webhook',
					'stripe webhook',
					'webhook url',
					'webhook endpoint',
					'zapier webhook',
					'web hook',
					'open-source',
					'open source',
					'infrastructure',
					'endpoint',
					'API',
					'cloud',
					'integrate',
					'integration'
				]
			}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ hid: 'canonical', rel: 'canonical', href: 'https://getconvoy.io' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['@/scss/main.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/date.js', '~/plugins/prism.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: ['@nuxt/postcss8', 'nuxt-gsap-module'],

	// gsap
	gsap: {
		extraPlugins: {
			scrollTo: true,
			scrollTrigger: true
		}
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		'@nuxtjs/feed',
		'@nuxtjs/gtm',
		'@nuxtjs/sitemap'
	],

	gtm: {
		id: process.env.GOOGLE_TAG_MANAGER_ID,

		enabled: true,
		layer: 'dataLayer',

		pageTracking: true,
		pageViewEventName: 'nuxtRoute',

		autoInit: true,
		respectDoNotTrack: true,

		scriptId: 'gtm-script',
		scriptDefer: false,
		scriptURL: 'https://www.googletagmanager.com/gtag/js',
		crossOrigin: false
	},

	sitemap: {
		hostname: 'https://getconvoy.io',
		gzip: true,
		exclude: ['/404'],
		defaults: {
			cacheTime: 1000 * 60 * 30,
			changefreq: 'daily',
			priority: 1,
			lastmod: new Date()
		}
	},

	publicRuntimeConfig: {
		gtm: {
			id: process.env.GOOGLE_TAG_MANAGER_ID
		}
	},

	hooks: {
		'content:file:beforeInsert': document => {
			if (document.extension === '.md') {
				const { time } = require('reading-time')(document.text);
				document.readingTime = time;
			}
		}
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {
		markdown: {
			prism: {
				theme: false
			}
		},
		liveEdit: false
	},

	generate: {
		async routes() {
			const { $content } = require('@nuxt/content');
			const files = await $content({ deep: true }).only(['path']).fetch();
			return files.map(file => (file.path === '/index' ? '/' : file.path));
		}
	},

	env: {
		url: process.env.NODE_ENV === 'production' ? process.env.URL || 'http://getconvoy.io' : 'http://localhost:3000',
		lang: 'en-US'
	},

	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {}
			}
		}
	},
	runtimeCompiler: true,
	feed: [
		{
			path: '/blog/rss',
			create,
			cacheTime: 1000 * 60 * 15,
			type: 'rss2'
		},
		{
			path: '/blog/json',
			create,
			cacheTime: 1000 * 60 * 15,
			type: 'json1'
		}
	]
};
