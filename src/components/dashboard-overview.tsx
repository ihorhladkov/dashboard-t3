"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RouterOutputs } from "~/trpc/shared";

export function Overview({
  totalByYear,
}: {
  totalByYear: RouterOutputs["postRouter"]["getSalepersonDetails"]["totalByYear"] | undefined;
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart width={150} height={40} data={totalByYear}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalPrice" fill="#000000" />
      </BarChart>
    </ResponsiveContainer>
  );
}
