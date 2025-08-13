import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { removeValue } from "@/utils/storageHandlers";
import ProfileHeader from "@/components/profileHeader";

import { useContext } from 'react';
import { ChecklistContext } from "@/context/ChecklistContext";
import { PointsContext } from "@/context/PointsContext";

export default function Prepare() {
  // Use the checklist context
  const { checklists, setChecklists } = useContext(ChecklistContext);

  // points context
  const { points, setPoints } = useContext(PointsContext);

  // for testing only
  // removeValue('checklists');


  return (
    <View style={{flex: 1}}>
      <ProfileHeader points={points}/>
      <View style={styles.contentContainer}>

        <Text style={styles.titleText}>Remaining Tasks</Text>

        {
          checklists ? 
          checklists.map((checklist: any) => {
            if ( !checklist.metadata.completionStatus ) {

              return (
                <Link 
                  style={styles.checklistButton}
                  href={`/checklist?id=${checklist.metadata.id}`}
                  key={ checklist.metadata.id }
                >
                  <Text>{ checklist.metadata.checklistDisplayText }</Text>
                </Link>
              )
            }
          }) : 
          null
        }


        <Text style={styles.titleText}>Completed Tasks</Text>

        {
          checklists ? 
          checklists.map((checklist: any) => {
            if ( checklist.metadata.completionStatus ) {

              return (
                <Link 
                  style={styles.checklistButton}
                  href={`/checklist?id=${checklist.metadata.id}`}
                  key={ checklist.metadata.id }
                >
                  <Text>{ checklist.metadata.checklistDisplayText }</Text>
                </Link>
              )
            }
          }) : 
          null
        }

      </View>
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
    marginBottom: 10,
  },

  checklistButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
})