import { LessonCollection, ContentType } from "@/types/lessonTypes";


// requiring images in object inspired by answer by Walter Monecke
// https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names

const lessons: LessonCollection = [
  {
    metadata: {
      id: 1,
      title: 'Intro',
      unlockBadge: 'first_lesson'
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
              text: "The Chief has advised that this wildfire season will be record-breaking. So we'd better get started!"
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
            text: "In 2023, over 6,000 fires burned over 15 million hectares of land. That's an area bigger than England! [3]"
          },
          {
            id: 2,
            text: "They can destroy communities, and wildfire smoke can cause significant health problems.",
          },
          {
            id: 3,
            text: "It's up to us to do what we can to prevent them and to be ready for when a wildfire strikes!",
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "In this bootcamp, you will learn what causes wildfires and how to handle wildfire-related emergencies."
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 2,
      title: 'Basics 1'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we're going to learn about basic fire concepts. All content in this lesson was copied and/or adapted from reference [2] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Understand the fire triangle"
            },
            {
              id: 1,
              item: "Learn the causes of wildfires"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "The fire triangle describes the three elements needed to start a fire. These elements are heat, fuel, and oxygen. A fire is extinguished by removing any one of the three elements."
          },
          {
            id: 1,
            image: require('@/assets/images/fire-triangle.png'),
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "The majority of wildfires in Canada are caused either by lightning strikes or humans, with human-caused fires representing just over half of reported wildfires."
          },
          {
            id: 1,
            text: "Lightning strikes create wildfires by igniting dry fuels such as grass, trees or leaves. Hot, dry, and windy climates then provide the necessary conditions for the fire to spread."
          },
          {
            id: 2,
            text: "Similarly, human activities can ignite dry fuels. Examples of human activities that cause wildfires include: campfires, cigarettes, arson, power line failures, and fireworks.",
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 3,
      title: 'Basics 2',
      unlockBadge: '3_lessons'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we will learn about the behaviour of wildfires. All content in this lesson was copied and/or adapted from reference [2] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Learn the factors that affect wildfire behaviour"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "The first element that affects wildfire behaviour is weather."
          },
          {
            id: 1,
            text: "Winds help the spread of wildfires by transporting flames and embers across large areas, causing new fuel to burn. Additionally, wind brings more oxygen to the fire."
          },
          {
            id: 2,
            text: "Precipitation and humidity also play a role in wildfires. Rain and humidity help reduce the spread of fires by preventing fuels from igniting."
          },
          {
            id: 3,
            text: "Finally, high temperatures result in drier fuels, which create the necessary conditions for fires to start and spread."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Topography is another factor that affects the behaviour of wildfires."
          },
          {
            id: 1,
            text: "Sloping terrain can hinder or help the spread of fires. Uphill fires burn faster than downhill fires."
          },
          {
            id: 2,
            text: "The shape of the terrain, such as mountains and valleys, also changes wind patterns. The changes in wind patterns can increase wind speeds, which affects fires."
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 4,
      title: 'Prepare'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we will learn how to prepare for wildfire emergencies. All content in this lesson was copied and/or adapted from reference [1] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Prepare for wildfires"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Make a household emergency plan. Make sure to consider the needs of everyone in your household, including the needs of older adults, children, anyone with special health needs, and animals."
          },
          {
            id: 1,
            text: "Gather information from local emergency authorities for information relevant to your local area. Make sure to practice your primary and secondary escape routes."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "It is also essential to take preventive measures that will help protect your home in case of a fire."
          },
          {
            id: 1,
            text: "Make sure to remove any fuels surrounding your home, such as dried branches and leaves."
          },
          {
            id: 2,
            text: "Install smoke detectors on every level of your home, including in every bedroom."
          },
          {
            id: 3,
            text: "To go further, you can also schedule a consultation with your local fire department to discuss how to make your home more fire-resistant."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "You can also take measures to protect yourself from wildfire smoke at home."
          },
          {
            id: 1,
            text: "Make sure that windows and doors are properly sealed. Seals will help prevent smoke from entering your home."
          },
          {
            id: 2,
            text: "Additionally, consider investing in a portable air purifier to filter out air pollutants."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Be ready for evacuation by ensuring that your vehicle is fully fueled when there is a threat of wildfire to your community."
          },
          {
            id: 1,
            text: "In other times, keeping your gas tank at least half full will help you be ready in case of an unexpected or rapidly moving wildfire."
          },
          {
            id: 2,
            text: "If you need assistance, place a help sign in your window."
          }
        ]
      }
    ]
  },
    {
    metadata: {
      id: 5,
      title: 'Evacuations'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we will learn how to handle immediate fire threats and evacuations. All content in this lesson was copied and/or adapted from reference [1] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Understand the actions to take during an evacuation"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "In the event of a wildfire, monitor communications from local authorities. Follow their instructions and be ready to leave."
          },
          {
            id: 1,
            text: "Place your emergency kit and other essential items in your car."
          },
          {
            id: 2,
            text: "You can also place a message in clear view to let local authorities know where you are and how to contact you."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Protect your home by closing all doors and windows. Make sure also to cover vents and other openings to prevent smoke and embers from entering your home."
          },
          {
            id: 1,
            text: "Turn on all lights to increase visibility."
          },
          {
            id: 2,
            text: "If able, place a ladder to the roof in front of your home to help firefighters if needed."
          }
        ]
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "During evacuations, you may need to drive near a wildfire. If driving through a disaster area, stay clear of downed power lines by at least 10 metres to avoid electrocution."
          },
          {
            id: 1,
            text: "Do not attempt to drive through a wildfire unless directed by emergency officials."
          },
          {
            id: 2,
            text: "Make sure to follow official evacuation routes."
          }
        ]
      }
    ]
  },
  {
    metadata: {
      id: 6,
      title: 'After Evacuation'
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we'll discuss what to do after an evacuation. All content in this lesson was copied and/or adapted from reference [1] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Know what actions to take after evacuating."
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Continue to monitor communications channels for updates on when it is safe to return home."
          },
          {
            id: 1,
            text: "Do not make phone calls unless necessary. Communicate using other methods such as text or email.",
          },
          {
            id: 3,
            text: "Stay at least 10 metres away from downed power lines",
          }
        ]
      }
    ]
  },
    {
    metadata: {
      id: 7,
      title: "Returning Home"
    },
    pages: [
      {
        type: ContentType.Intro,
        content: {
          text: "In this lesson, we'll discuss important information for returning home after an evacuation. All content in this lesson was copied and/or adapted from reference [1] - see settings.",
          objectives: [
            {
              id: 0,
              item: "Know what to consider before returning home"
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "Wait until it is safe to return."
          },
          {
            id: 1,
            text: "Work with authorities to determine if it is safe to enter your home.",
          },
          {
            id: 2,
            text: "Test smoke detectors and carbon monoxide alarms.",
          },
          {
            id: 3,
            text: "Remove spoiled food from the fridge.",
          }
        ]
      }
    ]
  },
    {
    metadata: {
      id: 8,
      title: 'Conclusion',
      unlockBadge: 'all_lessons'
    },
    pages: [
      {
        type: ContentType.IntroMulti,
        content: {
          multiText: [
            {
              id: 0,
              text: 'Congratulations for completing the course!'
            }
          ]
        }
      },
      {
        type: ContentType.Page,
        content: [
          {
            id: 0,
            text: "You are now fully prepared to prevent and handle wildfires."
          },
          {
            id: 1,
            text: "I might even put in a good word with the Chief for you, maybe you can join our firefighting efforts!",
          }
        ]
      }
    ]
  }
]

export default lessons;