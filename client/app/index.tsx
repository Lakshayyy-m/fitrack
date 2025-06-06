import { Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const index = () => {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-black h-full w-full">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Text
          className="text-primary-1 font-PlaywriteMX text-6xl w-full text-center "
          style={{ paddingVertical: 80 }}
        >
          fitrack
        </Text>
        <TouchableOpacity
          className="flex-row items-center space-x-4 w-full px-10 py-4 bg-primary-1 rounded-2xl"
          onPress={() => router.push("/sign-in")}
          activeOpacity={0.7}
        >
          <Text className="text-black font-Gilroy-Medium">Get Started</Text>
          <Ionicons name="arrow-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
