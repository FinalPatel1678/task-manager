import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

const connectDB = async (server: FastifyInstance) => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    server.log.info("MongoDB connected successfully");
  } catch (error: any) {
    server.log.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
