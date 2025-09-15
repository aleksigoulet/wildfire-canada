import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Link } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SvgUri } from 'react-native-svg';

import XPIcon from '@/assets/images/xp-icon.svg'
import BadgeIcon from '@/assets/images/badge-icon.svg'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function ProfileHeader(props: any) {
  const insets = useSafeAreaInsets();

  return (
      // this view needs inline styles for proper access to top inset
      <View style={[styles.header, { minHeight: insets.top + 70 }]}>
        {/* top bar */}
        <View style={[styles.headerTop, { height: insets.top }]}></View>

        <View style={styles.headerContentContainer}>

          {/* view for top line of header */}
          <View style={styles.headerContentRow}>
            {/* view for profile section */}
            <Link href={'/profile'}>
              <View style={styles.profileContainer}>
                <Image 
                  placeholder={{blurhash}}
                  source={require('@/assets/images/profile-placeholder.png')}
                  style={{
                    width: 48,
                    height: 48,
                    bottom: 2,
                    borderRadius: 25
                  }}
                />
                <View>
                  <Text style={styles.usernameText}>{ props.username }</Text>
                  <Text style={styles.userLevelText}>Beginner</Text>
                </View>
              </View>
            </Link>

            {/* view for XP */}
            <View style={styles.scoreSection}>
              <XPIcon />
              <Text style={styles.scoreText}>{ props.points }</Text>
            </View>

            {/* view for Badges */}
            <View style={styles.scoreSection}>
              <BadgeIcon />
              <Text style={styles.scoreText}>{ props.badges }</Text>
            </View>   
                 
          </View>

        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F7CFA1',
    boxShadow: '0px 5px 0px #BD6C0F',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    zIndex: 1
  },

  headerTop: {
    backgroundColor: '#ED8F23',
    boxShadow: '0px 5px 0px #A55F0D'
  },

  headerContentContainer: {
    padding: 20,
  },

  headerContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  scoreText: {
    fontSize: 36,
    fontFamily: 'Jaro-Regular',
    color: '#503716'
  },

  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  userLevelText: {
    fontStyle: 'italic',
    fontWeight: '500'
  }
})