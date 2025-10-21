'use client';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/app/components/OptimizedImaged';
import { MarkdownContent } from '@/app/components/MarkdownContent';
import type { ChangelogEntry } from '@/lib/changelog';
import Link from 'next/link';

interface ChangelogEntryClientProps {
    entry: ChangelogEntry;
}

export default function ChangelogEntryClient({ entry }: ChangelogEntryClientProps) {
    return (
        <main className="bg-[#FAFAFA] min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        delay: 0,
                        ease: [0.44, 0, 0, 1]
                    }
                }}
                viewport={{
                    amount: 'some',
                    once: true
                }}
                className="max-w-[1140px] m-auto flex flex-col items-center pt-100px desktop:pt-150px pb-70px desktop:pb-80px px-20px">
                {/* Back to Changelog */}
                <Link href="/changelog" className="mb-24px text-14 desktop:text-16 text-[#000] font-normal flex items-center gap-8px">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Changelog
                </Link>
                <h1 className="text-24 desktop:text-32 font-medium text-center mb-16px">{entry.title}</h1>
                <p className="text-14 desktop:text-16 text-[#666] font-normal">{entry.fullDate}</p>
            </motion.section>

            {/* Entry Content */}
            <section className="max-w-[800px] m-auto px-20px pb-80px">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.6,
                            ease: [0.44, 0, 0, 1]
                        }
                    }}
                    viewport={{
                        amount: 'some',
                        once: true
                    }}
                    className="bg-white-100 border border-[#E7E7E7] rounded-[12px] p-20px desktop:p-40px shadow-[0px_2px_2px_-1px_rgba(0,0,0,0.04)]">
                    <div className="flex flex-col gap-24px">
                        {/* Content */}
                        <div className="flex flex-col gap-16px">
                            <MarkdownContent content={entry.content} />
                        </div>

                        {/* Authorship */}
                        <div className="flex flex-col gap-8px pt-16px border-t border-[#E7E7E7]">
                            <span className="text-12 desktop:text-14 text-[#666] font-normal">Designed, built & written by</span>
                            <div className="flex items-center gap-8px flex-wrap">
                                {entry.authors.map((author, authorIndex) => (
                                    <div key={authorIndex} className="flex items-center gap-6px">
                                        <div className="w-24px h-24px rounded-full overflow-hidden flex-shrink-0">
                                            <OptimizedImage
                                                src={author.image}
                                                alt={author.name}
                                                width={24}
                                                height={24}
                                                className="w-full h-full object-cover"
                                                style={{ borderRadius: '50%' }}
                                            />
                                        </div>
                                        <span className="text-12 desktop:text-14 text-[#000] font-medium">{author.name}</span>
                                        {authorIndex < entry.authors.length - 1 && <span className="text-[#666]">,</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
