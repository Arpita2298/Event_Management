"use client";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { TopNav } from "@/components/TopNav";
import { useAuth } from "@/components/AuthProvider";
import { db } from "@/lib/firebase";
import { createdAtToMillis, formatCreatedAt } from "@/lib/dates";

type EventDoc = {
  id: string;
  title: string;
  description: string;
  createdAt?: unknown;
};

export default function EventsPage() {
  return (
    <RequireAuth>
      <TopNav />
      <EventsList />
    </RequireAuth>
  );
}

function EventsList() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const eventsQuery = useMemo(() => {
    if (!user) return null;
    return query(collection(db, "events"), where("userId", "==", user.uid));
  }, [user]);

  useEffect(() => {
    if (!eventsQuery) return;

    const unsub = onSnapshot(
      eventsQuery,
      (snap) => {
        const items: EventDoc[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            title: data.title || "",
            description: data.description || "",
            createdAt: data.createdAt,
          };
        });

        items.sort((a, b) => {
          const am = createdAtToMillis(a.createdAt) ?? 0;
          const bm = createdAtToMillis(b.createdAt) ?? 0;
          return bm - am;
        });

        setEvents(items);
        setLoading(false);
      },
      () => {
        setEvents([]);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [eventsQuery]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">My Events</div>
          <div className="text-sm text-gray-600 mt-1">
            All events created by your account.
          </div>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="text-sm font-medium text-gray-900">
              No events yet
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Create your first event from the Create page.
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold text-gray-900">
                      {ev.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                      {ev.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {formatCreatedAt(ev.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
