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
      <body className="min-h-screen bg-app-bg text-app-text">
        <AuthProvider>
          <TopBar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
        </AuthProvider>
      </body>

    </html>
  );
}
