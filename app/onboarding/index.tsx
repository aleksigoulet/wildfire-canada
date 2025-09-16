import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
import { storeObjectData } from "@/utils/storageHandlers";
import { Image } from "expo-image";

import { useContext, useState } from "react";
import { OnboardingContext } from "@/context/OnboardingContext"
import InterfaceButton from "@/components/interfaceButton";

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
    <SafeAreaView style={{ flex: 1 }}>
      {/* keyboard avoiding view needed so that content is not hidden by keyboard */}
      {/* idea to use this view inspired by following post */}
      {/* https://stackoverflow.com/questions/40438986/keyboardavoidingview-with-scrollview */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
      >
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={styles.container} 
          // props below allow keyboard to be dismissed
          keyboardShouldPersistTaps='handled' 
          scrollEnabled={false}
        >
          <Image 
            source={require('@/assets/images/firefighter.png')}
            style={{
              width: 160,
              height: 160
            }}
          />
          <Text style={styles.text}>Hello! Welcome to Wildfire Canada. Before we get started, what's your name?</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Choose your username</Text>
            <TextInput 
              style={styles.input}
              value={editingUserName}
              onChangeText={setEditingUserName}
            />
          </View>
          {/* container view for button styling */}
          <View 
            style={{ marginBottom: 48 }}
          >
            <InterfaceButton 
              title="Continue"
              onPress={() => {
                handleSubmitNewProfileInfo();
                storeObjectData('onboardingComplete', true);
                setOnboardingComplete(true);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1,
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 32
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },

  text: {
    fontSize: 16
  },  

  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
  },

  inputContainer: {
    width: '100%'
  }
})