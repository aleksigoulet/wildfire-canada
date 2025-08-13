import { Text, View, Button, Modal, StyleSheet, TextInput } from "react-native";
import { useState, useContext } from "react";
import { storeObjectData, removeValue } from "@/utils/storageHandlers";
import { Profile } from "@/types/commonTypes";
import { ProfileContext } from "@/context/ProfileContext";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24
      }}
    >

      <Button 
        title="Edit Profile"
        onPress={() => {
          setEditProfileModalVisible(true);
        }}
      />

      <Text>For Development. This button deletes all game progress data from AsyncStorage.</Text>
      <Button 
        title="Reset all progress"
        onPress={async () => {
          try {
            await removeValue('checklists');
            await removeValue('badges');
            await removeValue('points');

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
  );
}

const styles = StyleSheet.create({
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