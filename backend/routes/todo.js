import express from "express";
import Todo from "../models/Todo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: false,
    boardId: req.body.boardId,
    userId: req.userId,
  });
  await todo.save();
  res.json(todo);
});

router.get("/:boardId", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ boardId: req.params.boardId });
  res.json(todos);
});

router.put("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, {
    completed: req.body.completed,
  });
  res.json("Updated");
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
