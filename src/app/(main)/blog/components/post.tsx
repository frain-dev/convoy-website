'use client';
import Link from 'next/link';
import { useState } from 'react';
import authors from '../../../data/authors.json';

export default function Post({ postData, type, className }: any) {
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
		<>
			<div className={`w-full ${type === 'collapsed' ? '' : 'bg-white-100 rounded-12px p-10px shadow-card'} ${className}`}>
				<div className="rounded-4px mb-20px w-full overflow-hidden backdrop-blur-[3.4767px] h-fit max-h-[170px]">
					<img
						src={showFallBackImg ? '/static/convoy.png' : `/post-images/${postData.post_image}`}
						onError={() => setShowFallBackImg(true)}
						className="rounded-4px w-full -z-10"
						alt="post image"
					/>
				</div>
				<div className="rounded-2px font-medium text-14 text-primary-400 uppercase">{postData.tag}</div>

				<div className={`flex flex-col ${type === 'collapsed' ? '' : 'min-h-[220px] px-10px desktop:px-16px'}`}>
					<Link href={`/blog/${postData.slug}`}>
						<h3 className="text-20 font-bold mb-24px overflow-hidden text-ellipsis">{postData.title}</h3>
					</Link>
					{type !== 'collapsed' && <p className="text-14 leading-7 font-light text-gray-500 mb-20px h-120px overflow-hidden text-ellipsis">{postData.description}</p>}
				</div>

				<div className={`mt-18px mb-26px flex justify-between items-end flex-wrap gap-20px ${type === 'collapsed' ? '' : 'px-10px desktop:px-16px'}`}>
					<div className="flex items-end">
						{postData.primary_author && !postData.authors && (
							<a
								href={`${getPrimaryAuthor()?.twitter ? 'http://twitter.com/' + getPrimaryAuthor()?.twitter : ''}`}
								target="_blank"
								className="flex items-start desktop:mb-[unset]">
								<div className="w-40px h-40px rounded-50% mr-16px overflow-hidden flex items-center bg-grey-20">
									<img src={`/profile-images/${getPrimaryAuthor()?.name}.png`} className="w-full mr-12px rounded-[50%]" alt={getPrimaryAuthor()?.name} />
								</div>
								<div>
									<h5 className="font-medium text-gray-800 text-14">{getPrimaryAuthor()?.name}</h5>
									<p className="text-12 text-gray-600">{getPrimaryAuthor()?.role}</p>
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
										+{postData.authors.length - 2}
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

					<Link href={`/blog/${postData.slug}`} className="flex items-center text-primary-400 font-medium text-12">
						Read More
						<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-6px">
							<path
								d="M7.61289 16.2357L6.98548 15.5963C6.81939 15.4271 6.72607 15.1975 6.72607 14.9581C6.72607 14.7188 6.81939 14.4892 6.98548 14.32L10.7352 10.5013L6.98622 6.68155C6.90392 6.59774 6.83864 6.49822 6.7941 6.38868C6.74955 6.27914 6.72663 6.16174 6.72663 6.04317C6.72663 5.9246 6.74955 5.8072 6.7941 5.69766C6.83864 5.58813 6.90392 5.48861 6.98622 5.40479L7.61363 4.76547C7.69592 4.68132 7.7937 4.61456 7.90136 4.569C8.00903 4.52345 8.12446 4.5 8.24104 4.5C8.35761 4.5 8.47304 4.52345 8.58071 4.569C8.68837 4.61456 8.78615 4.68132 8.86844 4.76547L13.8667 9.86199C14.0328 10.0313 14.1261 10.2608 14.1261 10.5002C14.1261 10.7396 14.0328 10.9691 13.8667 11.1384L8.86549 16.2357C8.69938 16.4049 8.4741 16.5 8.23919 16.5C8.00429 16.5 7.779 16.4049 7.61289 16.2357Z"
								fill="#477DB3"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</>
	);
}
