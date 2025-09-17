import { View, Text, Button, StyleSheet } from "react-native"
import { removeValue } from "@/utils/storageHandlers";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

export default function Developper() {
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
    <View style={styles.container}>
      <Text>For Development. This button deletes all game progress data from AsyncStorage.</Text>
      <Button 
        title="Reset all progress"
        onPress={async () => {
          try {
            await removeValue('checklists');
            await removeValue('badges');
            await removeValue('points');
            await removeValue('completedLessons');

            alert('Progress succesfully reset.')
          } catch (error) {
            console.error('Error in resetting progress [settings.tsx]: ' + error);
            alert('Error in resetting progress: \n' + error);
          }
        }}
      />
      <Button  
        title="Delete Profile Info"
        onPress={async () => {
          try {
            await removeValue('profile');

            alert('Profile deleted.');
          } catch (error) {
            console.error("Error in deleting profile [settings.tsx]: " + error);
            alert("Error in deleting profile: \n" + error);
          }
        }}
      />
      <Button 
        title="Reset Onboarding"
        onPress={async () => {
          try {
            await removeValue('onboardingComplete');

            alert('Onboarding reset.');
          } catch (error) {
            console.error("Error in resetting onboarding [settings.tsx]: " + error);
            alert("Error in resetting onboarding: \n" + error);
          }
        }}
      />
      <Button 
        title="Delete Notifications"
        onPress={async () => {
          try {
            await removeValue('notifications');

            alert('Notifications reset.');
          } catch (error) {
            console.error("Error in resetting notifications [settings.tsx]: " + error);
            alert("Error in resetting notifications: \n" + error);
          }
        }}
      />
      <Button 
        title="Send Push Code"
        onPress={handleSendPushCode}
      />
      <Button 
        title='fetch test JSON'
        onPress={async () => {
          try {
            // const response = await fetch('http://192.168.1.73:8080/api/test')

            console.log('fetching data');

            const response = await fetch('http://192.168.1.73:8080/api/test', {
              method: 'GET',
              headers: {
                'Authorization': `Api-Key ${process.env.EXPO_PUBLIC_NOTIFICATION_SERVER_API_KEY}`
              },
            })
            const data = await response.json();

            // console.log(data)

            if (data.features) {
              console.log(data.features[0].geometry.coordinates);
            }
 
          } catch (e) {
            console.warn(e);
          }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  }
})