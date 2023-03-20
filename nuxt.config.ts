export default defineNuxtConfig({
	// extends: '@nuxt-themes/docus',
	modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
	tailwindcss: {
		cssPath: '~/scss/main.scss'
	},
	hooks: {
		'content:file:beforeInsert': (document: { extension: string; text: any; readingTime: any }) => {
			if (document.extension === '.md') {
				const { time } = require('reading-time')(document.text);
				document.readingTime = time;
			}
		}
	},
	content: {
		documentDriven: {
			layoutFallbacks: ['docs']
		}
	}
});
