import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppBar from "@/components/AppBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Blog app with NextJS & Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-screen">
      <body className={inter.className}>
        <Providers>
          <Toaster position="bottom-right" />

          <main className="flex h-screen flex-col">
            <AppBar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
