import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '../../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
dotenv.config({ path: '.env' })

console.log(process.env)
console.log('logged In')
if (!process.env.DATABASE_URL) {
  console.log('no database url')
}

// Database Setup
// sync the schema with supabase database schema
const client = postgres(process.env.DATABASE_URL as string, { max: 10 })
const db = drizzle(client, { schema })
const migrateDb = async () => {
  try {
    console.log('Migrating Client')
    await migrate(db, { migrationsFolder: 'migrations' })
    console.log('Successfully Migrated the Client')
  } catch (error) {
    console.log('Error Migrating the Client', error)
  }
}

migrateDb()
export default db
