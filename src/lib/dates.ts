import { Timestamp } from "firebase/firestore";

export function createdAtToMillis(value: unknown): number | null {
  if (!value) return null;

  if (value instanceof Date) return value.getTime();
  if (value instanceof Timestamp) return value.toMillis();

  if (typeof value === "string") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.getTime();
  }

  return null;
}

export function formatCreatedAt(value: unknown): string {
  const ms = createdAtToMillis(value);
  if (!ms) return "";
  return new Date(ms).toLocaleString();
}
