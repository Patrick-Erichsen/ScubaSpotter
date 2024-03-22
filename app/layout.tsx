"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Scuba Spotter",
//   description: "Learn about your underwater photos",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Header />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
