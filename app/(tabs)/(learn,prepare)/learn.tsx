import { Text, View, ScrollView, StyleSheet, Pressable, FlatList, SafeAreaView } from "react-native";
import LessonMarker from "@/components/lessonMarker";
import ProfileHeader from "@/components/profileHeader";
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
      
      <ProfileHeader />
      
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
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 300
  },
})
