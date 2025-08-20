

// lib/mongodb.ts
import mongoose, { Mongoose } from "mongoose";

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

const uri: string = getEnvVar("DATABASE_URL");


declare global {
 
  var _mongoose: Promise<Mongoose> | undefined;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (global._mongoose) return global._mongoose;

  try {
    global._mongoose = mongoose.connect(uri, {
      
      serverSelectionTimeoutMS: 10000, 
      ssl: true,
    });
    await global._mongoose;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  return global._mongoose;
};
