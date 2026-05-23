import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexander Kurian - Software Engineer · Founder · Builder",
  description:
    "Portfolio of Alexander Kurian - building AI-powered tools, full-stack applications, and open source projects. Next.js, Three.js, TypeScript, Python.",
  keywords: [
    "Alexander Kurian",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Alexander Kurian - Software Engineer · Founder · Builder",
    description:
      "Building things that matter - from AI documentation tools to family bookstore POS systems.",
    type: "website",
    url: "https://alexkurian.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KX30PJP8V5" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KX30PJP8V5');
          `}
        </Script>
      </body>
    </html>
  );
}
