import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { checklists as masterChecklist } from "@/assets/checklists/masterChecklists";
import { ChecklistsCollection } from '@/types/commonTypes';

// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type ChecklistContext = {
  checklists: ChecklistsCollection;
  setChecklists: Dispatch<SetStateAction<ChecklistsCollection>>;
}

// create context with master set of checklists as default
export const ChecklistContext = createContext<ChecklistContext>({
  checklists: masterChecklist,
  setChecklists: () => {}
});