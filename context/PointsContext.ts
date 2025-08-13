import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

// define type for context
type PointsContext = {
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
}

export const PointsContext = createContext<PointsContext>({
  points: 0,
  setPoints: () => {}
}); 