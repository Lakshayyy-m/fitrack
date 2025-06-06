import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { z } from "zod";
import Toast from "react-native-toast-message";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";

const enterNameSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
});

const EnterName = () => {
  const { user } = useUser();
  //create a state for first name and last name
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onProceed = async () => {
    const { error } = enterNameSchema.safeParse({ firstName, lastName });
    if (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.issues[0].message,
      });
      setIsLoading(false);
      return;
    }

    try {
      const userResponse = await user?.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      console.log(userResponse);
      const newUser = {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
      };
      const saveUserResponse = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/user/createUser`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(saveUserResponse);
      console.log(user!.id);
      Toast.show({
        type: "success",
        text1: "Name updated successfully",
      });
      return router.push("/");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#121212] w-full h-full flex-1 justify-center items-center space-y-5">
      <Spinner visible={isLoading} />
      <Text
        className="text-primary-1 font-PlaywriteMX text-6xl w-full text-center "
        style={{ paddingVertical: 35 }}
      >
        f
      </Text>
      <View className=" w-[80vw] space-x-2 flex-row items-center justify-center ">
        <Text className="text-white text-xl font-Gilroy-Medium ">
          Kindly enter your name
        </Text>
      </View>
      <TextInput
        autoCapitalize="none"
        value={firstName}
        placeholder="First Name..."
        className="text-gray-200 bg-stone-900 rounded-2xl w-[80vw] py-4 px-6"
        placeholderTextColor="gray"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        autoCapitalize="none"
        value={lastName}
        placeholder="Last Name..."
        className="text-gray-200 bg-stone-900 rounded-2xl w-[80vw] py-4 px-6"
        placeholderTextColor="gray"
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <TouchableOpacity
        onPress={onProceed}
        className="px-6 py-4 bg-primary-1 rounded-2xl w-[80vw]"
        activeOpacity={0.7}
      >
        <Text className="text-white font-Gilroy-Bold text-center">Proceed</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EnterName;
