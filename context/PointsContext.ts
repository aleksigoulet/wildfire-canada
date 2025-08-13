import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type PointsContext = {
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
}

export const PointsContext = createContext<PointsContext>({
  points: 0,
  setPoints: () => {}
}); 