import { View, SafeAreaView, Text, Button, StyleSheet } from "react-native"
import { removeValue } from "@/utils/storageHandlers";

export default function Developper() {
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