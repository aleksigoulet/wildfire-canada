import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// code below copied from expo notifications documentation
// https://docs.expo.dev/versions/latest/sdk/notifications/#usage

/**
 * Register the app to use push notifications. 
 * This function checks if app has permission to send push notifications.
 * If there is not stored permission value, then permission is requested from the user.
 */
async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();

      if ( status === 'granted' ) {
        
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

          const endpoint: string = process.env.EXPO_PUBLIC_NOTIFICATION_SERVER_ADD_TOKEN_URL as string;

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

        } catch (error) {
          alert('Could not register for notifications.')
        }

      }

      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

  } else {
    alert('Must use physical device for Push Notifications');
  }
}

export {
  registerForPushNotificationsAsync
}