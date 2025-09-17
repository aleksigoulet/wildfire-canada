import { View, Text, StyleSheet, ViewStyle } from "react-native";


type BulletListItemProps = {
  text: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
}

export default function BulletListItem(props: BulletListItemProps) {
  // bullet list code adapted from following resource
  // https://www.atomlab.dev/tutorials/react-native-bullet-list

  return (
    <View style={[styles.bulletListItem, props.style]}>
      <Text style={styles.bullet}>{'\u25CF'}</Text>
      <Text style={[styles.contentText, props.textStyle as any]}>{ props.text }</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  bullet: {
    marginTop: 5, 
    fontSize: 8,
  },

  bulletListItem: {
    flexDirection: 'row',
    gap: 6
  },

  contentText: {
    fontSize: 16,
    // shrink needed to text wraps around correctly
    flexShrink: 1
  },
})