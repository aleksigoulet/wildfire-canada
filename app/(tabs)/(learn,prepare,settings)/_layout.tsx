// use of nested layout adapted from solution by user astrojarred in following discussion
// https://github.com/expo/router/discussions/380


import { Stack } from "expo-router";
import { useMemo } from "react";

export default function NestedLayout({ segment }: { segment: string }) {
  const rootScreen = useMemo(() => {
    switch (segment) {
      case '(learn)':
        return <Stack.Screen name="learn" options={{ title: 'Learn', headerShown: false }} />
      case '(prepare)':
        return <Stack.Screen name="prepare" options={{ title: 'Prepare', headerShown: false }} />
      case '(settings)':
        return <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
    }
  }, [segment])
  

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white',
        }
      }}
    >
      { rootScreen }
      <Stack.Screen name="profile" options={{ headerTitle: '', headerBackTitle: 'Back' }}/>
    </Stack>
  )
}