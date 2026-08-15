import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  icons: {
  icon: "/favicon.png",
  shortcut: "/favicon.png",
  apple: "/apple-touch-icon.png",
},
  metadataBase: new URL("https://techpilot.in"),
  alternates: {
  canonical: "https://techpilot.in",
},

  title: {
    default: "TechPilot | Tech Reviews, Guides & AI Insights",
    template: "%s | TechPilot",
  },

  description:
    "TechPilot brings honest technology reviews, AI guides, gaming PC builds, smartphone comparisons, software tutorials and the latest tech news.",

  keywords: [
    "TechPilot",
    "AI Tools",
    "Technology",
    "Gaming PC",
    "Smartphones",
    "Tech Reviews",
    "Windows 11",
    "ChatGPT",
    "Artificial Intelligence",
    "Buying Guide",
  ],

  authors: [
    {
      name: "Jayanta Singha",
    },
  ],

  creator: "Jayanta Singha",

  publisher: "TechPilot",
  
  openGraph: {
    title: "TechPilot",
    description:
      "Tech Reviews, Guides & AI Insights",
    url: "https://techpilot.in",
    siteName: "TechPilot",
    locale: "en_US",
    type: "website",
    images: [
    {
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "TechPilot",
    },
  ],
  },

  twitter: {
  card: "summary_large_image",

  title: "TechPilot",

  description:
    "Tech Reviews, Guides & AI Insights",

  images: ["/images/og-image.jpg"],
},

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={poppins.className}>

  <ThemeProvider>

    <Header />

    <main>{children}</main>

    <Footer />

  </ThemeProvider>

</body>
    </html>
  );
}