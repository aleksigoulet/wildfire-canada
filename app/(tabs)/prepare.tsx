import { Text, View, StyleSheet, ScrollView } from "react-native";
import ProfileHeader from "@/components/profileHeader";
import ChecklistButton from "@/components/checklistButton";

import { useContext, useEffect, useState } from 'react';
import { ChecklistContext } from "@/context/ChecklistContext";
import { PointsContext } from "@/context/PointsContext";
import { BadgesContext } from "@/context/BadgesContext";
import { ProfileContext } from "@/context/ProfileContext";

export default function Prepare() {
  // Use the checklist context
  const { checklists } = useContext(ChecklistContext);

  // points context
  const { points } = useContext(PointsContext);

  // badges context
  const { getNumberCompletedBadges } = useContext(BadgesContext);

  // profile context
  const { profile } = useContext(ProfileContext);

  // state used to keep track of whether there are checklists remaining
  const [ remainingChecklists, setRemainingChecklists ] = useState<boolean>(true);

  // state used to keep track of whether some of the checklists are completed
  const [ completedChecklists, setCompletedChecklists ] = useState<boolean>(false);

  useEffect(() => {
    // default checklist completion state is false - there are no completed checklist
    // need to explicitly define this here so that state can be reset when 
    // all checklists are reset
    // this also cannot be defined in forEach loop below for correct behaviour
    setCompletedChecklists(false);

    // same as above for remaining checklists
    setRemainingChecklists(true);

    // check the completion state of every checklist
    // if any checklist has been completed,
    // then change completed checklists state to true
    checklists.forEach((checklist) => {
      if ( checklist.metadata.completionStatus ) {
        setCompletedChecklists(true);
      } 
    })

    // variable to store array of checklist completion states
    // this will be used to determine if every checklist has been completed
    const checklistCompletionStates = checklists.map((checklist) => {
      return checklist.metadata.completionStatus;
    })


    // simple helper function that returns a boolean
    const isTrue = (item : boolean) => item

    // If every checklist was completed then update remaining checklists state
    if (checklistCompletionStates.every(isTrue)) {
      setRemainingChecklists(false);
    }
  },[ checklists ])


  return (
    <View style={{flex: 1}}>
      <ProfileHeader 
        points={points}  
        badges={getNumberCompletedBadges()}
        username={profile?.username}
      />
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ marginBottom: 64 }}>

        {
          remainingChecklists ? 
          <Text style={styles.titleText}>Remaining Tasks</Text> :
          null
        }

        {
          checklists ? 
          checklists.map((checklist: any) => {
            if ( !checklist.metadata.completionStatus ) {

              return (
                <ChecklistButton
                  href={`/checklist?id=${ checklist.metadata.id }`}
                  title={ checklist.metadata.checklistDisplayText }
                  icon={ checklist.metadata.icon }
                  key={ checklist.metadata.id }
                  previouslyCompleted={ checklist.metadata.previouslyCompleted }
                />
              )
            }
          }) : 
          null
        }

        {
          completedChecklists ? 
          <Text style={styles.titleText}>Completed Tasks</Text> :
          null
        }

        {
          checklists ? 
          checklists.map((checklist: any) => {
            if ( checklist.metadata.completionStatus ) {

              return (
                 <ChecklistButton
                  href={`/checklist?id=${ checklist.metadata.id }`}
                  title={ checklist.metadata.checklistDisplayText }
                  icon={ checklist.metadata.icon }
                  key={ checklist.metadata.id } 
                  previouslyCompleted={ checklist.metadata.previouslyCompleted }  
                  complete               
                />
              )
            }
          }) : 
          null
        }

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
    marginTop: 8
  },

  checklistButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})