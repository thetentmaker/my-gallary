import BigImgModal from "@/src/components/BigImgModal";
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
    textInputModelVisible,
    onPressAddButton,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    onPressBackdropTextInputModal,
    onPressHeader,
    isDropdownOpen,
    albums,
    onPressAlbum,
    deleteAlbum,
    bigImgModalVisible,
    onPressImage,
    onPressBackdropBigImgModal,
    selectedImage,
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
          selectedAlbumTitle={selectedAlbum.title}
          onPressAddButton={onPressAddButton}
          onPressHeader={onPressHeader}
          isDropdownOpen={isDropdownOpen}
          albums={albums}
          onPressAlbum={onPressAlbum}
          selectedAlbum={selectedAlbum}
          deleteAlbum={deleteAlbum}
        />

        {/* 앨범 추가 모달 */}
        <TextInputModal
          onPressBackdrop={onPressBackdropTextInputModal}
          onSubmitEditing={onSubmitEditing}
          visible={textInputModelVisible}
          albumTitle={albumTitle}
          onChangeText={setAlbumTitle}
        />

        {/* 이미지를 크게 보는 모달 */}
        <BigImgModal
          visible={bigImgModalVisible}
          imageUri={selectedImage?.uri}
          onPressBackdrop={onPressBackdropBigImgModal}
        />
        {/* 이미지 리스트 */}
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
  flatList: {
    zIndex: 0,
  },
});
