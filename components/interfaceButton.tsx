import { Pressable, Text, StyleSheet } from "react-native"


type InterfaceButtonProps = {
  onPress: () => void;
  title: string;
  small?: boolean;
  light?: boolean;
}

export default function InterfaceButton( props: InterfaceButtonProps ) {

  return (
    <Pressable 
      onPress={ props.onPress } 
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
          null
      ]}
    >
      <Text style={styles.lessonButtonText}>{ props.title }</Text>
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
    alignItems: 'center'
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
})