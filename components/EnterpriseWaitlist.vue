<template>
	<div class="bg-white-100 shadow-[0px_2px_4px_rgba(12,26,75,0.04),0px_4px_20px_-2px_rgba(50,50,71,0.08)] rounded-8px p-20px desktop:py-40px desktop:px-60px w-full">
		<p class="font-semibold text-18 mb-42px">Request Full Access for Convoy Enterprise</p>
		<form @submit.prevent="requestAccess()">
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="firstname" class="w-full font-medium text-12 text-grey-40 mb-8px mt-18px flex items-center justify-between">First Name</label>
					<input
						id="firstname"
						type="text"
						class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px appearance-none"
						v-model="requestForm.firstname"
						placeholder="John"
						required
					/>
				</div>
				<div>
					<label for="lastname" class="w-full font-medium text-12 text-grey-40 mb-8px mt-18px flex items-center justify-between">Last Name</label>
					<input
						id="lastname"
						type="text"
						class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px appearance-none"
						v-model="requestForm.lastname"
						placeholder="Doe"
						required
					/>
				</div>
			</div>

			<label for="email" class="w-full font-medium text-12 text-grey-40 mb-8px mt-18px flex items-center justify-between">Work Email</label>
			<input
				id="email"
				type="email"
				class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px appearance-none"
				v-model="requestForm.email"
				placeholder="johndoe@email.com"
				required
			/>

			<label for="org_name" class="w-full font-medium text-12 text-grey-40 mb-8px mt-18px flex items-center justify-between">Organisation Name</label>
			<input
				id="org_name"
				type="text"
				class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px appearance-none"
				v-model="requestForm.organisation"
				placeholder="Kuda"
				required
			/>

			<label for="use_case" class="w-full font-medium text-12 text-grey-40 mb-8px mt-18px flex items-center justify-between">Whats your use case?</label>
			<select
				name="use_case"
				id="use_case"
				v-model="requestForm.usecase"
				class="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-grey-40 text-grey-100 border border-primary-500 valid:border-primary-500 disabled:border-primary-500 disabled:bg-[#F7F9FC] hover:bg-primary-500 hover:border-grey-20 focus:border-primary-100 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-[#F7F9FC] py-12px px-16px"
			>
				<option v-for="usecase of useCases" :key="usecase" :value="usecase">
					{{ usecase }}
				</option>
			</select>

			<button type="submit" :disabled="isSubmitingRequestAccessForm" class="py-16px px-42px text-14 font-medium rounded-8px bg-primary-100 text-white-100 w-full mt-24px">Request Access</button>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			requestForm: {
				firstname: null,
				lastname: null,
				email: null,
				organisation: null,
				usecase: null
			},
			isSubmitingRequestAccessForm: false,
			useCases: ['Work', 'Personal projects']
		};
	},
	methods: {
		async requestAccess() {
			this.isSubmitingRequestAccessForm = true;
			try {
				const response = await fetch(
					`https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-8f44e6aa-e5d6-4e31-b781-5080c050bb37/welcome-user/welcome-mail?email=${this.requestForm.email}&firstname=${
						this.requestForm.firstname
					}&lastname=${this.requestForm.lastname}&organisation=${this.requestForm.organisation}${this.requestForm.usecase ? '&usecase=' + this.requestForm.usecase : ''}&enterprise=true`
				);

				await response.json();
				this.$emit('requestAccess');
				this.isSubmitingRequestAccessForm = false;
			} catch (error) {
				this.isSubmitingRequestAccessForm = false;
			}
		}
	}
};
</script>
