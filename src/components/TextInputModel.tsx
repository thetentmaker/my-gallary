import { Modal, StyleSheet, View } from "react-native";

interface TextInputModalProps {
  isVisible: boolean;
}
const TextInputModal = ({ isVisible }: TextInputModalProps) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.container}></View>
    </Modal>
  );
};

export default TextInputModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
