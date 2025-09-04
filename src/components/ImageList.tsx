import { FlatList, StyleSheet } from "react-native";
import { ImageItem } from "../hooks/useGallary";
import { calculateImageWidth, calculateNumColumns } from "../utils/screenUtils";
import GallaryRenderItem from "./GallaryRenderItem";

interface ImageListProps {
  imagesWidthAddButton: ImageItem[];
  onOpenGallaryPress: () => void;
  onItemLongPress: (id: number) => void;
  onPressImage: (image: ImageItem) => void;
}

const ImageList = ({
  imagesWidthAddButton,
  onOpenGallaryPress,
  onItemLongPress,
  onPressImage,
}: ImageListProps) => {
  const numColumns = calculateNumColumns();
  const imageWidth = calculateImageWidth(numColumns);
  return (
    <FlatList
      style={styles.flatList}
      data={imagesWidthAddButton}
      renderItem={({ item, index }) => (
        <GallaryRenderItem
          item={item}
          index={index}
          onAddPress={onOpenGallaryPress}
          onItemLongPress={() => onItemLongPress(item.id)}
          onPressImage={(image) => onPressImage(image)}
          imageWidth={imageWidth}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
    />
  );
};

export default ImageList;

const styles = StyleSheet.create({
  flatList: {
    zIndex: 0,
  },
});
