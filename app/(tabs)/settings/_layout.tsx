import { Stack } from "expo-router"

export default function Settings() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white',
        }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="acknowledgements" options={{ headerBackTitle: 'Back', headerTitle: '' }}/>
      <Stack.Screen name="references" options={{ headerBackTitle: 'Back', headerTitle: '' }}/>
    </Stack>
  )
}