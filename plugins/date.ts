// import moment from 'moment';

// // Vue.filter('date', function (value) {
// // 	if (value) {
// // 		return moment(String(value)).format('MMMM DD, YYYY');
// // 	}
// // });

// export default defineNuxtPlugin((nuxtApp) =>
//   nuxtApp.vueApp.p('focus', {
//       mounted(el) { },

//     getSSRProps (binding, vnode) {
//       // you can provide SSR-specific props here
//       return {}
//     }
//   })
// })

export default defineNuxtPlugin(nuxtApp =>
	nuxtApp.vueApp.directive('focus', {
		mounted(el) {
			el.focus();
		},
		getSSRProps(binding, vnode) {
			// you can provide SSR-specific props here
			return {};
		}
	})
);
