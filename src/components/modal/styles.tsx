import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  content: {
    padding: 10,
    height: screenHeight,
  },
});
