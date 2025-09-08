import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Profile } from '@/types/commonTypes';

// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type ProfileContext = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
}

const emptyProfile = {
  profile: {
    username: ''
  },
  setProfile: () => {}
}

// create context with master set of checklists as default
export const ProfileContext = createContext<ProfileContext>(emptyProfile);