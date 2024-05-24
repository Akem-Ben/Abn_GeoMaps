import mongoose from "mongoose";

let conn: typeof mongoose;

export const connectDB = async () => {
  if (!conn) {
    conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Database connected");
  }
  return conn;
};