import { Text, View, Button } from "react-native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default function Alerts() {
  const handleSendPushCode = async () => {
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }

      const tokenToSend = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      console.log('sending token: ' + tokenToSend);

      const endpoint: string = process.env.EXPO_PUBLIC_NOTIFICATION_SERVER_ADD_TOKEN_URL as string;

      console.log(endpoint);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${process.env.EXPO_PUBLIC_NOTIFICATION_SERVER_API_KEY}`
        },
        body: JSON.stringify({
          token: tokenToSend
        })
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.warn('Error submitting push token to server: ' + error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Alerts View</Text>
      <Button 
        title="Send Push Code"
        onPress={handleSendPushCode}
      />
    </View>
  );
}
