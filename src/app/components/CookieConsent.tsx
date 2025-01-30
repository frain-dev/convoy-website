'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
	interface Window {
		gtag?: (command: string, action: string, options: { event_category?: string; event_label?: string; page_path?: string }) => void;
		dataLayer?: Object[];
	}
}

export default function CookieConsent() {
	const [showConsent, setShowConsent] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			setShowConsent(true);
			window.gtag?.('consent', 'default', {
				analytics_storage: 'denied'
			} as any);
		}
	}, []);

	const handleConsent = (accepted: boolean) => {
		localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'declined');
		window.gtag?.('consent', 'update', {
			analytics_storage: accepted ? 'granted' : 'denied'
		} as any);
		setShowConsent(false);
	};

	return (
		<AnimatePresence>
			{showConsent && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className="fixed bottom-4 right-4 max-w-sm bg-white-100 p-4 rounded-[10px] shadow-card z-50 border border-gray-200">
					<div className="flex flex-col gap-3">
						<div className="flex justify-between items-start">
							<p className="text-sm text-gray-600">We use cookies to improve your experience.</p>
							<button onClick={() => handleConsent(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>
						<div className="flex justify-end gap-[16px]">
							<button
								onClick={() => handleConsent(false)}
								className="px-[8px] py-[10px] text-[14px] h-[40px] font-semibold rounded-[8px] bg-white-100 text-[#000] flex items-center justify-center border-[#E7E7E7] border hover:bg-[#e7e7e7] group transition-all duration-300 shadow-btn gap-2 w-full sm-old:w-max">
								Decline
							</button>
							<button
								onClick={() => handleConsent(true)}
								className="pl-[14px] pr-[12px] py-[10px] text-[14px] font-semibold rounded-[8px] h-10 bg-[#2780F1] hover:bg-[#1f66c1] group transition-all duration-300 text-white-100 flex items-center justify-center w-full sm-old:w-max">
								Accept
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
