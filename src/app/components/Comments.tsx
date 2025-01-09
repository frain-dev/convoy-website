import Image from 'next/image';
import { useState } from 'react';

export default function Comments() {
	const businessComments = [
		{
			name: 'Manan Patel',
			company: 'neynar',
			companyUrl: 'https://neynar.com/',
			role: 'Co-Founder and CTO at Neynar, Ex-Coinbase',
			image: 'manan',
			feedback: `We tried a few different solutions in the market but what 
					eventually got us sold on Convoy was the dynamic filtering via subscriptions. 
					It is a game changer for us because it enables Neynar developers to have 
					programmatic access to fine-tune the exact information they need vs. a firehose 
					of events that they filter on their end. Convoy was also extremely easy to 
					setup out of the box. We just cloned the repo and had test webhooks 
					going through it within the hour.`
		},
		{
			name: 'Michael Raines',
			company: 'spruce',
			companyUrl: 'https://sprucehealth.com/',
			role: 'Principal Engineer at Spruce Health',
			image: 'michael',
			feedback: `We considered building a webhooks system internally, but quickly realized 
				that reaching the level of quality and robustness our customers deserve would be 
				highly time-consuming. After evaluating alternative paths we saw that Convoy offered 
				a high quality feature set that added immediate value and would be a significant 
				investment to develop ourselves. Convoy allows us to provide a higher quality 
				solution to our customers. The solid fundamental architecture and scalability  
				mindset of Convoy's design gives us confidence that it can grow with us, and allow 
				us to focus on our core business.`
		},
		{
			name: 'Aravindkumar Rajendiran',
			company: 'maple',
			companyUrl: 'https://maplebilling.com/',
			role: 'Co-Founder and CTO at Maple Billing',
			image: 'aravindkumar',
			feedback: `Convoy had everything (retries, signatures, SDKs) we needed for a webhook 
			gateway. We were able to get it up and running within a few hours instead of months. 
			It allowed our engineering team to focus on building our core product.`
		}
	];

	const [count, setCount] = useState(0);

	const goToPreviousComment = () => {
		const screenWidth = screen.width;
		const element = document.getElementById('commentSection');
		let scrollLength = screenWidth > 630 ? 624 : 324;

		if (count === 0) {
			if (element) element.scrollLeft += scrollLength * businessComments.length;
			setCount(businessComments.length - 1);
		} else {
			if (element) element.scrollLeft -= scrollLength;
			setCount(count - 1);
		}
	};
	const goToNextComment = () => {
		const screenWidth = screen.width;
		const element = document.getElementById('commentSection');
		let scrollLength = screenWidth > 630 ? 624 : 324;

		if (count === businessComments.length - 1) {
			if (element) element.scrollLeft -= scrollLength * businessComments.length;
			setCount(0);
		} else {
			if (element) element.scrollLeft += scrollLength;
			setCount(count + 1);
		}
	};

	return (
		<>
			<div className="flex gap-24px w-full overflow-hidden p-24px" id="commentSection">
				{businessComments.map((comment, i) => (
					<div
						className="bg-white-100 border border-primary-50 rounded-16px shadow-default p-24px footer:p-16px flex flex-col justify-center min-w-[660px] footer:min-w-[300px] cursor-pointer duration-1000 transition-all ease-in-out hover:border-primary-100"
						key={i}>
						<div className="pt-20px mb-40px m-auto">
							<a target="_blank" href={comment.companyUrl} className="m-auto">
								<Image src={`/svg/${comment.company}.svg`} alt={`${comment.company} logo`} className="h-20px" />
							</a>
						</div>
						<p className="text-16 footer:text-12 text-gray-700 text-center h-220px mb-24px">"{comment.feedback}"</p>
						<div className="flex flex-col justify-center items-center gap-12px">
							<div className="w-40px h-40px overflow-hidden rounded-100px">
								<Image src={`/employees/${comment.image}.jpg`} alt={comment.image} />
							</div>
							<div className="text-center">
								<p className="mb-2px text-14 footer:text-10 text-gray-400 tracking-wide">{comment.name}</p>
								<p className="mb-2px text-14 footer:text-10 text-gray-400 tracking-wide">{comment.role}</p>
							</div>
						</div>
					</div>
				))}
				<div className="min-w-[600px] tab-min:min-w-[80px] footer:hidden"></div>
			</div>

			<div className="flex items-end justify-between px-26px mt-24px">
				<div className="flex gap-4px">
					{businessComments.map((_, i) => (
						<button key={i} className={`w-10px h-10px rounded-[20px] ${count === i ? 'bg-primary-400' : 'bg-primary-50'}`}></button>
					))}
				</div>

				<div className="flex gap-10px">
					<button className="border border-primary-50 bg-white-100 rounded-100px h-40px w-40px" onClick={() => goToPreviousComment()}>
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-primary-400">
							<path d="M9.1703 12.7103L13.4103 16.9503C13.5033 17.044 13.6139 17.1184 13.7357 17.1692C13.8576 17.22 13.9883 17.2461 14.1203 17.2461C14.2523 17.2461 14.383 17.22 14.5049 17.1692C14.6267 17.1184 14.7373 17.044 14.8303 16.9503C15.0166 16.7629 15.1211 16.5095 15.1211 16.2453C15.1211 15.9811 15.0166 15.7277 14.8303 15.5403L11.2903 12.0003L14.8303 8.4603C15.0166 8.27293 15.1211 8.01948 15.1211 7.75529C15.1211 7.49111 15.0166 7.23766 14.8303 7.05029C14.7369 6.95761 14.626 6.88429 14.5042 6.83452C14.3824 6.78476 14.2519 6.75953 14.1203 6.7603C13.9887 6.75953 13.8582 6.78476 13.7364 6.83452C13.6146 6.88429 13.5037 6.95761 13.4103 7.05029L9.1703 11.2903C9.07657 11.3833 9.00218 11.4939 8.95141 11.6157C8.90064 11.7376 8.8745 11.8683 8.8745 12.0003C8.8745 12.1323 8.90064 12.263 8.95141 12.3849C9.00218 12.5067 9.07657 12.6173 9.1703 12.7103Z" />
						</svg>
					</button>
					<button className="border border-primary-50 bg-white-100 rounded-100px h-40px w-40px" onClick={() => goToNextComment()}>
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-primary-400">
							<path d="M14.8297 11.2897L10.5897 7.0497C10.4967 6.95598 10.3861 6.88158 10.2643 6.83081C10.1424 6.78004 10.0117 6.75391 9.8797 6.75391C9.74769 6.75391 9.61698 6.78004 9.49512 6.83081C9.37326 6.88158 9.26266 6.95598 9.1697 7.0497C8.98345 7.23707 8.87891 7.49052 8.87891 7.7547C8.87891 8.01889 8.98345 8.27234 9.1697 8.4597L12.7097 11.9997L9.1697 15.5397C8.98345 15.7271 8.87891 15.9805 8.87891 16.2447C8.87891 16.5089 8.98345 16.7623 9.1697 16.9497C9.26314 17.0424 9.37395 17.1157 9.49579 17.1655C9.61763 17.2152 9.74809 17.2405 9.8797 17.2397C10.0113 17.2405 10.1418 17.2152 10.2636 17.1655C10.3854 17.1157 10.4963 17.0424 10.5897 16.9497L14.8297 12.7097C14.9234 12.6167 14.9978 12.5061 15.0486 12.3843C15.0994 12.2624 15.1255 12.1317 15.1255 11.9997C15.1255 11.8677 15.0994 11.737 15.0486 11.6151C14.9978 11.4933 14.9234 11.3827 14.8297 11.2897Z" />
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}
