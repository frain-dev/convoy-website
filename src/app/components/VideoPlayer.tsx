import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const VideoPlayer: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [hasStartedOnce, setHasStartedOnce] = useState(false);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
				setShowControls(true);
				setHasStartedOnce(true);
			}
		}
	};

	useEffect(() => {
		const videoElement = videoRef.current;
		if (videoElement) {
			const handlePlay = () => {
				setIsPlaying(true);
				setShowControls(true);
			};
			const handlePause = () => {
				setIsPlaying(false);
				setShowControls(false);
			};
			const handleEnded = () => {
				setIsPlaying(false);
				setShowControls(false);
			};

			videoElement.addEventListener('play', handlePlay);
			videoElement.addEventListener('pause', handlePause);
			videoElement.addEventListener('ended', handleEnded);

			return () => {
				videoElement.removeEventListener('play', handlePlay);
				videoElement.removeEventListener('pause', handlePause);
				videoElement.removeEventListener('ended', handleEnded);
			};
		}
	}, []);

	return (
		<div className="w-full shadow-video bg-white-100 border border-[#e7e7e7] rounded-8px h-[250px] desktop:h-[600px] flex items-center justify-center relative overflow-hidden">
			<motion.div
				className="w-full h-full bg-[#000] absolute top-0 left-0"
				initial={{ opacity: 0.5 }}
				animate={{ opacity: isPlaying ? 0 : 0.5 }}
				transition={{ duration: 0.5 }}
			/>

			<video ref={videoRef} controls={showControls} loop playsInline width={1080} height={1080} className="h-full w-full rounded-[8px] bg-contain bg-center object-cover">
				<source src="/videos/Demo.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<AnimatePresence>
				{!isPlaying && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="absolute inset-0 flex items-center justify-center">
						<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handlePlayPause}>
							<Image src="/svg/play-button.svg" alt="Play video" width={80} height={80} className="cursor-pointer w-60px desktop:w-max" />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default VideoPlayer;
