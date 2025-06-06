import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { Workout } from "@/lib/types";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
} from "@tanstack/react-query";
import AddExerciseModal from "./AddExerciseModal";
import ElapsedTime from "./ElapsedTime";
import { Types } from "mongoose";
import ExerciseDisplay from "./ExerciseDisplay";
import { Ionicons } from "@expo/vector-icons";

const ActiveWorkout = ({
  workout,
  cancelWorkout,
  addExerciseToWorkout,
  completeSet,
  createSet,
  removeExercise,
  completeWorkout,
}: {
  workout: Workout;
  cancelWorkout: UseMutateFunction<any, Error, void, unknown>;
  addExerciseToWorkout: UseMutateFunction<
    any,
    Error,
    {
      exerciseId: Types.ObjectId;
    },
    unknown
  >;
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
  completeWorkout: UseMutateFunction<any, Error, void, void>;
}) => {
  const [exerciseModalOpen, setExerciseModalOpen] = React.useState(false);
  const createTwoButtonAlert = () =>
    Alert.alert("Cancel Workout?", "This action cannot be undone.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          cancelWorkout();
          console.log("OK Pressed");
        },
      },
    ]);
  return (
    <View className="px-5 justify-between">
      <View className="">
        <View className="w-full flex-row justify-between items-center">
          {workout?.createdAt && <ElapsedTime startTime={workout?.createdAt} />}
          <TouchableOpacity
            className="bg-primary-1 rounded-md px-4 py-2"
            onPress={() => {
              if (workout.exerciseList.length === 0) return;
              completeWorkout();
            }}
          >
            <Text className="font-Gilroy-Bold">Finish</Text>
          </TouchableOpacity>
        </View>
        {workout?.exerciseList?.length > 0 && (
          <FlatList
            // style={{ pad }}
            className="py-5"
            data={workout?.exerciseList}
            renderItem={({ item }) => (
              <ExerciseDisplay
                exerciseId={item.exercise}
                sets={item.sets}
                // key={item.exercise.toString()}
                completeSet={completeSet}
                createSet={createSet}
                removeExercise={removeExercise}
              />
            )}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        {/* {workout?.exerciseList?.length > 0 &&
          workout?.exerciseList.map((exercise, index) => (
            <ExerciseDisplay
              exerciseId={exercise.exercise}
              sets={exercise.sets}
              key={index}
              completeSet={completeSet}
              createSet={createSet}
              removeExercise={removeExercise}
            />
          ))} */}
        <View className="w-full flex justify-center items-center my-4">
          <TouchableOpacity
            className="bg-primary-1/20 rounded-xl justify-center items-center flex flex-row w-[90vw] mx-auto"
            onPress={() => setExerciseModalOpen(true)}
          >
            <Text className="text-primary-1 text-base py-2 px-2 font-Gilroy-Regular">
              Add Exercise
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex justify-center items-center my-4">
        <TouchableOpacity
          className="bg-red-500/20 rounded-xl justify-center items-center flex flex-row w-[90vw] mx-auto"
          onPress={createTwoButtonAlert}
        >
          <Text className="text-red-500 text-base py-2 px-2 font-Gilroy-Regular">
            Cancel Workout
          </Text>
        </TouchableOpacity>
      </View>
      {exerciseModalOpen && (
        <AddExerciseModal
          isOpen={exerciseModalOpen}
          setIsOpen={setExerciseModalOpen}
          addExerciseToWorkout={addExerciseToWorkout}
        />
      )}
    </View>
  );
};

export default ActiveWorkout;
