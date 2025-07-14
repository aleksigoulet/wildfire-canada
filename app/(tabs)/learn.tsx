import { Text, View, ScrollView, StyleSheet, Pressable, FlatList } from "react-native";
import LessonMarker from "@/components/lessonMarker";

export default function Learn() {

  const data = [
    {
      id: '1',
      title: 'Lesson 1'
    },
    {
      id: '2',
      title: 'Lesson 2'
    },
    {
      id: '3',
      title: 'Lesson 3'
    },
    {
      id: '4',
      title: 'Lesson 4'
    },
    {
      id: '5',
      title: 'Lesson 5'
    }
  ]

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >

      <View style={styles.header}>

      </View>

      <FlatList
        data={data}
        inverted={true}
        keyExtractor={item => item.id}
        renderItem={({item}) => <LessonMarker title={item.title} />}
        // https://stackoverflow.com/questions/73338922/how-do-i-add-gap-in-between-items-in-flatlist
        contentContainerStyle={styles.scrollContainer}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: 5,
                height: 100,
                backgroundColor: 'grey',
                alignSelf: 'center',
              }}
            ></View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'grey',
    height: 100
  },

  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 300
  },
})
