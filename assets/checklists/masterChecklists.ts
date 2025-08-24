import { ChecklistsCollection } from "@/types/commonTypes";

const checklists: ChecklistsCollection = [
  {
    metadata: {
      checklistName: "Go-Kit Checklist",
      checklistDisplayText: "Create my go-kit",
      completionStatus: false,
      previouslyCompleted: false,
      icon: 'exit-alt',
      id: 1
    },
    content: {
      introMessage: "Include the following items in your go-kit.",
      items: [
        {id: 1, text: 'Food Rations', checked: false},
        {id: 2, text: 'Flashlight', checked: false},
        {id: 3, text: 'Blankets', checked: false},
        {id: 4, text: 'Emergency Contact Information', checked: false},
        {id: 5, text: 'First Aid Kit', checked: false},
      ]
    }
  },
  {
    metadata: {
      checklistName: "Home Defense Checklist",
      checklistDisplayText: "Protect my home",
      completionStatus: false,
      previouslyCompleted: false,
      icon: 'fire-shield',
      id: 2
    },
    content: {
      introMessage: "Take the following steps to protect your home.",
      items: [
        {id: 1, text: 'Remove combustible material within 1.5 meters of property.', checked: false},
        {id: 2, text: 'Add a water barrier at the edge of your property.', checked: false},
        {id: 3, text: 'Clear your roof of debris.', checked: false},
        {id: 4, text: 'Invest in fire-resistant roofing', checked: false},
        {id: 5, text: 'Install a spark arrestor on the chimney', checked: false},
      ]
    }
  },
  {
    metadata: {
      checklistName: "First Aid Kit Checklist",
      checklistDisplayText: "Create my first aid kit",
      completionStatus: false,
      previouslyCompleted: false,
      icon: 'pharmacy',
      id: 3
    },
    content: {
      introMessage: "Include the following items in your first aid kit.",
      items: [
        {id: 1, text: 'Bandages', checked: false},
        {id: 2, text: 'Medicine', checked: false},
        {id: 3, text: 'Disinfecting Wipes', checked: false},
        {id: 4, text: 'Water soluble tablets', checked: false},
        {id: 5, text: 'Gauze', checked: false},
      ]
    }
  }
]

export { checklists };