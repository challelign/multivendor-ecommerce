"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-5xl font-semibold">Funroad</h1>
          <p className="text-lg">
            Funroad is a multi-vendor ecommerce platform <br />
            User-name: {JSON.stringify(data?.user, null, 2)}
          </p>
        </div>
      </div>
    </div>
  );
}
