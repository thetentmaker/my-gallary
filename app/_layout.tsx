import useGallary, { ImageItem } from "@/src/hooks/useGallary";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function RootLayout() {
  const { onOpenGallaryPress, topSafeArea, images, onDeletePress } = useGallary();
  const width = Dimensions.get("window").width;
  const imageWidth = width / 3;

  interface RenderItemProps {
    item: ImageItem;
    index: number;
  }

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert(
            "",
            "삭제할까요?",
            [
              { text: "취소", style: "cancel" },
              { text: "삭제", onPress: () => onDeletePress(item.id) },
            ],
          );
        }}
      >
      <Image
        source={{ uri: item.uri }}
        style={[styles.image, { width: imageWidth, height: imageWidth }]}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: topSafeArea }]}>
      <View style={styles.container}>
        <Button title="onOpenGallaryPress" onPress={onOpenGallaryPress} />
        {/* FlatList로 구현.= */}
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    borderRadius: 0,
  },
});
