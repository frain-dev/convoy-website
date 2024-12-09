export default function GetStarted() {
	return (
		<section className="w-full flex items-center justify-center px-5">
			<div className="mb-100px desktop:mb-130px desktop:max-w-[800px] w-full h-auto desktop:h-[217px] bg-white-100 border border-[#ebebeb] flex mx-auto rounded-16px overflow-hidden">
				<div className="w-[90px] desktop:w-[197px] min-h-full bg-gradient-to-r from-white-100/40 from-[-20%] to-[#2780F1]/40 to-[150%] rounded-l-16px relative p-6 desktop:p-10">
					<div className="bg-[linear-gradient(to_right,#E7E7E74D_1px,transparent_1px),linear-gradient(to_bottom,#E7E7E74D_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] absolute top-0 right-0 w-full h-full"></div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="z-10 w-10 h-10 desktop:w-16 desktop:h-16">
						<path
							d="M20 6C11.1875 6 4 13.1875 4 22C4 27.8984 7.22656 33.0391 12 35.8125V54H56V14H46V12H42V14H33.8125C31.0391 9.22656 25.8984 6 20 6ZM20 10C26.6484 10 32 15.3516 32 22C32 28.6484 26.6484 34 20 34C13.3516 34 8 28.6484 8 22C8 15.3516 13.3516 10 20 10ZM18 14V23.125L14.5625 26.5625L17.4375 29.4375L21.4375 25.4375L22 24.8125V14H18ZM35.4375 18H42V20H46V18H52V22H36C36 20.6094 35.7734 19.2891 35.4375 18ZM35.4375 26H52V50H16V37.4375C17.2891 37.7734 18.6094 38 20 38C27.4219 38 33.6406 32.875 35.4375 26ZM36 34V38H40V34H36ZM44 34V38H48V34H44ZM20 42V46H24V42H20ZM28 42V46H32V42H28ZM36 42V46H40V42H36ZM44 42V46H48V42H44Z"
							fill="black"
						/>
					</svg>
				</div>

				<div className="gap-6 desktop:gap-2 flex flex-col justify-between items-start desktop:items-end px-5 desktop:px-10 py-4 desktop:py-6">
					<div className="flex flex-col gap-2">
						<h3 className="text-20 desktop:text-32 font-semibold">Getting started with Convoy</h3>
						<p className="text-12 desktop:text-16 text-[#666] font-normal leading-[160%] w-full desktop:w-[523px]">
							Want to add webhooks to your API in minutes? Sign up to get started.
						</p>
					</div>

					<a
						href="https://cloud.getconvoy.io"
						className="desktop:px-16px py-10px w-[107px] text-14 font-medium rounded-8px h-10 nav-bar-break:h-11 bg-white-100 desktop:bg-[#2780F1] text-[#2780F1] desktop:text-white-100 flex items-center desktop:shadow-btn-secondary cursor-pointer">
						<span>Sign up</span>

						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" className="ml-1 mt-[1px] fill-[#2780F1] desktop:fill-white-100">
							<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
