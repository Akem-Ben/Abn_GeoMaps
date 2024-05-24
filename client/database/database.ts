import mongoose from "mongoose";

let conn: typeof mongoose;

export const connectDB = async () => {
  if (conn) {
    return conn;
  } else {
    conn = await mongoose.connect("mongodb+srv://andaobong:8RhWB1aDgVSAtdr2@cluster0.twfwc1c.mongodb.net/abn_geomaps");
    console.log("Database connected");
    return conn;
  }
};