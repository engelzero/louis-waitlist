import type { Metadata } from "next";
import { PT_Serif, Open_Sans } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Louis - AI Legal Scribe for Lawyers & Law Firms",
  description: "Join the waitlist for Louis, the AI legal scribe that replaces handwritten notes with precise capture of trial prep, depositions, and client meetings.",
  keywords: "AI legal scribe, lawyer technology, legal AI, trial prep, deposition notes, legal automation",
  authors: [{ name: "Louis" }],
  openGraph: {
    title: "Louis Waitlist - AI Legal Scribe for Lawyers & Law Firms",
    description: "Join the waitlist for Louis, the AI legal scribe that replaces handwritten notes with precise capture of trial prep, depositions, and client meetings.",
    url: "https://www.getlouis.ai",
    siteName: "Louis",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Louis - AI Legal Scribe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Louis Waitlist - AI Legal Scribe for Lawyers & Law Firms",
    description: "Join the waitlist for Louis, the AI legal scribe that replaces handwritten notes with precise capture of trial prep, depositions, and client meetings.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual code when you get it
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${ptSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
