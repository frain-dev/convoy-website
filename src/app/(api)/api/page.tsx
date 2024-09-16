import Link from 'next/link';

export default function Home() {
	const topics = [
		{ name: 'Authentication & Authorization', path: 'authorization-and-authentication', class: 'desktop:group-hover:mr-0', index: 1 },
		{ name: 'Pagination', path: 'pagination', class: 'desktop:group-hover:mr-40px', index: 2 },
		{ name: 'Idempotency', path: 'idempotency', class: 'desktop:group-hover:mr-80px', index: 3 },
		{ name: 'Rate Limiting', path: 'rate-limiting', class: 'desktop:group-hover:mr-120px', index: 4 },
		{ name: 'Webhooks', path: 'webhooks', class: 'desktop:group-hover:mr-160px', index: 5 },
		{ name: 'OpenAPI', path: 'openapi', class: 'desktop:group-hover:mr-200px', index: 6 },
		{ name: 'Versioning', path: 'versioning', class: 'desktop:group-hover:mr-240px', index: 7 }
	];

	return (
		<main>
			<section className="max-w-[1248px] px-20px m-auto min-h-screen pt-120px">
				<div className="flex flex-wrap-reverse desktop:flex-nowrap gap-24px justify-between">
					<div className="desktop:max-w-[440px] flex flex-col gap-12px text-neutral-1">
						<h2 className=" font-semibold text-32">APIs & Webhooks - The Definitive Guide</h2>
						<p className="text-16 text-justify">
							Let's introduce the subject. APIs have come a long way in revolutionizing how software systems communicate and share data. In today's digital landscape,
							they serve as the backbone of modern software development, enabling seamless integration between diverse applications and services.
						</p>
						<p className="text-16 text-justify">
							This guide delves into essential aspects of API design, implementation, and management. We focus on best practices that ensure robustness, scalability,
							and security, covering key topics crucial for building and maintaining high-quality APIs.
						</p>
						<p className="text-16 text-justify">
							Through practical examples and real-world scenarios, we'll equip you with the knowledge to create developer-friendly APIs. Whether you're a seasoned
							developer or just starting, this book will prepare you to meet the demands of today's interconnected world and the challenges of tomorrow.
						</p>
					</div>

					<div className="flex flex-col-reverse items-end group relative tab-min:gap-12px tab-min:w-full">
						{topics.reverse().map((topic, i) => (
							<div
								key={i}
								className={`desktop-min:w-[440px] desktop:w-340px tab-min:w-full transition-all ease-in-out duration-500 group-hover:cursor-pointer ${
									topic.class
								} ${i > 0 ? 'desktop-min:-mb-210px desktop:-mb-130px' : ''}`}>
								<Link href={`/api/${topic.path}`}>
									<div
										className={`border border-white-24 bg-white-16 backdrop-blur-sm desktop-min:h-280px desktop:h-200px p-12px rounded-12px flex items-end justify-between text-neutral-2 font-sometype w-full text-24`}>
										<div className="uppercase max-w-[220px]">{topic.name}</div>
										<div className="">{topic.index > 9 ? topic.index : `0${topic.index}`}</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className="text-14 desktop:text-16 flex items-center gap-12px my-120px">
					<span className="text-white-40">Contributors</span>
					<span className="text-white-80">Subomi Oluwalana</span>
					<span className="text-white-80">Raymond Tukpe</span>
				</div>
			</section>
		</main>
	);
}
