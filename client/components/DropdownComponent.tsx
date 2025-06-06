// File: OneDrive\Desktop\Work\Semester 5\CIS_370\Fitrack\client\components\DropdownComponent.tsx

import React, { SetStateAction, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formattedMuscleGroups } from "../constants/MuscleGroups"; // Adjust the import path as necessary

const DropdownComponent = ({
  value,
  setValue,
}: {
  value: string | null;
  setValue: React.Dispatch<SetStateAction<string | null>>;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#f55e0a" }]}>
          Filter by Muscle Group
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#f55e0a" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.list}
        iconStyle={styles.iconStyle}
        data={formattedMuscleGroups}
        itemTextStyle={{ color: "white" }}
        itemContainerStyle={{ backgroundColor: "#1c1917" }}
        activeColor="#322016"
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Muscle Group" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          console.log("Selected item:", item); // Debugging line
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#f55e0a" : "white"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: 16,
  },
  dropdown: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    color: "white",
    backgroundColor: "#1c1917",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  list: {
    backgroundColor: "#1c1917",
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    color: "white",
    borderColor: "gray",
  },
});
