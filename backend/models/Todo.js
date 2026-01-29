import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    boardId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Todo", todoSchema);