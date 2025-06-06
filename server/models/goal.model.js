import mongoose, { Types } from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now, required: true },
    isCompleted: { type: Types.ObjectId, ref: "Workout", default: null },
    exerciseList: [
      {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
        sets: [
          {
            weight: { type: Number, default: 1 },
            reps: { type: Number, default: 0 },
            completed: { type: Types.ObjectId, ref: "Workout", default: null },
          },
        ],
      },
    ],
  },

  { timestamps: true }
);

export const Goal = mongoose.model("goal", goalSchema);
