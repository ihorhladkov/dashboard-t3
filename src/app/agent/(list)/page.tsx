"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function SalespersonList() {
  const {data} = api.postRouter.getSalesPeople.useQuery()

  console.log(data)

  const {data: customer} = api.postRouter.getCustomers.useQuery()

  console.log(customer)

  return (
    <div className="mx-auto flex w-full flex-col gap-2 ">
      {data?.map((person) => (
        <Link key={person.id} href={`agent/${person.id}`}>
          <Card
            className="w-full max-w-[640px] hover:bg-slate-50"
            key={person.id}
          >
            <CardContent className="flex items-center justify-center">
              <CardTitle>{person.name}</CardTitle>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
