'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
	src: StaticImageData | string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	priority?: boolean;
	sizes?: string;
}

export function OptimizedImage({ src, alt, width, height, className, priority = false, sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' }: OptimizedImageProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			priority={priority}
			sizes={sizes}
			className={cn('duration-700 ease-in-out', isLoading ? 'blur-[1px]' : 'blur-0', className)}
			onLoadingComplete={() => setIsLoading(false)}
			quality={90}
		/>
	);
}
