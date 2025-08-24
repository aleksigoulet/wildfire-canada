import { Text, View, StyleSheet } from "react-native";

import LessonButtonLocked from '@/assets/lessonButton/lesson-button-locked.svg';

// type definition for component properties
type LessonLockedProps = {
  title: string;
};

export default function LessonMarkerLocked(props: LessonLockedProps) {
  return (
    <View style={styles.container}>
      <LessonButtonLocked width={100} />
      <View style={styles.lessonTitle}>
        <Text style={styles.lessonTitleText}>{props.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  lessonTitle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#BDBAB6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -16
  },

  lessonTitleText: {
    color: 'white',
    fontSize: 16,
  }
})