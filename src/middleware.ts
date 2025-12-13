import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();
	if (url.hostname === 'docs.getconvoy.io') {
		url.hostname = 'getconvoy.io';
		if (!url.pathname.startsWith('/docs')) {
			url.pathname = `/docs${url.pathname}`;
		}
		return NextResponse.redirect(url, 301);
	}
}
