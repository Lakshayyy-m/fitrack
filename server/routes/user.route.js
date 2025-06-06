import express from "express";

import { createUser, getWorkout } from "../controllers/user.controls.js";

const router = express.Router();

router.post("/createUser", createUser);

router.get("/get-workouts/:id", getWorkout);

export default router;
