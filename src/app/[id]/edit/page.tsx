import {notFound} from "next/navigation";
import {Suspense} from "react";

import UserRow from "./user-row.client";

import api from "@/api";

export const dynamic = "force-dynamic";

export default async function IdEditPage({params: {id}}: {params: {id: string}}) {
  const cultivation = api.cultivation.fetch(id);
  const users = api.cultivation.user.list(id);
  const roles = api.cultivation.role.list();

  if (!cultivation) notFound();

  return (
    <div className="grid gap-4">
      <h1 className="flex items-center gap-2 text-2xl">
        Team for{" "}
        <Suspense
          fallback={<div className="h-8 w-72 animate-pulse rounded-sm bg-neutral-500/20" />}
        >
          {cultivation.then((cultivation) => (
            <span className="font-bold">{cultivation!.name}</span>
          ))}
        </Suspense>
      </h1>

      <Suspense
        fallback={
          <div className="grid gap-1">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-sm bg-neutral-500/20" />
            ))}
          </div>
        }
      >
        {Promise.all([cultivation, users, roles]).then(([cultivation, users, roles]) =>
          users.length ? (
            <table>
              <thead className="text-left">
                <tr className="border-b leading-10">
                  <th>Name</th>
                  <th>Role</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={String(user.user.id[0])}
                    canEdit={user.role.id !== 1}
                    cultivationId={cultivation!.id}
                    roles={roles}
                    user={user}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-4 text-center text-foreground/50">No users for this cultivation</div>
          ),
        )}
      </Suspense>
    </div>
  );
}
