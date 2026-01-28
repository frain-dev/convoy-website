import { getChangelogEntries } from '@/lib/changelog';
import ChangelogClient from '@/app/(main)/changelog/ChangelogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Changelog - Convoy',
    description: 'Stay up to date with the latest features, improvements, and updates to Convoy.',
    openGraph: {
        title: 'Changelog - Convoy',
        description: 'Stay up to date with the latest features, improvements, and updates to Convoy.',
        type: 'website',
        images: [
            {
                url: '/static/changelog-og.png',
                width: 1200,
                height: 630,
                alt: 'Convoy Changelog'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Changelog - Convoy',
        description: 'Stay up to date with the latest features, improvements, and updates to Convoy.',
        images: ['/static/changelog-og.png']
    }
};

export default function Changelog() {
    const changelogData = getChangelogEntries();

    return <ChangelogClient changelogData={changelogData} />;
}
