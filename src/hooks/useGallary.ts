import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ImageItem {
  id: number;
  uri: string;
}

const useGallary = () => {
  const { top: topSafeArea } = useSafeAreaInsets();
  const [images, setImages] = useState<ImageItem[]>([]);

  const onOpenGallaryPress = async () => {
    await pickImage();
  };

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
      const newImage = {
        id: images.length + 1,
        uri: result.assets[0].uri,
      };
      setImages([...images, newImage]);
    }
  };

  const onDeletePress = (id: number) => {
    deleteImage(id);
  }
  const deleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return {
    onOpenGallaryPress,
    images,
    topSafeArea,
    onDeletePress,
  };
};

export default useGallary;
