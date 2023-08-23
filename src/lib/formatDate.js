export default function formatDate(date) {
	const options = { day: '2-digit', month: 'short', year: 'numeric' };
	const formattedDate = new Date(date).toLocaleDateString('en-US', options);

	// Split the formatted date into day, month, and year parts
	const [month, day, year] = formattedDate.split(' ');
	const months = {
		Jan: 'January',
		Feb: 'February',
		Mar: 'March',
		Apr: 'April',
		May: 'May',
		Jun: 'June',
		Jul: 'July',
		Aug: 'August',
		Sep: 'September',
		Oct: 'October',
		Nov: 'November',
		Dec: 'December'
	};

	// Return the formatted date with uppercase month abbreviation and desired format
	return `${months[month]} ${day} ${year}`;
}
