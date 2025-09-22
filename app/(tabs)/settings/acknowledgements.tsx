import { View, Text, ScrollView, StyleSheet } from "react-native";
import WebLink from "@/components/webLink";


export default function Acknowledgements() {
  return (
    <View style={styles.container}>
      {/* 
        scroll view with padding to make sure that content is visible on different devices. 
        padding ensures that content is not covered by navigation tabs
      */}
      <ScrollView style={{ paddingBottom: 64 }}>
        <Text style={styles.sectionTitleText}>Vector Graphic Icons</Text>
        <View style={styles.attributionContainer}>
          <Text style={styles.bodyText}>Badge Icons made by </Text>
          <WebLink text='KSan Wapiti' url='https://www.flaticon.com/authors/ksan-wapiti' />
          <Text style={styles.bodyText}> from </Text>
          <WebLink text='www.flaticon.com' url='https://www.flaticon.com/' />
        </View>
        <View style={styles.attributionContainer}>
          <Text style={styles.bodyText}>Profile Vector Icon made by </Text>
          <WebLink text='kliwir art' url='https://www.flaticon.com/authors/kliwir-art' />
          <Text style={styles.bodyText}> from </Text>
          <WebLink text='www.flaticon.com' url='https://www.flaticon.com/' />
        </View>
        <View style={styles.attributionContainer}>
          <Text style={styles.bodyText}>Firefighter Vector Icon made by </Text>
          <WebLink text='Freepik' url='https://www.flaticon.com/authors/freepik' />
          <Text style={styles.bodyText}> from </Text>
          <WebLink text='www.flaticon.com' url='https://www.flaticon.com/' />
        </View>
        <View style={styles.attributionContainer}>
          <Text style={styles.bodyText}>Uicons by </Text>
          <WebLink text='Flaticon' url='https://www.flaticon.com/uicons/' />
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
    marginBottom: 12,
  },

  sectionTitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },

  bodyText: {
    fontSize: 16,
  }
})