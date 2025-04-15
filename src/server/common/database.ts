
import { MongoClient, Db, ServerApiVersion } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connect(): Promise<{ client: MongoClient, db: Db }> {
  if (client && db) {
    return { client, db };
  }

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/techstocksinsider";
  
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    db = client.db("techstocksinsider");
    
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  if (!db) {
    const { db: database } = await connect();
    return database;
  }
  
  return db;
}
