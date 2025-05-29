'use client';

import { useEffect, useState } from 'react';

interface RegionOption {
	name: string;
	flag: string;
	url: string;
}

interface RegionDropdownProps {
	buttonText: string;
	baseUrl: string;
	className?: string;
	variant?: 'primary' | 'secondary' | 'office-hours';
	isExternalDomain?: boolean; // For special cases like playground.getconvoy.io
}

export default function RegionDropdown({ 
	buttonText, 
	baseUrl, 
	className = '', 
	variant = 'secondary',
	isExternalDomain = false 
}: RegionDropdownProps) {
	const [showDropdown, setShowDropdown] = useState(false);

	const regionOptions: RegionOption[] = [
		{ 
			name: 'US Region', 
			flag: '🇺🇸', 
			url: isExternalDomain ? `https://us.${baseUrl}` : `https://us.getconvoy.cloud${baseUrl}` 
		},
		{ 
			name: 'EU Region', 
			flag: '🇪🇺', 
			url: isExternalDomain ? `https://eu.${baseUrl}` : `https://eu.getconvoy.cloud${baseUrl}` 
		}
	];

	const handleRegionSelect = (url: string) => {
		window.open(url, '_blank');
		setShowDropdown(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (showDropdown) {
				const target = event.target as Element;
				if (!target.closest('.region-dropdown')) {
					setShowDropdown(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showDropdown]);

	const getButtonStyles = () => {
		const baseStyles = "font-medium rounded-8px group transition-all duration-300 flex items-center justify-center";
		
		switch (variant) {
			case 'primary':
				return `${baseStyles} px-12px py-10px text-14 h-10 nav-bar-break:bg-[#2780F1] hover:nav-bar-break:bg-[#1f66c1] nav-bar-break:text-white-100 text-[#2780F1]`;
			case 'office-hours':
				return `${baseStyles} desktop:px-16px py-10px w-auto text-14 h-10 nav-bar-break:h-11 bg-white-100 desktop:bg-[#2780F1] text-[#2780F1] hover:desktop:bg-[#1f66c1] desktop:text-white-100 desktop:shadow-btn-secondary cursor-pointer`;
			default: // secondary
				return `${baseStyles} nav-bar-break:px-16px py-10px text-14 mr-16px h-[40px] nav-bar-break:bg-white-100 hover:nav-bar-break:bg-[#e7e7e7] nav-bar-break:text-[#000] text-[#2780F1] nav-bar-break:border-[#E7E7E7] nav-bar-break:border nav-bar-break:shadow-btn`;
		}
	};

	const getArrowColor = () => {
		if (variant === 'office-hours') {
			return 'fill-[#2780F1] desktop:fill-white-100';
		}
		return variant === 'primary' ? 'white' : 'currentColor';
	};

	const getArrowClasses = () => {
		if (variant === 'office-hours') {
			return `ml-1 mt-[1px] fill-[#2780F1] desktop:fill-white-100 transition-all ${showDropdown ? 'rotate-90' : 'group-hover:translate-x-[2px]'}`;
		}
		return `hidden nav-bar-break:block ml-1 mt-[1px] transition-all ${showDropdown ? 'rotate-90' : 'group-hover:translate-x-[2px]'}`;
	};

	return (
		<div className={`relative region-dropdown ${className}`}>
			<button
				onClick={() => setShowDropdown(!showDropdown)}
				className={getButtonStyles()}>
				<span>{buttonText}</span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="19"
					viewBox="0 0 18 19"
					fill="none"
					className={getArrowClasses()}>
					<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill={getArrowColor()} />
				</svg>
			</button>

			{/* Dropdown Menu */}
			{showDropdown && (
				<div className="absolute top-full right-0 mt-2 w-52 bg-white-100 border border-[#E7E7E7] rounded-8px shadow-lg z-[200]">
					{regionOptions.map((region, index) => (
						<button
							key={region.name}
							onClick={() => handleRegionSelect(region.url)}
							className={`w-full text-left px-16px py-12px text-14 font-medium text-[#000] hover:bg-[#f5f5f5] transition-all duration-200 flex items-center justify-between ${
								index === 0 ? 'rounded-t-8px' : ''
							} ${index === regionOptions.length - 1 ? 'rounded-b-8px' : 'border-b border-[#E7E7E7]'}`}>
							<div className="flex items-center gap-3">
								<span className="text-20">{region.flag}</span>
								<span>{region.name}</span>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 18 19"
								fill="none"
								className="ml-2">
								<path d="M9.8803 9.50052L6.16797 5.7882L7.22863 4.72754L12.0016 9.50052L7.22863 14.2734L6.16797 13.2128L9.8803 9.50052Z" fill="currentColor" />
							</svg>
						</button>
					))}
				</div>
			)}
		</div>
	);
} 