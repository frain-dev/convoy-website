import Link from 'next/link';

export default function Home() {
	const topics = [
		{ name: 'Authentication & Authorization', path: 'authorization-and-authentication', index: 1 },
		{ name: 'Pagination', path: 'pagination', index: 2 },
		{ name: 'Idempotency', path: 'idempotency', index: 3 },
		{ name: 'Rate Limiting', path: 'rate-limiting', index: 4 },
		{ name: 'Webhooks', path: 'webhooks', index: 5 },
		{ name: 'OpenAPI', path: 'openapi', index: 6 },
		{ name: 'Versioning', path: 'versioning', index: 7 }
	];

	return (
		<main>
			<section className="max-w-[1248px] px-20px m-auto min-h-screen pt-142px">
				<div className="flex justify-between">
					<div className="max-w-[440px] flex flex-col gap-12px text-neutral-1">
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

					<div className="w-full flex flex-col-reverse items-end group relative">
						{topics.reverse().map((topic, i) => (
							<div
								key={i}
								className={`transition-all ease-in-out duration-300 group-hover:cursor-pointer group-hover:left-80px ${
									i > 0 ? 'desktop-min:-mb-210px desktop:-mb-130px' : ''
								}`}>
								<Link href={`/api/${topic.path}`}>
									<div
										className={`desktop-min:w-[440px] desktop:w-340px border border-white-24 bg-white-16 backdrop-blur-sm desktop-min:h-280px desktop:h-200px p-12px rounded-12px flex items-end justify-between text-neutral-2 font-sometype w-full text-24`}>
										<div className="uppercase max-w-[220px]">{topic.name}</div>
										<div className="">{topic.index > 9 ? topic.index : `0${topic.index}`}</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
