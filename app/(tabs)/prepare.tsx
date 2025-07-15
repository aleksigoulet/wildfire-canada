import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router"

export default function Prepare() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Remaining Tasks</Text>

      <Link 
        style={styles.checklistButton}
        href={'/checklist'}
      >
        <Text>Create my go-kit</Text>
      </Link>

      <Text style={styles.titleText}>Completed Tasks</Text>
    </View>
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