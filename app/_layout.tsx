import GallaryRenderItem from "@/src/components/GallaryRenderItem";
import MyDropDownPicker from "@/src/components/MyDropDownPicker";
import TextInputModal from "@/src/components/TextInputModal";
import useGallary from "@/src/hooks/useGallary";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const {
    onOpenGallaryPress,
    topSafeArea,
    onDeletePress,
    selectedAlbum,
    imagesWidthAddButton,
    modelVisible,
    onAddAlbumPress,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    onPressBackdrop,
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
        {/* 앨범 추가 버튼 */}
        <MyDropDownPicker
          title={selectedAlbum.title}
          onPress={onAddAlbumPress}
        />

        {/* 앨범 추가 모달 */}
        <TextInputModal
          onPressBackdrop={onPressBackdrop}
          onSubmitEditing={onSubmitEditing}
          visible={modelVisible}
          albumTitle={albumTitle}
          onChangeText={setAlbumTitle}
        />

        {/* 이미지 리스트 */}
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
