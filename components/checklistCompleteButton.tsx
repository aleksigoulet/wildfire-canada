import { Link } from "expo-router"
import { View, Pressable, Text, StyleSheet } from "react-native"
import { useFonts } from 'expo-font';
import { Icons } from "@/components/icons";

type ChecklistButtonProps = {
  href: `/checklist?id=${number}`;
  title: string;
  icon: string;
}

export default function ChecklistCompleteButton(props : ChecklistButtonProps) {

  // code below for icons copied from docs
  // https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Link 
      href={ props.href }
      asChild
    >
      <Pressable>
        {({pressed}) => (
          <View
            style={[ 
              styles.checklistButton,
              pressed ? styles.checklistButtonPressed : null
            ]}
          >
            <Icons name={ props.icon } size={20}/>
            <Text style={styles.titleText}>{ props.title }</Text>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  checklistButton: {
    borderRadius: 10,
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    borderColor: '#1EA611',
    borderWidth: 2,
    boxShadow: '0px 4px 0px #1EA611',
    marginBottom: 16
  },

    checklistButtonPressed: {
    backgroundColor: '#b0eaabff',
    boxShadow: '0px 0px 0px #1EA611',
    top: 4
  },

  titleText: {
    fontSize: 16,
    fontWeight: '600'
  },
})