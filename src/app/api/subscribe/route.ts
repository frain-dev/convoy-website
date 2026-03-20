import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const { email } = await request.json();

		if (!email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		const apiKey = process.env.RESEND_API_KEY;
		const audienceId = process.env.RESEND_AUDIENCE_ID;
		if (!apiKey || !audienceId) {
			return NextResponse.json({ error: 'Newsletter service is not configured' }, { status: 500 });
		}

		const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				unsubscribed: false
			})
		});

		if (!response.ok) {
			const data = await response.json();
			if (response.status === 409) {
				return NextResponse.json({ message: 'You are already subscribed!' });
			}
			return NextResponse.json({ error: data.message || 'Failed to subscribe' }, { status: response.status });
		}

		return NextResponse.json({ message: 'Subscribed successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
	}
}
