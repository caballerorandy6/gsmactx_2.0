import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReCaptchaProvider from "@/components/forms/ReCaptchaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GSM A/C General & Contractor Inc | HVAC Services in Texas",
    template: "%s | GSM A/C",
  },
  description:
    "Professional HVAC services in Cypress, TX and Houston area. Air conditioning installation & repair, heating services, duct sanitizing, and attic insulation. Licensed, insured, 5-star rated. Call (281) 235-4684 for same-day service.",
  keywords: [
    "HVAC services Texas",
    "air conditioning repair Cypress TX",
    "AC installation Houston",
    "heating repair Texas",
    "HVAC contractor Cypress",
    "air duct cleaning Houston",
    "attic insulation Texas",
    "emergency HVAC service",
    "GSM AC",
    "HVAC near me",
  ],
  authors: [{ name: "GSM A/C General & Contractor Inc" }],
  creator: "GSM A/C General & Contractor Inc",
  publisher: "GSM A/C General & Contractor Inc",
  metadataBase: new URL("https://www.gsmactx.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.avif",
    apple: "/logo.avif",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.gsmactx.com",
    siteName: "GSM A/C General & Contractor Inc",
    title: "GSM A/C General & Contractor Inc | HVAC Services in Texas",
    description:
      "Professional HVAC services in Cypress, TX. Air conditioning, heating, duct cleaning, and insulation. Licensed & insured. Call (281) 235-4684",
    images: [
      {
        url: "https://www.gsmactx.com/logo.avif",
        width: 1200,
        height: 630,
        alt: "GSM A/C General & Contractor Inc Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSM A/C General & Contractor Inc | HVAC Services in Texas",
    description:
      "Professional HVAC services in Cypress, TX. Licensed & insured. Call (281) 235-4684",
    images: ["https://www.gsmactx.com/logo.avif"],
    creator: "@gsmactx",
    site: "@gsmactx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-10810642932"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10810642932');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-pretty custom-blue custom-scrollbar`}
      >
        <ReCaptchaProvider>
          {children}
          <SpeedInsights />
          <Toaster richColors theme="dark" position="bottom-right" />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
