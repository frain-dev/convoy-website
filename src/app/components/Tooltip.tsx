type TooltipProps = {
	children: any;
	tooltipContent?: string;
	tooltipToggle?: any;
	position?: 'left' | 'right' | 'center';
	type?: 'primary' | 'white';
};

const Tooltip = ({ tooltipContent, tooltipToggle, position = 'right', type = 'white', children }: TooltipProps) => {
	const positions = {
		left: `-right-[16px] after:right-[15px]`,
		right: `-right-[160px] after:right-[157px]`,
		center: `left-1/2 -translate-x-1/2 after:left-1/2 after:-translate-x-1/2`
	};

	const tooltipClass = `${positions[position]} ${
		type === 'primary'
			? 'bg-primary-400 after:border-t-primary-400 text-white-100 w-192px'
			: 'shadow-[0px_20px_25px_-5px_rgba(51,65,85,0.1),0px_10px_10px_-5px_rgba(51,65,85,0.04)] bg-white-100 text-gray-600 after:border-t-white-100 after:w-20px'
	}`;
	return (
		<>
			<button className="relative text-left">
				<div className="empty:hidden">{tooltipToggle}</div>
				<div
					className={`absolute
                    opacity-0
                    group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto group-focus:pointer-events-auto
                    pointer-events-none
                    transition-all
                    bottom-[calc(100%+10px)]
                    rounded-8px
                    p-10px
                    text-12 text-left
                    after:content-['']
                    after:absolute
                    after:-bottom-[19px]
                    font-light
                    after:border-[10px] after:border-b-transparent after:border-x-transparent ${tooltipClass}`}>
					{tooltipContent && <span>{tooltipContent}</span>}
					{children}
				</div>
			</button>
		</>
	);
};

export default Tooltip;
