import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface BigImgModalProps {
  visible: boolean;
  imageUri: string | undefined;
  onPressBackdrop: () => void;
  onPressLeftArrow: () => void;
  onPressRightArrow: () => void;
  showPreviousArrow: boolean;
  showNextArrow: boolean;
}

interface ArrowButtonProps {
  name: keyof typeof SimpleLineIcons.glyphMap;
  size?: number;
  color?: string;
  onPress: () => void;
  disabled: boolean;
}

const ArrowButton = ({
  name,
  size = 20,
  onPress,
  disabled,
}: ArrowButtonProps) => {
  const color = disabled ? "transparent" : "black";
  return (
    <TouchableOpacity
      style={styles.arrowButton}
      onPress={onPress} 
      disabled={disabled}
    >
      <SimpleLineIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
const BigImgModal = ({
  visible,
  imageUri,
  onPressBackdrop,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}: BigImgModalProps) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Pressable onPress={onPressBackdrop} style={styles.container}>
        <View style={styles.imageContainer}>
          {/* < 버튼 */}
          <ArrowButton
            name="arrow-left"
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />
          {/* 이미지 */}
          <Pressable>
            <Image
              source={imageUri ? { uri: imageUri } : undefined}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
          {/* > 버튼 */}
          <ArrowButton
            name="arrow-right"
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
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
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    backgroundColor: "white",
  },
  arrowButton: {
    paddingHorizontal: 20,
    height: "100%",
    // backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default BigImgModal;
