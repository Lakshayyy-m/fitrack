import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { set, Types } from "mongoose";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";
import { getExercise } from "@/lib/workout.utils";
import { Exercise } from "@/lib/types";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

const ExerciseDisplay = ({
  exerciseId,
  sets,
  completeSet,
  createSet,
  removeExercise,
}: {
  exerciseId: Types.ObjectId;
  sets: { weight: number; reps: number; completed: boolean }[];
  completeSet: UseMutateFunction<
    any,
    Error,
    {
      exerciseId: Types.ObjectId;
      setIndex: number;
      weight: number;
      reps: number;
    },
    unknown
  >;
  createSet: UseMutateFunction<
    any,
    Error,
    {
      exerciseId: Types.ObjectId;
    },
    unknown
  >;
  removeExercise: UseMutateFunction<
    any,
    Error,
    {
      exerciseId: Types.ObjectId;
    },
    void
  >;
}) => {
  const [weight, setWeight] = React.useState<number[]>([
    ...sets.map((set) => set.weight),
  ]);
  const [reps, setReps] = React.useState<number[]>([
    ...sets.map((set) => set.reps),
  ]);
  const { data: exercise } = useQuery({
    queryKey: ["exercise", exerciseId.toString()],
    queryFn: async () => (await getExercise(exerciseId)).exercise as Exercise,
  });

  return (
    <View className="my-3 space-y-3">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-base text-primary-1 font-Gilroy-Bold max-w-[82%]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {exercise?.name}
        </Text>
        <TouchableOpacity
          className="bg-red-500/20 rounded-md"
          onPress={() => removeExercise({ exerciseId })}
        >
          <Ionicons name="close" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row flex-wrap justify-between w-full">
        <View className="w-full my-1 flex-row">
          <View className="w-[25%] items-center">
            <Text className="text-sm text-white font-Gilroy-Bold text-center">
              Set
            </Text>
          </View>
          <View className="w-[25%] items-center">
            <Text className="text-sm text-white font-Gilroy-Bold text-center">
              Weight
            </Text>
          </View>
          <View className="w-[25%] items-center">
            <Text className="text-sm text-white font-Gilroy-Bold text-center">
              Reps
            </Text>
          </View>
          <View className="w-[25%] items-center">
            <Ionicons name="checkmark" size={20} color="white" />
          </View>
        </View>
      </View>
      <View className="flex flex-row flex-wrap justify-between">
        {sets.map((set, index) => (
          <View className="w-full my-1 flex-row items-center" key={index}>
            <View className="w-[25%] items-center">
              <View className="bg-stone-700 w-7  py-1 rounded-lg">
                <Text className="text-sm text-white font-Gilroy-Regular text-center flex items-center">
                  {index + 1}
                </Text>
              </View>
            </View>
            <View className="w-[25%] items-center">
              <View className="bg-stone-700 w-14 rounded-lg">
                <TextInput
                  className="text-sm text-white font-Gilroy-Regular text-center py-1 items-center flex"
                  verticalAlign="middle"
                  placeholder={"kgs"}
                  placeholderTextColor={"gray"}
                  value={weight[index]?.toString()}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    setWeight((prev) => {
                      prev[index] = numericValue ? parseFloat(numericValue) : 0;
                      return [...prev];
                    });
                  }}
                  inputMode="numeric"
                />
              </View>
            </View>
            <View className="w-[25%] items-center">
              <View className="bg-stone-700 w-14 rounded-lg">
                <TextInput
                  className="text-sm text-white font-Gilroy-Regular text-center py-1 items-center flex"
                  placeholder={"reps"}
                  placeholderTextColor={"gray"}
                  value={reps[index]?.toString()}
                  onChangeText={(text) => {
                    const numericValue = text.replace(/[^0-9.]/g, "");
                    setReps((prev) => {
                      prev[index] = numericValue ? parseFloat(numericValue) : 0;
                      return [...prev];
                    });
                  }}
                  inputMode="numeric"
                />
              </View>
            </View>
            <View className="w-[25%] items-center justify-center">
              <TouchableOpacity
                className={cn("bg-stone-700 w-7 py-1 rounded-lg items-center", {
                  "bg-primary-1": set.completed,
                })}
                onPress={() => {
                  if (weight[index] > 0 && reps[index] > 0) {
                    completeSet({
                      exerciseId,
                      setIndex: index,
                      weight: weight[index],
                      reps: reps[index],
                    });
                  }
                  //   completeSet({ exerciseId });
                }}
              >
                <Ionicons name="checkmark" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        className="bg-stone-700 w-full py-1 rounded-lg items-center flex-row justify-center space-x-1"
        onPress={() => createSet({ exerciseId })}
      >
        <Text className="text-sm text-white font-Gilroy-Bold text-center">
          Add Set
        </Text>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseDisplay;
