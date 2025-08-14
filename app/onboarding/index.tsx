import { View, Text, Button, StyleSheet } from "react-native";
import { storeObjectData } from "@/utils/storageHandlers";

import { useContext } from "react";
import { OnboardingContext } from "@/context/OnboardingContext";

export default function OnboardingScreen() {
  const { setOnboardingComplete } = useContext(OnboardingContext);

  return (
    <View style={styles.container}>
      <Text>Onboarding View</Text>
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
  }
})