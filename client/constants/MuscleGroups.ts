// File: OneDrive\Desktop\Work\Semester 5\CIS_370\Fitrack\client\constants\MuscleGroups.ts

export const muscleGroups = [
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

export const formattedMuscleGroups = muscleGroups.map((muscle) => ({
  label: muscle
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
  value: muscle,
}));
