import Button from "@/components/Button"
import CircleButton from "@/components/CircleButton"
import EmojiList from "@/components/EmojiList"
import EmojiPicker from "@/components/EmojiPicker"
import EmojiSticker from "@/components/EmojiSticker"
import IconButton from "@/components/IconButton"
import ImageViewer from "@/components/ImageViewer"
import { type ImageSource } from "expo-image"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import { useRef, useState } from "react"
import { Platform, StyleSheet, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { captureRef } from "react-native-view-shot"
// import domtoimage from "dom-to-image"

const PlaceholderImage = require("@/assets/images/background-image.png")

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [emojiPicked, setEmojiPicked] = useState<ImageSource | undefined>(
    undefined
  )
  const [status, requestPermission] = MediaLibrary.usePermissions()
  const imageRef = useRef<View>(null)

  if (status == null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert("you did not select any image.")
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
    setEmojiPicked(undefined)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert("Saved")
        }
      } catch (error) {
        alert("Error occured while saving")
      } finally {
        setIsModalVisible(false)
      }
    }
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />

          {emojiPicked && (
            <EmojiSticker stickerSource={emojiPicked} imageSize={40} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker open={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setEmojiPicked} />
      </EmojiPicker>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    padding: 16,
    overflow: "hidden",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 4,
    alignItems: "center",
  },
  optionsContainer: {
    // position: "absolute",
    // bottom: 80,
    borderColor: "red",
    borderWidth: 5,
    borderStyle: "solid",
    padding: 18,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
})
