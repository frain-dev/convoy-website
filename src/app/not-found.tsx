import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-[calc(100vh-100px)] flex items-center justify-center pt-100px desktop:pt-150px pb-50px">
			<div className="px-10px xs-old:px-20px flex items-center flex-col max-w-[1180px] w-full">
				<h1 className="desktop:text-center font-medium text-[18px] desktop:text-[20px] mb-2 desktop:max-w-[683px] text-[#2780F1]">404</h1>
				<h2 className="desktop:text-center font-medium text-[32px] desktop:text-[40px] mb-6 desktop:max-w-[683px]">Page not found</h2>
				<p className="text-center text-[#666] text-[16px] desktop:max-w-[683px] m-auto mb-6 desktop:font-medium">
					The page you're looking for doesn't exist or has been moved.
				</p>

				<div className="flex flex-wrap gap-16px mt-4 desktop:mt-0 mb-56px desktop:items-center desktop:justify-center">
					<Link
						target="_blank"
						href="/"
						className="pl-14px pr-12px py-10px text-14 font-semibold rounded-8px h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center justify-center w-full sm-old:w-max">
						<span>Go back Home</span>

						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px] group-hover:translate-x-[2px] transition-all">
							<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="white" />
						</svg>
					</Link>
				</div>
			</div>
		</main>
	);
}
