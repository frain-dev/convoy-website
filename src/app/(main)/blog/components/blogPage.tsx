'use client';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '@/lib/formatDate';
import Post from './post';
import authors from '../../../data/authors.json';
import GetStarted from '@/app/components/GetStarted';

export default function BlogPage({ posts, blogData, children }: any) {
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

	return (
		<div className="m-auto pt-200px mobile:pt-150px max-w-[1300px] w-full">
			<div className="flex items-start flex-wrap nav-bar-break:flex-nowrap justify-between">
				<div className="nav-bar-break:max-w-[770px] w-full px-20px desktop-min:p-0">
					{!blogData.isError && (
						<>
							<div className="flex w-full flex-col desktop:flex-row desktop:items-center desktop:justify-between">
								<div className="font-medium text-12 text-gray-500">
									<Link href="/blog">Blog</Link>

									<span className="mx-16px">|</span>
									<span className="text-primary-400 text-12">{blogData.primary_tag}</span>
								</div>

								<div className="text-12 flex items-center mt-16px desktop:mt-0 text-gray-500">
									{blogData.readTime} min read
									<span className="mx-6px mb-2px">
										<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx="2" cy="2" r="2" fill="#737A91" />
										</svg>
									</span>
									{formatDate(blogData.published_at)}
								</div>
							</div>

							<div className="h-[1px] w-full bg-gray-200 my-36px"></div>
						</>
					)}

					<h3 className="font-bold text-gray-800 mt-16px mb-40px desktop:mt-30px desktop:mb-26px desktop:text-[34px] desktop:leading-[58px]">{blogData.title}</h3>

					{!blogData.isError && (
						<div className="flex flex-wrap items-end justify-between mb-30px">
							<div>
								<p className="mb-8px text-12 text-grey-80">Share to:</p>
								<ul className="flex">
									<li className="w-32px h-32px bg-grey-80 bg-opacity-10 flex items-center justify-center rounded-[50%] mr-16px">
										<Link
											href={`${
												'https://twitter.com/intent/tweet/?text=' +
												blogData.title +
												'%20from%20@getconvoy&url=https://getconvoy.io/blog/' +
												blogData.slug +
												'&via=getconvoy'
											}`}>
											<img src="/svg/twitter-grey-icon.svg" alt="twitter logo" />
										</Link>
									</li>

									<li className="w-32px h-32px bg-grey-80 bg-opacity-10 flex items-center justify-center rounded-[50%]">
										<Link href={`${'https://www.linkedin.com/sharing/share-offsite/?mini=true&url=https://getconvoy.io/blog/' + blogData.slug + ''}`}>
											<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M11.7617 1.66682H2.61951C2.51674 1.66541 2.4147 1.68402 2.31921 1.72159C2.22372 1.75915 2.13665 1.81494 2.06298 1.88576C1.98931 1.95658 1.93048 2.04105 1.88985 2.13435C1.84922 2.22764 1.82758 2.32793 1.82617 2.42949V11.5708C1.82758 11.6724 1.84922 11.7727 1.88985 11.866C1.93048 11.9593 1.98931 12.0437 2.06298 12.1145C2.13665 12.1854 2.22372 12.2412 2.31921 12.2787C2.4147 12.3163 2.51674 12.3349 2.61951 12.3335H11.7617C11.8645 12.3349 11.9665 12.3163 12.062 12.2787C12.1575 12.2412 12.2446 12.1854 12.3183 12.1145C12.3919 12.0437 12.4508 11.9593 12.4914 11.866C12.532 11.7727 12.5537 11.6724 12.5551 11.5708V2.42949C12.5537 2.32793 12.532 2.22764 12.4914 2.13435C12.4508 2.04105 12.3919 1.95658 12.3183 1.88576C12.2446 1.81494 12.1575 1.75915 12.062 1.72159C11.9665 1.68402 11.8645 1.66541 11.7617 1.66682ZM5.08046 10.5948H3.46141V5.79482H5.08046V10.5948ZM4.27093 5.12282C4.04765 5.12282 3.83351 5.03517 3.67562 4.87913C3.51773 4.7231 3.42903 4.51148 3.42903 4.29082C3.42903 4.07016 3.51773 3.85854 3.67562 3.70251C3.83351 3.54648 4.04765 3.45882 4.27093 3.45882C4.3895 3.44553 4.50957 3.45714 4.62328 3.49289C4.73699 3.52864 4.84178 3.58772 4.93078 3.66627C5.01978 3.74481 5.091 3.84105 5.13975 3.94868C5.18851 4.05631 5.21372 4.1729 5.21372 4.29082C5.21372 4.40874 5.18851 4.52534 5.13975 4.63296C5.091 4.74059 5.01978 4.83683 4.93078 4.91538C4.84178 4.99392 4.73699 5.053 4.62328 5.08875C4.50957 5.1245 4.3895 5.13611 4.27093 5.12282ZM10.9198 10.5948H9.30078V8.01882C9.30078 7.37349 9.06871 6.95216 8.48046 6.95216C8.2984 6.95347 8.12113 7.0099 7.97253 7.11385C7.82393 7.21779 7.71113 7.36425 7.64935 7.53349C7.60711 7.65884 7.58881 7.79086 7.59538 7.92282V10.5895H5.97633C5.97633 10.5895 5.97633 6.22682 5.97633 5.78949H7.59538V6.46682C7.74246 6.21461 7.95638 6.00683 8.21409 5.86586C8.47181 5.72489 8.76356 5.65608 9.05792 5.66682C10.1373 5.66682 10.9198 6.35482 10.9198 7.83216V10.5948Z"
													fill="#737A91"
												/>
											</svg>
										</Link>
									</li>
								</ul>
							</div>

							{blogData.hackernews && (
								<a
									href={blogData.hackernews}
									target="_blank"
									className="rounded-22px bg-primary-25 flex items-center gap-4px py-8px px-10px text-gray-800 text-10 desktop:text-14">
									<Image src="/svg/y-combinator.svg" width={16} height={16} className="w-16px" alt="y-combinator" />
									Discuss on HackerNews
								</a>
							)}
						</div>
					)}

					<div className="mb-130px">
						<main className="nav-bar-break:max-w-[770px] w-full">{children}</main>
					</div>
				</div>

				<div className="px-20px desktop-min:p-0 nav-bar-break:max-w-[375px] sticky desktop-min:top-200px desktop:top-128px nav-bar-break:pl-50px nav-bar-break:border-l border-gray-200">
					{!blogData.isError && (
						<>
							<p className="text-14 text-gray-500 mb-24px">Written By</p>

							<div className="flex flex-col gap-16px mb-50px">
								{blogData.primary_author && !blogData.authors && (
									<a
										target="_blank"
										href={`${getPrimaryAuthor()?.twitter ? 'http://twitter.com/' + getPrimaryAuthor()?.twitter : ''}`}
										className="flex items-start">
										<div className="w-40px h-40px rounded-50% mr-16px overflow-hidden flex items-center bg-grey-20">
											<img src={`/profile-images/${getPrimaryAuthor()?.name}.png`} className="w-full h-full mr-12px rounded-[50%]" alt={getPrimaryAuthor()?.name} />
										</div>
										<div>
											<h6 className="font-semibold text-gray-600 mb-2px text-12">{getPrimaryAuthor()?.name}</h6>
											<p className="font-normal text-10 mb-6px text-gray-500">{getPrimaryAuthor()?.role}</p>
										</div>
									</a>
								)}
								{getAuthors().map((author, i) => (
									<a key={i} target="_blank" href={`${author?.twitter ? 'http://twitter.com/' + author?.twitter : ''}`} className="flex items-start">
										<div className="w-40px h-40px rounded-50% mr-16px overflow-hidden flex items-center bg-grey-20">
											<img src={`/profile-images/${author?.name}.png`} className="w-full h-full mr-12px rounded-[50%]" alt={author?.name} />
										</div>
										<div>
											<h6 className="font-semibold text-gray-600 text-12">{author.name}</h6>
											<p className="font-normal text-10 mb-6px text-gray-500">{author.role}</p>
										</div>
									</a>
								))}
							</div>
						</>
					)}

					<p className="text-14 text-gray-500 mb-24px">More Posts</p>

					<div className="flex flex-row flex-wrap gap-48px">
						{posts.map((post, i) => (
							<Post
								type="collapsed"
								postData={post}
								key={i}
								className="max-w-[340px] w-full nav-bar-break:first-of-type:border-b first-of-type:border-gray-200 nav-bar-break:first-of-type:pb-20px"></Post>
						))}
					</div>
				</div>
			</div>

			<GetStarted></GetStarted>
		</div>
	);
}
