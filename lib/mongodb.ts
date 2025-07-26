import mongoose from "mongoose";

// Global is used here to maintain a cached connection across hot reloads
// in development. This prevents connections growing exponentially
// during API Route usage.
declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(dbName?: string) {
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Build connection string with optional database name
    const encodedDbName = dbName ? encodeURIComponent(dbName) : encodeURIComponent("Course1_c++");
    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.j9gms.mongodb.net/${encodedDbName}?retryWrites=true&w=majority&appName=Cluster0`;

    console.log("🚀 Connecting to MongoDB...");
    cached.promise = mongoose.connect(connectionString, opts).then((mongoose) => {
      console.log("✅ Successfully connected to MongoDB.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
