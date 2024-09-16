import '../globals.scss';
import Script from 'next/script';
// import { SometypeMono } from 'next/font/google'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" style={{ scrollBehavior: 'smooth' }}>
			<body suppressHydrationWarning={true} className="bg-[#141414]">
				<header className="backdrop-blur-[10px] fixed w-full">
					<div className="flex justify-between items-center m-auto max-w-[1248px] px-20px py-12px">
						<a href="/">
							<img src="/svg/convoy-white.svg" />
						</a>
						<div className="flex gap-12px">
							<button className="flex gap-8px items-center border border-neutral-1 text-neutral-1 text-14 py-8px px-16px rounded-8px">
								Sign In
								<svg width="18" height="18">
									<use xlinkHref="#arrow-right-icon" className="fill-neutral-1"></use>
								</svg>
							</button>
							<button className="flex gap-8px items-center bg-neutral-1 text-neutral-12 text-14 py-8px px-16px rounded-8px">
								Start your project
								<svg width="18" height="18">
									<use xlinkHref="#arrow-right-icon" className="fill-neutral-12"></use>
								</svg>
							</button>
						</div>
					</div>
				</header>

				{children}

				<svg display="none" className="hidden">
					<symbol width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" id="arrow-right-icon">
						<path d="M9.87878 9.00052L6.16644 5.2882L7.22711 4.22754L12.0001 9.00052L7.22711 13.7734L6.16644 12.7128L9.87878 9.00052Z" />
					</symbol>

					<symbol width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="dash-icon">
						<line x1="6" y1="11" x2="18" y2="11" strokeWidth="2" />
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
