import { useState, useEffect, useCallback } from "react";
import { BadgesContext } from "./BadgesContext";
import { getObjectData, storeObjectData, removeValue } from "@/utils/storageHandlers";
import { masterBadges } from "@/assets/masterBadges";

import { BadgesCollection, Badge, ContextProviderProps } from "@/types/commonTypes";

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

export default function BadgesContextProvider({ children }: ContextProviderProps) {
  const [ badges, setBadges ] = useState<BadgesCollection>(masterBadges);

  const getStoredBadges = useCallback(async () => {
    const data = await getObjectData('badges');

    // set the checklist state to the stored checklist object
    setBadges(data);

    // if no checklists stored, then create a checklist object from the master checklists
    if (!data) {
      storeObjectData('badges', masterBadges);
      setBadges(masterBadges);
    }
      
  }, [])

  useEffect(() => {
    getStoredBadges();
  }, [])

  /**
   * Use this function to get the number of completed badges.
   * @returns number of completed badges
   */
  const getNumberCompletedBadges = (): number => {
    // map complete values of badges to array of individual values 
    const completionValues = badges.map((badge: Badge): boolean => {
      return badge.complete;
    })

    // iterator variable to keep track of number of completed badges
    let count = 0;

    // iterate over badges completion values and 
    // increase counter for each completed badge.
    completionValues.forEach((value) => {
      if (value) {
        count++;
      }
    })

    return count;
  }

  /**
   * Use this function to unlock a badge. A badge code string must be provided for the badge you wish to unlock.
   * @param badgeCode - badge code string
   */
  const unlockBadge = (badgeCode: string): void => {
    let newBadgeCollection: BadgesCollection = [];

    // iterate over the badges array
    badges.forEach((badge) => {
      // variable to store current badge
      let updatedBadge: Badge = badge;

      // if current badge matches the badge we want to update,
      // then set the complete property to 'true'
      if (badge.code === badgeCode) {
        updatedBadge = {
          ...badge,
          complete: true,
        };
      }

      // push the updated badge to a temporary array
      newBadgeCollection.push(updatedBadge);
    })

    // store the new data and update context
    storeObjectData('badges', newBadgeCollection);
    setBadges(newBadgeCollection);
  }

  /**
   * Restores all badges to their original state. All progress will be lost.
   */
  const resetBadges = async () => {
    await removeValue('badges');
    await storeObjectData('badges', masterBadges);
    setBadges(masterBadges);
  }

  // adapted from resources listed under "updating the context"
  const contextValue = {
    badges: badges,
    setBadges: setBadges,
    getNumberCompletedBadges: getNumberCompletedBadges,
    unlockBadge: unlockBadge,
    resetBadges: resetBadges
  }

  return (
    <BadgesContext.Provider value={contextValue}>
      { children }
    </BadgesContext.Provider>
  )
}