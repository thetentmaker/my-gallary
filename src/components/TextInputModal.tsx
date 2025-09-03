import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";

interface TextInputModalProps {
  visible: boolean;
  albumTitle: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onPressBackdrop: () => void;
}

const TextInputModal = ({
  visible,
  albumTitle,
  onChangeText,
  onSubmitEditing,
  onPressBackdrop,
}: TextInputModalProps) => {
  const behavior = Platform.OS === "ios" ? "padding" : "height";
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <KeyboardAvoidingView
        behavior={behavior}
        style={styles.keyboardAvoidingView}
      >
        <Pressable style={styles.safeAreaViewContainer} onPress={onPressBackdrop}>
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
        </Pressable>
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
    width: "100%",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
});
