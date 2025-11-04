import { getChangelogEntry, getAllChangelogSlugs } from '@/lib/changelog';
import { notFound } from 'next/navigation';
import ChangelogEntryClient from './ChangelogEntryClient';

export async function generateStaticParams() {
    const slugs = getAllChangelogSlugs();
    return slugs.map((slug) => ({
        slug
    }));
}

export default function ChangelogEntryPage({ params }: { params: { slug: string } }) {
    const entry = getChangelogEntry(params.slug);

    if (!entry) {
        notFound();
    }

    return <ChangelogEntryClient entry={entry} />;
}
