import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	const hostname = url.hostname;

	if (url.pathname.startsWith('/docs/docs')) {
		url.pathname = url.pathname.replace(/^\/docs\/docs/, '/docs');
		url.hostname = 'www.getconvoy.io';
		url.port = '';
		return NextResponse.redirect(url, 301);
	}

	if (hostname === 'docs.getconvoy.io') {
		url.hostname = 'www.getconvoy.io';
		url.port = '';
		if (!url.pathname.startsWith('/docs')) {
			url.pathname = `/docs${url.pathname}`;
		}
		return NextResponse.redirect(url, 301);
	}

	if (hostname === 'getconvoy.io' && (url.pathname === '/docs' || url.pathname.startsWith('/docs/'))) {
		url.hostname = 'www.getconvoy.io';
		url.port = '';
		return NextResponse.redirect(url, 301);
	}
}
