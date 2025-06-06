import { User } from "../models/user.model.js";
import { Workout } from "../models/workout.model.js";
import connectDB from "../utils/db.js";

export const createUser = async (req, res) => {
  const user = req.body;
  let newUser;
  try {
    newUser = await User.create({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      clerkId: user.clerkId,
      workouts: [],
    });
    console.log(newUser);
  } catch (error) {
    console.log("Unable to create user");
    console.log(error);
    return res
      .status(400)
      .json({ message: "Unable to create user", success: false });
  }
  return res
    .status(200)
    .json({ message: "user created", success: true, user: newUser });
};
export const createWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const userId = req.id;

    const user = await User.findById(userId);
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(400).json({
        message: "Workout does not exist",
        success: false,
      });
    }

    if (user.workouts.includes(workoutId)) {
      //remove workout from user
      await user.updateOne({ $pull: { workouts: workoutId } });
      await user.save();
      return res.status(200).json({
        message: "Workout removed from user",
        success: true,
      });
    } else {
      //add workout to user
      await user.updateOne({ $addToSet: { workouts: workoutId } });
      await user.save();
      return res.status(200).json({
        message: "Workout added to user",
        success: true,
      });
    }
  } catch (error) {
    console.log("unable to create workout");
    console.log(error);
  }
};

export const getWorkout = async (req, res) => {
  try {
    const clerkId = req.params.id;

    const user = await User.findOne({ clerkId }).populate("workouts");

    console.log(user);
    return res.status(200).json({
      message: "Workout retrieved successfully",
      success: true,
      user,
      workouts: user.workouts,
    });
  } catch (error) {
    console.log("unable to create workout");
    console.log(error);
  }
};
