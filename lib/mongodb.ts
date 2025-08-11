
import mongoose, { Mongoose } from "mongoose";
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

const uri = getEnvVar("DATABASE_URL");


if (!uri) {
  throw new Error("❌ Please set MONGODB_URI in your .env file");
}

// Extend global type for caching in dev
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

// Initialize cache if not already set
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(uri).then((m) => m);
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}
