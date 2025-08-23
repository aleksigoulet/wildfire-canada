import { Text, View, ScrollView, StyleSheet, Pressable, FlatList, SafeAreaView } from "react-native";
import { useContext } from "react";
import LessonMarker from "@/components/lessonMarker";
import LessonMarkerLocked from "@/components/lessonMarkerLocked";
import LessonMarkerComplete from "@/components/lessonMarkerComplete";
import ProfileHeader from "@/components/profileHeader";
import lessons from "@/assets/lessons";

import { PointsContext } from "@/context/PointsContext";
import { BadgesContext } from "@/context/BadgesContext";
import { ProfileContext } from "@/context/ProfileContext";
import { LessonsContext } from "@/context/LessonsContext";

export default function Learn() {
  // points context
  const { points } = useContext(PointsContext);

  //badges context
  const { getNumberCompletedBadges } = useContext(BadgesContext);

  // profile context
  const { profile } = useContext(ProfileContext);

  // lessons context
  const { completedLessons } = useContext(LessonsContext)

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      
      <ProfileHeader 
        points={points} 
        badges={getNumberCompletedBadges()}
        username={profile?.username}
      />
      
      <FlatList
        data={lessons}
        inverted={true}
        keyExtractor={item => item.metadata.id.toString()}
        renderItem={({item, index}) => {
          // don't render anything if lessons context is not initialized
          if (completedLessons == null) {
            return null
          }

          // constant to keep track of the current item's completion state
          const isLessonComplete = completedLessons[index].completed;

          // variable to keep track of the previous item's completion state
          // default value is true to ensure correct behaviour for first element of array
          let isPreviousLessonComplete = true;

          // update previous item's completion variable only if 
          // it is not first element of array
          if ( index > 0 ) {
            isPreviousLessonComplete = completedLessons[index - 1].completed;
          }


          // element to render for completed lessons
          if ( isLessonComplete ) {
            return <LessonMarkerComplete title={item.metadata.title} number={item.metadata.id.toString()} />
          }

          // element to render for the next lesson to complete
          // ie. the lesson that the user has unlockec
          if ( !isLessonComplete && isPreviousLessonComplete ) {
            return <LessonMarker title={'Start'} number={item.metadata.id.toString()} />
          }

          // element to render for lessons that are locked
          return <LessonMarkerLocked title={'Blocked'} />

        }}
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
