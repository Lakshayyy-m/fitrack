import { Exercise } from "../models/exercise.model.js";
import { User } from "../models/user.model.js";
import { Workout } from "../models/workout.model.js";

export const startWorkout = async (req, res) => {
  try {
    const clerkId = req.params.id; // Assuming the user ID is passed in the URL

    // Step 1: Create a new workout
    const newWorkout = await Workout.create({});

    // Step 2: Add the workout ID to the user's workouts array
    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        $addToSet: { workouts: newWorkout._id },
        hasActiveWorkout: newWorkout._id,
      }, // $addToSet will prevent duplicate IDs
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Workout started successfully",
      success: true,
      workout: newWorkout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while starting the workout",
      success: false,
    });
  }
};

export const cancelWorkout = async (req, res) => {
  const clerkId = req.params.id;
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workoutId = user.hasActiveWorkout;

    await User.findOneAndUpdate(
      { clerkId },
      {
        $set: { hasActiveWorkout: null },
        $pull: { workouts: workoutId },
      },
      { new: true }
    );
    await Workout.findByIdAndDelete(workoutId);

    return res.status(200).json({
      message: "Workout cancelled successfully",
      success: true,
      user,
      workouts: user.workouts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while cancelling the workout",
      success: false,
    });
  }
};

export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    return res.status(200).json({
      message: "All exercises retrieved successfully",
      success: true,
      exercises,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving all exercises",
      success: false,
    });
  }
};

export const getExercise = async (req, res) => {
  const exerciseId = req.params.id;
  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Exercise retrieved successfully",
      success: true,
      exercise,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving exercise",
      success: false,
    });
  }
};

export const addExerciseToWorkout = async (req, res) => {
  const clerkId = req.params.id;
  const { exerciseId } = req.body;
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workout = await Workout.findById(user.hasActiveWorkout);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
        success: false,
      });
    }

    workout.exerciseList.push({
      exercise: exerciseId,
      sets: [{ weight: 1, reps: 0 }],
    });

    await workout.save();

    return res.status(200).json({
      message: "Exercise added to workout",
      success: true,
      workout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while adding exercise to workout",
      success: false,
    });
  }
};

export const completeSet = async (req, res) => {
  const clerkId = req.params.id;
  const { exerciseId, setIndex, weight, reps } = req.body;
  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workout = await Workout.findById(user.hasActiveWorkout);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
        success: false,
      });
    }

    workout.exerciseList.map((exercise, index) => {
      if (exercise.exercise.toString() === exerciseId) {
        exercise.sets[setIndex].weight = weight;
        exercise.sets[setIndex].reps = reps;
        exercise.sets[setIndex].completed = true;
      }
    });

    await workout.save();

    return res.status(200).json({
      message: "Set added to exercise",
      success: true,
      workout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while adding set to exercise",
      success: false,
    });
  }
};

export const createSet = async (req, res) => {
  const clerkId = req.params.id;
  const { exerciseId } = req.body;

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workout = await Workout.findById(user.hasActiveWorkout);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
        success: false,
      });
    }

    workout.exerciseList.map((exercise, index) => {
      if (exercise.exercise.toString() === exerciseId) {
        exercise.sets.push({ weight: 0, reps: 0 });
      }
    });

    await workout.save();

    return res.status(200).json({
      message: "Set added to exercise",
      success: true,
      workout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while adding set to exercise",
      success: false,
    });
  }
};

export const removeExercise = async (req, res) => {
  const clerkId = req.params.id;
  const { exerciseId } = req.body;

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workout = await Workout.findById(user.hasActiveWorkout);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
        success: false,
      });
    }

    workout.exerciseList.map((exercise, index) => {
      if (exercise.exercise.toString() === exerciseId) {
        workout.exerciseList.splice(index, 1);
      }
    });

    await workout.save();

    return res.status(200).json({
      message: "Exercise removed from workout",
      success: true,
      workout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while removing exercise from workout",
      success: false,
    });
  }
};

export const completeWorkout = async (req, res) => {
  const clerkId = req.params.id;

  try {
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const workout = await Workout.findById(user.hasActiveWorkout);

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
        success: false,
      });
    }

    workout.exerciseList.map((exercise, index) => {
      exercise.sets.map((set, setIndex) => {
        if (!set.completed) {
          //remove incomplete sets
          workout.exerciseList[index].sets.splice(setIndex, 1);
        }
      });
    });

    workout.hasEnded = true;
    workout.totalVolume = workout.exerciseList.reduce(
      (acc, curr) =>
        acc + curr.sets.reduce((acc, curr) => acc + curr.weight * curr.reps, 0),
      0
    );
    user.hasActiveWorkout = null;
    await workout.save();
    await user.save();

    return res.status(200).json({
      message: "Workout completed",
      success: true,
      workout,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while completing workout",
      success: false,
    });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const clerkId = req.params.id;
    const limit = parseInt(req.query.quantity, 10) || null; // Fetch the limit from query params, default to null if not provided);
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Fetch workouts directly using the workout IDs stored in the user document
    let query = Workout.find({ _id: { $in: user.workouts } }).sort({
      createdAt: -1,
    });

    if (limit) {
      query = query.limit(limit);
    }

    const workouts = await query.exec();

    return res.status(200).json({
      message: "Workouts retrieved successfully",
      success: true,
      workouts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while retrieving workouts",
      success: false,
    });
  }
};
