type ImageProps = {
	src: any;
	alt: string;
};

export default function DocImage({ src, alt }: ImageProps) {
	return <img src={src} alt={alt} className="rounded-12px border border-primary-50 my-50px" />;
}
