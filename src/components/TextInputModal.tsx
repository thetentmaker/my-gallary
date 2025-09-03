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
  albumTitle: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
}

const TextInputModal = ({
  visible,
  albumTitle,
  onChangeText,
  onSubmitEditing,
}: TextInputModalProps) => {
  const behavior = Platform.OS === "ios" ? "padding" : "height";
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.safeAreaViewContainer}>
          <SafeAreaView style={styles.safeAreaView}>
            <TextInput
              style={styles.input}
              placeholder="앨범명을 입력해주세요."
              value={albumTitle}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
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
