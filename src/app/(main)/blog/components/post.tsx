'use client';
import Link from 'next/link';
import { useState } from 'react';
import authors from '../../../data/authors.json';
import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import { OptimizedImage } from '@/app/components/OptimizedImaged';

export default function Post({ postData, type, className, index }: any) {
	const getGradientColor = (index: number) => {
		const colors = ['#2780F1', '#F18527', '#27F185', '#AE27F1', '#F1B527'];
		return colors[index % colors.length];
	};

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
		<>
			<div className={`w-full ${type === 'collapsed' ? '' : 'bg-white-100 border border-[#E7E7E7] rounded-8px p- 16px shadow-card'} ${className}`}>
				<div
					className="w-full min-h-[160px] border-b  rounded-t-8px p-20px flex flex-col justify-between relative overflow-hidden"
					style={{
						background: `linear-gradient(to top, ${getGradientColor(index)}26, #FFFFFF)`
					}}>
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] absolute top-0 right-0 w-full h-full pointer-events-none"></div>

					<Link href={`/blog/${postData.slug}`} className="z-10">
						<h3
							className={`font-semibold z-10 mb -48px overflow-hidden text-ellipsis text-[#000] desktop:w-[320px] ${
								type === 'collapsed' ? 'text-16' : 'text-18 md-old:text-20 leading-[140%] md-old:leading-[28px]'
							}`}>
							{postData.title}
						</h3>
					</Link>

					<div className="font-medium text-12 text-[#666] leading-[16px] z-10 mt-3">{formatDate(postData.published_at)}</div>
				</div>

				<div className={`flex flex-col pt-5 px-5 ${type === 'collapsed' ? '' : 'sm-old:min-h-[200px]'}`}>
					{type !== 'collapsed' && (
						<p
							className="text-12 md-old:text-14 leading-[160%] text-[#666] mb-40px sm-old:mb-20px 
      line-clamp-5 display-[-webkit-box] -webkit-box-orient-vertical overflow-hidden">
							{postData.description}
						</p>
					)}
				</div>

				<div className={`mb-26px  flex justify-between items-end flex-wrap gap-20px ${type === 'collapsed' ? '' : 'px-20px desktop:px-20px'}`}>
					<div className="flex items-end">
						{postData.primary_author && !postData.authors && (
							<a
								href={`${postData.primary_author?.twitter ? 'http://twitter.com/' + postData.primary_author?.twitter : postData.primary_author?.linkedIn || getPrimaryAuthor()?.linkedIn || ''}`}
								target="_blank"
								className="flex items-start desktop:mb-[unset]">
								<div className="w-32px h-32px rounded-50% mr-8px overflow-hidden flex items-center">
									<OptimizedImage
										src={`/profile-images/${postData.primary_author?.name}.png`}
										className="w-full h-full rounded-[50%] object-cover"
										alt={postData.primary_author?.name}
										width={200}
										height={200}
									/>
								</div>
								<div>
									<h5 className="font-semibold text-[#666] text-12 md-old:text-14 leading-[16px]">{postData.primary_author?.name}</h5>
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
		</>
	);
}
