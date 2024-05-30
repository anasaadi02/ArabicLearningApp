// components/RobotSpinner.js
import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { BackgroundImage } from "react-native-elements/dist/config";

const RobotSpinner = ({ onPress, imageSource }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {/* <FontAwesome name="robot" size={50} color="black" /> */}
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginBottom: 200,
    // borderRadius: 100,
    // borderColor: "orange",
    // borderWidth: 2,
  },
});

export default RobotSpinner;
