import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Convoy - Privacy Policy',
  description: 'Privacy Policy for Convoy - The Enterprise Webhook Gateway',
  alternates: {
    canonical: '/legal/privacy-policy'
  },
  openGraph: {
    title: 'Convoy - Privacy Policy',
    description: 'Privacy Policy for Convoy - The Enterprise Webhook Gateway',
    url: 'https://www.getconvoy.io/legal/privacy-policy',
    type: 'website'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Privacy Policy',
  'description': 'Privacy Policy for Convoy - The Enterprise Webhook Gateway',
  'publisher': {
    '@type': 'Organization',
    'name': 'Convoy',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://www.getconvoy.io/svg/convoy-logo-full-new.svg'
    }
  },
  'url': 'https://www.getconvoy.io/legal/privacy-policy',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://www.getconvoy.io/legal/privacy-policy'
  },
  'datePublished': '2023-06-01',
  'dateModified': '2023-06-01'
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </div>
  );
} 