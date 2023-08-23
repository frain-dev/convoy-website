'use client';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '../../../lib/formatDate';

export default function BlogPage({ blogData, children }: any) {
	console.log(blogData);
	return (
		<div className="m-auto px-0 pt-200px">
			<div className="max-w-[780px] w-full m-auto px-20px desktop:p-0">
				<div className="flex w-full flex-col desktop:flex-row desktop:items-center desktop:justify-between">
					<div className="font-medium text-14 text-grey-80">
						<Link href="/blog">Blog</Link>

						<span className="mx-16px">|</span>
						<span className="text-primary-400">{blogData.primary_tag}</span>
					</div>

					<div className="font-medium text-14 flex items-center mt-16px desktop:mt-0">
						{blogData.readTime} min read
						<span className="mx-6px mb-2px">
							<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="2" cy="2" r="2" fill="#737A91" />
							</svg>
						</span>
						{formatDate(blogData.published_at)}
					</div>
				</div>

				<h3 className="font-bold text-black mt-16px mb-40px desktop:mt-30px desktop:mb-26px desktop:text-[48px] desktop:leading-[58px]">{blogData.title}</h3>

				<div className="flex items-end justify-between mb-56px desktop:mb-44px" v-if="blogData.slug !== '404'">
					<Link href={`${blogData.primary_author.twitter ? 'http://twitter.com/' + blogData.primary_author.twitter : ''}`} className="flex items-start">
						<div className="w-40px h-40px rounded-[50%] mr-16px overflow-hidden flex items-center bg-[#f5f5f5]">
							<Image src={`/profile-images/${blogData.primary_author.name}.png`} width={42} height={42} className="rounded-100px mr-12px" alt="author image" />
						</div>
						<div>
							<h6 className="font-semibold text-primary-400 mb-2px">{blogData.primary_author.name}</h6>
							<p className="font-normal text-14 mb-6px text-grey-80">{blogData.primary_author.meta_title} Convoy</p>
						</div>
					</Link>

					<div>
						<p className="mb-8px text-14 text-grey-80">Share to:</p>
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
									<img src="/svg/linkedin-grey-icon.svg" alt="linkedin logo" />
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="mb-130px">
					<main className="max-w-[780px] w-full">{children}</main>
				</div>
			</div>
		</div>
	);
}
