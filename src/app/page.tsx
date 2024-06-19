import Link from "next/link";
import {Suspense} from "react";

import api from "@/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cultivations = api.cultivation.list();

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Cultivations</h1>
      <Suspense
        fallback={
          <div className="grid gap-1">
            {Array.from({length: 24}).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-sm bg-neutral-500/20" />
            ))}
          </div>
        }
      >
        <ul>
          {cultivations.then((cultivations) =>
            cultivations.map((cultivation) => (
              <li
                key={cultivation.id}
                className="flex items-center justify-between gap-4 border-b leading-10"
              >
                <span>{cultivation.name}</span>
                <Link
                  className="text-sm text-foreground/60 underline"
                  href={`/${cultivation.id}/edit`}
                >
                  Edit
                </Link>
              </li>
            )),
          )}
        </ul>
      </Suspense>
    </div>
  );
}
