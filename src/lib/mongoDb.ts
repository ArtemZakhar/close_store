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
