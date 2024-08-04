import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description?: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
