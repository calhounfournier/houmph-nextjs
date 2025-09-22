import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Domains for sale',
  description: 'Purchase domain names individually or as a family. Click on a domain name to contact us or use GoDaddy.',
  authors: [{ name: 'Charles-Antoine Fournier, Symbole Branding' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  minimumScale: 1.0,
  maximumScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}