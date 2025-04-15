// This file handles MongoDB connections
// It detects browser environments and provides mock functionality when needed

// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

// Only import MongoDB in server environments
let MongoClient, ServerApiVersion;
if (!isBrowser) {
  try {
    const mongodb = require('mongodb');
    MongoClient = mongodb.MongoClient;
    ServerApiVersion = mongodb.ServerApiVersion;
  } catch (error) {
    console.error("Failed to import MongoDB. This is expected in browser environments.");
  }
}

// URI from environment variable or default (for local development)
const uri = !isBrowser && process.env.MONGODB_URI 
  ? process.env.MONGODB_URI 
  : "mongodb://localhost:27017/techstocksinsider";

// Only create a client in server environments
const client = !isBrowser && MongoClient ? new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion?.v1,
    strict: true,
    deprecationErrors: true,
  }
}) : null;

let cachedClient = null;
let cachedDb = null;

/**
 * Connect to the MongoDB database
 * Returns mock data in browser environments
 */
export async function connectToDatabase() {
  // If in browser environment, return mock connection
  if (isBrowser) {
    console.warn("MongoDB cannot connect in browser environments. Using mock data instead.");
    return { client: null, db: null };
  }

  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // Otherwise create a new connection
    await client.connect();
    const db = client.db("techstocksinsider");
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    console.log("Connected successfully to MongoDB");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return { client: null, db: null };
  }
}

/**
 * Test the MongoDB connection
 * Returns mock results in browser environments
 */
export async function testConnection() {
  // If in browser environment, return mock result
  if (isBrowser) {
    console.warn("MongoDB connections cannot be tested in browser environments");
    return { 
      success: false, 
      message: "MongoDB operations are not available in the browser. This would work in a server environment."
    };
  }

  try {
    const { client } = await connectToDatabase();
    if (!client) {
      throw new Error("Failed to initialize MongoDB client");
    }
    
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection successfully established");
    return { success: true, message: "Connection successful" };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error connecting to MongoDB" 
    };
  }
}
