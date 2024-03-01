"use client";

import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/react";

export default function Home() {
  noStore();
  return <>1</>;
}
