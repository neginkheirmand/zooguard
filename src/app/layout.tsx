import "./globals.css";
import TopBar from "@/components/TopBar";
import { AuthProvider } from "@/components/AuthProvider";
import { ZkSelectionProvider } from "@/components/ZkSelectionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <ZkSelectionProvider>
            <TopBar />
            <main>{children}</main>
          </ZkSelectionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
