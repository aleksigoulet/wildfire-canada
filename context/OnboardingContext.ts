import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type OnboardingContext = {
  onboardingComplete: boolean | null;
  setOnboardingComplete: Dispatch<SetStateAction<boolean | null>>;
}

export const OnboardingContext = createContext<OnboardingContext>({
  onboardingComplete: false,
  setOnboardingComplete: () => {}
}); 