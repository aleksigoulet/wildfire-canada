import { Text, View, Button, Modal, StyleSheet, TextInput, SafeAreaView, Pressable } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useState, useContext } from "react";
import { storeObjectData, removeValue } from "@/utils/storageHandlers";
import { Profile } from "@/types/commonTypes";
import { ProfileContext } from "@/context/ProfileContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


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

        <Link href={'/profile'} asChild>
          <Pressable>
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
          </Pressable>
        </Link>

        <Pressable 
          onPress={() => {
            setEditProfileModalVisible(true);
          }}
        >
          <View style={[styles.settingContainer, { marginBottom: 52, paddingVertical: 10 }]}>
            <Text style={styles.settingText}>Edit Profile</Text>
          </View>
        </Pressable>

        <Link href={'/(tabs)/settings/developper'} asChild>
          <Pressable>
            <View style={styles.settingContainer}>
              <Text style={styles.settingText}>Developper</Text>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </View>
          </Pressable>
        </Link>

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
    marginBottom: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    borderRadius: 10,
    marginBottom: 16,
  },

  settingText: {
    fontSize: 16,
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