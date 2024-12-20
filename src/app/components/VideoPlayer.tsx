import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [showOverlay, setShowOverlay] = useState(true);

	const baseYoutubeUrl = 'https://www.youtube.com/embed/ZPUQH2CUJdo?controls=0&rel=0&modestbranding=1&showinfo=0';
	const playingYoutubeUrl = 'https://www.youtube.com/embed/ZPUQH2CUJdo?autoplay=1&rel=0&modestbranding=1&showinfo=0';

	const handlePlayClick = () => {
		setShowOverlay(false);
		// Small delay to allow overlay to fade out before video starts
		setTimeout(() => {
			setIsPlaying(true);
		}, 500);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 5 }}
			whileInView={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 1.5,
					delay: 0.2,
					ease: [0.44, 0, 0, 1]
				}
			}}
			viewport={{
				amount: 'some',
				once: true
			}}
			className="w-full hidde shadow-video bg-white-100 border border-[#e7e7e7] rounded-8px h-[250px] desktop:h-[600px] flex items-center justify-center relative overflow-hidden">
			<AnimatePresence>
				{showOverlay && (
					<motion.div className="absolute inset-0 z-10" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
						<motion.div
							onClick={handlePlayClick}
							className="cursor-pointer w-full h-full bg-[#000] absolute top-0 left-0"
							initial={{ opacity: 0.5 }}
							animate={{ opacity: 0.75 }}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<iframe
				width="100%"
				height="100%"
				src={isPlaying ? playingYoutubeUrl : baseYoutubeUrl}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className="rounded-[8px] w-full h-full aspect-video object-cover"
			/>
		</motion.div>
	);
};

export default VideoPlayer;
