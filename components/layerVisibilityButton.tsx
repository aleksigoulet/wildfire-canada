import { Pressable, Text, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

// types imports
import { LayerVisibility } from "@/types/commonTypes";

// define types needed
type ReactStateSetter = (value: React.SetStateAction<LayerVisibility>) => void

type LayerVisibilityButtonProps = {
  title: string;
  state: LayerVisibility;
  setter: ReactStateSetter;
}


// handler for toggling visibility state
const handleToggleLayerVisibility = ( state: LayerVisibility, setter: ReactStateSetter ) => {
  // if layer currently visible then hide the layer
  if ( state === LayerVisibility.Visible) {
    setter(LayerVisibility.Hidden);
    return
  }
  // default behaviour is to make layer visible
  setter(LayerVisibility.Visible);

}

export default function LayerVisibilityButton( props: LayerVisibilityButtonProps ) {
  return (
    <Pressable 
      style={[ styles.layerButton, 
        props.state === LayerVisibility.Visible ? 
        styles.layerButtonSelected :
        null
      ]}
      onPress={() => {
        handleToggleLayerVisibility( props.state, props.setter );
      }}
    >
      <Text>{ props.title }</Text>

      {/* display checkmark if layer is visible */}
      {
        props.state === LayerVisibility.Visible ?
        <Ionicons name="checkmark-sharp" size={16} color="black" /> :
        null
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  layerButton: {
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 16
  },

  layerButtonSelected: {
    backgroundColor: '#ccc',
  },
})