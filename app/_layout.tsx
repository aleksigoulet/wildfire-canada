import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
