import { Text, View, ScrollView, StyleSheet, Pressable, FlatList } from "react-native";
import LessonMarker from "@/components/lessonMarker";
import lessons from "@/assets/lessons";

export default function Learn() {

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
        data={lessons}
        inverted={true}
        keyExtractor={item => item.metadata.id}
        renderItem={({item}) => <LessonMarker title={item.metadata.title} number={item.metadata.id} />}
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
