import { Text, View, StyleSheet, Pressable, SafeAreaView, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Prepare() {
  const router = useRouter();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Back" onPress={() => router.dismiss()} />

      <View style={styles.container}>
        <Text style={styles.titleText}>Lesson Example</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  titleText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  checklistButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})