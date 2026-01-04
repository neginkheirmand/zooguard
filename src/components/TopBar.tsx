"use client";
import Link from "next/link";

function DoorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 3h10v18H7V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7 21H5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 21h-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export default function TopBar() {
  return (
    <header className="bg-neutral-700 text-white">
      <div className="w-full flex items-center justify-between py-4 px-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:opacity-90"
        >
          ZooGuard
        </Link>

        <button
          type="button"
          className="p-2 rounded hover:bg-white/10"
          aria-label="Account"
          title="Account"
          onClick={() => {
            // later: open login/logout menu
          }}
        >
          <DoorIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
