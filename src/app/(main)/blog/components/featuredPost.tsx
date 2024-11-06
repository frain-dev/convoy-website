'use client';
import formatDate from '@/lib/formatDate';
import Link from 'next/link';
import { useState } from 'react';
import authors from '../../../data/authors.json';
import Image from 'next/image';

export default function FeaturedPost({ postData }: any) {
	const [showFallBackImg, setShowFallBackImg] = useState(false);

	const getAuthors = () => {
		if (!postData.authors) return [];
		const postAuthors = authors.filter(item => postData.authors.includes(item.id));
		return postAuthors;
	};

	const getPrimaryAuthor = () => {
		if (!postData.primary_author) return;
		const primaryAuthor = authors.find(item => item.name === postData.primary_author?.name);
		return primaryAuthor;
	};
	return (
		<div>
			<div
				className="
                rounded-[8px]
                shadow-card
                max-w-[970px]
                bg-white-100
                mt-0px
                pt-20px
                px-12px
                desktop:pl-[40px] desktop:pt-[50px] desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
                mobile:mb-48px bg-gradient-to-b from-[#fff] from-[0%] via-[#fdf6ff] via-[54.97%] to-[#f1d2fc] to-[134.32%] border border-[#E7E7E7] relative overflow-hidden">
				<Image src="/svg/grid-lines.svg" width={850} height={402} className="w-[905px] h-full absolute -top-0 -left-[57px]" alt="y-combinator" />
				<Image src="/svg/grid-lines.svg" width={850} height={402} className="w-[905px] h-full absolute top-0 -right-[674px]" alt="y-combinator" />

				<div className="desktop:max-w-[470px] pt-2px pr-24px z-10">
					<div className="flex justify-between items-center mb-24px">
						<div className="py-2px px-16px bg-[#2780F11F] bg-opacity-10 font-medium text-12 text-[#000] rounded-16px">Featured</div>
					</div>

					<Link href={`/blog/${postData.slug}`}>
						<h3 className="text-28 text-[#000] font-semibold mb-20px w-[320px]">{postData.title}</h3>
					</Link>

					<p className="text-[#666] text-14 overflow-hidden text-ellipsis w-[402px] font-medium mb-[4px]">{postData.description}</p>

					<div className="font-medium text-10 text-[#666] leading-[16px]">{formatDate(postData.published_at)}</div>

					<div className="flex flex-wrap mt-40px mb-26px items-end justify-between">
						<div className="flex items-end">
							{postData.primary_author && !postData.authors && (
								<a
									href={`${postData.primary_author?.twitter ? 'http://twitter.com/' + postData.primary_author?.twitter : ''}`}
									target="_blank"
									className="flex items-start desktop:mb-[unset]">
									<div className="w-32px h-32px rounded-50% mr-8px overflow-hidden flex items-center">
										<img
											src={`/profile-images/${postData.primary_author?.name}.png`}
											className="w-full h-full rounded-[50%]"
											alt={postData.primary_author?.name}
										/>
									</div>
									<div>
										<h5 className="font-medium text-[#666] text-14 leading-[16px]">{postData.primary_author?.name}</h5>
										<p className="text-10 leading-[16px] text-[#666] font-medium">{getPrimaryAuthor()?.role}</p>
									</div>
								</a>
							)}

							{postData.authors && (
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
											+{postData.authors?.length - 2}
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
	);
}
