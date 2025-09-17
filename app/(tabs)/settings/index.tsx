import { Text, View, Button, Modal, StyleSheet, TextInput, SafeAreaView, Pressable, KeyboardAvoidingView, ScrollView, Alert, AlertButton } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useState, useContext } from "react";
import { storeObjectData } from "@/utils/storageHandlers";
import { Profile } from "@/types/commonTypes";

import { ProfileContext } from "@/context/ProfileContext";
import { ChecklistContext } from "@/context/ChecklistContext";
import { PointsContext } from "@/context/PointsContext";
import { BadgesContext } from "@/context/BadgesContext";
import { LessonsContext } from "@/context/LessonsContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';



export default function Settings() {
  const { profile, setProfile } = useContext(ProfileContext);

  // import reset functions
  const { resetBadges } = useContext(BadgesContext);
  const { resetPoints } = useContext(PointsContext);
  const { resetLessons } = useContext(LessonsContext);
  const { resetChecklists } = useContext(ChecklistContext);


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
  }

  const handleResetProgress = () => {
    const cancelButton: AlertButton = {
      text: 'Cancel',
      style: 'cancel' 
    }

    const resetButton: AlertButton = {
      text: 'Reset',
      onPress: handleResetProgressConfirmed,
      style: 'destructive'
    }

    Alert.alert(
      'Are you sure?', 
      'Pressing Reset will remove all points and badges. All lesson and checklist progress will be lost.',
      [
        cancelButton,
        resetButton
      ]
    );
  }

  const handleResetProgressConfirmed = async () => {
    try {
      // reset all the game elements
      resetBadges();
      resetPoints();
      resetChecklists();
      resetLessons();

      // send an alert to user that progress was correctly reset
      Alert.alert('', 'Progress has been reset.')
    } catch (error) {
      // if there is an error, then tell the user progress could not be reset.
      Alert.alert('There was a problem resetting progress. Please try again.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Settings</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Link href={'/profile'} asChild>
            <Pressable>
              <View style={[styles.settingContainer, styles.profileContainer]}>
                <Image
                  placeholder={{ blurhash }}
                  style={styles.profileImage}
                  source={require('@/assets/images/profile-placeholder.png')}
                />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.profileText} numberOfLines={2}>{ profile?.username }</Text>
                  <Text>See my profile</Text>
                </View>
              </View>
            </Pressable>
          </Link>

          <Pressable 
            onPress={() => {
              setEditProfileModalVisible(true);
            }}
          >
            <View style={[styles.settingContainer, { marginBottom: 52 }]}>
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
          </Pressable>

          <Link href={'/(tabs)/settings/references'} asChild>
            <Pressable>
              <View style={[styles.settingContainer, styles.settingContainerWithArrow]}>
                <Text style={styles.settingText}>References</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </View>
            </Pressable>
          </Link>

          <Link href={'/(tabs)/settings/acknowledgements'} asChild>
            <Pressable>
              <View style={[styles.settingContainer, styles.settingContainerWithArrow, { marginBottom: 52 }]}>
                <Text style={styles.settingText}>Acknowledgements</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </View>
            </Pressable>
          </Link>

          <Pressable 
            onPress={ handleResetProgress }
          >
            <View style={[styles.settingContainer, styles.settingRed]}>
              <Text style={[styles.settingText, styles.settingTextRed]}>Reset all progress</Text>
            </View>
          </Pressable>
        </ScrollView>

        {/* Modal to edit profile information */}
        <Modal
          animationType="slide"
          visible={editProfileModalVisible}
          presentationStyle="pageSheet"
          onRequestClose={handleCloseEditProfileModal}
        >
          <View style={styles.modalContainer}>
            <Button
              title="Close"
              onPress={handleCloseEditProfileModal}
            />
            
            {/* keyboard avoiding view needed so that content is not hidden by keyboard */}
            {/* idea to use this view inspired by following post */}
            {/* https://stackoverflow.com/questions/40438986/keyboardavoidingview-with-scrollview */}
            <KeyboardAvoidingView
              style={styles.keyboardAvoidContainer}
              behavior="padding"
            >
              {/* 
                ScrollView needed so that keyboard disappears when screen tapped
                solution of using scrollview with keyboardShouldPersistTaps from user Eric Kim
                https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native?page=1&tab=scoredesc#tab-top
              */}
              <ScrollView 
                keyboardShouldPersistTaps='handled' 
                style={{ width: '100%' }} 
                contentContainerStyle={{ flex: 1 }}
              >
                <View style={styles.modalFormContainer}>
                  <View style={styles.modalFormInput}>
                    <Text style={styles.modalTitle}>New Username</Text>
                    <TextInput 
                      style={styles.modalTextInput}
                      value={editingUserName}
                      onChangeText={setEditingUserName}
                    />
                  </View>
                  <Button 
                    title="Submit"
                    onPress={() => {
                      handleSubmitNewProfileInfo();
                      handleCloseEditProfileModal();
                    }}
                    // disable submit button if no new username is entered
                    disabled={ editingUserName ? false : true }
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
            
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

  keyboardAvoidContainer: {
    flex: 1,
    width: '100%'
  },

  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 64,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4
  },

  profileContainer: {
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },

  profileTextContainer: {
    width: '100%',
    flexShrink: 1
  },

  profileText: {
    fontSize: 16,
    fontWeight: '600',
  },  

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    bottom: 2
  },


  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: '#d0d0d0ff',
    borderWidth: 1,
    boxShadow: '0px 1px 2px #D5D5D5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 10,
    marginBottom: 16,
  },

  settingContainerWithArrow: {
    paddingVertical: 8,
  },

  settingRed: {
    borderColor: '#e99a9aff',
    boxShadow: '0px 1px 2px #E7A8A8'
  },

  settingText: {
    fontSize: 16,
  },

  settingTextRed: {
    color: '#D33C3C',
  },

  modalContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start'
  },

  modalTitle: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 6
  },

  modalFormContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalFormInput: {
    width: '90%',
    marginBottom: 24,
  },

  modalTextInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%'
  }
})