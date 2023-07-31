<template>
	<div>
		<div class="flex flex-row m-auto w-full mt-32px mb-24px border-b border-b-grey-10">
			<li v-for="tab of tabs" :key="tab" class="mr-16px !list-none last-of-type:mr-0">
				<button class="pb-10px flex items-center has-icon" :class="activeTab === tab ? 'active' : ''" @click="switchTabs(tab)">
					<span class="text-14 text-left text-black tracking-[0.02em] mobile:min-w-[80px]">{{ tab }}</span>
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
			tabs: ['endpoint.created', 'endpoint.updated', 'endpoint.deleted', 'eventdelivery.success', 'eventdelivery.failed'],
			activeTab: 'endpoint.created'
		};
	},
	mounted() {
        this.switchTabs();
		this.fetchPageData('endpoint-created');
	},
	methods: {
		async fetchPageData(param) {
			const pageData = await this.$content('docs/manual/meta-events-payload/' + param).fetch();
			this.pageData = pageData;
		},
		switchTabs(activeTab) {
			switch (activeTab) {
				case 'endpoint.created':
					this.activeTab = 'endpoint.created';
					this.fetchPageData('endpoint-created');
					break;
				case 'endpoint.updated':
					this.activeTab = 'endpoint.updated';
					this.fetchPageData('endpoint-updated');
					break;
				case 'endpoint.deleted':
					this.activeTab = 'endpoint.deleted';
					this.fetchPageData('endpoint-deleted');
					break;
				case 'eventdelivery.success':
					this.activeTab = 'eventdelivery.success';
					this.fetchPageData('eventdelivery-success');
					break;
				case 'eventdelivery.failed':
					this.activeTab = 'eventdelivery.failed';
					this.fetchPageData('eventdelivery-failed');
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
