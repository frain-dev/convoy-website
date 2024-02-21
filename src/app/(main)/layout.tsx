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
		title: 'Webhooks service for sending and receiving webhooks - Convoy',
		description:
			'Reliable Webhooks Gateway for sending and receiving millions of webhooks securely with support for Retries, Rate Limiting, Static IPs, Circuit Breaking and scalability for efficient engineering teams.',
		url: 'https://getconvoy.io/',
		type: 'website',
		images: '/static/convoy.png'
	},
	twitter: {
		title: 'Webhooks service for sending and receiving webhooks - Convoy',
		creator: '@getconvoy',
		images: [
			{
				url: '/static/convoy.png',
				alt: 'Convoy Logo'
			}
		],
		site: '@getconvoy',
		description:
			'Reliable Webhooks service for sending and receiving millions of webhooks securely with support for Retries, Rate Limiting, Static IPs, Circuit Breaking and scalability for efficient engineering teams.',
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
		'kafka',
		'platform engineering',
		'Webhook signatures',
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
					<symbol viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id="info-icon">
						<path d="M8.00065 7.33301C7.82384 7.33301 7.65427 7.40325 7.52925 7.52827C7.40423 7.65329 7.33399 7.82286 7.33399 7.99967V10.6663C7.33399 10.8432 7.40423 11.0127 7.52925 11.1377C7.65427 11.2628 7.82384 11.333 8.00065 11.333C8.17747 11.333 8.34703 11.2628 8.47206 11.1377C8.59708 11.0127 8.66732 10.8432 8.66732 10.6663V7.99967C8.66732 7.82286 8.59708 7.65329 8.47206 7.52827C8.34703 7.40325 8.17747 7.33301 8.00065 7.33301ZM8.25399 4.71967C8.09168 4.653 7.90963 4.653 7.74732 4.71967C7.66549 4.7514 7.59072 4.79898 7.52732 4.85967C7.46843 4.92448 7.42108 4.99888 7.38732 5.07967C7.35 5.15879 7.33173 5.24556 7.33399 5.33301C7.33348 5.42075 7.3503 5.50772 7.38347 5.58895C7.41665 5.67017 7.46553 5.74405 7.52732 5.80634C7.59212 5.86523 7.66653 5.91258 7.74732 5.94634C7.84832 5.98783 7.95796 6.00389 8.06662 5.99308C8.17527 5.98228 8.27961 5.94496 8.37046 5.88439C8.46131 5.82382 8.5359 5.74186 8.58766 5.64572C8.63942 5.54958 8.66678 5.4422 8.66732 5.33301C8.66487 5.1565 8.59581 4.98743 8.47399 4.85967C8.41059 4.79898 8.33582 4.7514 8.25399 4.71967ZM8.00065 1.33301C6.68211 1.33301 5.39318 1.724 4.29685 2.45654C3.20052 3.18909 2.34604 4.23028 1.84146 5.44845C1.33687 6.66663 1.20485 8.00707 1.46209 9.30028C1.71932 10.5935 2.35426 11.7814 3.28661 12.7137C4.21896 13.6461 5.40685 14.281 6.70005 14.5382C7.99326 14.7955 9.3337 14.6635 10.5519 14.1589C11.7701 13.6543 12.8112 12.7998 13.5438 11.7035C14.2763 10.6071 14.6673 9.31822 14.6673 7.99967C14.6673 7.1242 14.4949 6.25729 14.1599 5.44845C13.8248 4.63961 13.3338 3.90469 12.7147 3.28563C12.0956 2.66657 11.3607 2.17551 10.5519 1.84048C9.74304 1.50545 8.87613 1.33301 8.00065 1.33301ZM8.00065 13.333C6.94582 13.333 5.91467 13.0202 5.03761 12.4342C4.16055 11.8481 3.47696 11.0152 3.0733 10.0407C2.66963 9.06611 2.56401 7.99376 2.7698 6.95919C2.97559 5.92463 3.48354 4.97432 4.22942 4.22844C4.9753 3.48256 5.92561 2.97461 6.96017 2.76882C7.99474 2.56303 9.06709 2.66865 10.0416 3.07232C11.0162 3.47598 11.8491 4.15957 12.4352 5.03663C13.0212 5.9137 13.334 6.94484 13.334 7.99967C13.334 9.41416 12.7721 10.7707 11.7719 11.7709C10.7717 12.7711 9.41514 13.333 8.00065 13.333Z" />
					</symbol>
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
