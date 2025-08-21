import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ChecklistContextProvider from "@/context/ChecklistContextProvider";
import PointsContextProvider from "@/context/PointsContextProvider";
import BadgesContextProvider from "@/context/BadgesContextProvider";
import LessonsContextProvider from "@/context/LessonsContextProvider";

import * as SplashScreen from 'expo-splash-screen';

import { OnboardingContext } from "@/context/OnboardingContext";

import { getObjectData } from "@/utils/storageHandlers";
import { useState, useEffect, useCallback } from "react";

// keep the splash screen visibile until onboarding context is initialized
SplashScreen.preventAutoHideAsync();


// use of protected stacks for onboarding adapted from following expo post and video
// https://expo.dev/blog/simplifying-auth-flows-with-protected-routes


export default function RootLayout() {

  // onboarding context definition needs to be here for state 
  // to work properly with stack navigator
  const [ onboardingComplete, setOnboardingComplete ] = useState<boolean | null>(null);
  
  // check whether onboarding has been completed or not from storage
  const getOnboardingStatus = useCallback(async () => {
    const data = await getObjectData('onboardingComplete');

    // if data does not exist then onboarding has not be completed
    if (data == null) {
      setOnboardingComplete(false);
      return;
    }

    // otherwise, set the onboarding context to the value stored 
    setOnboardingComplete(data);
  }, [])

  // use effect to get trigger getting stored onboarding state
  useEffect(() => {
    getOnboardingStatus();
    
    // hide splash screen if onboarding value has been determined
    if (onboardingComplete != null) {
      SplashScreen.hide();
    } 
  }, [onboardingComplete])


  // adapted from resources listed under "updating the context"
  const contextValue = {
    onboardingComplete: onboardingComplete,
    setOnboardingComplete: setOnboardingComplete
  }

  // do not show app if the status on onboarding is unkown
  if (onboardingComplete == null) {
    return null;
  }

  return (
    // BottomSheetModalProvider needs to be added here so that the map layers 
    // panel is displayed on top of navigation tabs.
    // Adapted from reply by user gorhom (library creator) in following thread:
    // https://github.com/gorhom/react-native-bottom-sheet/issues/249
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ChecklistContextProvider>
          <LessonsContextProvider>
            <PointsContextProvider>
              <BadgesContextProvider>
                <OnboardingContext.Provider value={contextValue}>
                  <Stack
                    screenOptions={{
                      contentStyle: {
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    <Stack.Protected guard={onboardingComplete}>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
                      <Stack.Screen 
                        name="lesson" 
                        options={{
                          animation: 'slide_from_bottom',
                          headerShown: false
                        }}
                      />
                      <Stack.Screen 
                        name="checklist" 
                        options={{
                          animation: 'slide_from_bottom',
                          // animation: 'fade',
                          headerShown: false
                        }}
                      />
                    </Stack.Protected>
                    <Stack.Protected guard={!onboardingComplete} >
                      <Stack.Screen name="onboarding" options={{ headerShown: false }}/>
                    </Stack.Protected>
                  </Stack>
                </OnboardingContext.Provider>
              </BadgesContextProvider>
            </PointsContextProvider>
          </LessonsContextProvider>
        </ChecklistContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
