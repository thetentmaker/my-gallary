import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HEADER_HEIGHT = 50;
interface MyDropDownPickerProps {
  title: string;
  onPress:() => void
}
const MyDropDownPicker = ({ title, onPress }: MyDropDownPickerProps) => {

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>앨범추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyDropDownPicker;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    height: HEADER_HEIGHT,
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    // backgroundColor: "brown",
  },
  addButtonText: {
    fontSize: 12,
  },
});
