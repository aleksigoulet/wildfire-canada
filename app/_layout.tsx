import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ChecklistContextProvider from "@/context/ChecklistContextProvider";
import PointsContextProvider from "@/context/PointsContextProvider";

export default function RootLayout() {
  return (
    // BottomSheetModalProvider needs to be added here so that the map layers 
    // panel is displayed on top of navigation tabs.
    // Adapted from reply by user gorhom (library creator) in following thread:
    // https://github.com/gorhom/react-native-bottom-sheet/issues/249
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ChecklistContextProvider>
          <PointsContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
            </Stack>
          </PointsContextProvider>
        </ChecklistContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
