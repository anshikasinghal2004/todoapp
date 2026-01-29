import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    title: String,
    userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Board", boardSchema);