import { Image, type ImageSource } from "expo-image"
import { StyleSheet, View } from "react-native"

type Props = {
  imageSource: ImageSource
  selectedImage?: string | null
}

export default function ImageViewer({ imageSource, selectedImage }: Props) {
  const imgSrc = selectedImage ? { uri: selectedImage } : imageSource

  return <Image source={imgSrc} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    objectFit: "contain",
  },
})
