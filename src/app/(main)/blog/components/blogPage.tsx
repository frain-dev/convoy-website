'use client';
import Link from 'next/link';
import formatDate from '@/lib/formatDate';
import Post from './post';
import authors from '../../../data/authors.json';
import Image from 'next/image';
import GetStarted from '@/app/components/GetStarted';

export default function BlogPage({ posts, blogData, children }: any) {
	const getGradientColor = (index: number) => {
		const colors = ['#2780F1', '#F18527', '#27F185', '#AE27F1', '#F1B527'];
		return colors[index % colors.length];
	};

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
		<div className="m-auto pt-100px mobile:pt- 150px max-w -[1300px] w-full">
			<div className="flex flex-col items-center flex-wrap nav-bar-break:flex-nowrap justify-center w-full">
				<div
					className="border border-[#EBEBEB] w-full min-h-[520px] py-30px desktop:py-52px bg-gradient-to-b from-[#fff] from-[0%] via-[#fee] via-[54.97%] to-[#ffd7d7] to-[134.32%] flex items-center justify-center mobile:px-20px mobile:min-h-[304px] relative overflow-hidden"
					// style={{
					// 	background: `linear-gradient(to top, ${getGradientColor(index)}26, #FFFFFF)`
					// }}
				>
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:3.5rem_3.35rem] absolute w-full h-full"></div>

					<div className="w-[1180px] z-10">
						{!blogData.isError && (
							<>
								<div className="w-full flex-col desktop:flex-row desktop:items-center desktop:justify-between hidden desktop:flex">
									<div className="font-semibold text-[15px] text-[#666] flex gap-1 py-2.5 mb-10">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
											<path d="M8.1197 9.50052L11.832 5.7882L10.7714 4.72754L5.9984 9.50052L10.7714 14.2734L11.832 13.2128L8.1197 9.50052Z" fill="#666666" />
										</svg>
										<Link href="/blog">Blog</Link>
									</div>
								</div>
							</>
						)}

						<span className="py-6px px-10px bg-[#2780F11F] bg-opacity-10 font-medium text-12 text-[#000] rounded-16px desktop:rounded-6px h-26px">
							{blogData.primary_tag}
						</span>

						<h3 className="font-bold text-24 leading-[31.2px] text-[#000] mt-20px mb-0px desktop:w-[652px] desktop:mt-20px desktop:mb-26px desktop:text-[56px] desktop:leading-[67px]">
							{blogData.title}
						</h3>

						<div className="text-12 desktop:text-16 flex items-center mt-10px desktop:mt-20px font-medium text-[#666] gap-2">
							<span>{blogData.readTime} min read</span>
							<span className="mx-4px desktop:mx-6px mb-1px desktop:mb-2px">
								<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="2" cy="2" r="2" fill="#737A91" />
								</svg>
							</span>
							<span> {formatDate(blogData.published_at)}</span>
						</div>

						<div className="mt-66px desktop:mt-40px flex flex-col gap-2 desktop:gap-3">
							<h4 className="text-[#666] text-14 desktop:text-16 font-medium leading-[24px]">Written by</h4>
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
						</div>
					</div>
				</div>

				<main className="nav-bar-break:max-w-[770px] w-full px-20px desktop-min:p-0 mb-70px mt-40px">{children}</main>

				<GetStarted></GetStarted>

				<div className="px-20px desktop-min:p-0 desktop-min:top-200px desktop:top-128px">
					<p className="text-20 font-semibold text-[#111928] mb-40px">Related Posts</p>

					<div className="flex flex-row flex-wrap gap-48px">
						<div className="grid desktop:grid-cols-2 gap-20px max-w-[970px] mb-48px">
							{posts.map((article, i) => (
								<Post postData={article} key={i} index={i} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
