import { Text, View, StyleSheet } from "react-native";

export default function Emergency() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        padding: 20
      }}
    >
      <Text style={styles.title}>When a Fire is Approaching</Text>
      {/* https://stackoverflow.com/questions/39110460/react-native-unordered-style-list */}
      <View>
        <Text style={styles.listText}>1.  Listen for updates from authorities.</Text>
        <Text style={styles.listText}>2.  Be prepared to evacuate at a moment's notice.</Text>
        <Text style={styles.listText}>3.  Have your vehicle stocked with supplies.</Text>
        <Text style={styles.listText}>4.  Bring pets inside.</Text>
        <Text style={styles.listText}>5.  Follow designated evacuation routes.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 18
  },

  listText: {
    fontSize: 16,
    margin: 5
  }
})
