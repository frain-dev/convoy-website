const Toast = () => {
	return (
		<>
			<div
				id="toast"
				className="border flex items-center gap-12px p-12px max-w-[420px] w-full rounded-8px fixed transition-all duration-300 z-[100] bottom-100px -right-[450px] bg-opacity-[0.04]"
				role="alert">
				<div id="primary-icon" className="hidden items-center justify-center flex-shrink-0 w-24px h-24px">
					<svg width="18" height="18">
						<use xlinkHref="#bell-icon" className="stroke-primary-400"></use>
					</svg>
				</div>

				<div id="warning-icon" className="hidden items-center justify-center flex-shrink-0 w-24px h-24px">
					<svg width="18" height="18">
						<use xlinkHref="#alert-icon" className="stroke-warning-400"></use>
					</svg>
				</div>

				<div id="danger-icon" className="hidden items-center justify-center flex-shrink-0 w-24px h-24px">
					<svg width="18" height="18">
						<use xlinkHref="#alert-icon" className="stroke-danger-400"></use>
					</svg>
				</div>

				<div id="success-icon" className="hidden items-center justify-center flex-shrink-0 w-24px h-24px">
					<svg width="18" height="18">
						<use xlinkHref="#alert-icon" className="stroke-success-400"></use>
					</svg>
				</div>

				<div className="text-12 text-gray-normal ml-12px" id="message"></div>
			</div>
		</>
	);
};

export default Toast;
