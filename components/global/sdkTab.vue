<template>
	<div>
		<div class="flex flex-row m-auto w-full mt-32px mb-24px border-b border-b-grey-10">
			<li v-for="tab of tabs" :key="tab.id" class="mr-24px !list-none last-of-type:mr-0">
				<button class="pb-10px flex items-center has-icon" :class="activeTab === tab.id ? 'active' : ''" @click="switchTabs(tab.id)">
					<img :src="require(`~/assets/images/${tab.id}.svg`)" :alt="tab.label" class="h-16px w-16px mr-16px !my-0" />
					<span class="text-14 text-left text-black tracking-[0.02em] mobile:min-w-[80px]">{{ tab.label }}</span>
				</button>
			</li>
		</div>
		<div>
			<nuxt-content :document="pageData"></nuxt-content>
		</div>
	</div>
</template>
<script>
export default {
	layout: 'docs',
	data() {
		return {
			pageData: '',
			tabs: [
				{ label: 'Javascript', id: 'javascript' },
				{ label: 'Python', id: 'python' },
				{ label: 'PHP', id: 'php' }
				// { label: 'Ruby', id: 'ruby' }
			],
			activeTab: 'javascript'
		};
	},
	mounted() {
		this.fetchPageData('convoy-js');
	},
	methods: {
		async fetchPageData(param) {
			const pageData = await this.$content('docs/sdks/' + param).fetch();
			this.pageData = pageData;
		},
		switchTabs(activeTab) {
			switch (activeTab) {
				case 'javascript':
					this.activeTab = 'javascript';
					this.fetchPageData('convoy-js');
					break;
				case 'python':
					this.activeTab = 'python';
					this.fetchPageData('convoy-pyhton');
					break;
				case 'php':
					this.activeTab = 'php';
					this.fetchPageData('convoy-php');
					break;
				case 'ruby':
					this.activeTab = 'ruby';
					this.fetchPageData('convoy-ruby');
					break;
				default:
					break;
			}
		}
	}
};
</script>
<style lang="scss" scoped>

.active {
	@apply transition-all duration-300 relative after:bottom-0 after:h-[3px] after:w-full after:left-0 after:right-0 after:bg-primary-100 after:absolute after:rounded-tl-16px after:rounded-tr-16px;

	span {
		@apply font-semibold text-primary-100 transition-all duration-300;
	}

}
</style>
