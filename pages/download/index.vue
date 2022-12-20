<template>
	<div>
		<!-- <header class="bg-[url(assets/images/docs-bg.svg)] bg-no-repeat bg-cover h-[350px] w-full"></header> -->
		<section class="cta-section">
			<div class="max-w-[1200px] min-h-[510px] mobile:min-h-[700px] desktop:min-h-[510px] w-full m-auto text-white-100 px-20px pt-330px">
				<h1 class="text-center font-bold text-26 desktop:text-[40px] mb-16px">Download Convoy</h1>
				<p class="text-center text-16 mb-40px mt-20px max-w-[530px] m-auto">Download Convoy with your favorite package manager.</p>
			</div>
		</section>

		<section class="-mt-26px mb-150px">
			<div class="bg-grey-20 rounded-8px w-fit m-auto flex flex-row mb-54px">
				<li class="list-none" v-for="tab of tabs" :key="tab.id">
					<button class="rounded-6px py-12px px-8px min-w-[86px] desktop:min-w-[132px] transition-all duration-300" :class="activeTab === tab.id ? 'bg-white-100 shadow-sm' : ''" @click="switchTabs(tab.id)">
						<span class="text-12 tracking-[0.02em] desktop:text-14 transition-all duration-300" :class="activeTab === tab.id ? 'font-bold text-black' : 'text-grey-40'">{{ tab.label }}</span>
					</button>
				</li>
			</div>

			<div class="download bg-grey-20 rounded-4px p-24px max-w-[724px] w-full m-auto">
				<div v-if="activeTab == 'mac'" class="font-semibold text-14 tracking-[0.03em] uppercase text-grey-40 mb-16px">Homebrew</div>
				<div v-if="activeTab == 'linux'" class="font-semibold text-14 tracking-[0.03em] uppercase text-grey-40 mb-16px">Package manager</div>
				<div v-if="activeTab == 'window'" class="font-semibold text-14 tracking-[0.03em] uppercase text-grey-40 mb-16px">Windows binary download</div>
				<div v-if="activeTab == 'mac'" class="bg-black rounded-4px p-34px w-full text-white-100 flex-col flex-wrap text-12">
					<div>
						<span class="text-primary-100">$</span>
						<code>brew tap frain-dev/tools</code>
					</div>
					<div>
						<span class="text-primary-100">$</span>
						<code>brew install convoy</code>
					</div>
				</div>
				<div v-if="activeTab == 'linux'">
					<ul class="flex flex-row m-auto w-full mb-24px border-b border-b-grey-10">
						<li v-for="tab of linuxTabs" :key="tab.id" class="mr-24px !list-none last-of-type:mr-0">
							<button class="pb-10px flex items-center has-icon transition-all duration-300" :class="
								linuxActiveTab === tab.id
									? 'relative after:bottom-0 after:h-[3px] after:w-full after:left-0 after:right-0 after:bg-primary-100 after:absolute after:rounded-tl-16px after:rounded-tr-16px'
									: ''
							" @click="switchLinuxTabs(tab.id)">
								<span class="text-14 text-left tracking-[0.02em] mobile:min-w-[80px] transition-all duration-300" :class="linuxActiveTab === tab.id ? 'font-semibold text-primary-100' : 'text-black'">
									{{ tab.label }}
								</span>
							</button>
						</li>
					</ul>
					<div v-if="linuxActiveTab == 'ubuntu'" class="bg-black rounded-4px p-34px w-full text-white-100 flex-col flex-wrap text-12">
						<div>
							<span class="text-primary-100">$</span>
							<code>curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.deb.sh' | sudo -E bash</code>
						</div>
						<div>
							<span class="text-primary-100">$</span>
							<code>sudo apt install convoy</code>
						</div>
					</div>
					<div v-if="linuxActiveTab == 'cent'" class="bg-black rounded-4px p-34px w-full text-white-100 flex-col flex-wrap text-12">
						<div>
							<span class="text-primary-100">$</span>
							<code>curl -1sLf 'https://dl.cloudsmith.io/public/convoy/convoy/setup.rpm.sh' | sudo -E bash</code>
						</div>
						<div>
							<span class="text-primary-100">$</span>
							<code>sudo yum install convoy</code>
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-26px" v-if="activeTab != 'window'">
					<nuxt-link to="/docs" class="font-medium text-14 text-primary-100 whitespace-nowrap underline flex items-center">
						View our Docs to learn more
						<img src="~/assets/images/angle-right-primary.svg" class="w-16px h-16px" alt="right" />
					</nuxt-link>
				</div>
				<div class="flex justify-between mt-26px" v-if="activeTab == 'window'">
					<div class="flex items-center">
						<a target="_blank" rel="noopener noreferrer" href="https://dl.cloudsmith.io/public/convoy/convoy/raw/versions/0.6.6/convoy_0.6.6_windows_amd64.tar.gz" class="font-medium text-14 text-primary-100 whitespace-nowrap underline mr-32px" download="">
							Amd64
						</a>
						<a target="_blank" rel="noopener noreferrer" href="https://dl.cloudsmith.io/public/convoy/convoy/raw/versions/0.6.6/convoy_0.6.6_windows_arm64.tar.gz" class="font-medium text-14 text-primary-100 whitespace-nowrap underline" download>
							Arm64
						</a>
					</div>
					<nuxt-link to="/docs" class="font-medium text-14 text-primary-100 whitespace-nowrap underline flex items-center">
						View our Docs to learn more
						<img src="~/assets/images/angle-right-primary.svg" class="w-16px h-16px" alt="right" />
					</nuxt-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	layout: 'home',
	data() {
		return {
			tabs: [
				{ label: 'MacOS', id: 'mac' },
				{ label: 'Linux', id: 'linux' },
				{ label: 'Windows', id: 'window' }
			],
			linuxTabs: [
				{ label: 'Ubuntu/Debian', id: 'ubuntu' },
				{ label: 'CentOS/RHEL ', id: 'cent' }
			],
			activeTab: 'mac',
			linuxActiveTab: 'ubuntu'
		};
	},
	methods: {
		switchTabs(activeTab) {
			switch (activeTab) {
				case 'mac':
					this.activeTab = 'mac';
					break;
				case 'linux':
					this.activeTab = 'linux';
					break;
				case 'window':
					this.activeTab = 'window';
					break;
				default:
					break;
			}
		},
		switchLinuxTabs(activeTab) {
			switch (activeTab) {
				case 'ubuntu':
					this.linuxActiveTab = 'ubuntu';
					break;
				case 'cent':
					this.linuxActiveTab = 'cent';
					break;
				case 'home':
					this.linuxActiveTab = 'home';
					break;
				default:
					break;
			}
		}
	},
	head() {
		return {
			title: 'Convoy Download',
			meta: [
				{ hid: 'description', name: 'description', content: 'Download Convoy, run locally and self host' },
				{
					hid: 'apple-mobile-web-app-title',
					name: 'apple-mobile-web-app-title',
					content: 'Convoy Download'
				},
				{ hid: 'og:title', name: 'og:title', content: 'Convoy Download' },
				{ hid: 'og:site_name', name: 'og:site_name', content: 'Convoy' },
				{ hid: 'og:type', name: 'og:type', content: 'website' },
				{
					hid: 'og:description',
					name: 'og:description',
					content: 'Download Convoy, run locally and self host'
				},
				{
					hid: 'og:url',
					name: 'og:url',
					content: `https://getconvoy.io/download`
				},
				{
					hid: 'twitter:title',
					name: 'twitter:title',
					content: 'Convoy Download'
				},
				{
					hid: 'twitter:url',
					name: 'twitter:url',
					content: `https://getconvoy.io/download`
				},
				{
					hid: 'twitter:text:title',
					name: 'twitter:text:title',
					content: 'Convoy Download'
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: 'Download Convoy, run locally and self host'
				},
			],
			link: [{ hid: 'canonical', rel: 'canonical', href: `https://getconvoy.io/download` }]
		};
	}
};
</script>

<style lang="scss" scoped>
.activeTab {
	@apply transition-all duration-300 relative after:bottom-0 after:h-[3px] after:w-full after:left-0 after:right-0 after:bg-primary-100 after:absolute after:rounded-tl-16px after:rounded-tr-16px;

	span {
		@apply font-semibold text-primary-100;
	}
}
</style>
