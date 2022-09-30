<template>
	<div>
		<div class="flex flex-row m-auto w-full mt-32px mb-24px border-b border-b-grey-10">
			<li v-for="tab of tabs" :key="tab.id" class="mr-24px !list-none last-of-type:mr-0">
				<button class="pb-10px flex items-center has-icon" :class="activeTab === tab.id ? 'active' : ''" @click="switchTabs(tab.id)">
					<!-- <img :src="require(`~/assets/images/${tab.id}.svg`)" :alt="tab.label" class="h-16px w-16px mr-16px !my-0" /> -->
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
				{ label: 'Mac', id: 'mac' },
				{ label: 'Linux', id: 'linux' },
				{ label: 'Windows', id: 'windows' },
                { label: 'Source', id: 'source'}
			],
			activeTab: 'mac'
		};
	},
	mounted() {
		this.switchTabs();
		this.fetchPageData('cli-mac');
	},
	methods: {
		async fetchPageData(param) {
			const pageData = await this.$content('docs/installation/' + param).fetch();
			this.pageData = pageData;
		},
		switchTabs(activeTab) {
			switch (activeTab) {
				case 'mac':
					this.activeTab = 'mac';
					this.fetchPageData('cli-mac');
					break;
				case 'linux':
					this.activeTab = 'linux';
					this.fetchPageData('cli-linux');
					break;
				case 'windows':
					this.activeTab = 'windows';
					this.fetchPageData('cli-windows');
					break;
				case 'source':
					this.activeTab = 'source';
					this.fetchPageData('cli-source');
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
