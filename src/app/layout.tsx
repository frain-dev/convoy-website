import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Convoy Documentation',
	description: 'Convoy Documentation'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" style={{ scrollBehavior: 'smooth' }}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<Header></Header>
				{children}
				<Footer></Footer>
			</body>
		</html>
	);
}
