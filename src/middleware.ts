import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	const hostname = url.hostname;

	if (url.pathname.startsWith('/docs/docs')) {
		url.hostname = 'docs.getconvoy.io';
		url.port = '';
		url.pathname = url.pathname.replace(/^\/docs\/docs/, '');
		return NextResponse.redirect(url, 301);
	}

	if (
		(hostname === 'getconvoy.io' || hostname === 'www.getconvoy.io') &&
		(url.pathname === '/docs' || url.pathname.startsWith('/docs/'))
	) {
		url.hostname = 'docs.getconvoy.io';
		url.port = '';
		url.pathname = url.pathname.replace(/^\/docs/, '') || '/';
		return NextResponse.redirect(url, 301);
	}
}
