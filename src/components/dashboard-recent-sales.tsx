"use client";

import { RouterOutputs } from "~/trpc/shared";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function RecentSales({
  customers,
}: {
  customers:
    | RouterOutputs["postRouter"]["getSalepersonDetails"]["customers"]
    | undefined;
}) {
  return (
    <div className="space-y-8">
      {customers?.map((customer) => (
        <div key={customer.sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {customer.customer?.name}
            </p>
          </div>
          <div className="ml-auto font-medium">${customer.sale.ext_price}</div>
        </div>
      ))}
    </div>
  );
}
