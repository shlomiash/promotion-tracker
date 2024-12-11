//Here we will connect to our drizzle ORM and create a connection to our database

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "@/server/db/schema"

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DATABASE_URL!);
console.log(sql);
export const db = drizzle({ client: sql ,schema });