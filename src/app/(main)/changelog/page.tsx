import { getChangelogEntries } from '@/lib/changelog';
import ChangelogClient from '@/app/(main)/changelog/ChangelogClient';

export default function Changelog() {
    const changelogData = getChangelogEntries();

    return <ChangelogClient changelogData={changelogData} />;
}
