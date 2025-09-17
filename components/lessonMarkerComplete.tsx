import { Text, View, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Link } from "expo-router";

import LessonButtonComplete from '@/assets/lessonButton/lesson-button-complete.svg'
import LessonButtonCompletePressed from '@/assets/lessonButton/lesson-button-complete-pressed.svg'

// type definition for component properties
type LessonProps = {
  title: string;
  number: string;
  style?: ViewStyle;
};

export default function LessonMarkerComplete(props: LessonProps) {
  return (
    <Link 
      href={`/lesson?number=${props.number}`}
      asChild
    >
      <Pressable style={props.style}>
        {({pressed}) => (
          <View style={[styles.container, pressed ? styles.containerPressed : null]}>
            {
              pressed ? 
              <LessonButtonCompletePressed width={100} /> :
              <LessonButtonComplete width={100} />
            }
            <View style={styles.lessonTitle}>
              <Text style={styles.lessonTitleText}>{props.title}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxWidth: 120,
  },

  containerPressed: {
    marginTop: 9,
  },

  lessonTitle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#425A47',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -16
  },

  lessonTitleText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
})