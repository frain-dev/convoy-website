'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FeaturedPost from '../blog/components/featuredPost';

export default function BlogSlide({ featurePosts }: any) {
	const [count, setCount] = useState(0);
	const pathname = usePathname();
	const startCarousel = () => {
		setInterval(() => {
			setCount(count < featurePosts.length - 1 ? count + 1 : 0);
		}, 10000);
	};

	useEffect(() => {
		startCarousel();
	}, []);

	const showSlide = () => {
		const routes = ['enterprise', 'cloud', 'docs', 'blog'];
		return routes.some(route => pathname.includes(route));
	};

	return (
		<section>
			{!showSlide() && (
				<div className="bg-gradient-to-br from-[#2c2f3e] to-[#422f41] desktop:p-80px p-40px" v-if="!showBlogSection">
					<div className="flex overflow-hidden">
						{featurePosts.map((post, i) => (
							<div
								key={i}
								className={`min-h-[460px] flex justify-center w-full transition-all duration-1000 ease-in-out ${
									count === i ? 'animate-slideup block opacity-100 ' : 'animate-slidedown hidden opacity-0'
								}`}>
								<FeaturedPost postData={post}></FeaturedPost>
							</div>
						))}
					</div>
					<div className="flex justify-center pt-52px">
						{featurePosts.map((post, i) => (
							<button
								key={i}
								onClick={() => setCount(i)}
								className={`w-32px h-4px rounded-[20px] mr-14px bg-[#5F4C62] relative before:absolute before:h-4px before:rounded-[20px] before:-mt-2px before:-ml-16px ${
									count === i
										? 'before:w-32px before:bg-[#8E7392] before:transition-all before:duration-[9s]'
										: 'before:bg-transparent before:w-[1px] before:transition-none'
								}`}></button>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
