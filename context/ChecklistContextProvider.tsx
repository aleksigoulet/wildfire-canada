import { useState, useEffect, useCallback, ReactNode } from "react";
import { ChecklistContext } from "./ChecklistContext";
import { getObjectData, storeObjectData } from "@/utils/storageHandlers";
import { checklists as masterChecklists } from "@/assets/checklists/masterChecklists";

import { ChecklistsCollection } from "@/types/commonTypes";

/* 

RESOURCES USED:

General structure of code for context provider:
  https://www.reddit.com/r/reactjs/comments/1fnrjio/what_is_the_best_approach_to_get_api_data_through/

Updating the context 
  https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
  https://react.dev/reference/react/useContext#updating-data-passed-via-context

How to implement correct types
  Use of Dispatch and SetStateAction
  https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when

  Use of ReactNode
  https://blog.logrocket.com/react-children-prop-typescript/

*/


// Type for props passed to the context provider.
// Use of ReactNode adapted from following blog post:
// https://blog.logrocket.com/react-children-prop-typescript/
type ContextProviderProps = {
  children: ReactNode;
}


// Need to define a context provider so that data can be loaded asynchronously 
// into the context from local storage (using AsyncStorage).

export default function ChecklistContextProvider({ children }: ContextProviderProps) {
  const [ checklistContextData, setChecklistContextData ] = useState<ChecklistsCollection>(masterChecklists);

  const getStoredChecklistData = useCallback(async () => {
    const data = await getObjectData('checklists');

    // set the checklist state to the stored checklist object
    setChecklistContextData(data);

    // if no checklists stored, then create a checklist object from the master checklists
    if (!data) {
      console.log('ChecklistContextProvider: checklists does not exist yet, creating...')
      storeObjectData('checklists', masterChecklists);
      setChecklistContextData(masterChecklists);
    }
      
  }, [])

  useEffect(() => {
    getStoredChecklistData();
  }, [])


  // adapted from resources listed under "updating the context"
  const contextValue = {
    checklists: checklistContextData,
    setChecklists: setChecklistContextData
  }

  return (
    <ChecklistContext.Provider value={contextValue}>
      { children }
    </ChecklistContext.Provider>
  )
}