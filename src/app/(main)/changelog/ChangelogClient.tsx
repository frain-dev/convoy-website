'use client';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/app/components/OptimizedImaged';
import { MarkdownContent } from '@/app/components/MarkdownContent';
import type { MonthGroup } from '@/lib/changelog';
import Link from 'next/link';

interface ChangelogClientProps {
    changelogData: MonthGroup[];
}

export default function ChangelogClient({ changelogData }: ChangelogClientProps) {
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
                <h1 className="text-32 desktop:text-[40px] font-medium text-center mb-24px">Changelog</h1>
                <p className="max-w-[683px] text-center text-14 desktop:text-16 !leading-[200%] text-[#666] font-normal">
                    Latest updates to Convoy
                </p>
            </motion.section>

            {/* Changelog Timeline */}
            <section className="max-w-[1140px] m-auto px-20px pb-80px">
                <div className="flex flex-col gap-80px">
                    {changelogData.map((monthGroup, monthIndex) => (
                        <div key={monthIndex} className="flex flex-col desktop:flex-row gap-20px desktop:gap-80px">
                            {/* Sticky Month Header - Left Side */}
                            <div className="desktop:sticky desktop:top-[100px] desktop:self-start desktop:w-[280px] flex-shrink-0">
                                <h2 className="text-20 desktop:text-24 font-medium text-[#4B4B4B]">{monthGroup.month}</h2>
                            </div>

                            {/* Entries for this month - Right Side */}
                            <div className="flex flex-col gap-20px flex-1 desktop:max-w-[800px]">
                                {monthGroup.entries.map((entry, entryIndex) => (
                                    <motion.div
                                        key={entry.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.6,
                                                delay: entryIndex * 0.1,
                                                ease: [0.44, 0, 0, 1]
                                            }
                                        }}
                                        viewport={{
                                            amount: 'some',
                                            once: true
                                        }}
                                        className="bg-white-100 border border-[#E7E7E7] rounded-[12px] p-20px shadow-[0px_2px_2px_-1px_rgba(0,0,0,0.04)]">
                                        <div className="flex flex-col gap-16px">
                                            {/* Badge and Content */}
                                            <div className="flex flex-col gap-16px">
                                                {/* Date Badge */}
                                                <div className="inline-flex items-center justify-center bg-[rgba(231,231,231,0.4)] rounded-[4px] px-4px py-4px w-fit">
                                                    <span className="text-12 font-medium text-[#4B4B4B]">{entry.displayDate}</span>
                                                </div>

                                                {/* Title and Content */}
                                                <div className="flex flex-col gap-8px">
                                                    <Link href={`/changelog/${entry.slug}`}>
                                                        <h3 className="text-18 desktop:text-20 font-medium text-[#000] cursor-pointer">{entry.title}</h3>
                                                    </Link>
                                                    <MarkdownContent content={entry.content} />
                                                </div>
                                            </div>

                                            {/* Authorship */}
                                            <div className="flex flex-col gap-8px pt-8px border-t border-[#E7E7E7]">
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
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
