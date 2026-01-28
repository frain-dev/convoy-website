import { getChangelogEntry, getAllChangelogSlugs } from '@/lib/changelog';
import { notFound } from 'next/navigation';
import ChangelogEntryClient from './ChangelogEntryClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    const slugs = getAllChangelogSlugs();
    return slugs.map((slug) => ({
        slug
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const entry = getChangelogEntry(params.slug);

    if (!entry) {
        return {
            title: 'Changelog - Convoy'
        };
    }

    const ogImage = entry.image || '/static/convoy-new.png';

    return {
        title: `${entry.title} - Convoy Changelog`,
        description: `Changelog update from ${entry.fullDate}`,
        openGraph: {
            title: entry.title,
            description: `Changelog update from ${entry.fullDate}`,
            type: 'article',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: entry.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: entry.title,
            description: `Changelog update from ${entry.fullDate}`,
            images: [ogImage]
        }
    };
}

export default function ChangelogEntryPage({ params }: { params: { slug: string } }) {
    const entry = getChangelogEntry(params.slug);

    if (!entry) {
        notFound();
    }

    return <ChangelogEntryClient entry={entry} />;
}
