import Image from 'node_modules/next/image';
import ArrowRightIcon from '../../../public/svg/arrow-right-icon.svg';

export default function GetStarted() {
	return (
		<section className="px-20px pb-100px desktop:pb-130px">
			<div className="mt-100px desktop:mt-130px max-w-[1000px] w-full m-auto bg-[url(/static/cta.png)] bg-no-repeat bg-cover bg-top bg-blend-normal bg-[#422F41] rounded-16px py-56px px-20px">
				<h1 className="text-32 text-white-100 font-bold tracking-[0.02em] text-center mb-24px max-w-[562px] m-auto">Start sending and receiving webhooks now, risk free</h1>
				<p className="text-center text-14 leading-7 text-white-100 max-w-[806px] m-auto">
					Convoy provides you with fast, secure and reliable webhooks infrastructure so you can focus on building the actual tech. Save yourself some engineering time and
					get started today.
				</p>
				<a
					target="_blank"
					href="https://github.com/frain-dev/convoy#installation-getting-started"
					className="bg-primary-400 m-auto text-white-100 whitespace-nowrap text-12 font-semibold flex items-center py-12px px-24px rounded-8px mt-40px w-fit">
					Get started
					<Image src={ArrowRightIcon} className="ml-12px w-12px" alt="arrow right" />
				</a>
			</div>
		</section>
	);
}
