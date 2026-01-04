import "./globals.css";
import TopBar from "@/components/TopBar";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata = {
  title: "ZooGuard",
  description: "ZooKeeper navigator UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <AuthProvider>
          <TopBar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
