import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

interface TextInputModalProps {
  visible: boolean;
}
const TextInputModal = ({ visible }: TextInputModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <Text>TextInputModal</Text>
      </View>
      <TextInput style={styles.input} />
    </Modal>
  );
};

export default TextInputModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
  input: {
    backgroundColor: "white",
  },
});
