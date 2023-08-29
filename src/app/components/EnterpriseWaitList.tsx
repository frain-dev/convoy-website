'use client';
import { useState } from 'react';

export default function EnterpriseWaitlist() {
	const [isSubmitingRequestAccessForm, setIsSubmitingRequestAccessForm] = useState(false);
	const [form, setFormData] = useState({ firstname: '', lastname: '', email: '', organisation: '', usecase: '' });
	
	const requestAccess = async (event: any) => {
		event.preventDefault();

		setIsSubmitingRequestAccessForm(true);
		try {
			const response = await fetch(
				`https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-8f44e6aa-e5d6-4e31-b781-5080c050bb37/welcome-user/welcome-mail?email=${form.email}&firstname=${
					form.firstname
				}&lastname=${form.lastname}&organisation=${form.organisation}${form.usecase ? '&usecase=' + form.usecase : ''}&enterprise=true`
			);

			await response.json();
			setIsSubmitingRequestAccessForm(false);
		} catch (error) {
			setIsSubmitingRequestAccessForm(false);
		}
	};
	return (
		<div className="bg-white-100 shadow-[0px_2px_4px_rgba(12,26,75,0.04),0px_4px_20px_-2px_rgba(50,50,71,0.08)] rounded-8px p-20px desktop:py-40px desktop:px-60px w-full">
			<p className="font-semibold text-18 mb-42px">Request Full Access for Convoy Enterprise</p>
			<form id="enterpriseForm" onSubmit={e => requestAccess(e)}>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="firstname" className="w-full font-medium text-12 text-gray-400 mb-8px mt-18px flex items-center justify-between">
							First Name
						</label>
						<input
							id="firstname"
							autoComplete="firstname"
							type="text"
							className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-gray-300 text-grey-100 border border-primary-25 valid:border-primary-25 disabled:border-primary-25 disabled:bg-white-100 hover:border-primary-50 focus:border-primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px appearance-none"
							name="firstname"
							value={form.firstname}
							onChange={e => setFormData({ ...form, firstname: e.target.value })}
							placeholder="John"
							required
						/>
					</div>
					<div>
						<label htmlFor="lastname" className="w-full font-medium text-12 text-gray-400 mb-8px mt-18px flex items-center justify-between">
							Last Name
						</label>
						<input
							id="lastname"
							autoComplete="lastname"
							type="text"
							className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-gray-300 text-grey-100 border border-primary-25 valid:border-primary-25 disabled:border-primary-25 disabled:bg-white-100 hover:border-primary-50 focus:border-primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px appearance-none"
							name="lastname"
							value={form.lastname}
							onChange={e => setFormData({ ...form, lastname: e.target.value })}
							placeholder="Doe"
							required
						/>
					</div>
				</div>

				<label htmlFor="email" className="w-full font-medium text-12 text-gray-400 mb-8px mt-18px flex items-center justify-between">
					Work Email
				</label>
				<input
					id="email"
					autoComplete="email"
					type="email"
					className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-gray-300 text-grey-100 border border-primary-25 valid:border-primary-25 disabled:border-primary-25 disabled:bg-white-100 hover:border-primary-50 focus:border-primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px appearance-none"
					name="email"
					value={form.email}
					onChange={e => setFormData({ ...form, email: e.target.value })}
					placeholder="johndoe@email.com"
					required
				/>

				<label htmlFor="org_name" className="w-full font-medium text-12 text-gray-400 mb-8px mt-18px flex items-center justify-between">
					Organisation Name
				</label>
				<input
					id="org_name"
					autoComplete="org_name"
					type="text"
					className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-gray-300 text-grey-100 border border-primary-25 valid:border-primary-25 disabled:border-primary-25 disabled:bg-white-100 hover:border-primary-50 focus:border-primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px appearance-none"
					name="organisation"
					value={form.organisation}
					onChange={e => setFormData({ ...form, organisation: e.target.value })}
					placeholder="Kuda"
					required
				/>

				<div v-if="showAdditionalInfo">
					<label htmlFor="usecase" className="w-full font-medium text-12 text-gray-400 mb-8px mt-18px flex items-center justify-between">
						Whats your use case?
					</label>
					<textarea
						name="usecase"
						value={form.usecase}
						onChange={e => setFormData({ ...form, usecase: e.target.value })}
						autoComplete="usecase"
						id="usecase"
						rows={3}
						className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-gray-300 text-grey-100 border border-primary-25 valid:border-primary-25 disabled:border-primary-25 disabled:bg-white-100 hover:border-primary-50 focus:border-primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px"></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitingRequestAccessForm}
					className="py-16px px-42px text-14 font-medium rounded-8px bg-primary-400 text-white-100 w-full mt-24px">
					Request Access
				</button>
			</form>
		</div>
	);
}
