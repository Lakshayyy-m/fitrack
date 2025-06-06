import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    clerkId: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    currentWeight: { type: Number, default: "" },
    height: { type: Number, default: "" },
    goalWeight: { type: Number, default: "" },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
    hasActiveWorkout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
