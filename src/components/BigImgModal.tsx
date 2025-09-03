import { Image, Modal, Pressable, StyleSheet } from "react-native";

interface BigImgModalProps {
  visible: boolean;
  imageUri: string | undefined;
  onPressBackdrop: () => void;
}
const BigImgModal = ({
  visible,
  imageUri,
  onPressBackdrop,
}: BigImgModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable onPress={onPressBackdrop} style={styles.container}>
        <Pressable>
          <Image
            source={imageUri ? { uri: imageUri } : undefined}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(115, 115, 115, 0.5)",
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: "white",
  },
});
export default BigImgModal;
