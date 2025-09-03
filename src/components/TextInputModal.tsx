import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface TextInputModalProps {
  visible: boolean;
}
const TextInputModal = ({ visible }: TextInputModalProps) => {
  const behavior = Platform.OS === "ios" ? "padding" : "height";
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.safeAreaViewContainer}>
          <SafeAreaView style={styles.safeAreaView}>
            <TextInput style={styles.input} />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TextInputModal;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  safeAreaView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  input: {
    backgroundColor: "lightblue",
    width: "100%",
  },
});
