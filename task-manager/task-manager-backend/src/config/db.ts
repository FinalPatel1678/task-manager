import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

const uri = "mongodb://admin:password@localhost:27017/admin";
const connectDB = async (server: FastifyInstance) => {
  try {
    await mongoose.connect(uri);
    server.log.info("MongoDB connected successfully");
  } catch (error: any) {
    server.log.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
