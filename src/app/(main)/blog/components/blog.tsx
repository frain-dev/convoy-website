'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Post from './post';
import FeaturedPost from './featuredPost';

export default function Blog({ articles }: any) {
	const searchParams = useSearchParams();
	const featuredPosts = articles.filter(article => article.featured);
	const nonFeaturedPosts = articles.filter(article => !article.featured);
	const [submittingEmail, setIsSubmittingEmail] = useState(false);
	const [filteredPosts, setFilteredPosts] = useState(articles);
	const inputRef = useRef(null);
	const [currentTag, setCurrentTag] = useState('All Posts');
	const [showCategories, setShowCategories] = useState(false);
	const tags = ['All Posts', 'Product Update', 'News', 'Engineering', 'Tutorial', 'Open Thoughts', 'Customer Stories'];

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
			setIsSubmittingEmail(false);
		} catch (error) {
			setIsSubmittingEmail(false);
		}
	};

	const filterPosts = () => {
		const filterTag = searchParams.get('tag');
		const filteredPost = nonFeaturedPosts.filter(article => article.primary_tag === filterTag);
		setCurrentTag(filterTag || '');
		setFilteredPosts(filteredPost);
	};

	useEffect(() => {
		if (searchParams.get('tag')) filterPosts();
		else setFilteredPosts(articles);
	}, [searchParams]);

	return (
		<>
			<div className="pt-150px pb-100px max-w-[1300px] w-full m-auto">
				<div className="m-auto pb-0 flex justify-between pt-0">
					<aside className="w-240px hidden desktop:sticky desktop:top-150px desktop:block desktop:pl-20px desktop:pr-32px">
						<ul className="p-0">
							<h6 className="font-bold text-gray-800 mb-18px">CATEGORIES</h6>
							{tags.map((tag, i) => (
								<li key={i} className="font-medium text-12 mb-30px text-gray-500">
									<Link href={tag !== 'All Posts' ? '/blog?tag=' + tag : '/blog'}>{tag}</Link>
								</li>
							))}
						</ul>

						<div>
							<h6 className="font-semibold mb-18px">Follow Us</h6>

							<ul className="flex">
								<li className="bg-gray-400 bg-opacity-10 w-42px h-42px flex items-center justify-center rounded-[50%] mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
										<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M23 9.50001C22.9989 8.5721 22.6298 7.68251 21.9736 7.02638C21.3175 6.37024 20.4279 6.00113 19.5 6.00001C18.98 6.0028 18.4673 6.1228 18 6.35108V4.50001C18.0011 3.80422 17.7944 3.12396 17.4065 2.54634C17.0186 1.96872 16.4671 1.52005 15.8226 1.25778C15.1781 0.995512 14.4701 0.931594 13.789 1.07421C13.108 1.21683 12.4851 1.55949 12 2.0583C11.4244 1.45965 10.6539 1.08613 9.82741 1.00498C9.00087 0.923818 8.17251 1.14035 7.49142 1.6156C6.81033 2.09085 6.32124 2.79361 6.11219 3.59738C5.90314 4.40115 5.98785 5.25314 6.35108 6.00001H4.50001C3.80422 5.99895 3.12396 6.20561 2.54634 6.59352C1.96872 6.98143 1.52005 7.53294 1.25778 8.17741C0.995512 8.82187 0.931594 9.52996 1.07421 10.211C1.21683 10.892 1.55949 11.5149 2.0583 12C1.45965 12.5757 1.08613 13.3461 1.00498 14.1726C0.923818 14.9992 1.14035 15.8275 1.6156 16.5086C2.09085 17.1897 2.79361 17.6788 3.59738 17.8878C4.40115 18.0969 5.25314 18.0122 6.00001 17.6489V19.5C5.99895 20.1958 6.20561 20.8761 6.59352 21.4537C6.98143 22.0313 7.53294 22.48 8.17741 22.7422C8.82187 23.0045 9.52996 23.0684 10.211 22.9258C10.892 22.7832 11.5149 22.4405 12 21.9417C12.5757 22.5404 13.3461 22.9139 14.1726 22.995C14.9992 23.0762 15.8275 22.8597 16.5086 22.3844C17.1897 21.9092 17.6788 21.2064 17.8878 20.4026C18.0969 19.5989 18.0122 18.7469 17.6489 18H19.5C20.1958 18.0011 20.8761 17.7944 21.4537 17.4065C22.0313 17.0186 22.48 16.4671 22.7422 15.8226C23.0045 15.1781 23.0684 14.4701 22.9258 13.789C22.7832 13.108 22.4405 12.4851 21.9417 12C22.2764 11.6753 22.5425 11.2867 22.7243 10.8573C22.906 10.4279 22.9998 9.96632 23 9.50001V9.50001ZM13 4.50001C13 4.10219 13.158 3.72066 13.4394 3.43935C13.7207 3.15805 14.1022 3.00001 14.5 3.00001C14.8978 3.00001 15.2794 3.15805 15.5607 3.43935C15.842 3.72066 16 4.10219 16 4.50001V9.50001C16 9.89784 15.842 10.2794 15.5607 10.5607C15.2794 10.842 14.8978 11 14.5 11C14.1022 11 13.7207 10.842 13.4394 10.5607C13.158 10.2794 13 9.89784 13 9.50001V4.50001ZM6.00001 14.5C6.00001 14.7967 5.91204 15.0867 5.74722 15.3334C5.58239 15.58 5.34813 15.7723 5.07404 15.8858C4.79995 15.9994 4.49835 16.0291 4.20738 15.9712C3.9164 15.9133 3.64913 15.7705 3.43935 15.5607C3.22957 15.3509 3.08671 15.0836 3.02883 14.7926C2.97096 14.5017 3.00066 14.2001 3.11419 13.926C3.22772 13.6519 3.41998 13.4176 3.66666 13.2528C3.91333 13.088 4.20334 13 4.50001 13H6.00001V14.5ZM11 19.5C11 19.8978 10.842 20.2794 10.5607 20.5607C10.2794 20.842 9.89784 21 9.50001 21C9.10219 21 8.72066 20.842 8.43935 20.5607C8.15805 20.2794 8.00001 19.8978 8.00001 19.5V14.5C8.00001 14.1022 8.15805 13.7207 8.43935 13.4394C8.72066 13.158 9.10219 13 9.50001 13C9.89784 13 10.2794 13.158 10.5607 13.4394C10.842 13.7207 11 14.1022 11 14.5V19.5ZM9.50001 11H4.50001C4.10219 11 3.72066 10.842 3.43935 10.5607C3.15805 10.2794 3.00001 9.89784 3.00001 9.50001C3.00001 9.10219 3.15805 8.72066 3.43935 8.43935C3.72066 8.15805 4.10219 8.00001 4.50001 8.00001H9.50001C9.89784 8.00001 10.2794 8.15805 10.5607 8.43935C10.842 8.72066 11 9.10219 11 9.50001C11 9.89784 10.842 10.2794 10.5607 10.5607C10.2794 10.842 9.89784 11 9.50001 11ZM11 6.00001H9.50001C9.20334 6.00001 8.91333 5.91204 8.66666 5.74722C8.41998 5.58239 8.22772 5.34813 8.11419 5.07404C8.00066 4.79995 7.97096 4.49835 8.02883 4.20738C8.08671 3.9164 8.22957 3.64913 8.43935 3.43935C8.64913 3.22957 8.9164 3.08671 9.20738 3.02883C9.49835 2.97096 9.79995 3.00066 10.074 3.11419C10.3481 3.22772 10.5824 3.41998 10.7472 3.66666C10.912 3.91333 11 4.20334 11 4.50001V6.00001ZM12 12.0583C11.9807 12.0385 11.9615 12.0194 11.9417 12C11.9615 11.9807 11.9807 11.9615 12 11.9417C12.0194 11.9615 12.0385 11.9807 12.0583 12C12.0385 12.0194 12.0194 12.0385 12 12.0583ZM14.5 21C14.1023 20.9996 13.721 20.8414 13.4398 20.5602C13.1586 20.279 13.0004 19.8977 13 19.5V18H14.5C14.8978 18 15.2794 18.158 15.5607 18.4394C15.842 18.7207 16 19.1022 16 19.5C16 19.8978 15.842 20.2794 15.5607 20.5607C15.2794 20.842 14.8978 21 14.5 21ZM19.5 16H14.5C14.1022 16 13.7207 15.842 13.4394 15.5607C13.158 15.2794 13 14.8978 13 14.5C13 14.1022 13.158 13.7207 13.4394 13.4394C13.7207 13.158 14.1022 13 14.5 13H19.5C19.8978 13 20.2794 13.158 20.5607 13.4394C20.842 13.7207 21 14.1022 21 14.5C21 14.8978 20.842 15.2794 20.5607 15.5607C20.2794 15.842 19.8978 16 19.5 16ZM19.5 11H18V9.50001C18 9.20334 18.088 8.91333 18.2528 8.66666C18.4176 8.41998 18.6519 8.22772 18.926 8.11419C19.2001 8.00066 19.5017 7.97096 19.7926 8.02883C20.0836 8.08671 20.3509 8.22957 20.5607 8.43935C20.7704 8.64913 20.9133 8.9164 20.9712 9.20738C21.0291 9.49835 20.9994 9.79995 20.8858 10.074C20.7723 10.3481 20.58 10.5824 20.3334 10.7472C20.0867 10.912 19.7967 11 19.5 11Z"
												fill="#737A91"
											/>
										</svg>
									</a>
								</li>
								<li className="bg-gray-400 bg-opacity-10 w-42px h-42px flex items-center justify-center rounded-[50%] mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://twitter.com/getconvoy">
										<img src="/svg/twitter-grey-icon.svg" alt="twitter logo" />
									</a>
								</li>
								<li className="bg-gray-400 bg-opacity-10 w-42px h-42px flex items-center justify-center rounded-[50%] mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://github.com/frain-dev/convoy">
										<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M6.99913 0.145752C3.13425 0.145752 0 3.29225 0 7.17375C0 10.2783 2.0055 12.912 4.788 13.8421C5.138 13.9069 5.26575 13.6899 5.26575 13.5035C5.26575 13.3364 5.25962 12.8945 5.25612 12.3083C3.30925 12.7326 2.898 11.3659 2.898 11.3659C2.58038 10.5539 2.121 10.3378 2.121 10.3378C1.48488 9.902 2.16825 9.91075 2.16825 9.91075C2.87087 9.96063 3.24013 10.6353 3.24013 10.6353C3.86488 11.7089 4.879 11.3991 5.278 11.2189C5.341 10.7648 5.52212 10.455 5.7225 10.2791C4.1685 10.1015 2.534 9.49863 2.534 6.80625C2.534 6.03888 2.807 5.4115 3.255 4.91975C3.18238 4.74213 2.94263 4.02725 3.32325 3.06038C3.32325 3.06038 3.91125 2.87138 5.24825 3.7805C5.8065 3.62475 6.405 3.54688 7.00088 3.54425C7.595 3.54775 8.19437 3.62475 8.7535 3.78138C10.0896 2.87225 10.6767 3.06125 10.6767 3.06125C11.0582 4.029 10.8185 4.743 10.7467 4.92063C11.1956 5.41238 11.466 6.03975 11.466 6.80713C11.466 9.5065 9.82975 10.1006 8.2705 10.2748C8.52162 10.4918 8.74562 10.9205 8.74562 11.5759C8.74562 12.5156 8.73687 13.2734 8.73687 13.5035C8.73687 13.6916 8.86287 13.9104 9.21812 13.8413C11.9962 12.9103 14 10.2774 14 7.17375C14 3.29225 10.8658 0.145752 6.99913 0.145752Z"
												fill="#737A91"
											/>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</aside>

					<main className="max-w-[1035px] w-full px-20px">
						<div className="relative">
							<h2 className="font-bold text-black flex items-center">
								{currentTag}
								<button onClick={() => setShowCategories(!showCategories)} className="h-fit mt-4px ml-8px desktop:hidden">
									<img src="/svg/angle-down-black-icon.svg" alt="arrow down iconn" />
								</button>
							</h2>
							{showCategories && (
								<ul className="absolute bg-white-100 shadow-sm rounded-10px p-24px z-1 w-216px mt-4px">
									{tags.map((tag, i) => (
										<li key={i} className="mb-32px last-of-type:mb-0 text-14 text-gray-600" onClick={() => setShowCategories(!showCategories)}>
											<Link href={'/blog?tag=' + tag}>{tag}</Link>
										</li>
									))}
								</ul>
							)}
						</div>

						<FeaturedPost postData={featuredPosts[0]}></FeaturedPost>

						<div className="desktop:grid desktop:grid-cols-2 gap-y-62px gap-x-48px max-w-[970px] mb-48px mt-48px">
							{nonFeaturedPosts.slice(0, 4).map((article, i) => (
								<Post postData={article} key={i} />
							))}
						</div>

						<div className="bg-white-100 shadow-card rounded-8px flex flex-col items-center max-w-[970px] py-32px px-24px desktop:px-70px mt-40px desktop:mt-48px desktop:flex-row desktop:justify-around">
							<div>
								<p className="mb-10px text-14 text-center desktop:text-left">Join our newsletter</p>
								<p className="text-14 text-center desktop:text-left">No spam! Just articles, events, and talks.</p>
								<form onSubmit={subscribeToNewsletter} className="bg-primary-25 border-primary-25 flex p-10px rounded-8px items-center mt-24px">
									<div>
										<svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M23.6875 11.9688C22.9688 12.5312 22.0625 13.2188 18.875 15.5312C18.25 16 17.0938 17.0312 16 17.0312C14.875 17.0312 13.75 16 13.0938 15.5312C9.90625 13.2188 9 12.5312 8.28125 11.9688C8.15625 11.875 8 11.9688 8 12.125V18.5C8 19.3438 8.65625 20 9.5 20H22.5C23.3125 20 24 19.3438 24 18.5V12.125C24 11.9688 23.8125 11.875 23.6875 11.9688ZM16 16C16.7188 16.0312 17.75 15.0938 18.2812 14.7188C22.4375 11.7188 22.75 11.4375 23.6875 10.6875C23.875 10.5625 24 10.3438 24 10.0938V9.5C24 8.6875 23.3125 8 22.5 8H9.5C8.65625 8 8 8.6875 8 9.5V10.0938C8 10.3438 8.09375 10.5625 8.28125 10.6875C9.21875 11.4375 9.53125 11.7188 13.6875 14.7188C14.2188 15.0938 15.25 16.0312 16 16Z"
												fill="#477DB3"
											/>
										</svg>
									</div>
									<input
										type="email"
										id="email"
										placeholder="Your email"
										aria-label="Email"
										ref={inputRef}
										className="bg-transparent focus:outline-none focus:border-none"
									/>
									<button>
										<img src="/svg/send-primary-icon.svg" alt="send icon" className="w-24px h-24px" />
									</button>
								</form>
							</div>
							<img src="/gif/mailbox.gif" className="w-180px order-1 m-auto desktop:order-2 desktop:m-[unset]" alt="mailbox animation" />
						</div>

						<div className="desktop:grid desktop:grid-cols-2 gap-y-62px gap-x-48px max-w-[970px] mb-48px mt-48px">
							{nonFeaturedPosts.slice(4).map((article, i) => (
								<Post postData={article} key={i} />
							))}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
