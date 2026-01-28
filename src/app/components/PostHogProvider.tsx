'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
				api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
				person_profiles: 'identified_only',
				capture_pageview: true,
				capture_pageleave: true,
				persistence: 'localStorage+cookie',
				// Check if user has already consented
				opt_out_capturing_by_default: localStorage.getItem('cookie-consent') !== 'accepted'
			});
		}
	}, []);

	return <PHProvider client={posthog}>{children}</PHProvider>;
}
