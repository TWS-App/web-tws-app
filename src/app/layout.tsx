import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/stores";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import HomeFooter from "./components/footer/footer";
import { ApiProvider } from "@/api/context/ApiContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YUSAN STORE App",
  description: "App for your dedicated services",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

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
