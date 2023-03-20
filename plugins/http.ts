// // import globalMixin from '~/mixins/global-mixins';

// // export default defineNuxtPlugin(nuxtApp => {
// // 	nuxtApp.vueApp.use(globalMixin.methods.requestAccess);
// // });

// export default defineNuxtPlugin(NuxtApp => {
// 	const setitup = () => {
// 		console.log(NuxtApp);
// 	};

// 	return;
// });

export default defineNuxtPlugin(() => {
	return {
		provide: {
			hello: `msgmsg`
		}
	};
});
