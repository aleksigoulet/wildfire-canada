import { Text, View, StyleSheet, Pressable, SafeAreaView, Button, Image } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import lessons from "@/assets/lessons";



export default function Lesson() {
  const router = useRouter();

  // get lesson number from url params
  const { number } = useLocalSearchParams();

  // variable to store index of current lesson
  let lessonIndex = 0;

  // extract index of current lesson from search params
  if (typeof(number) === 'string') {
    // array index is lesson number - 1
    let newIndex = parseInt(number) - 1;

    // if index greater than the number of lessons in array
    // then show first lesson
    if (newIndex >= lessons.length) {
      console.log(lessonIndex);
      newIndex = 0 
    }

    lessonIndex = newIndex;
  }


  // state variable to keep track of page index
  const [ currentPage, setCurrentPage ] = useState(0);

  // handler for navigate back a page
  const handleBack = () => {
    // if current page index is 0 then do nothing
    if ( currentPage == 0 ) {
      return;
    }

    // set the new page index
    setCurrentPage(currentPage - 1);
  }

  // handler for navigating to the next page
  const handleNext = () => {
    // do not let index to exceed the number of available pages
    if ( currentPage == lessons[0].pages.length) {
      return;
    }

    // set the new page index
    setCurrentPage(currentPage + 1);
  }


  // helper to get the needed width of the bar
  const getProgressWidth = () => {
    const totalPages = lessons[lessonIndex].pages.length;

    // if on intro the return a minimum width value
    if ( currentPage == 0 ) {
      return 20;
    }

    // return a percentage of total bar width based on how many pages left
    return ( currentPage / totalPages ) * 250;
  }

  // variable to store content to show
  let contentJSX;


  // if all pages are completed the show completion message
  if ( currentPage === lessons[lessonIndex].pages.length ) {
    contentJSX = (
      <View>
        <Text>Lesson Complete!</Text>
        <Button title="Complete Lesson" onPress={() => router.dismiss()}/>
      </View>
    )
  } else {
    // else show the current page

    // get the current page's JSON content
    const page = lessons[lessonIndex].pages[currentPage];

    // store appropriate content in contentJSX depending on page type
    if ( page.type === 'intro' ) {
      contentJSX = (
        <View style={styles.content}>
          <Text>{ page.content.text }</Text>
          <Text>Objectives:</Text>
          <View>
            {
              page.content.objectives.map((objective: any) => {
                return <Text key={ objective.id }>{ objective.item }</Text>
              })
            }
          </View>
          <Button 
            title="Start Lesson" 
            onPress={ handleNext }  
          />
        </View>
      )
    } else if ( page.type === 'page' ) {
      contentJSX = (
        <View style={styles.content}>
          <Text style={styles.titleText}>Lesson Example</Text>
          {
            page.content.map((section: any) => {
              for (var property in section) {
                // if the content is text then display text
                if (property == 'text') {
                  return <Text key={section.id}>{section[property]}</Text>
                } else if (property == 'image') {
                  // if content is image then display image
                  return <Image key={section.id} source={section[property]}/>
                }
              }
            })
          }
          <Button 
            title="Back"
            onPress={handleBack}
          />
          <Button 
            title="Next"
            onPress={handleNext}
          />
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* header */}
      <View style={styles.container}>
        <View style={styles.header}>
          {/* close button */}
          <Pressable onPress={() => router.dismiss()}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>
          {/* progress bar */}
          <View style={styles.progressBar}>
            <View style={[styles.progressBar, styles.lessonProgress, { width: getProgressWidth() }]}></View>
          </View>
          {/* points/coin icon */}
          <View style={styles.coin}></View>
        </View>

        { contentJSX }


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // marginTop: 10
    marginBottom: 20
  },

  progressBar: {
    width: 250,
    height: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },

  lessonProgress: {
    width: 100,
    backgroundColor: 'grey',
  },

  coin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgrey'
  },

  titleText: {
    fontWeight: 'bold',
  },

  checklistButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  content: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
})