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
											<img src="/static/linkedin.png" alt="linked in logo" className="h-12px" />
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
											<img src={`/profile-images/${getPrimaryAuthor()?.name}.png`} className="w-full mr-12px rounded-[50%]" alt={getPrimaryAuthor()?.name} />
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
											<img src={`/profile-images/${author?.name}.png`} className="w-full mr-12px rounded-[50%]" alt={author?.name} />
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
