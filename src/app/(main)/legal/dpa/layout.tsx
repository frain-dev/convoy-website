import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convoy - Data Processing Addendum (DPA)',
  description: 'Data Processing Addendum (DPA) for Convoy - The Enterprise Webhook Gateway',
  alternates: {
    canonical: '/legal/dpa'
  },
  openGraph: {
    title: 'Convoy - Data Processing Addendum (DPA)',
    description: 'Data Processing Addendum (DPA) for Convoy - The Enterprise Webhook Gateway',
    url: 'https://www.getconvoy.io/legal/dpa',
    type: 'website'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Data Processing Addendum (DPA)',
  'description': 'Data Processing Addendum (DPA) for Convoy - The Enterprise Webhook Gateway',
  'publisher': {
    '@type': 'Organization',
    'name': 'Convoy',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://www.getconvoy.io/svg/convoy-logo-full-new.svg'
    }
  },
  'url': 'https://www.getconvoy.io/legal/dpa',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://www.getconvoy.io/legal/dpa'
  },
  'datePublished': '2024-06-01',
  'dateModified': '2024-06-01'
};

export default function DPALayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
} 