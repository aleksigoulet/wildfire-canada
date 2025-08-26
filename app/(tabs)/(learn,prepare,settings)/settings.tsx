import { Text, View, Button, Modal, StyleSheet, TextInput, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useState, useContext } from "react";
import { storeObjectData, removeValue } from "@/utils/storageHandlers";
import { Profile } from "@/types/commonTypes";
import { ProfileContext } from "@/context/ProfileContext";


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



export default function Settings() {
  const { setProfile } = useContext(ProfileContext);


  const [ editProfileModalVisible, setEditProfileModalVisible ] = useState<boolean>(false);
  const [ editingUserName, setEditingUserName ] = useState<string>('');

  const handleCloseEditProfileModal = () => {
    setEditProfileModalVisible(false);
    setEditingUserName('');
  }

  const handleSubmitNewProfileInfo = () => {
    const newProfileInfo: Profile = {
      username: editingUserName
    }

    // need to store data first before setting new profile context value
    storeObjectData('profile', newProfileInfo);

    // update the profile context
    setProfile(newProfileInfo);

    console.log('Submit New Profile Info [Settings.tsx]: profile successfully saved');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Settings</Text>

        <Link href={'/(tabs)/(settings)/profile'}>
          <View style={styles.profileContainer}>
            <Image
              placeholder={{ blurhash }}
              style={styles.profileImage}
            />
            <View style={styles.profileTextContainer}>
              <Text>Username</Text>
              <Text>See my profile</Text>
            </View>
          </View>
        </Link>

        <Button 
          title="Edit Profile"
          onPress={() => {
            setEditProfileModalVisible(true);
          }}
        />

        <Link href={'/(tabs)/(settings)/developper'}>
          <View style={styles.settingContainer}>
            <Text>Developper</Text>
          </View>
        </Link>
        
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


        {/* Modal to edit profile information */}
        <Modal
          animationType="slide"
          visible={editProfileModalVisible}
          presentationStyle="pageSheet"
          onRequestClose={handleCloseEditProfileModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Username</Text>
            <TextInput 
              style={styles.modalInput}
              value={editingUserName}
              onChangeText={setEditingUserName}
            />
            <Button 
              title="Submit"
              onPress={() => {
                handleSubmitNewProfileInfo();
                handleCloseEditProfileModal();
              }}
            />
            <Button
              title="Close"
              onPress={handleCloseEditProfileModal}
            />
          </View>
        </Modal>
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
    fontWeight: '600',
    marginBottom: 24
  },



  profileContainer: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileTextContainer: {
    gap: 4,
    width: '100%',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50
  },


  settingContainer: {
    backgroundColor: 'lightgrey',
    padding: 10,
    width: '100%',
    borderRadius: 5
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },

  modalInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 200
  }
})