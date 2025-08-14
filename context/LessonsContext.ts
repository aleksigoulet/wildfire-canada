import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { LessonCompletionState } from '@/types/lessonTypes';

// define type for context
// use of Dispatch and SetStateAction adapted from following post
// https://stackoverflow.com/questions/71297102/typescript-type-for-reacts-usestate-setter-when
type LessonsContext = {
  completedLessons: LessonCompletionState[];
  setCompletedLessons: Dispatch<SetStateAction<LessonCompletionState[]>>;
  completeLessonById: (lessonId: number) => void;
}

// create context with master set of checklists as default
export const LessonsContext = createContext<LessonsContext>({
  completedLessons: [],
  setCompletedLessons: () => {},
  completeLessonById: () => {}
});