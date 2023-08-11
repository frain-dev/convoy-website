// import Image from 'next/image';

type ImageProps = {
	src: any;
	alt: string;
};

export default function DocImage({ src, alt }: ImageProps) {
	return (
		<div className="relative rounded-12px border border-primary-50 my-50px h-fit">
			<img src={src} alt={alt} className="rounded-12px" />
			{/* <Image src={src} alt={alt} className="rounded-12px w-full h-full" layout="fill" objectFit="cover" /> */}
		</div>
	);
}
