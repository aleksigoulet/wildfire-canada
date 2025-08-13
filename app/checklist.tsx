import { Text, View, StyleSheet, Pressable, SafeAreaView, Button } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { storeObjectData, getObjectData } from "@/utils/storageHandlers";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { ChecklistContext } from "@/context/ChecklistContext";
import { PointsContext } from "@/context/PointsContext";

export default function Checklist() {
  const router = useRouter();

  // get id parameter from route
  const { id } = useLocalSearchParams();

  // points context
  const { points, setPoints } = useContext(PointsContext);

  // get the checklist context.
  // needed so that Prepare view can be correctly updated when completing a checklist.
  const { checklists, setChecklists } = useContext(ChecklistContext);

  const [ currentChecklist, setCurrentChecklist ] = useState<any>(null);

  const handleSaveOnClose = (checklist: any) => {
    // get the currently stored checklist object
    getObjectData('checklists')
    .then((data: any) => {

      // loop through checklist data
      for (let i = 0; i < data.length; i++) {
        // skip current iteration if not the current checklist
        if (data[i].metadata.id != id) {
          continue;
        }

        // update the current checklist in the data
        data[i] = checklist;
      }

      // store the edited checklists object
      storeObjectData('checklists', data);

      // update checklist context
      setChecklists(data);
    })
  }

  useEffect(() => {
    getObjectData('checklists')
    .then(data => {
      data.forEach((checklist: any) => {
        if (checklist.metadata.id != id) {
          return;
        }      
        setCurrentChecklist(checklist);
      })
    })
  }, [])

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Button 
          title="back" 
          onPress={() => { 
            handleSaveOnClose(currentChecklist);
            router.dismiss();
          }} 
        />

      <View style={styles.container}>
        <Text style={styles.titleText}>Checklist Example</Text>
        
        <View>
          { 
            currentChecklist?.content.items.map((item: any) => {
            return (
              <Pressable 
                key={item.id}
                onPress={() => {

                  // implementation for items adapted from docs
                  // https://react.dev/learn/updating-arrays-in-state

                  const listItems = currentChecklist.content.items;

                  // change the checked state of the clicked item
                  const newItems = listItems?.map((listItem: any) => {
                    // if the item is the pressed item, then change checked state
                    if (item.id === listItem.id) {
                      return {
                        ...listItem,
                        checked: !listItem.checked
                      }
                    } else {
                      // otherwise return item with no changes
                      return listItem
                    }
                  });

                  // update the checklist with the new state of items
                  const updatedChecklist = {
                    ...currentChecklist,
                    content: {
                      ...currentChecklist.content,
                      items: newItems
                    }
                  }

                  setCurrentChecklist(updatedChecklist);

                }}
                style={styles.listItem}
              >
                { 
                  item.checked ? 
                  <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" /> : 
                  <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                }
                <Text>{item.text}</Text>
              </Pressable>
            )
          })
          }
        </View>

        <Button 
          title="complete" 
          onPress={() => { 
            // update the checklist completion state

            // helper function to check a value is true
            const itemChecked = (value: boolean) => value == true;

            // map items arrays to array of values for checkbox status
            const checkboxValues = currentChecklist.content.items.map((item: any) => {
              return item.checked;
            })

            // check that all checkboxes have been checked
            const allCheckboxesTrue = checkboxValues.every(itemChecked);

            // if all checkboxes have been checked,
            // then update checklist completion status
            // and add points
            if (allCheckboxesTrue) {
              console.log('Checklist Completion Event [checklist.tsx]: changing checklist status');

              const updatedChecklist = {
                ...currentChecklist,
                metadata: {
                  ...currentChecklist.metadata,
                  completionStatus: true
                }
              }              
              
              setCurrentChecklist(updatedChecklist);

              // set the new value for poitns
              const newPoints = points + 10
              
              // store new points value in local storage
              // needs to be done before updating context for correct behaviour
              storeObjectData('points', newPoints)

              // update points context
              setPoints(newPoints);


              // save the checklist with updated state and navigate back to Prepare view.
              handleSaveOnClose(updatedChecklist);
              router.dismiss();
              return;
            }
            

            // save to storage and go back
            handleSaveOnClose(currentChecklist);
            router.dismiss();
          }} 
        />
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10
  }
})