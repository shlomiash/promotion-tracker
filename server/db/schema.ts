//Here we will create our database schemas 

import { pgTable, serial, text, integer, boolean, date,timestamp,primaryKey } from "drizzle-orm/pg-core";

// import postgres from "postgres"
// import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"

//----------AUTH SCHEMA----------------
export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    password:text("password"),
    image: text("image"),
  })
   
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )



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