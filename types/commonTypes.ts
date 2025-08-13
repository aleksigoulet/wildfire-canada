// define ts enum for MapBox layer visibility state
enum LayerVisibility {
  Visible = 'visible',
  Hidden = 'none'
}

// types for checklist collection
type ChecklistsCollection = {
  metadata: {
    checklistName: string;
    checklistDisplayText: string;
    completionStatus: boolean;
    id: number;
  },
  content: {
    introMessage: string;
    items: ChecklistItem[]
  }
}[]

type ChecklistItem = {
  id: number;
  text: string;
  checked: boolean;
}

export { LayerVisibility, ChecklistsCollection }