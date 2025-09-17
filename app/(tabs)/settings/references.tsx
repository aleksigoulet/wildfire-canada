import { View, Text, ScrollView, StyleSheet } from "react-native";
import WebLink from "@/components/webLink";


export default function References() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingBottom: 64 }}>
        <Text style={styles.sectionTitleText}>Content</Text>
        <View style={styles.attributionContainer}>
          <Text style={[styles.bodyText, styles.introText]}>"Emergency" tab and lesson content copied and/or adapted from following reference:</Text>
          <Text style={styles.bodyText}>[1] Public Safety Canada. 2025. Wildfires - Get prepared. Retrieved September 17, 2025 from </Text>
          <WebLink 
            text="https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/wildfires/how-prepare.html"
            url="https://www.canada.ca/en/services/policing/emergencies/preparedness/get-prepared/hazards-emergencies/wildfires/how-prepare.html"
          />
        </View>
        <View style={styles.attributionContainer}>
          <Text style={[styles.bodyText, styles.introText]}>Additionally, lesson content is also copied and/or adapted from following references:</Text>
          <Text style={styles.bodyText}>[2] Wildfire facts. Canada Wildfire. Retrieved September 17, 2025 from </Text>
          <WebLink 
            text="https://www.canadawildfire.org/wildfirefacts"
            url="https://www.canadawildfire.org/wildfirefacts"
          />
          <Text style={[styles.bodyText, { marginTop: 12 }]}>[3] Natural Resources Canada. 2023. Canada's record-breaking wildfires in 2023: A fiery wake-up call. Retrieved May 16, 2025 from </Text>
          <WebLink 
            text="https://natural-resources.canada.ca/stories/simply-science/canada-s-record-breaking-wildfires-2023-fiery-wake-call"
            url="https://natural-resources.canada.ca/stories/simply-science/canada-s-record-breaking-wildfires-2023-fiery-wake-call"
          />
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  attributionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },

  sectionTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },

  bodyText: {
    fontSize: 16,
  },

  introText: {
    marginBottom: 12,
  }
})