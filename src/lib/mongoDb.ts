import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (e) {
    console.log(e);
    console.log('failed to connect to DB');
  }
};

let client: MongoClient | null = null;

export const connectToAuthDatabase = async (): Promise<MongoClient> => {
  if (client) return client;

  client = new MongoClient(process.env.MONGO_URL as string);
  await client.connect();
  return client;
};
