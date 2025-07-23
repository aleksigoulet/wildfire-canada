import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { storeObjectData, getObjectData } from "@/utils/storageHandlers";
import { checklists as masterChecklist } from "@/assets/checklists/masterChecklists";
import ProfileHeader from "@/components/profileHeader";

export default function Prepare() {
  const [ checklists, setChecklists ] = useState<any>(null);

  // load the checklists when the view is initialized
  useEffect(() => {
    getObjectData('checklists')
    .then((data) => {
      // set the checklist state to the stored checklist object
      setChecklists(data);

      // if no checklists stored, then create a checklist object from the master checklists
      if (!data) {
        console.log('checklists does not exist yet, creating...')
        storeObjectData('checklists', masterChecklist);
        setChecklists(masterChecklist);
      }
    })
  }, []); // dependencies not needed because we do not need to run effect again 
          // when the checklists state changes


  return (
    <View style={{flex: 1}}>
      <ProfileHeader />
      <View style={styles.contentContainer}>

        <Text style={styles.titleText}>Remaining Tasks</Text>

        {
          checklists ? 
          checklists.map((checklist: any) => {
            return (
              <Link 
                style={styles.checklistButton}
                href={`/checklist?id=${checklist.metadata.id}`}
                key={ checklist.metadata.id }
              >
                <Text>{ checklist.metadata.checklistDisplayText }</Text>
              </Link>
            )
          }) : 
          null
        }


        <Text style={styles.titleText}>Completed Tasks</Text>
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