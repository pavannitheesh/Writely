import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Modalprovider } from "@/components/providers/modal-provider";
import { EdgeStoreProvider } from '../lib/edgestore';

import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Writely",
  description: "Writely is a note-taking and collaboration application.",
  icons: {
    icon: [
      {
        url: "/Notion-logo.svg",
        href: "/Notion-logo.svg",
      }
    ]
   
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <EdgeStoreProvider>
        <ConvexClientProvider>

        <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
              <Toaster position="bottom-center"/>
              <Modalprovider/>
        {children}
             
        </ThemeProvider>
              </ConvexClientProvider>
              </EdgeStoreProvider>
      </body>
    </html>
  );
}
