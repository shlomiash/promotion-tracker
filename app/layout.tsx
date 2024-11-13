import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/components/query/provider";

import NavBarClient from "@/components/nav/navbar-client";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Promotion Tracker",
  description: "Created By Shlomi Ashkenazi",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        <div className="max-w-6xl mx-auto ">
          {/* ReactQuery Provider */}
          <Provider>
            <NavBarClient />
            {children}
          </Provider>
        </div>
        
      </body>
    </html>
  );
}
