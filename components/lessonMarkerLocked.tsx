import { Text, View, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

// type definition for component properties
type LessonLockedProps = {
  title: string;
  // number: string;
};

export default function LessonMarkerLocked(props: LessonLockedProps) {
  return (
    <View 
      style={styles.lessonButton}
    >
      <View style={styles.lessonTitle}>
        <Text style={styles.lessonTitleText}>{props.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lessonButton: {
    // padding: 10,
    width: 100,
    height: 100,
    backgroundColor: '#e9e9e9ff',
    borderRadius: 50
  },

  lessonTitle: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 80
  },

  lessonTitleText: {
    // color: 'white',
    fontWeight: 'bold',
  }
})