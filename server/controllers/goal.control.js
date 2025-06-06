import { Goal } from "../models/goal.model.js";

export const createGoal = async (req, res) => {
  try {
    const goal = req.body;

    if (!goal) {
      return res.status(400).json({
        message: "Please provide all the required fields",
        success: false,
      });
    }

    let newGoal = await Goal.create(goal);
    return res.status(200).json({
      message: "Goal created successfully",
      success: true,
      goal,
    });
  } catch (error) {
    console.log("unable to create goal");
    console.log(error);
  }
};

export const getAllGoals = async (req, res) => {
  try {
    const clerkId = req.params.id;
    const goals = await Goal.find({ clerkId });
    console.log("goals", goals);
    return res.status(200).json({
      message: "Goals retrieved successfully",
      success: true,
      goals,
    });
  } catch (error) {
    console.log("unable to create goal");
    console.log(error);
  }
};
