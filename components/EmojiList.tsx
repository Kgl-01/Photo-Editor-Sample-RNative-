import { Image, type ImageSource } from "expo-image"
import { useState } from "react"
import { FlatList, Platform, Pressable, StyleSheet } from "react-native"

type Props = {
  onSelect: (image: ImageSource) => void
  onCloseModal: () => void
}

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSource[]>(
    Array.from({ length: 6 }, (_, i) =>
      require("../assets/images/react-logo.png")
    )
  )

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item)
            onCloseModal()
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
})
