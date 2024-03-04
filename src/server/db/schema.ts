// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  integer,
  pgSchema,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const eclipseSchema = pgSchema("eclipse");

export const customer = eclipseSchema.table("customer", {
  customer_id: integer("customer_id"),
  is_bill_to: boolean("is_bill_to"),
  name: text("name"),
});

export const salesperson = pgTable("salesperson", {
  id: integer("id").notNull().primaryKey(),
  code: text("code").notNull(),
  name: text("name"),
});

export const sale = pgTable("sale", {
  id: uuid("id").notNull().primaryKey(),
  bt_cust_id: text("bt_cust_id"),
  salesperson: text("salesperson").notNull(),
  shipped_date: text("shipped_date"),
  ext_price: text("ext_price"),
});
