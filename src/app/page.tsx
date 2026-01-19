"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { TopNav } from "@/components/TopNav";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";

export default function HomePage() {
  return (
    <RequireAuth>
      <TopNav />
      <CreateEvent />
    </RequireAuth>
  );
}

function CreateEvent() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!user) return;

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!trimmedTitle || !trimmedDesc) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "events"), {
        title: trimmedTitle,
        description: trimmedDesc,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      router.push("/events");
    } catch (e) {
      setError("Could not create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-lg font-semibold">Create Event</div>
        <div className="text-sm text-gray-600 mt-1">
          Add an event title and description.
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">
              Event Title
            </label>
            <input
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="e.g. Tech Meetup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              Event Description / About Event
            </label>
            <textarea
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              className="mt-2 w-full min-h-[120px] rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
              placeholder="Write a short description..."
            />
          </div>

          {error ? (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-lg bg-gray-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
