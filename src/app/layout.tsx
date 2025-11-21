// REACTS
import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

// REDUX
import { ReduxProvider } from "@/stores";
import { ApiProvider } from "@/api/context/ApiContext";

// COMPONENTS
import HomeFooter from "./components/footer/footer";
import "./globals.css";

// FONTS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// METADATA
export const metadata: Metadata = {
  title: {
    default: "Yhusan Digital | TWS Audio Specialist",
    template: "%s | Yhusan Digital",
  },
  description:
    "Perbaikan TWS rusak dengan part original dan kualitas terbaik. Yhusan Digital, spesialis audio terpercaya.",
  keywords: [
    "Yhusan Digital",
    "TWS",
    "Audio",
    "Repair",
    "Sparepart",
    "Bluetooth Earphone",
    "Service TWS",
    "Servis",
    "Service",
    "Reparasi TWS",
    "Service TWS Bandung",
    "Servis TWS Bandung",
    "Service TWS Garut",
    "Servis TWS Garut",
    "Service TWS Jawa Barat",
    "Servis TWS Jawa Barat",
  ],
  authors: [
    { name: "Yhusan Digital Team", url: "https://www.yhusan-digital.com" },
  ],
  openGraph: {
    title: "Yhusan Digital | TWS Audio Specialist",
    description:
      "Layanan perbaikan TWS dengan part original dan garansi resmi.",
    url: "https://www.yhusan-digital.com",
    siteName: "Yhusan Digital",
    images: [
      {
        url: "https://www.yhusan-digital.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yhusan Digital",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yhusan Digital | TWS Audio Specialist",
    description: "Perbaikan TWS dengan part original dan hasil profesional.",
    images: ["https://yhusan-digital.com/images/og-image.jpg"],
    creator: "@yhusandigital",
  },
  alternates: {
    canonical: "https://yhusan-digital.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth">
      {/* <head>
        <link rel="icon" href="/favicon.ico" />
      </head> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ApiProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </ApiProvider>
          <HomeFooter />
        </AntdRegistry>
      </body>
    </html>
  );
}
