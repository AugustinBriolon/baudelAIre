import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://baudel-ai-re.vercel.app/'),
  title: "baudelAIre • Générateur de poème avec IA",
  description: "baudelAIre est un générateur de poème grâçe à l'Intelligence Artificielle.",
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'icon', url: '/favicon/favicon-32x32.png' },
      { rel: 'apple-touch-icon', url: '/favicon/apple-touch-icon.png' },
      { rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon-precomposed.png' },
    ],
  },
  openGraph: {
    type: 'website',
    url: 'https://baudel-ai-re.vercel.app/',
    title: 'baudelAIre • Générateur de poème avec IA',
    description: "baudelAIre est un générateur de poème grâçe à l'Intelligence Artificielle.",
    siteName: 'baudelAIre',
    images: [
      {
        url: '/images/ogimage.png',
      },
    ],
    locale: 'fr_FR',
  },
  keywords: ['ia', 'ai', 'poeme', 'intelligence articielle', 'poésie', 'poète', 'poet', 'poetry', 'poem', 'poème'],
  authors: [{ name: 'Augustin Briolon', url: 'https://august1.dev' }],
  alternates: { canonical: 'https://baudel-ai-re.vercel.app/' },
  robots: 'index, follow',
  twitter: {
    card: 'summary_large_image',
    site: '@AugustinBriolon',
    creator: '@AugustinBriolon',
    images: "/favicon/android-chrome-512x512.png"
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
