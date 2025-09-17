import { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, Button, AppState, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import { getObjectData } from "@/utils/storageHandlers";
import Notification from "@/components/notification";
import { removeValue } from "@/utils/storageHandlers";
import { Image } from "expo-image";


// code for notification background task is copied from expo documentation
// https://docs.expo.dev/versions/latest/sdk/notifications/#run-javascript-in-response-to-incoming-notifications 

import * as TaskManager from 'expo-task-manager';
import { storeObjectData } from '@/utils/storageHandlers';


const SAVE_NOTIFICATION_DATA = 'SAVE-NOTIFICATION-DATA';

// define the background task to run when a notification is received
// this needs to be in global scope
TaskManager.defineTask<Notifications.NotificationTaskPayload>(SAVE_NOTIFICATION_DATA, ({ data, error, executionInfo }) => {
  
  // check that the response contains the key 'data' 
  // and if it does that is contains truthy values in 'body'
  // this check is needed for ts
  if ('data' in data && data.data.body) {
    const currentTime = new Date();

    // check if there is any previously stored notifications
    getObjectData('notifications')
    .then(( storedNotifications ) => {
      // if no stored notifications are found
      // then create a new notifications array and store 
      if ( storedNotifications == null ) {
        console.log('notifications data does not exist yet, creating...');
       

        const newData = [{
          data: data.data.body,
          key: 1,        
          time: Date.now()
        }];

        storeObjectData('notifications', newData);
        return;
      }

      // if stored notifications are found
      // then extend the array to include the latest notification
      
      storedNotifications.push({
        data: data.data.body,
        key: storedNotifications.length + 1,  // key is needed for RN rendering        
        time: Date.now()
      });

      storeObjectData('notifications', storedNotifications);
    })
  }

  // return an empty promise
  // needed for ts
  return Promise.resolve()
});

// register the background task so that it runs
Notifications.registerTaskAsync(SAVE_NOTIFICATION_DATA);




// idea to use app state to update notification inspired by user 101arrowz in following post
// https://stackoverflow.com/questions/59637462/how-to-have-page-re-rendered-after-exiting-and-re-opening-the-app
// and implementation copied from RN documentation
// https://reactnative.dev/docs/appstate

export default function Alerts() {
  // use of reference adapted from option 3 in following blog post
  // https://medium.com/@shanakaprince/understanding-stale-state-in-react-and-how-to-avoid-it-a74cc4655c43

  // state for the list of notifications
  const [notifications, setNotifications] = useState<any>([]);

  // ref to prevent stale notification state
  const notificationsRef = useRef(notifications);

  // ref and state for the application state
  // copied from RN docs
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);


  // callback function to get stored notifications
  const fetchNotifications = useCallback(() => {
    getObjectData('notifications').then((response) => {
      // if no notifications were stored then update the notification state to a null array
      // this step is needed to prevent errors in rendering using map and in updating array
      if (response == null) {
        setNotifications([])
        notificationsRef.current = []

        // return to prevent further execution
        return
      }

      // if notifications were found
      // then update the notification state with array
      setNotifications(response)
      notificationsRef.current = response
    
    });
  }, [])

  useEffect(() => {

    // add the event listener for changes in application state
    // example when the user closes the app
    // event listener code copied from RN docs
    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // update notifications when the app comes to foreground
        // this is needed so that correct notifications are shown in alert view
        // when user opens app from a notification
        fetchNotifications();
      }

      // toggle application state
      appState.current = nextAppState;
      setAppStateVisible(appState.current);      
    });


    // fetch notifications from storage if app is active
    // this is needed to ensure initial data fetching
    // because the event listener above only listens for changes
    if (appStateVisible == 'active') {
      fetchNotifications();
    }

    // Add an event listener for receiving notifications while the app is open
    const notificationListener = Notifications.addNotificationReceivedListener(response => {
      // collect the passed data from the notification
      const notificationContent = response.request.content.data;

      const currentTime = new Date();

      // create a new object to update state
      const notificationObject = {
        data: notificationContent,
        key: notificationsRef.current.length + 1,        
        time: Date.now()
      }

      // add the new notification to the notification array
      // we do not need to save the new array to storage because that is being handled by the background task
      setNotifications([...notificationsRef.current, notificationObject])
      notificationsRef.current = [...notificationsRef.current, notificationObject];
    });

    // event listener for notifications that are interacted with (pressed)
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      // open the app on the alerts tab when the user presses a notification
      router.push('/(tabs)/alerts')
    });

    // clean up listeners
    return () => {
      notificationListener.remove();
      responseListener.remove();
      appStateSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Alerts</Text>
          <Button 
            title='Delete All'
            onPress={async () => {
              try {
                await removeValue('notifications');
                setNotifications([]);
              } catch (error) {
                console.error("Error in resetting notifications [alerts.tsx]: " + error);
                alert("Could not delete notifications. Please try again.");
              }
            }}
          />
        </View>

        {
          notifications[0] ? 
            <ScrollView>
              <View style={styles.scrollContainer}>
              {
                notifications?.map((notification: any) => {
                  // return <Text key={ notification.key }>{ notification.data.content }</Text>
                  // console.log(notification);
                  return <Notification key={ notification.key } data={ notification.data } time={ notification.time }/>
                })
              }
              </View>
            </ScrollView> :
            <View style={styles.emptyNotificationsContainer}>
              <Image 
                source={require('@/assets/images/bell.png')}
                style={{
                  height: 52,
                  width: 52,
                }}
              />
              <Text style={styles.emptyNotificationsText}>You're all caught up!</Text>
            </View>
        }


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '600'
  },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  scrollContainer: {
    flex: 1,
    gap: 20,
    paddingTop: 22,
    paddingBottom: 64,
    flexDirection: 'column-reverse',
  },

  emptyNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  
  emptyNotificationsText: {
    fontSize: 16,
  },

})