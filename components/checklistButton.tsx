import { Link } from "expo-router"
import { View, Pressable, Text, StyleSheet } from "react-native"
import { useFonts } from 'expo-font';
import { Icons } from "@/components/icons";
import AddXpIcon from "./addXpIcon";

type ChecklistButtonProps = {
  href: `/checklist?id=${number}`;
  title: string;
  icon: string;
  previouslyCompleted: boolean;
  complete?: boolean;
}

export default function ChecklistButton(props : ChecklistButtonProps) {
  // code below for icons copied from docs
  // https://docs.expo.dev/guides/icons/#createiconsetfromicomoon
  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // define default number of points to add
  let pointsToAdd = 10;

  // if checklist was previously completed
  // then only add 5 points
  if (props.previouslyCompleted) {
    pointsToAdd = 5;
  }

  return (
    <Link 
      href={ `${props.href}&numberPoints=${ pointsToAdd }`}
      asChild
    >
      <Pressable>
        {({pressed}) => (
          <View
            style={[ 
              styles.checklistButton,
              pressed ? styles.checklistButtonPressed : null,
              props.complete ? styles.checklistCompletedButton : null,
              pressed && props.complete ? styles.checklistCompletedButtonPressed : null
            ]}
          >
            <View style={styles.textContainer}>
              <Icons name={ props.icon } size={20}/>
              <Text style={styles.titleText}>{ props.title }</Text>
            </View>
            {
              props.complete ? null:  <AddXpIcon points={ pointsToAdd }/>
            }
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
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    borderColor: '#DEB886',
    borderWidth: 2,
    boxShadow: '0px 4px 0px #DEB886',
    marginBottom: 16
  },

  checklistButtonPressed: {
    backgroundColor: '#ebd3b4ff',
    boxShadow: '0px 0px 0px #DEB886',
    top: 4
  },

  checklistCompletedButton: {
    borderColor: '#1EA611',
    boxShadow: '0px 4px 0px #1EA611',
  },

  checklistCompletedButtonPressed: {
    backgroundColor: '#b0eaabff',
    boxShadow: '0px 0px 0px #1EA611',
  },

  checklistButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  titleText: {
    fontSize: 16,
    fontWeight: '600'
  },
})