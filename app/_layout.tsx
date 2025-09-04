import BigImgModal from "@/src/components/BigImgModal";
import ImageList from "@/src/components/ImageList";
import MyDropDownPicker from "@/src/components/MyDropDownPicker";
import TextInputModal from "@/src/components/TextInputModal";
import useGallary from "@/src/hooks/useGallary";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function RootLayout() {
  const {
    onOpenGallaryPress,
    topSafeArea,
    selectedAlbum,
    imagesWidthAddButton,
    textInputModelVisible,
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
    onPressLeftArrowBigImgModal,
    onPressRightArrowBigImgModal,
    showPreviousArrow,
    showNextArrow,
    onPressAddButton,
    onItemLongPress
  } = useGallary();
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
          onPressLeftArrow={onPressLeftArrowBigImgModal}
          onPressRightArrow={onPressRightArrowBigImgModal}
          showPreviousArrow={showPreviousArrow}
          showNextArrow={showNextArrow}
        />
        {/* 이미지 리스트 */}
        <ImageList
          imagesWidthAddButton={imagesWidthAddButton}
          onOpenGallaryPress={onOpenGallaryPress}
          onItemLongPress={onItemLongPress}
          onPressImage={onPressImage}
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
