import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";
import { getAllExercises } from "@/lib/workout.utils";
import { Exercise } from "@/lib/types";
import { Types } from "mongoose";
import { cn } from "@/lib/utils";
import DropdownComponent from "./DropdownComponent";

const AddExerciseModal = ({
  isOpen,
  setIsOpen,
  addExerciseToWorkout,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addExerciseToWorkout: UseMutateFunction<
    any,
    Error,
    {
      exerciseId: Types.ObjectId;
    },
    unknown
  >;
}) => {
  const [text, setText] = useState("");
  const [muscleTypeFilter, setMuscleTypeFilter] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] =
    useState<Types.ObjectId | null>(null);
  const { data, isLoading: isLoadingExercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getAllExercises(),
  });

  const exercises = data?.exercises;
  // Filter exercises based on the search text
  const filteredExercises = exercises?.filter((exercise: Exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(text.toLowerCase());
    const matchesDropdown = muscleTypeFilter
      ? exercise.muscle.toLowerCase() === muscleTypeFilter.toLowerCase()
      : true;
    return matchesSearch && matchesDropdown;
  });

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedExercise(item._id)}
        style={{
          padding: 15,
        }}
        className={cn(
          "bg-primary-1/10 justify-between flex-row items-center active:bg-primary-1  active:scale-105 rounded-xl my-1",
          {
            "bg-primary-1 rounded-xl":
              selectedExercise?.toString() === item._id.toString(),
          }
        )}
      >
        <View className="w-[80%]">
          <Text
            className="text-white font-Gilroy-Bold max-w-[80%] "
            numberOfLines={1} // Limits the text to a single line
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text className="text-white text-xs">{item.muscle}</Text>
        </View>
        {selectedExercise?.toString() === item._id.toString() ? (
          <Ionicons name="checkmark-circle" size={24} color="white" />
        ) : (
          <Ionicons name="checkmark-circle-outline" size={24} color="white" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}
    >
      <View className="w-screen h-screen justify-center items-center bg-black/20">
        <View className="bg-stone-900 w-[90vw] rounded-xl p-4 space-y-3">
          <View className="space-y-3 min-h-[300px] max-h-[75vh]">
            <View className="w-full flex-row justify-between items-center px-1">
              <Text className="text-white text-2xl font-Gilroy-Bold">
                Add an Exercise
              </Text>
              <TouchableOpacity
                disabled={!selectedExercise}
                onPress={() => {
                  console.log(selectedExercise);
                  addExerciseToWorkout({ exerciseId: selectedExercise! });
                  setIsOpen(false);
                }}
                className="disabled:opacity-50"
              >
                <Text className="text-primary-1 font-Gilroy-Bold active:text-primary-1/30">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center w-full px-2 rounded-xl bg-stone-500 space-x-3 font-Gilroy-Regular">
              <Ionicons name="search-outline" size={17} color="#e7e5e4" />
              <TextInput
                style={{ height: 40 }}
                className="text-stone-200 font-Gilroy-Light w-full"
                placeholder="Type here to search!"
                onChangeText={(newText) => setText(newText)}
                defaultValue={text}
              />
            </View>
            <DropdownComponent
              value={muscleTypeFilter}
              setValue={setMuscleTypeFilter}
            />
            {isLoadingExercises && (
              <View className="w-full justify-center items-center">
                <ActivityIndicator color={"#fff"} className="my-14" />
              </View>
            )}
            {!isLoadingExercises && (
              <FlatList
                data={filteredExercises}
                renderItem={renderExerciseItem}
                keyExtractor={(item) => item._id.toString()}
                className=" rounded-xl"
              />
            )}
          </View>
          <TouchableOpacity
            className="bg-red-500/20 rounded-xl justify-center items-center flex flex-row w-full mx-auto"
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Text className="text-red-500 text-base py-2 px-2 font-Gilroy-Regular">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
