import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import ProfileContextProvider from '@/context/ProfileContextProvider';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/notificationHandlers';


// code below copied from expo notifications documentation
// https://docs.expo.dev/versions/latest/sdk/notifications/#usage
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export default function TabLayout() {
  // notification code below copied from documentation
  // https://docs.expo.dev/versions/latest/sdk/notifications/#usage

  useEffect(() => {
    // register to app to receive notifications
    registerForPushNotificationsAsync()
  }, []);

  // end of copied code

  return (
    <ProfileContextProvider>
    <Tabs screenOptions={{ tabBarActiveTintColor: 'red' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(learn)"
        options={{
          title: 'Learn',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(prepare)"
        options={{
          title: 'Prepare',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="fire" color={color} />,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
    </ProfileContextProvider>
  );
}