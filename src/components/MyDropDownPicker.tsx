import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Album, DEFAULT_ALBUM } from "../hooks/useGallary";

const HEADER_HEIGHT = 50;
interface MyDropDownPickerProps {
  selectedAlbumTitle: string;
  onPressAddButton: () => void;
  onPressHeader: () => void;
  isDropdownOpen: boolean;
  albums: Album[];
  onPressAlbum: (albumId: number) => void;
  selectedAlbum: Album;
  deleteAlbum: (albumId: number) => void;
}
const MyDropDownPicker = ({
  selectedAlbumTitle,
  onPressAddButton,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
  selectedAlbum,
  deleteAlbum,
}: MyDropDownPickerProps) => {
  const iconName = isDropdownOpen ? "arrow-up" : "arrow-down";
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onPressHeader}>
        <Text style={styles.title}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          style={styles.icon}
          name={iconName}
          size={12}
          color="black"
        />
        <TouchableOpacity style={styles.addButton} onPress={onPressAddButton}>
          <Text style={styles.addButtonText}>앨범추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropdownOpen && (
        <AlbumDropdown
          albums={albums}
          onPressAlbum={onPressAlbum}
          selectedAlbum={selectedAlbum}
          deleteAlbum={deleteAlbum}
        />
      )}
    </View>
  );
};

interface AlbumDropdownProps {
  albums: Album[];
  onPressAlbum: (albumId: number) => void;
  selectedAlbum: Album;
  deleteAlbum: (albumId: number) => void;
}

const AlbumDropdown = ({
  albums,
  onPressAlbum,
  selectedAlbum,
  deleteAlbum,
}: AlbumDropdownProps) => {
  return (
    <View style={styles.dropdown}>
      {albums.map((album) => {
        const fontWeight = selectedAlbum.id === album.id ? "bold" : "normal";
        return (
          <TouchableOpacity
            key={album.id}
            activeOpacity={1}
            style={styles.albumDropdownItem}
            onPress={() => onPressAlbum(album.id)}
            onLongPress={() => onLongPress(album.id, deleteAlbum)}
          >
            <Text style={{ fontWeight }}>{album.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const onLongPress = (
  albumId: number,
  deleteAlbum: (albumId: number) => void
) => {
  if (albumId === DEFAULT_ALBUM.id) {
    Alert.alert("", "기본 앨범은 삭제할 수 없습니다.");
  } else {
    Alert.alert("", "삭제할까요?", [
      { text: "아니오", style: "cancel" },
      { text: "예", onPress: () => deleteAlbum(albumId) },
    ]);
  }
};
export default MyDropDownPicker;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    height: HEADER_HEIGHT,
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 12,
  },
  dropdown: {
    position: "absolute",
    width: "100%",
    top: HEADER_HEIGHT,
    backgroundColor: "white",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.5,
    borderTopColor: "lightgrey",
    borderTopWidth: 0.5,
  },
  icon: {
    marginLeft: 8,
  },
  albumDropdownItem: {
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
