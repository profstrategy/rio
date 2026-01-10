import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/session-provider";
import ReactQueryProvider from "@/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import RioLoadingFallback from "./rio-loading-fallback-ui";

const poppins = Poppins({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rioonbonk.io/"),
  title: "$RIO-The meme that flew over the dogs",
  description: "RIO is the colorful, rhythmic, hyper-community token taking flight on BONK. Inspired by the energy of carnival culture and the spirit of fearless adventure, RIO brings fun, movement, and creativity back to solana with a brand for virality, community, and culture.",
  keywords: [
    "RIO",
    "BONK",
    "Solana",
    "Cryptocurrency",
    'Meme Token',
    "Community Token",
    "Carnival Culture",
    "Rio on bonk",
    "SocialFI"
  ],
  authors: [{ name: "Rio on bonk", url: "https://www.rioonbonk.io/" }],
  icons: {
    icon: '/rio-logo.png',
    apple: '/apple-logo.png',
  },
  openGraph: {
    title: "$RIO-The meme that flew over the dogs",
    description: "RIO is the colorful, rhythmic, hyper-community token taking flight on BONK. Inspired by the energy of carnival culture and the spirit of fearless adventure, RIO brings fun, movement, and creativity back to solana with a brand for virality, community, and culture.",
    images: [
      {
        url: '/rio-wallpapper.jpg',
        width: 800,
        height: 600,
        alt: '$RIO ON BONK-The meme that flew over the dogs',
      },
    ],
    type: 'website',
    locale: 'en_US',
    siteName: '$RIO',
  },
  twitter: {
    card: 'summary_large_image',
    title: '$RIO-The meme that flew over the dogs',
    description:
      'RIO is the colorful, rhythmic, hyper-community token taking flight on BONK. Inspired by the energy of carnival culture and the spirit of fearless adventure, RIO brings fun, movement, and creativity back to solana with a brand for virality, community, and culture.',
    images: ['/rio-wallpapper.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <body
        className={`${poppins.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NextAuthProvider>
            <Toaster position="top-center" richColors />
            {children}
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
