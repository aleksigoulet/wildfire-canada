import { Text, View, StyleSheet } from "react-native"
import { useFonts } from "expo-font";
import { Icons } from "./icons";

export default function Notification(props: any) {

  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  });

  // code below for icons copied from docs
  // https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
  if (!fontsLoaded) {
    return null;
  }


  // code for calculating time since notification was received

  // create a new date object with the stored time
  const receivedTime = new Date(props.time)

  // new date object for curren time
  const currentTime = new Date()

  // calculate the time difference between notification time and current time
  const timeDifference = currentTime.getTime() - receivedTime.getTime();

  // variable that to display the time difference
  // initially, calculate the time difference in minutes
  // then it will get replaced with a string to display
  let timeDiffDisplay : string | number = Math.floor(timeDifference / 60000);

  // variables to calculate the time difference in hours and days if needed
  const timeDiffHours = Math.floor(timeDifference / 3600000);
  const timeDiffDays = Math.floor(timeDifference / 86400000);



  if (timeDiffDisplay < 1) {
    // time difference is less than a minute
    timeDiffDisplay = 'now'
  } else if (timeDiffDisplay > 59 && timeDiffDisplay < 1440) {
    // time difference greater than 1 hour but less than 1 day
    // display the number of hours
    timeDiffDisplay = `${timeDiffHours}h ago`
  } else if (timeDiffDisplay > 1440) {
    // time difference is greater than 1 day
    // display the number of days
    timeDiffDisplay = `${timeDiffDays}d ago`
  } else {
    // otherwise display the difference in minutes
    timeDiffDisplay = `${timeDiffDisplay}m ago`
  }

  return (
    <View style={styles.container}>
      <View style={styles.notificationTopLine}>
        <Text style={styles.titleText}>{ props.data.title }</Text>        
        <Text style={styles.contentText}>{ timeDiffDisplay }</Text>
      </View>
        {
          props.data.notificationType === 'OR' ? 
            <View style={[ styles.notificationTypeContainer, { backgroundColor: '#FDD8D8' } ]}>
              <Icons name="triangle-warning" size={14} color={ '#E10C0C' }/>
              <Text style={styles.orderText}>Evacuation Order</Text>
            </View> : 
            null
        }
        {
          props.data.notificationType === 'AL' ? 
            <View style={[ styles.notificationTypeContainer, { backgroundColor: '#FFF7D7' } ]}>
              <Icons name="engine-warning" size={16} color={ '#CAA502' }/>
              <Text style={styles.alertText}>Evacuation Alert</Text>
            </View> : 
            null
        }

      <Text style={[styles.contentText, { marginTop: 24 }]}>Location: { props.data.location }</Text>
      <Text style={[ styles.contentText, { fontStyle: 'italic', fontWeight: '300' } ]}>Issued by { props.data.authority }</Text>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#F2F2F2',
    borderWidth: 1,
    boxShadow: '0px 1px 2px #D5D5D5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    gap: 4
  },

  notificationTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  notificationTypeContainer: {
    // idea to use align-self copied from answer by Shiva Tiwari
    // https://stackoverflow.com/a/78850745
    alignSelf: 'flex-start',
    flexBasis: 'auto',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6
  },

  orderText: {
    color: '#AA0909',
    fontSize: 14,
  },

  alertText: {
    color: '#7E6801',
    fontSize: 14,
  },

  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },

  contentText: {
    fontSize: 16
  },

})