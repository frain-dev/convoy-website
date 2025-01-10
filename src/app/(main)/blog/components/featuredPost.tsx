'use client';
import formatDate from '@/lib/formatDate';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import authors from '../../../data/authors.json';
import Image from 'next/image';
import { OptimizedImage } from '@/app/components/OptimizedImaged';

export default function FeaturedPost({ postData }: any) {
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
		<motion.div
			className=""
			initial={{ opacity: 0, y: 5 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 1.5,
					delay: 0.2,
					ease: [0.44, 0, 0, 1]
				}
			}}
			viewport={{
				amount: 'some',
				once: true
			}}>
			<div
				className="
                rounded-[8px]
                shadow-card
                max-w-[970px]
                bg-white-100
                mt-0px
                pt-20px
                px-20px
                desktop:pl-[40px] desktop:pt-[50px] desktop:pr-0 desktop:flex desktop:justify-between desktop:flex-wrap desktop:items-end
                mobile:mb-0px bg-gradient-to-b from-[#fff] from-[0%] via-[#fdf6ff] via-[54.97%] to-[#f1d2fc] to-[134.32%] border border-[#E7E7E7] relative overflow-hidden">
				<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.5rem_2.35rem] absolute w-full h-full top-0 right-0 pointer-events-none"></div>

				<div className="desktop:max-w-[550px] pt-2px desktop:pr-24px z-50">
					<div className="flex justify-between items-center mb-24px">
						<div className="py-2px px-16px bg-[#2780F11F] bg-opacity-10 font-medium text-12 text-[#000] rounded-16px">Featured</div>
					</div>

					<Link href={`/blog/${postData.slug}`}>
						<h3 className="text-20 md-old:text-28 text-[#000] font-semibold mb-20px w-full max-w-[420px]">{postData.title}</h3>
					</Link>

					<p className="text-[#666] text-12 md-old:text-14 overflow-hidden text-ellipsis w-full max-w-[520px] font-medium mb-[12px] desktop:mb-1">
						{postData.description}
					</p>

					<div className="font-medium text-10 text-[#666] leading-[16px]">{formatDate(postData.published_at)}</div>

					<div className="flex flex-wrap mt-40px mb-26px items-end justify-between">
						<div className="flex items-end">
							{postData.primary_author && !postData.authors && (
								<a
									href={`${postData.primary_author?.twitter ? 'http://twitter.com/' + postData.primary_author?.twitter : ''}`}
									target="_blank"
									className="flex items-start desktop:mb-[unset]">
									<div className="w-32px h-32px rounded-50% mr-8px overflow-hidden flex items-center">
										<OptimizedImage
											src={`/profile-images/${postData.primary_author?.name}.png`}
											className="w-full h-full rounded-[50%]"
											alt={postData.primary_author?.name}
											width={200}
											height={200}
										/>
									</div>
									<div>
										<h5 className="font-medium text-[#666] text-12 md-old:text-14 leading-[16px]">{postData.primary_author?.name}</h5>
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
													<OptimizedImage
														src={`/profile-images/${author?.name}.png`}
														className="w-full rounded-[50%]"
														alt={author?.name}
														width={200}
														height={200}
													/>
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
		</motion.div>
	);
}
