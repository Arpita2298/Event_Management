"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname ?? "/")}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
