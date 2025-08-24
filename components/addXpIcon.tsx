import { View, Text, StyleSheet, ViewStyle } from "react-native";
import XPIcon from '@/assets/images/xp-icon.svg'

type AddXpIconProps = {
  points: number;
  style?: ViewStyle | null;
}

export default function AddXpIcon({ points, style=null }: AddXpIconProps) {
 return (
  <View style={[styles.xpContainer, style ]}>
    <Text style={styles.xpText}>+{ points }</Text>
    <XPIcon width={32} height={19}/>
  </View>
 )
}

const styles = StyleSheet.create({
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  xpText: {
    color: '#2A52A2',
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    transform: [{ skewX: '-20deg' }]
  }, 
})