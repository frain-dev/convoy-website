'use client';
import React from 'react';
import { OptimizedImage } from './OptimizedImaged';

interface MarkdownContentProps {
    content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
    const ast = JSON.parse(content);

    const renderNode = (node: any, index: number): React.ReactNode => {
        if (typeof node === 'string') {
            return node;
        }

        if (!node || typeof node !== 'object') {
            return null;
        }

        const { name, attributes, children } = node;

        // Handle text nodes
        if (name === 'text' || !name) {
            return children?.[0] || null;
        }

        // Handle paragraphs
        if (name === 'p' || name === 'paragraph') {
            return (
                <p key={index} className="text-14 desktop:text-16 !leading-[180%] text-[#4B4B4B] font-normal mb-16px">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </p>
            );
        }

        // Handle images
        if (name === 'img' || name === 'image') {
            return (
                <span key={index} className="block bg-[#FAFAFA] rounded-[8px] p-20px overflow-hidden mb-16px">
                    <OptimizedImage
                        src={attributes?.src || ''}
                        alt={attributes?.alt || ''}
                        width={760}
                        height={400}
                        className="w-full h-auto rounded-[8px]"
                    />
                </span>
            );
        }

        // Handle headings
        if (name === 'h1' || name === 'heading' && attributes?.level === 1) {
            return (
                <h1 key={index} className="text-24 desktop:text-28 font-medium text-[#000] mb-16px">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </h1>
            );
        }

        if (name === 'h2' || name === 'heading' && attributes?.level === 2) {
            return (
                <h2 key={index} className="text-20 desktop:text-24 font-medium text-[#000] mb-12px">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </h2>
            );
        }

        if (name === 'h3' || name === 'heading' && attributes?.level === 3) {
            return (
                <h3 key={index} className="text-18 desktop:text-20 font-medium text-[#000] mb-12px">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </h3>
            );
        }

        // Handle strong/bold
        if (name === 'strong') {
            return (
                <strong key={index} className="font-semibold">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </strong>
            );
        }

        // Handle emphasis/italic
        if (name === 'em') {
            return (
                <em key={index} className="italic">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </em>
            );
        }

        // Handle links
        if (name === 'a' || name === 'link') {
            return (
                <a
                    key={index}
                    href={attributes?.href || '#'}
                    className="text-[#477DB3] hover:underline"
                    target={attributes?.href?.startsWith('http') ? '_blank' : undefined}
                    rel={attributes?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </a>
            );
        }

        // Handle lists
        if (name === 'ul' || name === 'list' && attributes?.ordered === false) {
            return (
                <ul key={index} className="list-disc list-inside mb-16px text-14 desktop:text-16 text-[#4B4B4B]">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </ul>
            );
        }

        if (name === 'ol' || name === 'list' && attributes?.ordered === true) {
            return (
                <ol key={index} className="list-decimal list-inside mb-16px text-14 desktop:text-16 text-[#4B4B4B]">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </ol>
            );
        }

        if (name === 'li' || name === 'item') {
            return <li key={index}>{children?.map((child: any, i: number) => renderNode(child, i))}</li>;
        }

        // Handle code
        if (name === 'code') {
            return (
                <code key={index} className="bg-[#F5F5F5] px-6px py-2px rounded text-13 font-mono">
                    {children?.map((child: any, i: number) => renderNode(child, i))}
                </code>
            );
        }

        // Default: render children
        if (children) {
            return <React.Fragment key={index}>{children.map((child: any, i: number) => renderNode(child, i))}</React.Fragment>;
        }

        return null;
    };

    return <div className="markdown-content">{renderNode(ast, 0)}</div>;
}
