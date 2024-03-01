import { TRPCError } from "@trpc/server";
import { and, between, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { customer, sale, salesperson } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  getCustomers: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.customer.findMany();

    return data;
  }),

  getSalesPersons: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.salesperson.findMany();

    return data;
  }),

  getSalepersonDetails: publicProcedure
    .input(
      z.object({
        id: z.number(),
        from: z.string().optional(),
        to: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const salespersonDetails = await ctx.db.query.salesperson.findFirst({
        where: eq(salesperson.id, input.id),
      });

      if (!salespersonDetails) {
        throw new TRPCError({ code: "NOT_FOUND", message: "error" });
      }

      const salepersonTotalCount = await ctx.db
        .select({
          totalRevenue: sql<number>`sum(cast(ext_price as float))`,
          totalSales: sql<number>`count(*)`,
          averagePrice: sql<number>`avg(cast(ext_price as float))`,
        })
        .from(sale)
        .where(
          and(
            input.from !== undefined && input.to !== undefined
              ? between(
                  sql`cast(${sale.shipped_date} as date)`,
                  `${input.from}`,
                  `${input.to}`,
                )
              : sql`true`,
            eq(sale.salesperson, salespersonDetails.code),
          ),
        );

      const sales = await ctx.db
        .select()
        .from(sale)
        .orderBy(desc(sale.shipped_date))
        .limit(5)
        .leftJoin(
          customer,
          sql`cast(${sale.bt_cust_id} as integer) = ${customer.customer_id}`,
        )
        .where(sql`${sale.salesperson} IN (${salespersonDetails.code?.toString()})`)
        .groupBy(sale.id, customer.customer_id);

      const totalByYear = await ctx.db
        .select({
          year: sql<string>`EXTRACT(YEAR FROM ${sale.shipped_date}::date)::text`,
          totalPrice: sql<number>`sum(cast(${sale.ext_price} as float))`,
        })
        .from(sale)
        .where(
          and(
            input.from !== undefined && input.to !== undefined
              ? between(
                  sql`cast(${sale.shipped_date} as date)`,
                  `${input.from}`,
                  `${input.to}`,
                )
              : sql`true`,
            eq(sale.salesperson, salespersonDetails.code),
            sql`cast(${sale.shipped_date} as date) > date_trunc('year', current_date) - interval '11 year' + interval '1 year'`,
            sql`cast(${sale.shipped_date} as date) <= date_trunc('year', current_date)`,
          ),
        )
        .groupBy(({ year }) => year);

      return {
        totalByYear,
        customers: sales,
        salespersonDetails,
        totalRevenue: salepersonTotalCount[0]?.totalRevenue,
        totalSales: salepersonTotalCount[0]?.totalSales,
        averagePrice: salepersonTotalCount[0]?.averagePrice,
      };
    }),
});
