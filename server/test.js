import mongoose from "mongoose";
import { Exercise } from "./models/exercise.model.js";

const muscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];
let count = 0;
const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://Lakshay:8IWMLJ3P@cluster0.8obaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Ensure this is defined in your environment
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("error: database not connected");
    console.log(error);
  }
};

await connectDB();
const db = mongoose.connection;
const indexes = await db.collection("workouts").indexes();
console.log("Indexes:", indexes);
// muscleGroups.forEach(async (item) => {
//   const response = await fetch(
//     "https://api.api-ninjas.com/v1/exercises?muscle=" + item,
//     {
//       headers: {
//         "X-Api-Key": "AVArcaDPmEbOzBCn8FBIow==qJPEKKGGVv2U1ikw",
//       },
//     }
//   );
//   const data = await response.json();
//   data.forEach(async (item) => {
//     try {
//       const newExercise = await Exercise.create({
//         ...item,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   console.log(++count);
// });
