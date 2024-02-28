import mongoose from "mongoose";

const DB_URL = "mongodb://127.0.0.1:27017";
export const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URL}/URL_SHORTNER`);
    console.log("🟢 MONGODB CONNECTED");
  } catch (error) {
    console.error("🔴 MONGODB CONNECTION FAILED", error);
    process.exit(1);
  }
};
