import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdoc from '@markdoc/markdoc';

export interface Author {
    name: string;
    image: string;
}

export interface ChangelogEntry {
    date: string;
    displayDate: string;
    fullDate: string;
    title: string;
    content: string;
    authors: Author[];
    slug: string;
}

export interface MonthGroup {
    month: string;
    entries: ChangelogEntry[];
}

function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

function formatDisplayDate(date: Date): string {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    return `${dayOfWeek}, ${day}${suffix}`;
}

function formatFullDate(date: Date): string {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const suffix = getDaySuffix(day);
    return `${dayOfWeek}, ${month} ${day}${suffix}, ${year}`;
}

function getMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}

function getAllEntries(): ChangelogEntry[] {
    const changelogDir = path.join(process.cwd(), 'content', 'changelog');

    // Check if directory exists
    if (!fs.existsSync(changelogDir)) {
        return [];
    }

    const files = fs.readdirSync(changelogDir).filter((file) => file.endsWith('.md'));

    const entries: ChangelogEntry[] = files.map((filename) => {
        const filePath = path.join(changelogDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Parse markdown to AST and render to HTML
        const ast = Markdoc.parse(content);
        const renderedContent = Markdoc.transform(ast);

        const date = new Date(data.date);
        // Remove date prefix from slug (e.g., "2025-08-22-message-broker-functions" -> "message-broker-functions")
        const slug = filename.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');

        return {
            date: data.date,
            displayDate: formatDisplayDate(date),
            fullDate: formatFullDate(date),
            title: data.title,
            content: JSON.stringify(renderedContent),
            authors: data.authors || [],
            slug
        };
    });

    // Sort entries by date (newest first)
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return entries;
}

export function getChangelogEntries(): MonthGroup[] {
    const entries = getAllEntries();

    // Group by month
    const grouped = entries.reduce(
        (acc, entry) => {
            const date = new Date(entry.date);
            const monthYear = getMonthYear(date);

            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(entry);
            return acc;
        },
        {} as Record<string, ChangelogEntry[]>
    );

    // Convert to array format
    return Object.entries(grouped).map(([month, entries]) => ({
        month,
        entries
    }));
}

export function getChangelogEntry(slug: string): ChangelogEntry | null {
    const entries = getAllEntries();
    return entries.find((entry) => entry.slug === slug) || null;
}

export function getAllChangelogSlugs(): string[] {
    const entries = getAllEntries();
    return entries.map((entry) => entry.slug);
}
