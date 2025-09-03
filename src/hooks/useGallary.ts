import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ImageItem {
  id: number;
  uri: string;
}

export interface Album {
  id: number;
  title: string;
}

const DEFAULT_ALBUM = {
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

  const [modelVisible, setModelVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onOpenGallaryPress = async () => {
    await pickImage();
  };

  const imagesWidthAddButton = [
    ...images,
    {
      id: -1,
      uri: "https://picsum.photos/200/300",
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
    openModel();
  };

  const openModel = () => {
    setModelVisible(true);
  };

  const closeModel = () => {
    setModelVisible(false);
  };

  const onSubmitEditing = () => {
    // guard
    if (!albumTitle.trim()) return;
    // 1. 앨범에 타이틀 추가
    addAlbum();
    // 2. 모달 닫기 & TextInput 초기화
    resetAlbumTitle();
    closeModel();
  };

  const addAlbum = () => {
    const id = albums.length === 0 ? 0 : albums[albums.length - 1].id + 1;
    const newAlbum = {
      id: id,
      title: albumTitle,
    };
    setAlbums([...albums, newAlbum]);
  };

  const resetAlbumTitle = () => setAlbumTitle("");

  const onPressBackdrop = () => closeModel();

  const onPressHeader = () =>
    isDropdownOpen ? closeDropdown() : openDropdown();

  const openDropdown = () => setIsDropdownOpen(true);

  const closeDropdown = () => setIsDropdownOpen(false);

  const onPressAlbum = (albumId: number) => {
    setSelectedAlbum(albums.find((album) => album.id === albumId)!);
    closeDropdown();
  };

  return {
    onOpenGallaryPress,
    images,
    imagesWidthAddButton,
    topSafeArea,
    onDeletePress,
    imageWidth,
    selectedAlbum,
    modelVisible,
    onPressAddButton,
    albumTitle,
    setAlbumTitle,
    onSubmitEditing,
    addAlbum,
    resetAlbumTitle,
    onPressBackdrop,
    onPressHeader,
    openDropdown,
    closeDropdown,
    isDropdownOpen,
    albums,
    onPressAlbum
  };
};

export default useGallary;
