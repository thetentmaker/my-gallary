import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Album } from "../hooks/useGallary";

const HEADER_HEIGHT = 50;
interface MyDropDownPickerProps {
  selectedAlbumTitle: string;
  onPressAddButton: () => void;
  onPressHeader: () => void;
  isDropdownOpen: boolean;
  albums: Album[];
  onPressAlbum: (albumId: number) => void;
  selectedAlbum: Album;
}
const MyDropDownPicker = ({
  selectedAlbumTitle,
  onPressAddButton,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
  selectedAlbum,
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
        />
      )}
    </View>
  );
};

interface AlbumDropdownProps {
  albums: Album[];
  onPressAlbum: (albumId: number) => void;
  selectedAlbum: Album;
}

const AlbumDropdown = ({
  albums,
  onPressAlbum,
  selectedAlbum,
}: AlbumDropdownProps) => {
  return (
    <View style={styles.dropdown}>
      {albums.map((album) => {
        const fontWeight = selectedAlbum.id === album.id ? "bold" : "normal";
        return (
          <TouchableOpacity
            key={album.id}
            style={styles.albumDropdownItem}
            onPress={() => onPressAlbum(album.id)}
          >
            <Text style={{fontWeight}}>{album.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
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
