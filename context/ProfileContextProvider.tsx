import { useState, useEffect, useCallback } from "react";
import { ProfileContext } from "./ProfileContext";
import { getObjectData, storeObjectData } from "@/utils/storageHandlers";
import { Profile, ContextProviderProps } from "@/types/commonTypes";

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

export default function ProfileContextProvider({ children }: ContextProviderProps) {
  const [ profile, setProfile ] = useState<Profile>({ username: '' });

  const getStoredProfile = useCallback(async () => {
    const data = await getObjectData('profile');

    // set the points state to the stored points object
    setProfile(data);

    // if no profile stored, then create a profile object
    if (data == null) {
      console.log('ProfileContextProvider: no stored value for profile, creating now...')
      storeObjectData('profile', { username: '' });
      setProfile({ username: '' });
    }
      
  }, [])

  useEffect(() => {
    getStoredProfile();
  }, [])


  // adapted from resources listed under "updating the context"
  const contextValue = {
    profile: profile,
    setProfile: setProfile
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      { children }
    </ProfileContext.Provider>
  )
}