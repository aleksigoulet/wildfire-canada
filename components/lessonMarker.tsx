import { Text, View, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Link } from "expo-router";

import LessonButton from '@/assets/lessonButton/lesson-button.svg';
import LessonButtonPressed from '@/assets/lessonButton/lesson-button-pressed.svg';

// type definition for component properties
type LessonProps = {
  title: string;
  number: string;
  style?: ViewStyle;
};

export default function LessonMarker(props: LessonProps) {
  return (
    <Link 
      href={`/lesson?number=${props.number}`}
      style={{
        width: 100,
      }}
      asChild
    >
      <Pressable style={props.style}>
        {({pressed}) => (
          <View style={[styles.container, pressed ? styles.containerPressed : null]}>
            {
              pressed ? 
              <LessonButtonPressed width={100} /> :
              <LessonButton width={100} />
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
    width: 120,
  },
  
  containerPressed: {
    marginTop: 7,
  },

  lessonTitle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#4F3B23',
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