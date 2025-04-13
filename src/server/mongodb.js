import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/techstocksinsider";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Otherwise create a new connection
  await client.connect();
  const db = client.db("techstocksinsider");
  
  // Cache the connection
  cachedClient = client;
  cachedDb = db;
  
  console.log("Connected successfully to MongoDB");
  return { client, db };
}

// For testing the connection
export async function testConnection() {
  try {
    const { client } = await connectToDatabase();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection successfully established");
    return { success: true, message: "Connection successful" };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { success: false, error: error.message };
  }
}
