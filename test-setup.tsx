import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);


// ASYNC STORAGE MOCK
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


// mocking of expo fonts copied from article below
// https://medium.com/@runawaytrike/unit-testing-with-expo-and-expo-router-b7402ca7ab19
jest.mock('expo-font', () => {
  const module: typeof import('expo-font') = {
    ...jest.requireActual('expo-font'),
    isLoaded: jest.fn(() => true),
    useFonts: jest.fn(() => [true, null]),
  };

  return module;
});



// MOCKS FOR CONTEXT

import { Dispatch, SetStateAction } from 'react';
import { ChecklistsCollection } from '@/types/commonTypes';

// mock implementation adapted from following youtube video
// https://www.youtube.com/watch?v=BPAG3V5D-EY
jest.mock('@/context/ChecklistContextProvider', () => {
  const React = require('react');
  const masterChecklist = require('@/assets/checklists/masterChecklists')

  type FakeChecklistContext = {
    checklists: ChecklistsCollection;
    setChecklists: Dispatch<SetStateAction<ChecklistsCollection>>;
    resetChecklists: () => void;
  }

  // create context with master set of checklists as default
  // @ts-ignore
  const FakeChecklistContext = React.createContext<FakeChecklistContext>({
    checklists: masterChecklist,
    setChecklists: () => {},
    resetChecklists: () => {}
  });

  const FakeChecklistContextProvider = ({ children }: any) => {
    return (
      <FakeChecklistContext.Provider value={ FakeChecklistContext }>
        { children }
      </FakeChecklistContext.Provider>
    )
  }

  return FakeChecklistContextProvider
})