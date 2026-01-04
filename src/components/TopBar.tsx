import Link from "next/link";

export default function TopBar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80">
          ZooGuard
        </Link>
      </div>
    </header>
  );
}
