import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { StyleSheet, Text, View } from "react-native"

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Built for learning basics</Text>
      <Text style={styles.text}>
        By KGL_01 <MaterialIcons name="electric-bolt" color={"red"} size={20} />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 600,
    textShadowColor: "red",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 9,
  },
})
