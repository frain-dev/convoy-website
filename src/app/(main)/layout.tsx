import '../globals.scss';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSlide from '../components/BlogSlide';
import { getPosts } from '@/lib/getPosts';
import Toast from '../components/Toast';

export const metadata: Metadata = {
	metadataBase: new URL('https://getconvoy.io'),
	title: 'Convoy',
	description: 'Convoy Documentation and Website',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		title: 'Webhooks Gateway for sending and receiving webhooks - Convoy',
		description:
			'Reliable Webhooks Gateway for sending and receiving millions of webhooks securely with support for Retries, Rate Limiting, Static IPs, Circuit Breaking and scalability for efficient engineering teams.',
		url: 'https://getconvoy.io/',
		type: 'website',
		images: '/static/convoy.png'
	},
	twitter: {
		title: 'Webhooks Gateway for sending and receiving webhooks - Convoy',
		creator: '@getconvoy',
		images: [
			{
				url: '/static/convoy.png',
				alt: 'Convoy Logo'
			}
		],
		site: '@getconvoy',
		description:
			'Reliable Webhooks Gateway for sending and receiving millions of webhooks securely with support for Retries, Rate Limiting, Static IPs, Circuit Breaking and scalability for efficient engineering teams.',
		card: 'summary_large_image'
	},
	viewport: {
		width: 'device-width',
		initialScale: 1
	},
	robots: {
		index: false,
		follow: true
	},
	keywords: [
		'webhooks',
		'webhook',
		'webhooks gateway',
		'webhook gateway',
		'sending webhooks',
		'receiving webhooks',
		'webhooks as a service',
		'open-source webhooks',
		'free webhook',
		'secure webhooks',
		'webhooks api',
		'incoming webhooks',
		'convoy webhooks',
		'kafta',
		'platform engineering',
		'api gateway',
		'webhooks service',
		'webhooks provider',
		'webhooks infrastructure',
		'opensource webhooks',
		'opensource',
		'low code',
		'github webhook',
		'stripe webhook',
		'webhook url',
		'webhook endpoint',
		'zapier webhook',
		'web hook',
		'endpoint',
		'API',
		'cloud',
		'cloud-native'
	]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const featurePosts = await getPosts();
	const filteredArticles = featurePosts.filter(article => !article.isError);
	return (
		<html lang="en" style={{ scrollBehavior: 'smooth' }}>
			<body suppressHydrationWarning={true}>
				<Header></Header>

				{children}
				<Toast></Toast>
				<BlogSlide featurePosts={filteredArticles.slice(0, 7)}></BlogSlide>
				<Footer></Footer>

				<svg display="none" className="hidden">
					<symbol width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="angle-down-icon">
						<path d="M11.3333 6.11333C11.2084 5.98916 11.0395 5.91946 10.8633 5.91946C10.6872 5.91946 10.5182 5.98916 10.3933 6.11333L8.00001 8.47333L5.64001 6.11333C5.5151 5.98916 5.34613 5.91946 5.17001 5.91946C4.99388 5.91946 4.82491 5.98916 4.70001 6.11333C4.63752 6.1753 4.58792 6.24904 4.55408 6.33027C4.52023 6.41151 4.50281 6.49865 4.50281 6.58666C4.50281 6.67467 4.52023 6.7618 4.55408 6.84304C4.58792 6.92428 4.63752 6.99802 4.70001 7.05999L7.52667 9.88666C7.58865 9.94914 7.66238 9.99874 7.74362 10.0326C7.82486 10.0664 7.912 10.0839 8.00001 10.0839C8.08801 10.0839 8.17515 10.0664 8.25639 10.0326C8.33763 9.99874 8.41136 9.94914 8.47334 9.88666L11.3333 7.05999C11.3958 6.99802 11.4454 6.92428 11.4793 6.84304C11.5131 6.7618 11.5305 6.67467 11.5305 6.58666C11.5305 6.49865 11.5131 6.41151 11.4793 6.33027C11.4454 6.24904 11.3958 6.1753 11.3333 6.11333Z" />
					</symbol>

					<symbol width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" id="bell-icon">
						<path
							d="M9.0169 2.18262C6.5344 2.18262 4.5169 4.20012 4.5169 6.68262V8.85012C4.5169 9.30762 4.3219 10.0051 4.0894 10.3951L3.2269 11.8276C2.6944 12.7126 3.0619 13.6951 4.0369 14.0251C7.2694 15.1051 10.7569 15.1051 13.9894 14.0251C14.8969 13.7251 15.2944 12.6526 14.7994 11.8276L13.9369 10.3951C13.7119 10.0051 13.5169 9.30762 13.5169 8.85012V6.68262C13.5169 4.20762 11.4919 2.18262 9.0169 2.18262Z"
							strokeMiterlimit="10"
							strokeLinecap="round"
						/>
						<path
							d="M10.4039 2.40008C10.1714 2.33258 9.93141 2.28008 9.68391 2.25008C8.96391 2.16008 8.27391 2.21258 7.62891 2.40008C7.84641 1.84508 8.38641 1.45508 9.01641 1.45508C9.64641 1.45508 10.1864 1.84508 10.4039 2.40008Z"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M11.2676 14.2949C11.2676 15.5324 10.2551 16.5449 9.01758 16.5449C8.40258 16.5449 7.83258 16.2899 7.42758 15.8849C7.02258 15.4799 6.76758 14.9099 6.76758 14.2949"
							strokeMiterlimit="10"
						/>
					</symbol>

					<symbol width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" id="alert-icon">
						<path d="M9 6.75V10.5" strokeLinecap="round" strokeLinejoin="round" />
						<path
							d="M8.99958 16.0575H4.45458C1.85208 16.0575 0.764583 14.1975 2.02458 11.925L4.36458 7.70996L6.56958 3.74996C7.90458 1.34246 10.0946 1.34246 11.4296 3.74996L13.6346 7.71746L15.9746 11.9325C17.2346 14.205 16.1396 16.065 13.5446 16.065H8.99958V16.0575Z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M9 12.75H9.00674" strokeLinecap="round" strokeLinejoin="round" />
					</symbol>
				</svg>
			</body>
			<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />

			<Script strategy="lazyOnload">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
					page_path: window.location.pathname,
					});
				`}
			</Script>
		</html>
	);
}
