import { Text, View, StyleSheet, Pressable, SafeAreaView, Button } from "react-native";
import { useEffect, useState } from "react";
import { useRouter, Link, useLocalSearchParams } from "expo-router";
import { storeObjectData, getObjectData } from "@/utils/storageHandlers";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Checklist() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [listItems, setListItems] = useState<any>(null);


  useEffect(() => {
    getObjectData('checklists')
    .then(data => {
      data.forEach((checklist: any) => {
        if (checklist.metadata.id != id) {
          return;
        }
        setListItems(checklist.content.items)
      })
    })
  }, [])

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Button 
          title="back" 
          onPress={() => { 
            handleSaveOnClose(id, listItems);
            router.dismiss();
          }} 
        />

      <View style={styles.container}>
        <Text style={styles.titleText}>Checklist Example</Text>
        
        <View>
          { 
            listItems?.map((item: any) => {
            return (
              <Pressable 
                key={item.id}
                onPress={() => {

                  // implementation for items adapted from docs
                  // https://react.dev/learn/updating-arrays-in-state

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

                  // set the state to the new array of items
                  setListItems(newItems);

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
        {/* <Link href={'/(tabs)/prepare'}>Complete</Link> */}
        <Button 
          title="complete" 
          onPress={() => { 
            handleSaveOnClose(id, listItems);
            router.dismiss();
          }} 
        />
      </View>


    </SafeAreaView>
  );
}

function handleSaveOnClose(id: any, items: any) {
  // get the currently stored checklist object
  getObjectData('checklists')
  .then((data: any) => {
    data.forEach((checklist: any) => {
      // if not the current checklist then do nothing
      if (checklist.metadata.id != id) {
        return;
      }

      // if in the current checklist then store the new state of items
      checklist.content.items = items;

    });

    // store the edited checklist object
    storeObjectData('checklists', data);
  })
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