'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ArrowRightIcon from '../../../public/svg/arrow-right-icon.svg';
import SubscribeIcon from '../../../public/svg/subscribe.svg';
import { useToaster } from '@/hooks/notification';

export default function Subscribe() {
	const [submittingEmail, setIsSubmittingEmail] = useState(false);
	const inputRef = useRef(null);

	const subscribeToNewsletter = async (event: any) => {
		event.preventDefault();
		setIsSubmittingEmail(true);
		try {
			const response = await fetch('/.netlify/functions/subscribe', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify({
					email: inputRef.current !== null ? inputRef.current['value'] : ''
				})
			});
			await response.json();
			useToaster({ message: 'Email submitted successfully', style: 'success' });
			setIsSubmittingEmail(false);
		} catch (error) {
			useToaster({ message: 'An error occured, please try again', style: 'danger' });
			setIsSubmittingEmail(false);
		}
	};
	return (
		<div className="grid grid-cols-1 tab:grid-cols-2 md:grid-cols-3 gap-5 flex-wrap">
			<form className="bg-white-100 rounded-10px p-40px mobile:p-24px md:col-span-2" onSubmit={subscribeToNewsletter}>
				<Image src={SubscribeIcon} className="mb-20px w-54px" alt="subscribe icon" />

				<h3 className="font-semibold mb-10px text-gray-600">Subscribe to our newsletter</h3>
				<p className="text-14 text-gray-500 max-w-[400px] mb-44px">We are constantly innovating, join the companies staying on top of Convoy updates.</p>

				<input
					id="email"
					type="email"
					ref={inputRef}
					className="transition-all duration-[.3s] w-full font-normal text-14 placeholder:text-new.gray-300 text-grey-100 border border-new.primary-25 valid:border-new.primary-25 disabled:border-new.primary-25 disabled:bg-white-100 hover:border-new.primary-50 focus:border-new.primary-400 focus:bg-white-100 outline-none rounded-4px placeholder:opacity-[.48] bg-white-100 py-12px px-16px mb-20px"
					placeholder="Email address"
					required
				/>
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={submittingEmail}
						className="flex items-center justify-center py-12px px-16px whitespace-nowrap text-14 font-medium rounded-8px bg-primary-400 text-white-100 xs:mb-20px shadow-sm xs:w-full">
						Subscribe
						<Image src={ArrowRightIcon} className="ml-8px w-12px" alt="arrow right icon" />
					</button>
				</div>
			</form>

			<div className="bg-white-100 rounded-10px p-40px mobile:p-24px">
				<div className="mb-20px">
					<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="43" height="43" rx="7.16667" fill="#F0F2FA" />
						<path
							d="M31.0556 18.7176V18.5146C31.0629 16.4827 30.4182 14.5022 29.2164 12.8639C28.0145 11.2256 26.3189 10.016 24.3787 9.41288H24.307C23.3049 9.10738 22.2608 8.96226 21.2134 8.98288C18.7192 9.11976 16.3712 10.2033 14.6487 12.0124C12.9262 13.8215 11.959 16.2197 11.9445 18.7176C11.2446 18.9638 10.6383 19.4213 10.2095 20.0267C9.78062 20.6322 9.55029 21.3559 9.55029 22.0979C9.55029 22.8399 9.78062 23.5635 10.2095 24.169C10.6383 24.7745 11.2446 25.2319 11.9445 25.4782C12.1905 27.8369 13.3049 30.0199 15.0709 31.6028C16.837 33.1856 19.1285 34.0551 21.5001 34.0423H21.7748C24.0681 33.9313 26.2479 33.0114 27.9272 31.4457C29.6066 29.8801 30.6769 27.77 30.9481 25.4901C31.6563 25.2578 32.2744 24.8105 32.7164 24.2104C33.1584 23.6103 33.4023 22.8873 33.4141 22.1421C33.426 21.3969 33.2051 20.6666 32.7824 20.0528C32.3597 19.439 31.7561 18.9723 31.0556 18.7176ZM21.7151 31.6534C19.986 31.7035 18.2972 31.1264 16.9602 30.0288C15.6233 28.9311 14.7285 27.387 14.4409 25.6812H28.4995C28.208 27.296 27.3791 28.7648 26.1474 29.8489C24.9158 30.9331 23.3538 31.5691 21.7151 31.6534ZM29.8612 23.2923H13.139C12.8222 23.2923 12.5184 23.1665 12.2944 22.9425C12.0704 22.7185 11.9445 22.4147 11.9445 22.0979C11.9445 21.7811 12.0704 21.4773 12.2944 21.2533C12.5184 21.0293 12.8222 20.9034 13.139 20.9034H15.5278C15.8446 20.9034 16.1484 20.7776 16.3724 20.5536C16.5964 20.3296 16.7223 20.0258 16.7223 19.709C16.7223 19.3922 16.5964 19.0884 16.3724 18.8644C16.1484 18.6404 15.8446 18.5146 15.5278 18.5146H14.3334C14.3869 17.2754 14.741 16.068 15.3653 14.9963C15.9896 13.9246 16.8652 13.0209 17.9167 12.3632V16.1257C17.9167 16.4424 18.0426 16.7463 18.2666 16.9703C18.4906 17.1943 18.7944 17.3201 19.1112 17.3201C19.428 17.3201 19.7318 17.1943 19.9558 16.9703C20.1798 16.7463 20.3056 16.4424 20.3056 16.1257V11.4554C20.6298 11.4012 20.9568 11.3653 21.2851 11.3479H21.5001C21.9004 11.3535 22.2996 11.3895 22.6945 11.4554V16.1257C22.6945 16.4424 22.8204 16.7463 23.0444 16.9703C23.2684 17.1943 23.5722 17.3201 23.889 17.3201C24.2057 17.3201 24.5096 17.1943 24.7336 16.9703C24.9576 16.7463 25.0834 16.4424 25.0834 16.1257V12.3273C25.5901 12.6207 26.0628 12.9692 26.4928 13.3665C27.1815 14.0353 27.7288 14.8356 28.1022 15.7199C28.4757 16.6042 28.6676 17.5546 28.6667 18.5146H27.4723C27.1555 18.5146 26.8517 18.6404 26.6277 18.8644C26.4037 19.0884 26.2778 19.3922 26.2778 19.709C26.2778 20.0258 26.4037 20.3296 26.6277 20.5536C26.8517 20.7776 27.1555 20.9034 27.4723 20.9034H29.8612C30.178 20.9034 30.4818 21.0293 30.7058 21.2533C30.9298 21.4773 31.0556 21.7811 31.0556 22.0979C31.0556 22.4147 30.9298 22.7185 30.7058 22.9425C30.4818 23.1665 30.178 23.2923 29.8612 23.2923Z"
							fill="#7EA4CA"
						/>
					</svg>
				</div>

				<h3 className="font-semibold mb-10px">Join our developer community</h3>
				<p className="text-14 text-gray-500 mb-106px">Convoy is open source. Follow us on Twitter, star our Github repo and join our Slack community!</p>
				<div className="flex items-center justify-between mt-20px xs:mb-20px gap-20px xs:flex-wrap">
					<Link
						href="https://convoy-community.slack.com/join/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ#/shared-invite/email"
						className="w-full flex items-center justify-center py-12px px-16px mobile:px-10px whitespace-nowrap text-14 font-medium rounded-8px bg-primary-400 text-white-100 shadow-sm">
						Join our Slack
						<Image src={ArrowRightIcon} className="ml-8px w-12px" alt="arrow right icon" />
					</Link>

					<Link
						href="https://github.com/frain-dev/convoy"
						className="w-full flex items-center justify-center py-12px desktop:py-16px whitespace-nowrap text-14 font-medium rounded-8px text-primary-400">
						Star our Github
						<span className="ml-8px">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12 2.24658C9.6255 2.24668 7.32849 3.0917 5.51999 4.63043C3.71149 6.16916 2.50953 8.3012 2.12916 10.6451C1.74879 12.9889 2.21485 15.3917 3.44393 17.4233C4.67301 19.455 6.58491 20.9831 8.83755 21.7341C9.33755 21.8216 9.52505 21.5216 9.52505 21.2591C9.52505 21.0216 9.51254 20.2341 9.51254 19.3966C7.00003 19.8591 6.35003 18.7841 6.15003 18.2216C5.9281 17.6745 5.5763 17.1897 5.12503 16.8091C4.77503 16.6216 4.27503 16.1591 5.11252 16.1466C5.4323 16.1813 5.73901 16.2926 6.00666 16.471C6.2743 16.6494 6.49499 16.8897 6.65003 17.1716C6.7868 17.4173 6.97071 17.6336 7.19122 17.8081C7.41173 17.9826 7.6645 18.1118 7.93506 18.1885C8.20562 18.2651 8.48864 18.2876 8.76791 18.2547C9.04717 18.2218 9.3172 18.134 9.56251 17.9966C9.6058 17.4882 9.83237 17.0129 10.2 16.6591C7.97503 16.4091 5.65003 15.5466 5.65003 11.7216C5.63597 10.7278 6.00271 9.76619 6.67503 9.03411C6.36931 8.17033 6.40508 7.2224 6.77503 6.38411C6.77503 6.38411 7.6125 6.1216 9.52503 7.40911C11.1613 6.95909 12.8887 6.95909 14.525 7.40911C16.4375 6.10911 17.275 6.38411 17.275 6.38411C17.645 7.22238 17.6808 8.17034 17.375 9.03411C18.0494 9.76494 18.4164 10.7273 18.4 11.7216C18.4 15.5591 16.0625 16.4091 13.8375 16.6591C14.0762 16.901 14.26 17.1914 14.3764 17.5106C14.4929 17.8298 14.5393 18.1704 14.5125 18.5091C14.5125 19.8466 14.5 20.9216 14.5 21.2591C14.5 21.5216 14.6875 21.8341 15.1875 21.7341C17.4362 20.977 19.3426 19.4453 20.5664 17.4126C21.7903 15.3799 22.2519 12.9784 21.8689 10.6368C21.4859 8.29523 20.2832 6.16595 18.4755 4.62909C16.6678 3.09223 14.3727 2.24782 12 2.24658Z"
									fill="#477DB3"
								/>
							</svg>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
