import { Pressable, Text, StyleSheet, Linking } from "react-native";

type LinkProps = {
  url: string;
  text: string;
}

export default function WebLink(props: LinkProps) {
  return (
    <Pressable 
      onPress={() => {
        Linking.openURL(props.url)
      }}
    >
      <Text style={styles.linkText}>{ props.text }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  linkText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  }
})