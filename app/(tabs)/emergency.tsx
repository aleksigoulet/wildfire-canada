import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BulletListItem from "@/components/bulletListItem";

export default function Emergency() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Emergency</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={{ marginTop: 22 }}>All content below is copied from reference [1] - see settings.</Text>
          <Text style={[styles.title, { marginTop: 8 }]}>When a Fire is Approaching</Text>
          {/* https://stackoverflow.com/questions/39110460/react-native-unordered-style-list */}
          <View style={styles.bulletListContainer}>
            <BulletListItem text="Wait for updates from authorities." />
            <BulletListItem text="Be prepared to evacuate at a moment's notice." />
            <BulletListItem text="Have your vehicle stocked with supplies." />
            <BulletListItem text="Bring pets inside." />
            <BulletListItem text="Review designated evacuation routes." />
          </View>
          <Text style={styles.subtitle}>Preparing your home</Text>
          <View style={styles.bulletListContainer}>
            <BulletListItem text="Close all doors and windows." />
            <BulletListItem text="Close all vents and openings." />
            <BulletListItem text="Place a ladder to the roof to assist firefighters" />
          </View>
          <Text style={styles.subtitle}>Driving during an evacuation</Text>
          <View style={styles.bulletListContainer}>
            <BulletListItem text="Stay at least 10 metres away from downed power lines." />
            <BulletListItem text="Do not drive through a fire unless directed by officials." />
            <BulletListItem text="Follow designated evacuation routes." />
          </View>
          <Text style={styles.title}>After a Wildfire</Text>
          <View style={styles.bulletListContainer}>
            <BulletListItem text="Continue to monitor officials communication channels for updates." />
            <BulletListItem text="Do not make phone calls unless necessary. Communicate using other methods such as text or email." />
            <BulletListItem text="Stay away from downed power lines." />
          </View>
          <Text style={styles.subtitle}>Returning home</Text>
          <View style={styles.bulletListContainer}>
            <BulletListItem text="Wait until is is safe to return." />
            <BulletListItem text="Work with authorities to determine if it is safe to enter your home." />
            <BulletListItem text="Test smoke detectors and carbon monoxide alarms." />
            <BulletListItem text="Remove spoiled food from the fridge." />
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
    paddingBottom: 64,
  },

  bulletListContainer: {
    paddingLeft: 6,
    gap: 6,
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
    marginBottom: 12,
    marginTop: 22,
    fontSize: 20,
    color: '#484848'
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 24,
    color: '#646464'
  },

  listText: {
    fontSize: 16,
    margin: 5
  }
})
