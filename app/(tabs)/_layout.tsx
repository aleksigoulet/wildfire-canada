import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import ProfileContextProvider from '@/context/ProfileContextProvider';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/notificationHandlers';


import { useFonts } from 'expo-font';
import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon';

// code for custom icon set copied from expo docs
// https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
const Icons = createIconSetFromIcoMoon(
  require('@/assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

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

  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  });

  
  // notification code below copied from documentation
  // https://docs.expo.dev/versions/latest/sdk/notifications/#usage

  useEffect(() => {
    // register to app to receive notifications
    registerForPushNotificationsAsync()
  }, []);

  // end of copied code

  // code below for icons copied from docs
  // https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ProfileContextProvider>
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#E25706',
        tabBarInactiveTintColor: '#303030',
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 6
        },
        tabBarStyle: {
          backgroundColor: '#F1F5F2',
          height: 96,
          paddingTop: 4
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color }) => <Icons name='map-marker' size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="(learn)"
        options={{
          title: 'Learn',
          headerShown: false,
          tabBarIcon: ({ color }) => <Icons name='book' size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="(prepare)"
        options={{
          title: 'Prepare',
          headerShown: false,
          tabBarIcon: ({ color }) => <Icons name='list-check' size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color }) => <Icons name='flame' size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <Icons name='bell' size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icons name='settings' size={24} color={color}/>,
        }}
      />
    </Tabs>
    </ProfileContextProvider>
  );
}