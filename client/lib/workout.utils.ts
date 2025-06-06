import { Types } from "mongoose";

export const getWorkout = async (clerkId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/user/get-workouts/${clerkId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const startWorkout = async (clerkId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/start-workout/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const cancelWorkout = async (clerkId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/cancel-workout/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getAllExercises = async () => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/get-all-exercises`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getExercise = async (exerciseId: Types.ObjectId) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/get-exercise/${exerciseId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const addExercise = async (
  clerkId: string,
  exerciseId: Types.ObjectId
) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/add-exercise/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exerciseId: exerciseId.toString() }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const addSet = async (
  clerkId: string,
  exerciseId: Types.ObjectId,
  setIndex: number,
  weight: number,
  reps: number
) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/complete-set/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exerciseId: exerciseId.toString(),
        setIndex: setIndex,
        weight: weight,
        reps: reps,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const createSet = async ({
  clerkId,
  exerciseId,
}: {
  clerkId: string;
  exerciseId: Types.ObjectId;
}) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/create-set/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exerciseId: exerciseId.toString() }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const removeExercise = async ({
  clerkId,
  exerciseId,
}: {
  clerkId: string;
  exerciseId: Types.ObjectId;
}) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/remove-exercise/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exerciseId: exerciseId.toString() }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const completeWorkout = async (clerkId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/complete-workout/${clerkId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getWorkouts = async (clerkId: string, quantity?: number) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/workout/get-workouts/${clerkId}?quantity=${quantity}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
