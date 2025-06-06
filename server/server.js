import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import { urlencoded } from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import workoutRoute from "./routes/workout.route.js";
import goalRoute from "./routes/goal.route.js";
import connectDB from "./utils/db.js";
// import connectDB from './utils/db.js'
// import userRoute from './routes/user.route.js'

const app = express();

const PORT = process.env.PORT || 3000;

await connectDB();

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "coming from backend",
    success: true,
  });
});

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "http://localhost:5173",
//   Credentials: true,
// };
// app.use(cors(corsOptions));

// calling our APIs -->
// app.use("/api/v1/user", userRoute);

//user routes
app.use("/api/user", userRoute);
//workout routes
app.use("/api/workout", workoutRoute);
//goal routes
app.use("/api/goal", goalRoute);
app.get("/test", (req, res) => {
  console.log("reaching test");
  return res.json({ message: "test successful" });
});

app.listen(PORT, () => {
  // connectDB();
  console.log(`Server listening at port ${PORT}`);
});
