import { Text, View, StyleSheet, Pressable, SafeAreaView, Button } from "react-native";
import { useState, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from "expo-image";
import InterfaceButton from "@/components/interfaceButton";

import lessons from "@/assets/lessons";
import { LessonTextContent } from "@/types/lessonTypes";

import { LessonsContext } from "@/context/LessonsContext";



export default function Lesson() {
  const router = useRouter();

  // use lessons context to update completion states
  const { completeLessonById } = useContext(LessonsContext);

  // get lesson number from url params
  const { number } = useLocalSearchParams();

  // variable used to update lesson completion state
  let lessonNumber: number;

  // variable to store index of current lesson
  let lessonIndex = 0;

  // extract index of current lesson from search params
  if (typeof(number) === 'string') {
    // set the lesson number (id)
    lessonNumber = parseInt(number);

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

  // handler for completing lesson
  const handleComplete = () => {
    // update the state of the current lesson to complete
    completeLessonById(lessonNumber);
    
    router.dismiss()
  }


  // helper to get the needed width of the bar
  const getProgressWidth = () => {
    const totalPages = lessons[lessonIndex].pages.length;

    // if on intro the return a minimum width value
    if ( currentPage == 0 ) {
      return 0.1;
    }

    // return a percentage of total bar width based on how many pages left
    // used for flex
    return ( currentPage / totalPages );
  }

  // variable to store content to show
  let contentJSX;


  // if all pages are completed then show completion message
  if ( currentPage === lessons[lessonIndex].pages.length ) {
    contentJSX = (
      <View style={styles.content}>
        <Text style={styles.titleText}>Lesson Complete!</Text>
        <Image 
          source={require('@/assets/images/checkmark-green.png')}
          style={{
            width: 120,
            height: 120
          }}
        />
        <InterfaceButton onPress={ handleComplete } title='Complete Lesson' />
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
          <Image 
            source={require('@/assets/images/firefighter.png')}
            style={{
                width: 160,
                height: 160
              }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.contentText}>{ page.content.text }</Text>
            <View>
              <Text style={[styles.contentText, { fontWeight: 'bold' }]}>Objectives:</Text>

              {/* 
                bullet list code adapted from following resource
                https://www.atomlab.dev/tutorials/react-native-bullet-list
              */}
              <View style={styles.bulletListContainer}>
                {
                  page.content.objectives.map((objective: any) => {
                    return( 
                      <View key={ objective.id } style={styles.bulletListItem}>
                        <Text style={styles.bullet}>{'\u25CF'}</Text>
                        <Text  style={styles.contentText}>{ objective.item }</Text> 
                      </View>
                    )
                  })
                }
              </View>
            </View>
          </View>
          <InterfaceButton onPress={ handleNext } title='Start Lesson' />
        </View>
      )
    } else if ( page.type === 'intro-multi' ) {

      contentJSX = (
        <View style={styles.content}>
          <Image 
            source={require('@/assets/images/firefighter.png')}
            style={{
                width: 160,
                height: 160
              }}
          />
          {/* <Image source={'@/assets/images/firefighter.png'}/> */}
          <View style={styles.textContainer}>
            {
              page.content.multiText.map((paragraph: LessonTextContent) => {
                return <Text key={ paragraph.id } style={[styles.contentText, styles.centerText]}>{ paragraph.text }</Text>
              })
            }
          </View>
          <InterfaceButton onPress={ handleNext } title='Start Lesson'/>
        </View>
      )

    } else if ( page.type === 'page' ) {
      contentJSX = (
        <View style={styles.content}>
          <View style={styles.pageContentContainer}>
            <Image 
              source={require('@/assets/images/firefighter.png')}
              // cachePolicy='memory'
              style={{
                width: 46,
                height: 46
              }}
            />
            <View style={styles.textContainer}>
              {
                page.content.map((section: any) => {
                  for (var property in section) {
                    // if the content is text then display text
                    if (property == 'text') {
                      return <Text key={section.id} style={styles.contentText}>{section[property]}</Text>
                    } else if (property == 'image') {
                      // if content is image then display image
                      return <Image key={section.id} source={section[property]} style={{ width: 220, height: 220 }}/>
                    }
                  }
                })
              }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <InterfaceButton onPress={ handleBack } title='Back' small light/>
            <InterfaceButton onPress={ handleNext } title='Next' small/>
          </View>
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
            <View style={[styles.progressBar, styles.lessonProgress, { flex: getProgressWidth() }]}></View>
          </View>
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
    gap: 15,
    marginBottom: 20
  },

  progressBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 20,
    backgroundColor: '#F1F4EE',
    borderColor: '#E5EBE0',
    borderWidth: 1,
    borderRadius: 10,
  },

  lessonProgress: {
    flex: 0.5,
    height: 18,
    width: 200,
    backgroundColor: '#08B427',
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 32
  },

  contentText: {
    fontSize: 16,
  },

  centerText: {
    textAlign: 'center',
  },

  bullet: {
    fontSize: 8,
  },

  bulletListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },

  bulletListContainer: {
    paddingLeft: 10,
  },

  content: {
    flex: 1,
    gap: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    gap: 20,
    justifyContent: 'center',

    // use of flex shrink ensures that text wraps around
    // copied from solution by user Ashok R in following post
    // https://stackoverflow.com/questions/36284453/react-native-text-going-off-my-screen-refusing-to-wrap-what-to-do
    flexShrink: 1
  },

  pageContentContainer: {
    flexDirection: 'row',
    gap: 20,
    width: '100%'
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 28
  }
})