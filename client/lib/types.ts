import { Types } from "mongoose";

export interface Exercise {
  _id: Types.ObjectId;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Workout {
  _id: Types.ObjectId;
  name: string;
  description: string;
  totalVolume: number;
  hasEnded: boolean;
  exerciseList: {
    exercise: Types.ObjectId;
    sets: { weight: number; reps: number; completed: boolean }[];
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  clerkId: string;
  workouts: Workout[];
  createdAt?: Date;
  updatedAt?: Date;
}
