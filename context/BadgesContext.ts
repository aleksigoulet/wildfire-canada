import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { masterBadges } from "@/assets/masterBadges";
import { BadgesCollection } from "@/types/commonTypes";


// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type BadgesContext = {
  badges: BadgesCollection;
  setBadges: Dispatch<SetStateAction<BadgesCollection>>;
  getNumberCompletedBadges: () => number;
  unlockBadge: (arg: string) => void;
  resetBadges: () => void;
}

export const BadgesContext = createContext<BadgesContext>({
  badges: masterBadges,
  setBadges: () => {},
  getNumberCompletedBadges: () => 0,
  unlockBadge: () => {},
  resetBadges: () => {}
})