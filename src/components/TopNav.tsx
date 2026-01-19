"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm px-3 py-2 rounded-md ${
        active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}

export function TopNav() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-gray-900">
            Event Management
          </div>
          <div className="hidden sm:flex items-center gap-1 ml-2">
            <NavLink href="/" label="Create" />
            <NavLink href="/events" label="My Events" />
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-gray-700 truncate max-w-[240px]">
              {user.displayName || user.email}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className="sm:hidden border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-4 h-12 flex items-center gap-2">
          <NavLink href="/" label="Create" />
          <NavLink href="/events" label="My Events" />
        </div>
      </div>
    </header>
  );
}
