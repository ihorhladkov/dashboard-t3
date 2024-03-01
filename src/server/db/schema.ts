// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { boolean, integer, pgSchema, text, uuid } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const schema = pgSchema("schema");
// export const publicSchema = pgSchema("public");

export const customer = schema.table("customer", {
  customer_id: integer("customer_id"),
  is_bill_to: boolean("is_bill_to"),
  name: text("name"),
});

export const salesperson = schema.table("saleperson", {
  id: uuid("id").notNull().primaryKey(),
  code: text("code").notNull(),
  name: text("name"),
});

export const sale = schema.table("sale", {
  id: uuid("id").notNull().primaryKey(),
  bt_cust_id: integer("bt_cust_id"),
  saleperson: text("saleperson").notNull(),
  shipped_date: text("shipped_date"),
  ext_price: text("ext_price"),
});

// export const customer = eclipse.table("customer", {
//   customer_id: integer("customer_id"),
//   is_bill_to: boolean("is_bill_to"),
//   name: text("name"),
// });

// export const salesperson = publicSchema.table("salesperson", {
//   id: integer("id").notNull().primaryKey(),
//   code: text("code").notNull(),
//   name: text("name"),
// });
