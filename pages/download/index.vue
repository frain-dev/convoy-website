<template>
	<div>
		<Header></Header>
		<header class="bg-[url(assets/images/docs-bg.svg)] bg-no-repeat bg-cover h-[350px] w-full"></header>

		<div class="max-w-[1200px] m-auto -mt-130px mb-88px">
			<p class="text-28 font-bold text-center mb-8px text-white-100">Download Convoy</p>
			<p class="text-white-100 max-w-[590px] m-auto text-center text-16 mb-40px">Download Convoy with your favorite package manager.</p>

			<div class="bg-grey-20 rounded-8px w-fit m-auto flex flex-row mb-54px">
				<li class="list-none" v-for="tab of tabs" :key="tab.id">
					<button
						class="rounded-6px py-12px px-8px min-w-[86px] desktop:min-w-[132px] transition-all duration-300"
						:class="activeTab === tab.id ? 'bg-white-100 shadow-sm' : ''"
						@click="switchTabs(tab.id)"
					>
						<span class="text-12 tracking-[0.02em] desktop:text-14 transition-all duration-300" :class="activeTab === tab.id ? 'font-bold text-black' : 'text-grey-40'">{{ tab.label }}</span>
					</button>
				</li>
			</div>

			<section class="download bg-grey-20 rounded-4px p-24px max-w-[724px] w-full m-auto">
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
							<button
								class="pb-10px flex items-center has-icon transition-all duration-300"
								:class="
									linuxActiveTab === tab.id
										? 'relative after:bottom-0 after:h-[3px] after:w-full after:left-0 after:right-0 after:bg-primary-100 after:absolute after:rounded-tl-16px after:rounded-tr-16px'
										: ''
								"
								@click="switchLinuxTabs(tab.id)"
							>
								<span
									class="text-14 text-left tracking-[0.02em] mobile:min-w-[80px] transition-all duration-300"
									:class="linuxActiveTab === tab.id ? 'font-semibold text-primary-100' : 'text-black'"
								>
									{{ tab.label }}
								</span>
							</button>
						</li>
					</ul>
					<div v-if="linuxActiveTab == 'ubuntu'" class="bg-black rounded-4px p-34px w-full text-white-100 flex-col flex-wrap text-12">
						<div>
							<span class="text-primary-100">$</span>
							<code>echo "deb [trusted=yes] https://apt.packages.getconvoy.io/ /" | sudo tee -a /etc/apt/sources.list.d/convoy.list</code>
						</div>
						<div>
							<span class="text-primary-100">$</span>
							<code>sudo apt update</code>
						</div>
						<div>
							<span class="text-primary-100">$</span>
							<code>sudo apt install convoy</code>
						</div>
					</div>
					<div v-if="linuxActiveTab == 'cent'" class="bg-black rounded-4px p-34px w-full text-white-100 flex-col flex-wrap text-12">
						<div class="flex">
							<span class="mr-4px text-primary-100">$</span>
							<div class="flex flex-col">
								<code>echo '[convoy]</code>
								<code>name=Convoy</code>
								<code>baseurl=https://yum.packages.getconvoy.io/</code>
								<code>enabled=1</code>
								<code>gpgcheck=0' | sudo tee -a /etc/yum.repos.d/convoy.repo</code>
							</div>
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
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://brew.packages.getconvoy.io/releases/v0.5.2/convoy_0.5.2_windows_amd64.tar.gz"
							class="font-medium text-14 text-primary-100 whitespace-nowrap underline mr-32px"
							download=""
						>
							Amd64
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://brew.packages.getconvoy.io/releases/v0.5.2/convoy_0.5.2_windows_arm64.tar.gz"
							class="font-medium text-14 text-primary-100 whitespace-nowrap underline"
							download
						>
							Arm64
						</a>
					</div>
					<nuxt-link to="/docs" class="font-medium text-14 text-primary-100 whitespace-nowrap underline flex items-center">
						View our Docs to learn more
						<img src="~/assets/images/angle-right-primary.svg" class="w-16px h-16px" alt="right" />
					</nuxt-link>
				</div>
			</section>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
export default {
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
