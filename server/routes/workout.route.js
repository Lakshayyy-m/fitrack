import express from "express";

import {
  addExerciseToWorkout,
  cancelWorkout,
  completeSet,
  completeWorkout,
  createSet,
  getAllExercises,
  getExercise,
  getWorkouts,
  removeExercise,
  startWorkout,
} from "../controllers/workout.control.js";

const router = express.Router();

// Workout creation route for a specific user
router.post("/start-workout/:id", startWorkout);

// Workout cancellation route for a specific user
router.post("/cancel-workout/:id", cancelWorkout);

//get all exercises
router.get("/get-all-exercises", getAllExercises);

//get exercise by id
router.get("/get-exercise/:id", getExercise);

//add exercise to workout
router.post("/add-exercise/:id", addExerciseToWorkout);

//complete set
router.post("/complete-set/:id", completeSet);

//create set
router.post("/create-set/:id", createSet);

//remove exercise
router.post("/remove-exercise/:id", removeExercise);

//complete workout
router.post("/complete-workout/:id", completeWorkout);

//get workouts
router.get("/get-workouts/:id", getWorkouts);

// Export the router
export default router;
