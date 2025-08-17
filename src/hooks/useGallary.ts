import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ImageItem {
  id: number;
  uri: string;
}

interface Album {
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

  const [modelVisible, setModelVisible] = useState(false);

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

    console.log(JSON.stringify(result, null, 2));

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

  const onAddAlbumPress = () => {
    openModel();
  };

  const openModel = () => {
    setModelVisible(true);
  };

  // const closeModel = () => {
  //   setModelVisible(false);
  // };
  return {
    onOpenGallaryPress,
    images,
    imagesWidthAddButton,
    topSafeArea,
    onDeletePress,
    imageWidth,
    selectedAlbum,
    modelVisible,
    onAddAlbumPress
  };
};

export default useGallary;
