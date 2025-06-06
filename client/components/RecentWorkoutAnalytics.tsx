import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getWorkouts } from "@/lib/workout.utils";
import { Workout } from "@/lib/types";

const dummyData = [
  {
    id: 1,
    date: new Date(),
    totalVoluem: 100,
  },
  {
    id: 2,
    date: new Date(),
    totalVoluem: 200,
  },
  {
    id: 3,
    date: new Date(),
    totalVoluem: 300,
  },
  {
    id: 4,
    date: new Date(),
    totalVoluem: 400,
  },
];

const RenderListItem = ({ item }: { item: Workout }) => {
  return (
    <View
      key={item._id?.toString()}
      className="flex-row items-center justify-between w-full px-4 py-2 rounded-3xl"
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-white text-base">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="text-white text-base">{item.totalVolume}</Text>
      </View>
    </View>
  );
};

const RecentWorkoutAnalytics = ({
  workouts,
}: {
  workouts: Workout[] | undefined;
}) => {
  return (
    <View className="w-full px-5 h-64">
      <View className="max-w-full bg-stone-800 aspect-video rounded-3xl relative overflow-hidden h-full">
        <View className="p-4 flex-row items-center">
          <Text className="text-white mr-3 text-xl font-bold">
            Recent Workouts
          </Text>
          <FontAwesome5 name="history" size={24} color="white" />
        </View>
        <View className="flex-row items-center justify-between w-full px-4 py-2 bg-stone-900">
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text className="text-white text-base">Date</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <FontAwesome5 name="dumbbell" size={24} color="white" />
            <Text className="text-white text-base">Total Volume</Text>
          </View>
        </View>
        <ScrollView>
          {workouts &&
            workouts?.map((item) => (
              <RenderListItem item={item} key={item._id?.toString()} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RecentWorkoutAnalytics;
