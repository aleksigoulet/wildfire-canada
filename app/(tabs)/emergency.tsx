import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function Emergency() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Emergency</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>When a Fire is Approaching</Text>
          {/* https://stackoverflow.com/questions/39110460/react-native-unordered-style-list */}
          <View>
            <Text style={styles.listText}>1.  Listen for updates from authorities.</Text>
            <Text style={styles.listText}>2.  Be prepared to evacuate at a moment's notice.</Text>
            <Text style={styles.listText}>3.  Have your vehicle stocked with supplies.</Text>
            <Text style={styles.listText}>4.  Bring pets inside.</Text>
            <Text style={styles.listText}>5.  Follow designated evacuation routes.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  scrollContainer: {
    flex: 1,
    paddingTop: 22,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '600'
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 4,
  },

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
