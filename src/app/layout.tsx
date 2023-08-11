import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Convoy Documentation',
	description: 'Convoy Documentation'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning={true}>
				{/* <header className="bg-white-100 p-10px">

        </header> */}
				{children}
			</body>
		</html>
	);
}
