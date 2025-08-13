import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Link } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function ProfileHeader(props: any) {
  const insets = useSafeAreaInsets();

  return (
    // this view needs inline styles for proper access to top inset
    <View style={[styles.header, {paddingTop: insets.top, height: 120 + insets.top}]}>
      {/* view for top line of header */}
      <View style={styles.headerTopLine}>
        {/* view for profile section */}
        <Link href={'/profile'}>
          <View style={styles.profileContainer}>
            <Image 
              placeholder={{blurhash}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 25
              }}
            />
            <View>
              <Text>Username</Text>
              <Text>Beginner</Text>
            </View>
          </View>
        </Link>
        
        {/* view for level up section */}
        <View>
            <View style={styles.headerTopLine}>
              <Text>Next Level</Text>
              <Text>20/100 xp</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressBar, styles.progressIndicator]}></View>
            </View>
        </View>
      </View>

      <View style={[styles.headerTopLine, {marginTop: 25}]}>
        <View style={styles.scoreSection}>
          <View style={styles.scoreBox}>
            <Text>{props.points}</Text>
          </View>
          <Text style={styles.scoreTitle}>Prepardness Score</Text>
        </View>
        <View style={styles.scoreSection}>
          <View style={styles.scoreBox}>
            <Text>2</Text>
          </View>
          <Text style={styles.scoreTitle}>Bagdes</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightgrey',
    height: 120,
    paddingHorizontal: 20,
    boxShadow: '0px 1px 8px black',
    zIndex: 10
  },

  edgeHeader: {
    backgroundColor: 'lightgrey',
    position: 'absolute',
    height: 60,
    width: '100%',
    top: 0,
    zIndex: 11
  },

  headerTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  progressBar: {
    width: 160,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ACACAC'
  },

  progressIndicator: {
    width: 60,
    backgroundColor: 'grey'
  },

  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    transform: [{skewX: '-10deg'}]
  },

  scoreBox: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
  },

  scoreTitle: {
    maxWidth: 110,
    // fontStyle: 'italic',
  },
})