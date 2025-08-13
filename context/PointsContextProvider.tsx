import { useState, useEffect, useCallback, ReactNode } from "react";
import { PointsContext } from "./PointsContext";
import { getObjectData, storeObjectData } from "@/utils/storageHandlers";
import { ContextProviderProps } from "@/types/commonTypes";

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

  Use of ReactNode -- see ./types/commonTypes.ts
  https://blog.logrocket.com/react-children-prop-typescript/

*/


// Need to define a context provider so that data can be loaded asynchronously 
// into the context from local storage (using AsyncStorage).

export default function PointsContextProvider({ children }: ContextProviderProps) {
  const [ points, setPoints ] = useState<number>(0);

  const getStoredPoints = useCallback(async () => {
    const data = await getObjectData('points');

    // set the checklist state to the stored checklist object
    setPoints(data);

    // if no checklists stored, then create a checklist object from the master checklists
    // need to use null explicitly as 0 is falsy
    if (data == null) {
      console.log('PointsContextProvider: no stored value for points, creating now...')
      storeObjectData('points', 0);
      setPoints(0);
    }
      
  }, [])

  useEffect(() => {
    getStoredPoints();
  }, [])


  // adapted from resources listed under "updating the context"
  const contextValue = {
    points: points,
    setPoints: setPoints
  }

  return (
    <PointsContext.Provider value={contextValue}>
      { children }
    </PointsContext.Provider>
  )
}