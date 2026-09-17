import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoraSpirit Member Availability Dashboard",
  description: "Check member availability and manage your team commitments for any date.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
