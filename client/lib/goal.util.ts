export const getAllGoalWorkouts = async (clerkId: string) => {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/api/goal/get-all-goals/${clerkId}`,
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
