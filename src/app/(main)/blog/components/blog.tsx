'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Post from './post';
import FeaturedPost from './featuredPost';

export default function Blog({ articles }: any) {
	const searchParams = useSearchParams();
	const featuredPosts = articles.filter(article => article.featured);
	const nonFeaturedPosts = articles.filter(article => !article.featured).sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
	const [submittingEmail, setIsSubmittingEmail] = useState(false);
	const [filteredPosts, setFilteredPosts] = useState(nonFeaturedPosts);
	const inputRef = useRef(null);
	const [currentTag, setCurrentTag] = useState('All Posts');
	const [showCategories, setShowCategories] = useState(false);
	const tags = ['All Posts', 'Product Update', 'News', 'Engineering', 'Tutorial', 'Open Thoughts', 'Customer Stories'];

	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6;

	const isTagActive = (tag: string) => {
		const urlTag = searchParams.get('tag');
		if (!urlTag && tag === 'All Posts') return true;
		return urlTag === tag;
	};

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
		setCurrentPage(1);
	};

	useEffect(() => {
		if (searchParams.get('tag')) filterPosts();
		else setFilteredPosts(nonFeaturedPosts);
	}, [searchParams]);

	// Pagination logic
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
	const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			<div className="pt-130px nav-bar-break:pt-184px pb-100px max-w-[1350px] w-full m-auto">
				<div className="flex flex-col items-center justify-center gap-6 w-full px-4">
					<h1 className="text-32 nav-bar-break:text-[40px] font-medium">Convoy Summaries</h1>
					<form onSubmit={subscribeToNewsletter} className="flex flex-col nav-bar-break:flex-row gap-3 nav-bar-break:gap-4 items-center justify-center w-full">
						<input
							type="email"
							id="email"
							className="block p-4 ps-[16px] shadow-btn placeholder-[#666] placeholder:font-[500] text-[15px] text-gray-900 border border-[#E7E7E7] rounded-8px bg-[#fff] w-full nav-bar-break:w-[494px] h-11 focus:outline-none"
							placeholder="Join our newsletter"
							required
							ref={inputRef}
						/>
						<button className="px-16px py-10px text-14 font-medium rounded-8px h-10 nav-bar-break:h-11 bg-[#2780F1] text-white-100 flex items-center shadow-btn-secondary">
							<span>Subscribe</span>

							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px]">
								<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
							</svg>
						</button>
					</form>
				</div>

				<div className="m-auto pb-0 flex justify-between pt-90px">
					<aside className="w-240px hidden desktop:sticky desktop:top-150px desktop:block desktop:pl-20px desktop:pr-32px">
						<div className="relative mb-8">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path
										d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
										stroke="#A5A5A5"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="default-search"
								className="block p-4 ps-[44px] shadow-btn placeholder-[#A5A5A5] text-[15px] text-gray-900 border border-[#E7E7E7] rounded-8px bg-[#fff] w-[280px] h-[44px] focus:outline-none"
								placeholder="Search"
								required
							/>
						</div>

						<ul className="p-0">
							<h6 className="font-bold text-[#000] mb-18px">CATEGORIES</h6>
							{tags.map((tag, i) => (
								<li key={i} className="font-medium text-14 mb-[15px] ml-20px">
									<Link
										href={tag !== 'All Posts' ? `/blog?tag=${tag}` : '/blog'}
										className={`${isTagActive(tag) ? 'text-[#2780F1]' : 'text-[#666]'} hover:text-[#2780F1] transition-colors duration-200`}>
										{tag}
									</Link>
								</li>
							))}
						</ul>

						<div>
							<h6 className="font-semibold mb-18px mt-8">Follow Us</h6>

							<ul className="flex">
								<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
											<path
												d="M26.25 8.125C26.25 6.39875 24.8512 5 23.125 5C21.3988 5 20 6.39875 20 8.125C20 9.12 20 14.6275 20 15.625C20 17.3512 21.3988 18.75 23.125 18.75C24.8512 18.75 26.25 17.3512 26.25 15.625C26.25 14.6275 26.25 9.12 26.25 8.125ZM33.75 15.625C33.75 17.3512 32.3512 18.75 30.625 18.75C29.8487 18.75 27.5 18.75 27.5 18.75C27.5 18.75 27.5 16.575 27.5 15.625C27.5 13.8988 28.8988 12.5 30.625 12.5C32.3512 12.5 33.75 13.8988 33.75 15.625ZM30.625 26.25C32.3512 26.25 33.75 24.8512 33.75 23.125C33.75 21.3988 32.3512 20 30.625 20C29.63 20 24.1225 20 23.125 20C21.3988 20 20 21.3988 20 23.125C20 24.8512 21.3988 26.25 23.125 26.25C24.1225 26.25 29.63 26.25 30.625 26.25ZM23.125 33.75C21.3988 33.75 20 32.3512 20 30.625C20 29.8487 20 27.5 20 27.5C20 27.5 22.175 27.5 23.125 27.5C24.8512 27.5 26.25 28.8988 26.25 30.625C26.25 32.3512 24.8512 33.75 23.125 33.75ZM12.5 30.625C12.5 32.3512 13.8988 33.75 15.625 33.75C17.3512 33.75 18.75 32.3512 18.75 30.625C18.75 29.63 18.75 24.1225 18.75 23.125C18.75 21.3988 17.3512 20 15.625 20C13.8988 20 12.5 21.3988 12.5 23.125C12.5 24.1225 12.5 29.63 12.5 30.625ZM5 23.125C5 21.3988 6.39875 20 8.125 20C8.90125 20 11.25 20 11.25 20C11.25 20 11.25 22.175 11.25 23.125C11.25 24.8512 9.85125 26.25 8.125 26.25C6.39875 26.25 5 24.8512 5 23.125ZM8.125 12.5C6.39875 12.5 5 13.8988 5 15.625C5 17.3512 6.39875 18.75 8.125 18.75C9.12 18.75 14.6275 18.75 15.625 18.75C17.3512 18.75 18.75 17.3512 18.75 15.625C18.75 13.8988 17.3512 12.5 15.625 12.5C14.6275 12.5 9.12 12.5 8.125 12.5ZM15.625 5C17.3512 5 18.75 6.39875 18.75 8.125C18.75 8.90125 18.75 11.25 18.75 11.25C18.75 11.25 16.575 11.25 15.625 11.25C13.8988 11.25 12.5 9.85125 12.5 8.125C12.5 6.39875 13.8988 5 15.625 5Z"
												fill="#666666"
											/>
										</svg>
									</a>
								</li>
								<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://twitter.com/getconvoy">
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
											<path
												d="M5.02344 5L16.3662 22.0117L5.42139 35H8.69043L17.8091 24.1797L25.0234 35H25.6924H35.021L23.3926 17.5537L33.9712 5H30.7021L21.9497 15.3882L15.0234 5H5.02344ZM9.69629 7.5H13.6855L30.3506 32.5H26.3613L9.69629 7.5Z"
												fill="#666666"
											/>
										</svg>{' '}
									</a>
								</li>
								<li className="bg-opacity-10 w-42px h-42px flex items-center justify-center mr-16px last-of-type:mr-[unset]">
									<a target="_blank" href="https://github.com/frain-dev/convoy">
										<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M20 5C11.7139 5 5 11.7139 5 20C5 26.626 9.29688 32.251 15.2588 34.2334C16.0107 34.3701 16.2842 33.9111 16.2842 33.5107C16.2842 33.1543 16.2695 32.2119 16.2646 30.9619C12.0898 31.8652 11.2109 28.9502 11.2109 28.9502C10.5273 27.2168 9.5459 26.7529 9.5459 26.7529C8.18359 25.8252 9.64844 25.8447 9.64844 25.8447C11.1523 25.9521 11.9434 27.3877 11.9434 27.3877C13.2813 29.6826 15.4541 29.0186 16.3086 28.6377C16.4453 27.666 16.8359 27.0068 17.2607 26.6309C13.9307 26.2549 10.4297 24.9658 10.4297 19.2188C10.4297 17.5781 11.0156 16.2402 11.9727 15.1904C11.8213 14.8145 11.3037 13.2861 12.1191 11.2207C12.1191 11.2207 13.3789 10.8203 16.2451 12.7588C17.4414 12.4268 18.7256 12.2607 20 12.2559C21.2744 12.2607 22.5586 12.4268 23.7549 12.7588C26.6211 10.8203 27.876 11.2207 27.876 11.2207C28.6963 13.2861 28.1836 14.8145 28.0273 15.1904C28.9893 16.2402 29.5654 17.5781 29.5654 19.2188C29.5654 24.9805 26.0596 26.2451 22.7197 26.6211C23.2568 27.0801 23.7354 27.998 23.7354 29.3945C23.7354 31.4014 23.7207 33.0176 23.7207 33.5107C23.7207 33.9111 23.9893 34.3799 24.751 34.2334C30.708 32.2461 35 26.626 35 20C35 11.7139 28.2861 5 20 5Z"
												fill="#666666"
											/>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</aside>

					<main className="max-w-[1035px] w-full px-20px">
						<div className="relative desktop:hidden mb-[33px]">
							<h2 className="text-[#666] text-16 font-medium text-black flex items-center">
								{currentTag}
								<button onClick={() => setShowCategories(!showCategories)} className="h-fit mt-4px ml-4px desktop:hidden">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
										<path d="M9.00045 9.87835L12.7128 6.16602L13.7734 7.22668L9.00045 11.9997L4.22753 7.22668L5.28818 6.16602L9.00045 9.87835Z" fill="black" />
									</svg>{' '}
								</button>
							</h2>
							{showCategories && (
								<ul className="absolute bg-white-100 shadow-sm rounded-10px p-24px z-1 w-216px mt-4px z-30">
									{tags.map((tag, i) => (
										<li key={i} className="mb-32px last-of-type:mb-0 text-14 text-gray-600" onClick={() => setShowCategories(!showCategories)}>
											<Link href={'/blog?tag=' + tag}>{tag}</Link>
										</li>
									))}
								</ul>
							)}
						</div>

						<FeaturedPost postData={featuredPosts[0]}></FeaturedPost>

						<div className="grid desktop:grid-cols-2 gap-48px max-w-[970px] mb-48px mt-48px">
							{currentPosts.map((article, i) => (
								<Post postData={article} key={i} index={i} />
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center space-x-1.5 mt-[72px]">
								<button
									className="w-[43px] h-[39px] flex items-center justify-center rounded-8px border border-[#e7e7e7] disabled:opacity-50 shadow-btn bg-white-100"
									onClick={prevPage}
									disabled={currentPage === 1}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
										<path d="M8.6197 9.00052L12.332 5.2882L11.2714 4.22754L6.4984 9.00052L11.2714 13.7734L12.332 12.7128L8.6197 9.00052Z" fill="#666666" />
									</svg>
								</button>
								{Array.from({ length: totalPages }).map((_, index) => {
									const pageNumber = index + 1;

									if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
										return (
											<button
												key={index}
												className={`w-[43px] h-[39px] flex items-center justify-center rounded-8px  disabled:opacity-50 shadow-btn text-[15px] font-semibold ${
													currentPage === pageNumber
														? 'border border-[#2780F1]/[0.01] bg-[#2780F133] text-white'
														: 'border border-[#e7e7e7] text-[#666] bg-white-100'
												}`}
												onClick={() => paginate(pageNumber)}>
												{index + 1}
											</button>
										);
									}

									if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
										return (
											<span
												key={index}
												className="w-[43px] h-[39px] flex items-center justify-center rounded-8px border border-[#e7e7e7] disabled:opacity-50 shadow-btn bg-white-100">
												...
											</span>
										);
									}

									return null;
								})}

								<button
									className="w-[43px] h-[39px] flex items-center justify-center rounded-8px border border-[#e7e7e7] disabled:opacity-50 shadow-btn bg-white-100"
									onClick={nextPage}
									disabled={currentPage === totalPages}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
										<path d="M10.3803 9.00052L6.66797 5.2882L7.72863 4.22754L12.5016 9.00052L7.72863 13.7734L6.66797 12.7128L10.3803 9.00052Z" fill="#666666" />
									</svg>
								</button>

								<button
									className="w-[43px] h-[39px] flex items-center justify-center rounded-8px border border-[#e7e7e7] disabled:opacity-50 shadow-btn bg-white-100"
									onClick={() => paginate(totalPages)}
									disabled={currentPage === totalPages}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
										<path d="M13.7123 8.77298L10 5.06066L11.0607 4L15.8336 8.77298L11.0607 13.5459L10 12.4853L13.7123 8.77298Z" fill="#666666" />
										<path d="M7.71233 8.77298L4 5.06066L5.06066 4L9.83363 8.77298L5.06066 13.5459L4 12.4853L7.71233 8.77298Z" fill="#666666" />
									</svg>
								</button>
							</div>
						)}

						<div className="desktop:hidden mt-20">
							<h6 className="font-semibold mb-8px mt-8 text-14">Follow Us</h6>

							<ul className="flex">
								<li className="bg-opacity-10 w-30px h-30px flex items-center justify-center mr-10px last-of-type:mr-[unset]">
									<a target="_blank" href="https://join.slack.com/t/convoy-community/shared_invite/zt-xiuuoj0m-yPp~ylfYMCV9s038QL0IUQ">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none">
											<path
												d="M26.25 8.125C26.25 6.39875 24.8512 5 23.125 5C21.3988 5 20 6.39875 20 8.125C20 9.12 20 14.6275 20 15.625C20 17.3512 21.3988 18.75 23.125 18.75C24.8512 18.75 26.25 17.3512 26.25 15.625C26.25 14.6275 26.25 9.12 26.25 8.125ZM33.75 15.625C33.75 17.3512 32.3512 18.75 30.625 18.75C29.8487 18.75 27.5 18.75 27.5 18.75C27.5 18.75 27.5 16.575 27.5 15.625C27.5 13.8988 28.8988 12.5 30.625 12.5C32.3512 12.5 33.75 13.8988 33.75 15.625ZM30.625 26.25C32.3512 26.25 33.75 24.8512 33.75 23.125C33.75 21.3988 32.3512 20 30.625 20C29.63 20 24.1225 20 23.125 20C21.3988 20 20 21.3988 20 23.125C20 24.8512 21.3988 26.25 23.125 26.25C24.1225 26.25 29.63 26.25 30.625 26.25ZM23.125 33.75C21.3988 33.75 20 32.3512 20 30.625C20 29.8487 20 27.5 20 27.5C20 27.5 22.175 27.5 23.125 27.5C24.8512 27.5 26.25 28.8988 26.25 30.625C26.25 32.3512 24.8512 33.75 23.125 33.75ZM12.5 30.625C12.5 32.3512 13.8988 33.75 15.625 33.75C17.3512 33.75 18.75 32.3512 18.75 30.625C18.75 29.63 18.75 24.1225 18.75 23.125C18.75 21.3988 17.3512 20 15.625 20C13.8988 20 12.5 21.3988 12.5 23.125C12.5 24.1225 12.5 29.63 12.5 30.625ZM5 23.125C5 21.3988 6.39875 20 8.125 20C8.90125 20 11.25 20 11.25 20C11.25 20 11.25 22.175 11.25 23.125C11.25 24.8512 9.85125 26.25 8.125 26.25C6.39875 26.25 5 24.8512 5 23.125ZM8.125 12.5C6.39875 12.5 5 13.8988 5 15.625C5 17.3512 6.39875 18.75 8.125 18.75C9.12 18.75 14.6275 18.75 15.625 18.75C17.3512 18.75 18.75 17.3512 18.75 15.625C18.75 13.8988 17.3512 12.5 15.625 12.5C14.6275 12.5 9.12 12.5 8.125 12.5ZM15.625 5C17.3512 5 18.75 6.39875 18.75 8.125C18.75 8.90125 18.75 11.25 18.75 11.25C18.75 11.25 16.575 11.25 15.625 11.25C13.8988 11.25 12.5 9.85125 12.5 8.125C12.5 6.39875 13.8988 5 15.625 5Z"
												fill="#666666"
											/>
										</svg>
									</a>
								</li>
								<li className="bg-opacity-10 w-30px h-30px flex items-center justify-center mr-10px last-of-type:mr-[unset]">
									<a target="_blank" href="https://twitter.com/getconvoy">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none">
											<path
												d="M5.02344 5L16.3662 22.0117L5.42139 35H8.69043L17.8091 24.1797L25.0234 35H25.6924H35.021L23.3926 17.5537L33.9712 5H30.7021L21.9497 15.3882L15.0234 5H5.02344ZM9.69629 7.5H13.6855L30.3506 32.5H26.3613L9.69629 7.5Z"
												fill="#666666"
											/>
										</svg>{' '}
									</a>
								</li>
								<li className="bg-opacity-10 w-30px h-30px flex items-center justify-center mr-10px last-of-type:mr-[unset]">
									<a target="_blank" href="https://github.com/frain-dev/convoy">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none">
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M20 5C11.7139 5 5 11.7139 5 20C5 26.626 9.29688 32.251 15.2588 34.2334C16.0107 34.3701 16.2842 33.9111 16.2842 33.5107C16.2842 33.1543 16.2695 32.2119 16.2646 30.9619C12.0898 31.8652 11.2109 28.9502 11.2109 28.9502C10.5273 27.2168 9.5459 26.7529 9.5459 26.7529C8.18359 25.8252 9.64844 25.8447 9.64844 25.8447C11.1523 25.9521 11.9434 27.3877 11.9434 27.3877C13.2813 29.6826 15.4541 29.0186 16.3086 28.6377C16.4453 27.666 16.8359 27.0068 17.2607 26.6309C13.9307 26.2549 10.4297 24.9658 10.4297 19.2188C10.4297 17.5781 11.0156 16.2402 11.9727 15.1904C11.8213 14.8145 11.3037 13.2861 12.1191 11.2207C12.1191 11.2207 13.3789 10.8203 16.2451 12.7588C17.4414 12.4268 18.7256 12.2607 20 12.2559C21.2744 12.2607 22.5586 12.4268 23.7549 12.7588C26.6211 10.8203 27.876 11.2207 27.876 11.2207C28.6963 13.2861 28.1836 14.8145 28.0273 15.1904C28.9893 16.2402 29.5654 17.5781 29.5654 19.2188C29.5654 24.9805 26.0596 26.2451 22.7197 26.6211C23.2568 27.0801 23.7354 27.998 23.7354 29.3945C23.7354 31.4014 23.7207 33.0176 23.7207 33.5107C23.7207 33.9111 23.9893 34.3799 24.751 34.2334C30.708 32.2461 35 26.626 35 20C35 11.7139 28.2861 5 20 5Z"
												fill="#666666"
											/>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
