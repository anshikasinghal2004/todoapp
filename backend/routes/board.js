import express from "express";
import Board from "../models/Board.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const board = new Board({ title: req.body.title, userId: req.userId });
  await board.save();
  res.json(board);
});

router.get("/", authMiddleware, async (req, res) => {
  const boards = await Board.find({ userId: req.userId });
  res.json(boards);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
