import { useState, useEffect, useCallback } from "react";
import { LessonsContext } from "./LessonsContext";
import lessons from "@/assets/lessons";
import { getObjectData, removeValue, storeObjectData } from "@/utils/storageHandlers";

import { ContextProviderProps } from "@/types/commonTypes";
import { LessonCompletionState } from "@/types/lessonTypes";

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

export default function LessonsContextProvider({ children }: ContextProviderProps) {
  const [ lessonCompletion, setLessonCompletion ] = useState<LessonCompletionState[]>([]);

  const getLessonProgress = useCallback(async () => {
    const data = await getObjectData('completedLessons');

    // set the checklist state to the stored checklist object
    setLessonCompletion(data);

    // if no checklists stored, then create a checklist object from the master checklists
    if (!data) {
      console.log('getLessonProgress() [LessonsContextProvider.tsx]: lessons completion status does not exist yet, creating...')

      const lessonCompletionObject: LessonCompletionState[] = lessons.map((lesson) => {
        return {
          id: lesson.metadata.id,
          completed: false
        }
      })

      storeObjectData('completedLessons', lessonCompletionObject);
      setLessonCompletion(lessonCompletionObject);
    }
    
  }, [])

  useEffect(() => {
    getLessonProgress();
  }, [])

  /**
   * Updates the completion state of a lesson to completed.
   * @param {number} lessonId - The ID of the lesson to update.
   */
  const completeLessonById = (lessonId: number) => {
    // create a new array from the current state array
    const newLessonCompletionArray = lessonCompletion.map((lesson) => {
      // if the lesson id matches the provided id
      // then mark the lesson as completed
      if (lesson.id == lessonId) {
        return {
          ...lesson,
          completed: true
        }
      }

      // otherwise don't change the state of the lesson
      return {
        ...lesson
      }
    })

    // store the new array and update context
    storeObjectData('completedLessons', newLessonCompletionArray);
    setLessonCompletion(newLessonCompletionArray)
  }

  /**
   * Restores all lessons to their original state. All progress will be lost.
   */
  const resetLessons = async () => {
    await removeValue('completedLessons')

    const lessonCompletionObject: LessonCompletionState[] = lessons.map((lesson) => {
      return {
        id: lesson.metadata.id,
        completed: false
      }
    })

    await storeObjectData('completedLessons', lessonCompletionObject);
    setLessonCompletion(lessonCompletionObject);
  }


  // adapted from resources listed under "updating the context"
  const contextValue = {
    completedLessons: lessonCompletion,
    setCompletedLessons: setLessonCompletion,
    completeLessonById: completeLessonById,
    resetLessons: resetLessons
  }

  return (
    <LessonsContext.Provider value={contextValue}>
      { children }
    </LessonsContext.Provider>
  )
}