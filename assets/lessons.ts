
// requiring images in object inspired by answer by Walter Monecke
// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names

const lessons: any = [
    {
    metadata: {
      id: 1,
      title: 'Lesson 1'
    },
    pages: [
      {
        type: 'intro',
        content: {
          text: "Hey there! Welcome to your wildfire training bootcamp!",
          objectives: [
            {
              id: 0,
              item: "Understand the current situation"
            }
          ]
        }
      },
      {
        type: 'page',
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
        type: 'intro',
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
        type: 'page',
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