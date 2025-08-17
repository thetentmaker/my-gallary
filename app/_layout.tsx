import GallaryRenderItem from "@/src/components/GallaryRenderItem";
import useGallary from "@/src/hooks/useGallary";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";

export default function RootLayout() {
  const {
    onOpenGallaryPress,
    topSafeArea,
    onDeletePress,
    
    imagesWidthAddButton,
  } = useGallary();

  const onItemLongPress = (id: number) => {
    Alert.alert("", "삭제할까요?", [
      { text: "취소", style: "cancel" },
      { text: "삭제", onPress: () => onDeletePress(id) },
    ]);
  };
  return (
    <SafeAreaView style={[styles.container, { paddingTop: topSafeArea }]}>
      <View style={styles.container}>
        <Button title="onOpenGallaryPress" onPress={onOpenGallaryPress} />
        {/* FlatList로 구현.= */}
        <FlatList
          data={imagesWidthAddButton}
          renderItem={({ item, index }) => (
            <GallaryRenderItem
              item={item}
              index={index}
              onAddPress={onOpenGallaryPress}
              onItemLongPress={() => onItemLongPress(item.id)}
            />
          )}
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
