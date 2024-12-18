'use client';
import Link from 'next/link';
import formatDate from '@/lib/formatDate';
import Post from './post';
import authors from '../../../data/authors.json';
import GetStarted from '@/app/components/GetStarted';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlogPage({ posts, blogData, children }: any) {
	const [canShare, setCanShare] = useState(false);

	useEffect(() => {
		setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
	}, []);

	const handleShare = async (platform: 'linkedin' | 'twitter' | 'hackernews' | 'native') => {
		const url = window.location.href;
		const title = blogData.title;
		const text = `Check out this article: ${title}`;

		switch (platform) {
			case 'linkedin':
				window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
				break;

			case 'twitter':
				window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
				break;

			case 'hackernews':
				window.open(`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`, '_blank');
				break;

			case 'native':
				if (navigator.share) {
					try {
						await navigator.share({
							title,
							text,
							url
						});
					} catch (err) {
						console.log('Error sharing:', err);
					}
				}
				break;
		}
	};

	const getGradientColor = (index: number) => {
		const colors = ['#2780F1', '#F18527', '#27F185', '#AE27F1', '#F1B527'];
		return colors[index % colors.length];
	};

	console.log(blogData.authors);

	const getAuthors = () => {
		if (!blogData.authors) return [];
		const postAuthors = authors.filter(item => blogData.authors.includes(item.id));
		return postAuthors;
	};

	const getPrimaryAuthor = () => {
		if (!blogData.primary_author) return;
		const primaryAuthor = authors.find(item => item.name === blogData.primary_author?.name);
		return primaryAuthor;
	};

	const index = Math.floor(Math.random() * 5);

	return (
		<div className="m-auto pt-[62px] lg-old:pt-[67px] w-full">
			<div className="flex flex-col items-center flex-wrap nav-bar-break:flex-nowrap justify-center w-full">
				<div
					className="border border-[#EBEBEB] w-full min-h-[520px] py-30px desktop:py-52px bg-gradient-to-b from-[#fff] from-[0%] via-[#fee] via-[54.97%] to-[#ffd7d7] to-[134.32%] flex items-center justify-center mobile:px-20px nav-bar-break:px-30px mobile:min-h-[304px] relative overflow-hidden"
					// style={{
					// 	background: `linear-gradient(to top, ${getGradientColor(index)}26, #FFFFFF)`
					// }}
				>
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:3.5rem_3.35rem] absolute w-full h-full"></div>

					<div className="w-[1180px] z-10">
						{!blogData.isError && (
							<>
								<motion.div
									initial={{ opacity: 0, y: 40 }}
									whileInView={{
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.8,
											delay: 0,
											ease: [0.44, 0, 0, 1]
										}
									}}
									viewport={{
										amount: 'some',
										once: true
									}}
									className="w-full flex-col desktop:flex-row desktop:items-center desktop:justify-between hidden desktop:flex">
									<Link href="/blog" className="font-semibold text-[15px] text-[#666] flex gap-1 py-2.5 mb-10 group hover:opacity-70 transition-all">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="19"
											viewBox="0 0 18 19"
											fill="none"
											className="group-hover:translate-x-[-2px] transition-all">
											<path d="M8.1197 9.50052L11.832 5.7882L10.7714 4.72754L5.9984 9.50052L10.7714 14.2734L11.832 13.2128L8.1197 9.50052Z" fill="#666666" />
										</svg>
										<span>Blog</span>
									</Link>
								</motion.div>
							</>
						)}

						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.8,
									delay: 0.2,
									ease: [0.44, 0, 0, 1]
								}
							}}
							viewport={{
								amount: 'some',
								once: true
							}}
							className="py-4px px-10px bg-[#2780F11F] bg-opacity-10 font-medium text-12 text-[#000] rounded-16px desktop:rounded-6px h- 26px w-max">
							<span>{blogData.primary_tag}</span>
						</motion.div>

						<motion.h3
							initial={{ opacity: 0, y: 40 }}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.8,
									delay: 0.2,
									ease: [0.44, 0, 0, 1]
								}
							}}
							viewport={{
								amount: 'some',
								once: true
							}}
							className="font-bold text-24 leading-[31.2px] text-[#000] mt-20px mb-0px desktop:w-[652px] desktop:mt-20px desktop:mb-26px desktop:text-[56px] desktop:leading-[67px]">
							{blogData.title}
						</motion.h3>

						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.8,
									delay: 0.2,
									ease: [0.44, 0, 0, 1]
								}
							}}
							viewport={{
								amount: 'some',
								once: true
							}}
							className="text-12 desktop:text-16 flex items-center mt-10px desktop:mt-20px font-medium text-[#666] gap-2">
							<span>{blogData.readTime} min read</span>
							<span className="mx-4px desktop:mx-6px mb-1px desktop:mb-2px">
								<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="2" cy="2" r="2" fill="#737A91" />
								</svg>
							</span>
							<span> {formatDate(blogData.published_at)}</span>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.8,
									delay: 0.4,
									ease: [0.44, 0, 0, 1]
								}
							}}
							viewport={{
								amount: 'some',
								once: true
							}}
							className="mt-66px desktop:mt-40px flex flex-col gap-2 desktop:gap-3">
							<h4 className="text-[#666] text-[13px] sm-old:text-14 desktop:text-16 font-medium leading-[24px]">Written by</h4>
							<div className="flex flex-wrap mb-10px desktop:mb-26px items-end justify-between">
								<div className="flex items-end">
									{blogData.primary_author && !blogData.authors && (
										<a
											href={`${blogData.primary_author?.twitter ? 'http://twitter.com/' + blogData.primary_author?.twitter : ''}`}
											target="_blank"
											className="flex items-start desktop:mb-[unset]">
											<div className="w-36px h-36px rounded-50% mr-8px overflow-hidden flex items-center">
												<img
													src={`/profile-images/${blogData.primary_author?.name}.png`}
													className="w-full h-full rounded-[50%] object-cover"
													alt={blogData.primary_author?.name}
												/>
											</div>
											<div>
												<h5 className="font-semibold text-[#000] text-14 desktop:text-16 desktop:leading-[16px] mb-1px desktop:mb-2px">
													{blogData.primary_author?.name}
												</h5>
												<p className="text-10 desktop:text-12 leading-[16px] text-[#666] font-medium">{getPrimaryAuthor()?.role}</p>
											</div>
										</a>
									)}

									{blogData.authors && (
										<>
											{getAuthors()
												.slice(0, 2)
												.map(author => (
													<a
														key={author.id}
														href={`${author?.twitter ? 'http://twitter.com/' + author?.twitter : ''}`}
														target="_blank"
														className="-ml-20px first-of-type:ml-0">
														<div className="w-40px h-40px rounded-50% shadow-sm overflow-hidden flex items-center justify-center border border-gray-25 bg-gray-25">
															<img src={`/profile-images/${author?.name}.png`} className="w-full rounded-[50%]" alt={author?.name} />
														</div>
													</a>
												))}

											{getAuthors()?.length && getAuthors()?.length > 2 && (
												<div className="w-40px h-40px rounded-50% shadow-sm flex items-center justify-center bg-gray-600 text-12 text-gray-25 -ml-20px">
													+{blogData.authors?.length - 2}
												</div>
											)}

											<div className="w-92px flex flex-wrap ml-6px">
												{getAuthors()
													.slice(0, 2)
													.map((author, i) => (
														<a
															key={i}
															href={`${author?.twitter ? 'http://twitter.com/' + author?.twitter : ''}`}
															target="_blank"
															className="font-medium  text-gray-600 text-10">
															{author?.name}
															{i === 0 && <>,</>}
														</a>
													))}
											</div>
										</>
									)}
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<motion.div initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.8,
							delay: 0.2,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}} className="flex w-full nav-bar-break:max-w-[770px] mt-10 md-old:mt-20 px-20px desktop-min:p-0">
					<div className="flex flex-col">
						<h6 className="font-medium mb-2px text-[#000] text-12 desktop:text-14">Share</h6>

						<ul className="flex gap-x-5">
							<li className="bg-opacity-8 w-24px h-42px flex items-center justify-center mr-0px last-of-type:mr-[unset]">
								<button onClick={() => handleShare('linkedin')} className="hover:opacity-80 transition-opacity" aria-label="Share on LinkedIn">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M20.4725 1.99916H3.5325C3.34209 1.99652 3.153 2.03142 2.97607 2.10185C2.79913 2.17228 2.63782 2.27688 2.50131 2.40967C2.36481 2.54247 2.25579 2.70085 2.18051 2.87577C2.10522 3.05069 2.06512 3.23874 2.0625 3.42916V20.5692C2.06512 20.7595 2.10522 20.9477 2.18051 21.1225C2.25579 21.2975 2.36481 21.4559 2.50131 21.5886C2.63782 21.7214 2.79913 21.8261 2.97607 21.8964C3.153 21.9669 3.34209 22.0018 3.5325 21.9992H20.4725C20.663 22.0018 20.852 21.9669 21.0289 21.8964C21.2059 21.8261 21.3673 21.7214 21.5037 21.5886C21.6401 21.4559 21.7493 21.2975 21.8246 21.1225C21.8997 20.9477 21.94 20.7595 21.9425 20.5692V3.42916C21.94 3.23874 21.8997 3.05069 21.8246 2.87577C21.7493 2.70085 21.6401 2.54247 21.5037 2.40967C21.3673 2.27688 21.2059 2.17228 21.0289 2.10185C20.852 2.03142 20.663 1.99652 20.4725 1.99916ZM8.0925 18.7391H5.0925V9.73916H8.0925V18.7391ZM6.5925 8.47916C6.17878 8.47916 5.78198 8.3148 5.48942 8.02224C5.19686 7.72968 5.0325 7.3329 5.0325 6.91916C5.0325 6.50542 5.19686 6.10863 5.48942 5.81607C5.78198 5.52351 6.17878 5.35916 6.5925 5.35916C6.81221 5.33424 7.03469 5.35601 7.24539 5.42304C7.45608 5.49007 7.65025 5.60084 7.81517 5.74813C7.98009 5.8954 8.11203 6.07584 8.20238 6.27764C8.29273 6.47945 8.33942 6.69805 8.33942 6.91916C8.33942 7.14026 8.29273 7.35888 8.20238 7.56068C8.11203 7.76249 7.98009 7.94293 7.81517 8.0902C7.65025 8.23746 7.45608 8.34825 7.24539 8.41527C7.03469 8.4823 6.81221 8.50407 6.5925 8.47916ZM18.9125 18.7391H15.9125V13.9092C15.9125 12.6992 15.4825 11.9092 14.3925 11.9092C14.0552 11.9116 13.7267 12.0174 13.4513 12.2123C13.176 12.4072 12.967 12.6818 12.8525 12.9992C12.7743 13.2342 12.7403 13.4817 12.7525 13.7292V18.7291H9.75251C9.75251 18.7291 9.75251 10.5492 9.75251 9.72916H12.7525V10.9992C13.025 10.5263 13.4214 10.1367 13.8989 9.87236C14.3765 9.60805 14.9171 9.479 15.4625 9.49916C17.4625 9.49916 18.9125 10.7892 18.9125 13.5592V18.7391Z"
											fill="#666666"
										/>
									</svg>
								</button>
							</li>

							<li className="bg-opacity-10 w-24px h-42px flex items-center justify-center mr-0px last-of-type:mr-[unset]">
								<button onClick={() => handleShare('twitter')} className="hover:opacity-80 transition-opacity" aria-label="Share on Twitter">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M3.01562 3L9.82129 13.207L3.25439 21H5.21582L10.687 14.5078L15.0156 21H15.417H21.0142L14.0371 10.5322L20.3843 3H18.4229L13.1714 9.23291L9.01562 3H3.01562ZM5.81934 4.5H8.21289L18.2119 19.5H15.8184L5.81934 4.5Z"
											fill="#666666"
										/>
									</svg>
								</button>
							</li>

							<li className="bg-opacity-10 w-24px h-42px flex items-center justify-center mr-0px last-of-type:mr-[unset]">
								<button onClick={() => handleShare('hackernews')} className="hover:opacity-80 transition-opacity" aria-label="Share on Hacker News">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="1.5" y="2" width="20" height="20" rx="2" fill="#666666" />
										<path d="M12.26 16.18V12.51L14.85 7.82H13.12L11.43 10.82L9.75 7.82H8.02L10.6 12.51V16.18H12.26Z" fill="white" />
									</svg>
								</button>
							</li>

							{canShare && (
								<li className="bg-opacity-10 w-24px h-42px flex items-center justify-center mr-0px last-of-type:mr-[unset]">
									<button onClick={() => handleShare('native')} className="hover:opacity-80 transition-opacity" aria-label="Share using device options">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#666666"
											strokeWidth="1.7"
											strokeLinecap="round"
											strokeLinejoin="round">
											<circle cx="18" cy="5" r="3" />
											<circle cx="6" cy="12" r="3" />
											<circle cx="18" cy="19" r="3" />
											<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
											<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
										</svg>
									</button>
								</li>
							)}
						</ul>
					</div>
				</motion.div>

				<motion.main initial={{ opacity: 0, y: 5 }}
					whileInView={{
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.8,
							delay: 0.4,
							ease: [0.44, 0, 0, 1]
						}
					}}
					viewport={{
						amount: 'some',
						once: true
					}} className="nav-bar-break:max-w-[770px] w-full px-20px desktop-min:p-0 mb-10px md-old:mb-70px mt-40px">{children}</motion.main>

				<GetStarted></GetStarted>

				<div className="-mt-10 md-old:mt-0 px-20px desktop-min:p-0">
					<p className="text-20 font-semibold text-[#111928] mb-40px">Related Posts</p>

					<div className="flex flex-row flex-wrap gap-48px">
						<div className="grid sm-old:grid-cols-2 gap-20px max-w-[970px] mb-48px">
							{posts.map((article, i) => (
								<motion.div
									initial={{ opacity: 0, y: 5 }}
									whileInView={{
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.8,
											delay: i * 0.2,
											ease: [0.44, 0, 0, 1]
										}
									}}
									viewport={{
										amount: 'some',
										once: true
									}}>
									<Post postData={article} key={i} index={i} />
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
