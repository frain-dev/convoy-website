export const useToaster = (details: { message: string; style: 'success' | 'danger' | 'warning' | 'primary' }) => {
	const toastBorders = {
		primary: 'border-primary-25',
		warning: 'border-warning-100',
		danger: 'border-danger-100',
		success: 'border-success-100'
	};

	const toast = document.querySelector('#toast')?.classList;
	const icon = document.querySelector(`#toast #${details.style}-icon `)?.classList;
	const message = document.querySelector('#toast #message');

	toast?.add('!right-40px', `bg-${details.style}-400`, toastBorders[details.style]);
	icon?.add('!inline-flex');
	if (message) message.innerHTML = details.message;

	setTimeout(() => {
		toast?.remove('!right-40px', `bg-${details.style}-400`, toastBorders[details.style]);
		icon?.remove('!inline-flex');
	}, 5000);
};
