import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Calvary Constructions — Building Strong Foundations for the Future",
  description:
    "Calvary Constructions delivers high-quality construction solutions for residential, commercial, and industrial projects with a focus on safety, precision, and timely delivery.",
  keywords: [
    "construction company",
    "residential construction",
    "commercial construction",
    "industrial construction",
    "Calvary Constructions",
    "building foundations",
    "renovation",
    "project management",
  ],
  authors: [{ name: "Calvary Constructions" }],
  openGraph: {
    title: "Calvary Constructions — Building Strong Foundations for the Future",
    description:
      "From concept to completion, our experienced team ensures every project is built with excellence, durability, and attention to detail.",
    type: "website",
    locale: "en_US",
    siteName: "Calvary Constructions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calvary Constructions — Building Strong Foundations for the Future",
    description:
      "We deliver high-quality construction solutions for residential, commercial, and industrial projects with a focus on safety, precision, and timely delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Inter + Cormorant Garamond */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

