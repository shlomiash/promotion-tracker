//Here we will create our database schemas 

import { pgTable, serial, text, integer, boolean, date,timestamp,primaryKey } from "drizzle-orm/pg-core";

//----------AUTH SCHEMA----------------
export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }).defaultNow(),
    password:text("password"),
    image: text("image"),
  })
   
//----------DISCOUNTS TABLE SCHEMA----------------
export const discounts = pgTable("discounts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  limits: integer("limits"), 
  amount: integer("amount").notNull(),
  userCreatedId: integer("user_created_id").notNull(),
  note: text("note"),
  createdAt: timestamp("emailVerified", { mode: "date" }).notNull(),
  expires: date("expires"), 
  canBeCombined: boolean("can_be_combined").notNull(),
  active: boolean("active").notNull(),
  isFixed: boolean("is_fixed").notNull(),
});