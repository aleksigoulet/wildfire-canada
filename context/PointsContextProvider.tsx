import { useState, useEffect, useCallback } from "react";
import { PointsContext } from "./PointsContext";
import { getObjectData, removeValue, storeObjectData } from "@/utils/storageHandlers";
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

    // set the points state to the stored points object
    setPoints(data);

    // if no points stored, then create a new entry for points
    // need to use null explicitly as 0 is falsy
    if (data == null) {
      storeObjectData('points', 0);
      setPoints(0);
    }
      
  }, [])

  useEffect(() => {
    getStoredPoints();
  }, [])


  /**
   * Function to add a given number of points to the existing points.
   * @param { number } newPoints - The number of points to add
   */
  const addPoints = (newPoints: number) => {
      // set the new value for poitns
      const newTotal = points + newPoints;
      
      // store new points value in local storage
      // needs to be done before updating context for correct behaviour
      storeObjectData('points', newTotal);

      // update points context
      setPoints(newTotal);
  }

  /**
   * Restores points to zero. All progress will be lost.
   */
  const resetPoints = async () => {
    await removeValue('points');
    await storeObjectData('points', 0);
    setPoints(0);
  }

  // adapted from resources listed under "updating the context"
  const contextValue = {
    points: points,
    setPoints: setPoints,
    addPoints: addPoints,
    resetPoints: resetPoints
  }

  return (
    <PointsContext.Provider value={contextValue}>
      { children }
    </PointsContext.Provider>
  )
}