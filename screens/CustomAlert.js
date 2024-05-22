import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import { useFonts } from "expo-font";

const CostumAlert = (props) => {
  //   const [loaded] = useFonts({
  //     Tajawal: require("../../../assets/fonts/Tajawal-Bold.ttf"),
  //   });

  //   if (!loaded) {
  //     return null;
  //   }

  const {
    isVisible,
    title,
    actionToDecline,
    actionToAccept,
    buttonText,
    decline,
  } = props;

  return (
    <Overlay overlayStyle={styles.container} isVisible={isVisible}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.groupButtons}>
        <TouchableOpacity
          onPress={actionToDecline}
          style={styles.buttonContainerCancel}
        >
          {/* <Text style={styles.buttonText}>إلغاء</Text> */}
          <Text style={styles.buttonText}>{decline}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={actionToAccept}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CostumAlert;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "25%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    lineHeight: 20,
    textAlign: "center",
    // fontFamily: "consolas",
  },
  groupButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "orange",
  },
  buttonContainerCancel: {
    margin: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    // fontFamily: "",
  },
});
