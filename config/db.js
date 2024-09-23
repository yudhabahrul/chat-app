import mongoose from "mongoose";

const connectDB = async () => {
  const mongodb_connect_uri = process.env.MONGODB_CONNECT_URI;
  try {
    await mongoose.connect(mongodb_connect_uri);
  } catch (err) {}
};

export default connectDB;
