import { ReactNode } from "react";

// define ts enum for MapBox layer visibility state
enum LayerVisibility {
  Visible = 'visible',
  Hidden = 'none'
}

// Type for props passed to context providers.
// Use of ReactNode adapted from following blog post:
// https://blog.logrocket.com/react-children-prop-typescript/
type ContextProviderProps = {
  children: ReactNode;
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

// type for badges
type BadgesCollection = Badge[]

type Badge = {
  key: number;
  name: string;
  complete: boolean;
}

export { LayerVisibility, ChecklistsCollection, ContextProviderProps, BadgesCollection, Badge }