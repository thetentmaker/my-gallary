import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ImageItem } from "../hooks/useGallary";

interface RenderItemProps {
  item: ImageItem;
  index: number;
  onAddPress: () => void;
  onItemLongPress: () => void;
}

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 3;

const GallaryRenderItem = ({
  item,
  index,
  onAddPress,
  onItemLongPress,
}: RenderItemProps) => {
  if (item.id === -1) {
    return (
      <TouchableOpacity
        onPress={onAddPress}
        style={[styles.addButton, { width: imageWidth, height: imageWidth }]}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onLongPress={onItemLongPress}>
      <Image
        source={{ uri: item.uri }}
        style={[styles.image, { width: imageWidth, height: imageWidth }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default GallaryRenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    borderRadius: 0,
  },
  addButton: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 45,
    color: "white",
  },
});
