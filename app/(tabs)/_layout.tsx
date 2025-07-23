import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
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
      {/* <Tabs.Screen 
        name="profile" 
        options={{
          // animation: 'slide_from_bottom',
          // animation: 'fade',
          // headerShown: false,
          headerTitle: '',
          // headerBackTitle: 'Back',
          href: null,
        }}
      /> */}
    </Tabs>
  );
}