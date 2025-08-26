import { View, SafeAreaView, Text, StyleSheet } from "react-native"

export default function Developper() {
  return (
    <View style={styles.container}>
      <Text>Developper settings view</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})