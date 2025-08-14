import { LessonCollection, ContentType } from "@/types/lessonTypes";


// requiring images in object inspired by answer by Walter Monecke
// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names

const lessons: LessonCollection = [
  {
    metadata: {
      id: 1,
      title: 'Lesson 1'
    },
    pages: [
      {
        type: ContentType.IntroMulti,
        content: {
          multiText: [
            {
              id: 0,
              text: "Hey there! Welcome to your wildfire training bootcamp!"
            },
            {
              id: 1,
              text: "The Chief has advised this wildfire season will be record-breaking, so we better get started!"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Wildfires are growing problem in Canada."
          },
          {
            id: 1,
            text: "Wildfires can destroy communities and wildfire smoke can cause significant health problems."
          },
          {
            id: 2,
            text: "It's up to us to do what we can to prevent and to be ready for when a wildfire strikes!",
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 2,
      title: 'Lesson 2'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we're going to learn about basic fire concepts.",
          objectives: [
            {
              id: 0,
              item: "Understand the fire triangle"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Here's the fire triangle. We can stop a fire by removing any one of the three elements."
          },
          {
            id: 1,
            image: require('@/assets/images/fire-triangle.png'),
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 3,
      title: 'Lesson 3'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we're going to learn about basic fire concepts.",
          objectives: [
            {
              id: 0,
              item: "Understand the fire triangle"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Here's the fire triangle. We can stop a fire by removing any one of the three elements."
          },
          {
            id: 1,
            image: require('@/assets/images/fire-triangle.png'),
          }
        ]
      }
    ]
  }
]

export default lessons;