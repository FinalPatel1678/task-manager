import Fastify from "fastify";
import connectDB from "./config/db";
import cors from "@fastify/cors";
import taskRoutes from "./routes/taskRoutes";

const server = Fastify({ logger: true });

// Configure CORS
server.register(cors, {
  origin: "*", // Allows requests from any origin. For production, specify allowed origins.
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods.
});

connectDB(server);

server.register(taskRoutes, { prefix: "/tasks" });

server.listen({ port: 3004 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`Server listening at ${address}`);
});
