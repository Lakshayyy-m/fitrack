import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    totalVolume: { type: Number, default: 0 },
    hasEnded: { type: Boolean, default: false },
    hasGoalWorkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null,
    },
    exerciseList: [
      {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: [
          {
            weight: { type: Number, default: 1 },
            reps: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
