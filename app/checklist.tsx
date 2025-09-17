import { Text, View, StyleSheet, Pressable, SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { storeObjectData, getObjectData } from "@/utils/storageHandlers";
import { Image } from "expo-image";

import { useContext } from 'react';
import { ChecklistContext } from "@/context/ChecklistContext";
import { PointsContext } from "@/context/PointsContext";
import { BadgesContext } from "@/context/BadgesContext";

import { useFonts } from 'expo-font';
import { Icons } from '@/components/icons';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import CheckboxActive from '@/assets/images/checkbox-active.svg';
import CheckboxInactive from '@/assets/images/checkbox-inactive.svg';
import InterfaceButton from "@/components/interfaceButton";
import AddXpIcon from "@/components/addXpIcon";
import { Checklist as ChecklistType, ChecklistItem } from "@/types/commonTypes";

export default function Checklist() {
  const router = useRouter();

  // get id parameter from route
  const { id, numberPoints } = useLocalSearchParams();

  // convert the passed number of points to integer
  // this is the number of points to add for completing the checklist
  // defined by ChecklistButton component
  const numberPointsInt = parseInt(numberPoints as string);

  // points context
  const { addPoints } = useContext(PointsContext);

  // badges context
  const { unlockBadge } = useContext(BadgesContext);

  // get the checklist context.
  // needed so that Prepare view can be correctly updated when completing a checklist.
  const { checklists, setChecklists } = useContext(ChecklistContext);

  const [ currentChecklist, setCurrentChecklist ] = useState<any>(null);
  const [ allItemsChecked, setAllItemsChecked ] = useState<boolean>(false);


  // helper function to check a value is true
  const itemChecked = (value: boolean) => value;

  const allCheckboxesComplete = (): boolean => {
    // map items arrays to array of values for checkbox status
    const checkboxValues = currentChecklist?.content.items.map((item: any) => {
      return item.checked;
    })

    // check that all checkboxes have been checked 
    return checkboxValues?.every(itemChecked);
  }

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

  const handleComplete = () => {
    // update the checklist completion state

    // check that all checkboxes have been checked
    const allCheckboxesTrue = allCheckboxesComplete();

    // if all checkboxes have been checked,
    // then update checklist completion state
    // and add points
    if (allCheckboxesTrue) {
      const updatedChecklist : ChecklistType = {
        ...currentChecklist,
        metadata: {
          ...currentChecklist.metadata,
          completionStatus: true,
          previouslyCompleted: true
        }
      }              
      
      setCurrentChecklist(updatedChecklist);

      // update user's XP points
      addPoints(numberPointsInt);

      // always unlock the first checklist badge
      unlockBadge('first_checklist');

      // check if we also need to unlock the second checklist badge (all complete)

      // create an array for the completion status of all checklists
      const checklistCompletions = checklists.map((checklist) => {
        // if the checklist matches the current checklist, then return true
        // this is needed because the state does not update fast enough
        // for correct behaviour
        if ( checklist.metadata.id === currentChecklist.metadata.id ) {
          return true;
        }
        
        return checklist.metadata.completionStatus;
      })
      
      // check if all checklists have been completed
      const allChecklistsComplete = checklistCompletions.every(itemChecked);
      
      // if all checklists completed,
      // then unlock 'all checklists' badge
      if ( allChecklistsComplete ) {
        unlockBadge('all_checklists')
      }
      
      // save the checklist with updated state and navigate back to Prepare view.
      handleSaveOnClose(updatedChecklist);
      router.dismiss();
      return;
    }
    

    // save to storage and go back
    handleSaveOnClose(currentChecklist);
    router.dismiss();
  }

  const handleReset = () => {
    const udpatedItems = currentChecklist.content.items.map(( item: ChecklistItem ) => {
      return {
        ...item,
        checked: false
      }
    })

    const updatedChecklist = {
      ...currentChecklist,
      metadata: {
        ...currentChecklist.metadata,
        completionStatus: false
      },
      content: {
        ...currentChecklist.content,
        items: udpatedItems
      }
    }

    setCurrentChecklist(updatedChecklist);
  }

  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  });

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

  // effect for checking all boxes are checked
  useEffect(() => {    
    setAllItemsChecked(allCheckboxesComplete());
  }, [currentChecklist])

  // code below for icons copied from docs
  // https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      {/* container */}
      <View style={styles.container}>

        {/* View for header section */}
        <View style={styles.headerContainer}>

          {/* close button */}
          <Pressable
            onPress={() => { 
              handleSaveOnClose(currentChecklist);
              router.dismiss();
            }} 
          >
            <Icons name="cross-small" size={24}/>
          </Pressable>

          {/* checklist title */}
          <Text style={styles.titleText}>{ currentChecklist?.metadata.checklistName }</Text>
        </View>


        {/* container for content that scrolls */}
        <ScrollView style={styles.scrollContainer}>
        
          {/* view for checklist intro message */}
          <View style={styles.introSectionContainer}>
            <Image 
                source={require('@/assets/images/firefighter.png')}
                style={{
                  width: 46,
                  height: 46
                }}
              />

            {/* Container needed around text to make sure it wraps around correctly */}
            <View style={{ flexShrink: 1 }}>
              <Text style={styles.contentText}>{ currentChecklist?.content.introMessage }</Text>
            </View>
          </View>

          {/* view for checklist items */}
          <View>
            { 
              currentChecklist?.content.items.map((item: any) => {
              return (
                <Pressable 
                  key={item.id}
                  onPress={() => {
                    if ( currentChecklist.metadata.completionStatus ) {
                      return
                    }


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
                    <CheckboxActive width={20}/> : 
                    <CheckboxInactive width={20}/>
                  }
                  <View style={{ flexShrink: 1 }}>
                    <Text 
                      style={[
                        styles.contentText,
                        item.checked ? 
                          null : 
                          styles.contentTextInactive
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </Pressable>
              )
            })
            }
          </View>


        </ScrollView>

        {
          currentChecklist?.metadata.completionStatus ?
            null : 
            <AddXpIcon points={ numberPointsInt } style={ styles.xpIconPosition }/>
        }

      </View>

      {/* dynamically render button to give user option to reset checklist when it's completed */}
      {
        currentChecklist?.metadata.completionStatus ? 
          <View style={styles.buttonContainer}>
            <InterfaceButton 
              onPress={ handleReset } 
              title="Reset Checklist"
              icon={
                <FontAwesome6 name="arrow-rotate-right" size={16} color="black" />
              }
            />
          </View> : 
          <View style={styles.buttonContainer}>
            <InterfaceButton onPress={ handleComplete } title="Complete" inactive={ !allItemsChecked }/>
          </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12
  },

  scrollContainer: {
    paddingTop: 36,
  }, 

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },

  introSectionContainer: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    marginBottom: 32,
  },

  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
    paddingTop: 12
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    // need margin right to match size of icon for text to be centered
    marginRight: 24
  },

  contentText: {
    fontSize: 16,
  },

  contentTextInactive: {
    color: '#6F6F6F'
  },

  xpIconPosition: {
    position: "absolute",
    bottom: 0,
    right: 20,
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
    gap: 12,
    marginBottom: 16,
  }
})