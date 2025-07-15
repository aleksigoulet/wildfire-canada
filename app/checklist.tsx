import { Text, View, StyleSheet, Pressable, SafeAreaView, Button } from "react-native";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Prepare() {
  const router = useRouter();

  const items = [
    {id: 1, text: 'Food Rations', checked: false},
    {id: 2, text: 'Flashlight', checked: false},
    {id: 3, text: 'Blankets', checked: false},
    {id: 4, text: 'Emergency Contact Information', checked: false},
    {id: 5, text: 'First Aid Kit', checked: false},
  ]

  const [listItems, setListItems] = useState(items)

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <Button title="Back" onPress={() => router.dismiss()} />

      <View style={styles.container}>
        <Text style={styles.titleText}>Checklist Example</Text>
        
        <View>
          { listItems.map((item) => {
            return (
              <Pressable 
                key={item.id}
                onPress={() => {

                  // implementation for items adapted from docs
                  // https://react.dev/learn/updating-arrays-in-state

                  // change the checked state of the clicked item
                  const newItems = listItems.map(listItem => {
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
        <Button title="complete" onPress={() => router.dismiss()} />
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