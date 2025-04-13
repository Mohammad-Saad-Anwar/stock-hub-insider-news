
import { MongoClient, ServerApiVersion } from 'mongodb';

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

// If in browser, provide mock implementations
if (isBrowser) {
  console.warn("MongoDB code is running in the browser. This is not recommended for production. Using mock data instead.");
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/techstocksinsider";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = !isBrowser ? new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}) : null;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If in browser environment, return mock connection
  if (isBrowser) {
    console.warn("Attempted MongoDB connection in browser environment. Using mock instead.");
    return { client: null, db: null };
  }

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
    // If in browser environment, return mock success
    if (isBrowser) {
      console.warn("Attempted MongoDB connection test in browser environment.");
      return { success: false, message: "MongoDB cannot be accessed directly from the browser" };
    }

    const { client } = await connectToDatabase();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection successfully established");
    return { success: true, message: "Connection successful" };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { success: false, error: error.message };
  }
}
