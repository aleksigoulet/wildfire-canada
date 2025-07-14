import { Text, View, Pressable, StyleSheet } from "react-native";

// type definition for component properties
type LessonProps = {
  title: string;
};

export default function LessonMarker(props: LessonProps) {
  return (
    <Pressable 
      onPress={() => {alert(props.title)}}
      style={styles.lessonButton}
    >
      <View style={styles.lessonTitle}>
        <Text style={styles.lessonTitleText}>{props.title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  lessonButton: {
    // padding: 10,
    width: 100,
    height: 100,
    backgroundColor: 'lightgrey',
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