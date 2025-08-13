import { Text, View, Button} from "react-native";
import { removeValue } from "@/utils/storageHandlers";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24
      }}
    >
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
    </View>
  );
}
