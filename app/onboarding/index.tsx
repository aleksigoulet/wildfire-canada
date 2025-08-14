import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { storeObjectData } from "@/utils/storageHandlers";

import { useContext, useState } from "react";
import { OnboardingContext } from "@/context/OnboardingContext"

import { Profile } from "@/types/commonTypes";

export default function OnboardingScreen() {
  // import function to update onboarding context
  const { setOnboardingComplete } = useContext(OnboardingContext);

  // state for text input
  const [ editingUserName, setEditingUserName ] = useState<string>('');

  // handler for saving new profile information
  const handleSubmitNewProfileInfo = () => {
    const newProfileInfo: Profile = {
      username: editingUserName
    }

    // need to store data first before setting new profile context value
    storeObjectData('profile', newProfileInfo);

    console.log('Submit New Profile Info [onboarding/index.tsx]: profile successfully saved');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your username</Text>
      <TextInput 
        style={styles.input}
        value={editingUserName}
        onChangeText={setEditingUserName}
      />
      <Button
        title="Submit"
        onPress={handleSubmitNewProfileInfo}
      />
      <Button 
        title="Complete Onboarding"
        onPress={() => {
          storeObjectData('onboardingComplete', true);
          setOnboardingComplete(true);
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 200
  },
})