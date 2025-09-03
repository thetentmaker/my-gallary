import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ImageItem {
  id: number;
  uri: string;
  albumId: number;
}

export interface Album {
  id: number;
  title: string;
}

export const DEFAULT_ALBUM = {
  id: 1,
  title: "기본",
};

const useGallary = () => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth / 3;
  const { top: topSafeArea } = useSafeAreaInsets();
  const [images, setImages] = useState<ImageItem[]>([]);

  // 앨범 관련 상태
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(DEFAULT_ALBUM);
  const [albums, setAlbums] = useState<Album[]>([DEFAULT_ALBUM]);
  const [albumTitle, setAlbumTitle] = useState("");

  const [textInputModelVisible, setTextInputModelVisible] = useState(false);
  const [bigImgModalVisible, setBigImgModalVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const onOpenGallaryPress = async () => {
    await pickImage();
  };

  const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);
  const imagesWidthAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "https://picsum.photos/200/300",
      albumId: -1
    },
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const id = images.length === 0 ? 0 : images[images.length - 1].id + 1;
      const newImage = {
        id: id,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id
      };
      setImages([...images, newImage]);
    }
  };

  const onDeletePress = (id: number) => {
    deleteImage(id);
  };
  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const onPressAddButton = () => {
    openTextInputModel();
  };

  const openTextInputModel = () => {
    setTextInputModelVisible(true);
  };

  const closeTextInputModel = () => {
    setTextInputModelVisible(false);
  };

  const onSubmitEditing = () => {
    // guard
    if (!albumTitle.trim()) return;
    // 1. 앨범에 타이틀 추가
    addAlbum();
    // 2. 모달 닫기 & TextInput 초기화
    resetAlbumTitle();
    closeTextInputModel();
  };

  const addAlbum = () => {
    const id = albums.length === 0 ? 0 : albums[albums.length - 1].id + 1;
    const newAlbum = {
      id: id,
      title: albumTitle,
    };
    setAlbums([...albums, newAlbum]);
    // 새 앨범을 만드는 순간 해당 앨범을 선택
    setSelectedAlbum(newAlbum);
  };

  const resetAlbumTitle = () => setAlbumTitle("");

  const onPressBackdropTextInputModal = () => closeTextInputModel();

  const openBigImgModal = (image: ImageItem) => {
    setBigImgModalVisible(true);
  };

  const closeBigImgModal = () => {
    setBigImgModalVisible(false);
  };

  const onPressBackdropBigImgModal = () => closeBigImgModal();

  const onPressHeader = () =>
    isDropdownOpen ? closeDropdown() : openDropdown();

  const openDropdown = () => setIsDropdownOpen(true);

  const closeDropdown = () => setIsDropdownOpen(false);

  const onPressAlbum = (albumId: number) => {
    setSelectedAlbum(albums.find((album) => album.id === albumId)!);
    closeDropdown();
  };

  const deleteAlbum = (albumId: number) => {
    // 해당 앨범 삭제
    const newAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(newAlbums);
    // 기본 앨범 선택
    setSelectedAlbum(DEFAULT_ALBUM);
    // 해당 앨범에 포함되어 있던 이미지도 삭제
    setImages(images.filter((image) => image.albumId !== albumId));
  };

  const onPressImage = (image: ImageItem) => {
    setSelectedImage(image);
    openBigImgModal(image);
  };
  return {
    onOpenGallaryPress,
    images,
    imagesWidthAddButton,
    topSafeArea,
    onDeletePress,
    imageWidth,
    selectedAlbum,
    textInputModelVisible,
    onPressAddButton,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    addAlbum,
    resetAlbumTitle,
    onPressBackdropTextInputModal,
    onPressHeader,
    openDropdown,
    closeDropdown,
    isDropdownOpen,
    albums,
    onPressAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    onPressBackdropBigImgModal,
    onPressImage,
    selectedImage,
  };
};

export default useGallary;