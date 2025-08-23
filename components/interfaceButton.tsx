import { ReactNode } from "react";
import { Pressable, Text, StyleSheet } from "react-native"


type InterfaceButtonProps = {
  onPress: () => void;
  title: string;
  small?: boolean;
  light?: boolean;
  inactive?: boolean;
  icon?: ReactNode;
}

export default function InterfaceButton( props: InterfaceButtonProps ) {

  return (
    <Pressable 
      onPress={() => {
        // if button is inactive then don't do anything
        if ( props.inactive ) {
          return;
        }

        // otherwise complete the passed event listener
        props.onPress();
      }} 
      style={({ pressed }) => [ 
        styles.lessonButton, 
        pressed ? 
          styles.buttonPressed :
          null,
        props.small ?  
          styles.smallButton :
          null,
        props.light ? 
          styles.lightButton : 
          null,
        props.light && pressed ? 
          styles.lightButtonPressed :
          null,
        props.inactive ? 
          styles.inactiveButton : 
          null
      ]}
    >
      { props.icon }
      <Text 
        style={[
          styles.lessonButtonText,
          props.inactive ? 
            styles.inactiveText : 
            null
        ]}
      >{ props.title }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  lessonButton: {
    backgroundColor: '#F7CFA1',
    paddingHorizontal: 36,
    paddingVertical: 16,
    minWidth: '80%',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#BD6C0F',
    shadowOpacity: 1,
    shadowRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12
  },

  buttonPressed: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    top: 5,
    backgroundColor: '#eab171ff',
  },

  smallButton: {
    minWidth: '40%',
  },

  
  lightButton: {
    backgroundColor: '#FBE7D0',
    shadowColor: '#D28124'
  },

  lightButtonPressed: {
    backgroundColor: '#f6d1a7ff'
  },
  
  lessonButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  inactiveButton: {
    backgroundColor: '#E9DDD0',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: '#B78F62',
    top: 0
  },

  inactiveText: {
    color: '#4E4E4E'
  }
})