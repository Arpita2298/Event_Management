"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace(next);
    }
  }, [loading, user, router, next]);

  async function handleGoogleLogin() {
    setError(null);
    setSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const u = result.user;

      await setDoc(
        doc(db, "users", u.uid),
        {
          uid: u.uid,
          name: u.displayName || "",
          email: u.email || "",
          photoURL: u.photoURL || "",
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      router.replace(next);
    } catch (e) {
      setError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold">Login</div>
        <div className="text-sm text-gray-600 mt-1">
          Sign in with Google to continue.
        </div>

        {error ? (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="mt-5 w-full rounded-lg bg-gray-900 text-white py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Continue with Google"}
        </button>

        <div className="mt-4 text-xs text-gray-500">
          After login, your profile is stored in Firestore.
        </div>
      </div>
    </div>
  );
}
