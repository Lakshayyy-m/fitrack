import express from "express";
import { createGoal, getAllGoals } from "../controllers/goal.control.js";

const router = express.Router();

//create goal
router.post("/create-goal", createGoal);

//get all goals
router.get("/get-all-goals/:id", getAllGoals);

export default router;
