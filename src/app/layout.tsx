import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";


export const metadata: Metadata = {
  title: "ZooGuard",
  description: "ZooKeeper navigator UI",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
