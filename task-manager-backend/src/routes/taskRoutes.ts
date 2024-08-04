import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";
import Task from "../models/task";

interface Params {
  id: string;
}

interface TaskData {
  title: string;
  description?: string;
}

const taskRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { page = 1, limit = 10 } = request.query as { page?: number; limit?: number };
      const skip = (page - 1) * limit;
      const tasks = await Task.find().skip(skip).limit(limit);
      const totalTasks = await Task.countDocuments();
      reply.send({
        tasks,
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page,
      });
    } catch (err) {
      reply.status(500).send({ error: "Failed to fetch tasks" });
    }
  });

  fastify.post("/", async (request: FastifyRequest<{ Body: TaskData }>, reply: FastifyReply) => {
    try {
      const task = new Task(request.body);
      await task.save();
      reply.status(201).send(task);
    } catch (err) {
      reply.status(400).send({ error: "Failed to create task" });
    }
  });

  fastify.put("/:id", async (request: FastifyRequest<{ Params: Params; Body: TaskData }>, reply: FastifyReply) => {
    try {
      const task = await Task.findByIdAndUpdate(request.params.id, request.body as Partial<TaskData>, { new: true });
      if (!task) {
        return await reply.status(404).send({ error: "Task not found" });
      }
      reply.send(task);
    } catch (err) {
      reply.status(400).send({ error: "Failed to update task" });
    }
  });

  fastify.delete("/:id", async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    try {
      const task = await Task.findByIdAndDelete(request.params.id);
      if (!task) {
        return await reply.status(404).send({ error: "Task not found" });
      }
      reply.send({ message: "Task deleted" });
    } catch (err) {
      reply.status(500).send({ error: "Failed to delete task" });
    }
  });
};

export default taskRoutes;
